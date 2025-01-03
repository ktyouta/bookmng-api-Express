import { FLG } from "../../../util/const/CommonConst";
import { JsonFileOperation } from "../../../util/service/JsonFileOperation";
import { USER_INFO_MASTER_FILE_PATH } from "../const/UserInfoMasterConst";
import { UserBirthDayModel } from "../model/UserBirthDayModel";
import { UserIdModel } from "../model/UserIdModel";
import { UserInfoMasterCreateModel } from "../model/UserInfoMasterCreateModel";
import { UserInfoModelType } from "../model/UserInfoModelType";
import { UserNameModel } from "../model/UserNameModel";


export class UserInfoMasterSerivce {


    /**
     * ユーザーマスタファイルのデータを取得
     */
    public getUserInfoMaster() {

        // ユーザーマスタファイルからデータを取得
        const bookInfoMasterList: UserInfoModelType[] = JsonFileOperation.getFileObj(USER_INFO_MASTER_FILE_PATH);

        return bookInfoMasterList;
    }


    /**
     * 未削除のユーザーデータを取得
     * @returns 
     */
    public getActiveUserInfoMaster(bookInfoMasterList: UserInfoModelType[]) {

        // 未削除のユーザーを取得
        const activeUserInfoMasterList = bookInfoMasterList.filter((e: UserInfoModelType) => {

            return e.deleteFlg !== FLG.ON;
        });

        return activeUserInfoMasterList;
    }


    /**
     * ユーザー登録用データの作成
     * @param title 
     * @param publishedDate 
     * @param description 
     * @returns 
     */
    public createUserInfoMasterCreateBody(userId: UserIdModel, userName: UserNameModel, userBirthDay: UserBirthDayModel) {

        return new UserInfoMasterCreateModel(userId, userName, userBirthDay);
    }


    /**
     * ユーザーマスタに対する書き込み用データの作成
     * @param bookInfoMasterCreateModel 
     */
    public createUserInfoMasterWriteData(
        bookInfoMasterList: UserInfoModelType[],
        bookInfoMasterCreateModel: UserInfoMasterCreateModel): UserInfoModelType[] {

        // jsonファイル登録用の型に変換する
        const createUserInfoMasterBody: UserInfoModelType = {
            userId: bookInfoMasterCreateModel.userId.userId,
            userName: bookInfoMasterCreateModel.userName.userName,
            userBirthDay: bookInfoMasterCreateModel.userBirthDay.userBirthDay,
            createDate: bookInfoMasterCreateModel.createDate.createDate,
            updateDate: bookInfoMasterCreateModel.updateDate.updateDate,
            deleteFlg: bookInfoMasterCreateModel.deleteFlg.deleteFlg,
        };

        // ユーザーを追加する
        bookInfoMasterList = [...bookInfoMasterList, createUserInfoMasterBody];

        return bookInfoMasterList;
    }


    /**
     * ユーザーマスタファイルにデータを書き込む
     * @param bookInfoMasterList 
     */
    public overWriteUserInfoMaster(bookInfoMasterList: UserInfoModelType[]) {

        try {

            JsonFileOperation.overWriteJsonFileData(USER_INFO_MASTER_FILE_PATH, bookInfoMasterList);
        } catch (err) {

            throw Error(`ユーザーマスタファイルのデータ書き込み処理中にエラーが発生しました。ERROR:${err}`);
        }
    }
}