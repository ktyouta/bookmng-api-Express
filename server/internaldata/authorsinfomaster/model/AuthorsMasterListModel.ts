import { JsonFileData } from "../../../util/service/JsonFileData";
import { CreateDateModel } from "../../common/model/CreateDateModel";
import { DeleteFlgModel } from "../../common/model/DeleteFlgModel";
import { UpdateDateModel } from "../../common/model/UpdateDateModel";
import { AUTHROS_MASTER_FILE_PATH } from "../const/AuthorsMasterConst";
import { AuthorIdModel } from "../properties/AuthorIdMode";
import { AuthorNameModel } from "../properties/AuthorNameModel";
import { AuthorsMasterCreateModel } from "./AuthorsMasterCreateModel";
import { AuthorsMasterJsonType } from "./AuthorsMasterJsonType";
import { AuthorsMasterModel } from "./AuthorsMasterModel";


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
        const authorsMasterList: AuthorsMasterJsonType[] = JsonFileData.getFileObj(AUTHROS_MASTER_FILE_PATH);

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