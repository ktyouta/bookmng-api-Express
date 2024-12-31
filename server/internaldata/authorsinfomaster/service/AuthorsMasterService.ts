import { FLG } from "../../../util/const/CommonConst";
import { JsonFileOperation } from "../../../util/service/JsonFileOperation";
import { AUTHROS_MASTER_FILE_PATH } from "../const/AuthorsMasterConst";
import { AuthorBirthDayModel } from "../model/AuthorBirthDayModel";
import { AuthorIdModel } from "../model/AuthorIdMode";
import { AuthorNameModel } from "../model/AuthorNameModel";
import { AuthorsMasterCreateModel } from "../model/AuthorsMasterCreateModel";
import { AuthorsMasterModeType } from "../model/AuthorsMasterModeType";

export class AuthorsMasterService {


    /**
     * 著者マスタファイルのデータを取得
     * @returns 
     */
    public getAuthorsMaster(): AuthorsMasterModeType[] {

        // 著者マスタファイルからデータを取得
        const authorsMasterList: AuthorsMasterModeType[] = JsonFileOperation.getFileObj(AUTHROS_MASTER_FILE_PATH);

        return authorsMasterList;
    }


    /**
     * 未削除の著者マスタを取得する
     * @param authorsMasterList 
     * @returns 
     */
    public getActiveAuthorsMaster(authorsMasterList: AuthorsMasterModeType[]): AuthorsMasterModeType[] {

        const activeAuthorsMasterList = authorsMasterList.filter((e) => {

            return e.deleteFlg !== FLG.ON;
        });

        return activeAuthorsMasterList;
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
        authorsMasterList: AuthorsMasterModeType[],
        authorsMasterCreateModel: AuthorsMasterCreateModel): AuthorsMasterModeType[] {

        // jsonファイル登録用の型に変換する
        const createAuthorsMasterBodyList: AuthorsMasterModeType = {
            authorId: authorsMasterCreateModel.authorId.authorId,
            authorName: authorsMasterCreateModel.authorName.authorName,
            authorBirthDay: authorsMasterCreateModel.authorBirthDay.authorBirthDay,
            createDate: authorsMasterCreateModel.createDate.createDate,
            updateDate: authorsMasterCreateModel.updateDate.updateDate,
            deleteFlg: authorsMasterCreateModel.deleteFlg.deleteFlg,
        };

        // 著者情報を追加する
        authorsMasterList = [...authorsMasterList, createAuthorsMasterBodyList];

        return authorsMasterList;
    }


    /**
     * 著者情報マスタファイルにデータを書き込む
     * @param authorsMasterList 
     */
    public overWriteAuthorsMaster(authorsMasterList: AuthorsMasterModeType[]) {

        try {

            JsonFileOperation.overWriteJsonFileData(AUTHROS_MASTER_FILE_PATH, authorsMasterList);
        } catch (err) {

            throw Error(`著者情報マスタファイルのデータ書き込み中にエラーが発生しました。ERROR:${err}`);
        }
    }
}