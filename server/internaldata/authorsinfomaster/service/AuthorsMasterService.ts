import { FLG } from "../../../util/const/CommonConst";
import { JsonFileData } from "../../../util/service/JsonFileData";
import { CreateDateModel } from "../../common/model/CreateDateModel";
import { DeleteFlgModel } from "../../common/model/DeleteFlgModel";
import { UpdateDateModel } from "../../common/model/UpdateDateModel";
import { AUTHROS_MASTER_FILE_PATH } from "../const/AuthorsMasterConst";
import { AuthorBirthDayModel } from "../model/AuthorBirthDayModel";
import { AuthorIdModel } from "../model/AuthorIdMode";
import { AuthorNameModel } from "../model/AuthorNameModel";
import { AuthorsMasterCreateModel } from "../model/AuthorsMasterCreateModel";
import { AuthorsMasterJsonType } from "../model/AuthorsMasterJsonType";
import { AuthorsMasterModel } from "../model/AuthorsMasterModel";


export class AuthorsMasterService {


    /**
     * 著者マスタファイルのデータを取得
     * @returns 
     */
    public getAuthorsMaster(): AuthorsMasterModel[] {

        // 著者マスタファイルからデータを取得
        const authorsMasterList: AuthorsMasterJsonType[] = JsonFileData.getFileObj(AUTHROS_MASTER_FILE_PATH);

        // json形式からAuthorsMasterModelに変換する
        const parsedAuthorsMasterList: AuthorsMasterModel[] = authorsMasterList.map((e: AuthorsMasterJsonType) => {
            return this.parseAuthorsMaster(e);
        });

        return parsedAuthorsMasterList;
    }


    /**
     * json形式からAuthorsMasterModelに変換する
     * @param jsonBookAuthorsMaster 
     * @returns 
     */
    private parseAuthorsMaster(jsonBookAuthorsMaster: AuthorsMasterJsonType): AuthorsMasterModel {

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
     * AuthorsMasterModelからjson形式に変換する
     * @param bookAuthorsMaster 
     * @returns 
     */
    private parseJsonAuthorsMaster(bookAuthorsMaster: AuthorsMasterModel): AuthorsMasterJsonType {

        // jsonファイル登録用の型に変換する
        const jsonAuthorsMaster: AuthorsMasterJsonType = {
            authorId: bookAuthorsMaster.authorId,
            authorName: bookAuthorsMaster.authorName,
            createDate: bookAuthorsMaster.createDate,
            updateDate: bookAuthorsMaster.updateDate,
            deleteFlg: bookAuthorsMaster.deleteFlg,
        };

        return jsonAuthorsMaster;
    }


    /**
     * BookAuthorsMasterCreateModelからAuthorsMasterModel形式に変換する
     * @param bookAuthorsMaster 
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
     * 未削除の著者マスタを取得する
     * @param authorsMasterList 
     * @returns 
     */
    public getActiveAuthorsMaster(authorsMasterList: AuthorsMasterModel[]): AuthorsMasterModel[] {

        const activeAuthorsMasterList = authorsMasterList.filter((e) => {
            return e.deleteFlg !== FLG.ON;
        });

        return activeAuthorsMasterList;
    }


    /**
     * 著者IDのマスタ存在チェック
     */
    public checkAuthorIdExists(authorsMasterList: AuthorsMasterModel[], authorIdModelList: AuthorIdModel[]): string {

        let errMessge = "";

        authorIdModelList.some((e: AuthorIdModel) => {

            // 著者マスタにIDが存在するか確認する
            const authorMaster = authorsMasterList.find((e1: AuthorsMasterModel) => {

                return e1.authorIdModel.checkAuthorIdDuplicate(e);
            });

            if (!authorMaster) {
                errMessge = "著者マスタに存在しない著者が選択されています。";
                return true;
            }
        });

        return errMessge;
    }


    /**
     * 著者登録用データの作成
     * @param authorId 
     * @returns 
     */
    public createAuthorsMasterCreateBody(authorId: AuthorIdModel,
        authorName: AuthorNameModel, authorBirthDay: AuthorBirthDayModel,): AuthorsMasterCreateModel {

        return new AuthorsMasterCreateModel(authorId, authorName, authorBirthDay);
    }


    /**
     * 著者情報マスタに対する書き込み用データの作成
     * @param bookAuthorsMasterList 
     * @param bookInfoMasterCreateModel 
     * @returns 
     */
    public createAuthorsMasterWriteData(
        authorsMasterList: AuthorsMasterModel[],
        authorsMasterCreateModel: AuthorsMasterCreateModel): AuthorsMasterModel[] {

        // AuthorsMasterModelに変換する
        const createAuthorsMasterBodyList: AuthorsMasterModel = this.parseCreateAuthorsMaster(authorsMasterCreateModel);

        // 著者情報を追加する
        authorsMasterList = [...authorsMasterList, createAuthorsMasterBodyList];

        return authorsMasterList;
    }


    /**
     * 著者情報マスタファイルにデータを書き込む
     * @param authorsMasterList 
     */
    public overWriteAuthorsMaster(authorsMasterList: AuthorsMasterModel[]) {

        // json形式に変換する
        const jsonAuthorsMasterList = authorsMasterList.map((e: AuthorsMasterModel) => {
            return this.parseJsonAuthorsMaster(e);
        });

        try {

            JsonFileData.overWrite(AUTHROS_MASTER_FILE_PATH, jsonAuthorsMasterList);
        } catch (err) {

            throw Error(`著者情報マスタファイルのデータ書き込み中にエラーが発生しました。ERROR:${err}`);
        }
    }
}