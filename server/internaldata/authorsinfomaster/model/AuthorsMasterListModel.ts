import { FLG } from "../../../util/const/CommonConst";
import { JsonFileOperation } from "../../../util/service/JsonFileOperation";
import { AUTHROS_MASTER_FILE_PATH } from "../const/AuthorsMasterConst";
import { AuthorIdModel } from "./AuthorIdMode";
import { AuthorNameModel } from "./AuthorNameModel";
import { AuthorsMasterCreateModel } from "./AuthorsMasterCreateModel";
import { AuthorsMasterJsonType } from "./AuthorsMasterJsonType";
import { AuthorsMasterModel } from "./AuthorsMasterModel";
import { CreateDateModel } from "./CreateDateModel";
import { DeleteFlgModel } from "./DeleteFlgModel";
import { UpdateDateModel } from "./UpdateDateModel";

export class AuthorsMasterListModel {

    private readonly _authorsMasterList: ReadonlyArray<AuthorsMasterModel>;


    private constructor(authorsMasterList: AuthorsMasterModel[]) {

        this._authorsMasterList = authorsMasterList;
    }


    /**
     * getter
     */
    public get authorsMasterList() {
        return this._authorsMasterList;
    }


    /**
     * 著者情報を取得する
     * @returns 
     */
    public static getAuthorsMasterList() {

        // 著者マスタファイルからデータを取得
        const authorsMasterList: AuthorsMasterJsonType[] = JsonFileOperation.getFileObj(AUTHROS_MASTER_FILE_PATH);

        // json形式からAuthorsMasterModelに変換する
        const parsedAuthorsMasterList: AuthorsMasterModel[] = authorsMasterList.map((e: AuthorsMasterJsonType) => {
            return this.parseAuthorsMaster(e);
        });

        return new AuthorsMasterListModel(parsedAuthorsMasterList);
    }


    /**
     * json形式からAuthorsMasterModelに変換する
     * @param jsonBookAuthorsMaster 
     * @returns 
     */
    private static parseAuthorsMaster(jsonBookAuthorsMaster: AuthorsMasterJsonType): AuthorsMasterModel {

        const authorIdModel = AuthorIdModel.reConstruct(jsonBookAuthorsMaster.authorId);
        const authorNameModel = new AuthorNameModel(jsonBookAuthorsMaster.authorName);
        const createDate = CreateDateModel.reConstruct(jsonBookAuthorsMaster.createDate, `著者マスタ`);
        const updateDate = UpdateDateModel.reConstruct(jsonBookAuthorsMaster.updateDate, `著者マスタ`);
        const deleteFlgModel = new DeleteFlgModel(jsonBookAuthorsMaster.deleteFlg);

        return new AuthorsMasterModel(
            authorIdModel,
            authorNameModel,
            createDate,
            updateDate,
            deleteFlgModel
        );
    }


    /**
     * 未削除の著者マスタを取得する
     * @param authorsMasterList 
     * @returns 
     */
    public getActiveAuthorsMaster(): AuthorsMasterListModel {

        const activeAuthorsMasterList = this._authorsMasterList.filter((e) => {
            return e.deleteFlg !== FLG.ON;
        });

        return new AuthorsMasterListModel(activeAuthorsMasterList);
    }


    /**
     * BookAuthorsMasterCreateModelからAuthorsMasterModel形式に変換する
     * @param authorsMasterCreateModel 
     * @returns 
     */
    private parseCreateAuthorsMaster(authorsMasterCreateModel: AuthorsMasterCreateModel): AuthorsMasterModel {

        return new AuthorsMasterModel(
            authorsMasterCreateModel.authorIdModel,
            authorsMasterCreateModel.authorNameModel,
            authorsMasterCreateModel.createDateModel,
            authorsMasterCreateModel.updateDateModel,
            authorsMasterCreateModel.deleteFlgModel,
        );
    }


    /**
     * 著者IDのマスタ存在チェック
     */
    public checkAuthorIdExists(authorIdModelList: AuthorIdModel[]): boolean {

        let isExistAuthor = true;

        authorIdModelList.some((e: AuthorIdModel) => {

            // 著者マスタにIDが存在するか確認する
            const authorMaster = this._authorsMasterList.find((e1: AuthorsMasterModel) => {

                return e1.authorIdModel.checkAuthorIdDuplicate(e);
            });

            if (!authorMaster) {
                isExistAuthor = false;
                return true;
            }
        });

        return isExistAuthor;
    }


    /**
     * 著者情報を追加する
     * @param bookAuthorsMasterList 
     * @param bookInfoMasterCreateModel 
     * @returns 
     */
    public createAuthorsMasterWriteData(authorsMasterCreateModel: AuthorsMasterCreateModel): AuthorsMasterListModel {

        // 著者IDの重複チェック
        const filterdAuthorById = this._authorsMasterList.find((e: AuthorsMasterModel) => {
            return e.authorIdModel.checkAuthorIdDuplicate(authorsMasterCreateModel.authorIdModel);
        });

        // 著者IDが重複している場合
        if (filterdAuthorById) {
            throw Error(`著者情報が重複しています。${JSON.stringify(authorsMasterCreateModel)}`);
        }

        // AuthorsMasterModelに変換する
        const createAuthorsMasterBody: AuthorsMasterModel = this.parseCreateAuthorsMaster(authorsMasterCreateModel);

        // 著者情報を追加する
        const addAuthorsMasterList = [...this._authorsMasterList, createAuthorsMasterBody];

        return new AuthorsMasterListModel(addAuthorsMasterList);
    }

}