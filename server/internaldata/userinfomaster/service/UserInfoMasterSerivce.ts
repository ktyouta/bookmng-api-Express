import { FLG } from "../../../util/const/CommonConst";
import { JsonFileOperation } from "../../../util/service/JsonFileOperation";
import { USER_INFO_MASTER_FILE_PATH } from "../const/UserInfoMasterConst";
import { CreateDateModel } from "../model/CreateDateModel";
import { DeleteFlgModel } from "../model/DeleteFlgModel";
import { UpdateDateModel } from "../model/UpdateDateModel";
import { UserBirthdayModel } from "../model/UserBirthDayModel";
import { UserIdModel } from "../model/UserIdModel";
import { UserInfoMasterCreateModel } from "../model/UserInfoMasterCreateModel";
import { UserInfoMasterJsonModelType } from "../model/UserInfoMasterJsonModelType";
import { UserInfoMasterModel } from "../model/UserInfoMasterModel";
import { UserNameModel } from "../model/UserNameModel";


export class UserInfoMasterSerivce {


    /**
     * ユーザーマスタファイルのデータを取得
     */
    public getUserInfoMaster(): UserInfoMasterModel[] {

        // ユーザーマスタファイルからデータを取得
        const jsonUserInfoMasterList: UserInfoMasterJsonModelType[] = JsonFileOperation.getFileObj(USER_INFO_MASTER_FILE_PATH);

        // json形式からUserInfoMasterModelに変換する
        const parsedUserInfoMasterList = jsonUserInfoMasterList.map((e: UserInfoMasterJsonModelType) => {
            return this.parseUserInfoMaster(e);
        });

        return parsedUserInfoMasterList;
    }


    /**
     * json形式からUserInfoMasterModelに変換する
     * @param jsonUserInfoMaster 
     * @returns 
     */
    private parseUserInfoMaster(jsonUserInfoMaster: UserInfoMasterJsonModelType): UserInfoMasterModel {

        const userIdModel = UserIdModel.reConstruct(jsonUserInfoMaster.userId);
        const userNameModel = new UserNameModel(jsonUserInfoMaster.userName);
        const userBirthdayModel = new UserBirthdayModel(jsonUserInfoMaster.userBirthDay);
        const createDate = CreateDateModel.reConstruct(jsonUserInfoMaster.createDate, `ユーザーマスタ`);
        const updateDate = UpdateDateModel.reConstruct(jsonUserInfoMaster.updateDate, `ユーザーマスタ`);
        const deleteFlgModel = new DeleteFlgModel(jsonUserInfoMaster.deleteFlg);

        return new UserInfoMasterModel(
            userIdModel,
            userNameModel,
            userBirthdayModel,
            createDate,
            updateDate,
            deleteFlgModel
        );
    }


    /**
     * UserInfoMasterModelからjson形式に変換する
     * @param userInfoMaster 
     * @returns 
     */
    private parseJsonUserInfoMaster(userInfoMaster: UserInfoMasterModel): UserInfoMasterJsonModelType {

        // jsonファイル登録用の型に変換する
        const jsonUserInfoMaster: UserInfoMasterJsonModelType = {
            userId: userInfoMaster.userId,
            userName: userInfoMaster.userName,
            userBirthDay: userInfoMaster.userBirthDay,
            createDate: userInfoMaster.createDate,
            updateDate: userInfoMaster.updateDate,
            deleteFlg: userInfoMaster.deleteFlg,
        };

        return jsonUserInfoMaster;
    }


    /**
     * UserInfoMasterCreateModelからUserInfoMasterModelに変換する
     * @param userInfoMasterCreateModel 
     * @returns 
     */
    private parseCreateUserInfoMaster(userInfoMasterCreateModel: UserInfoMasterCreateModel): UserInfoMasterModel {

        const userIdModel = userInfoMasterCreateModel.userIdModel;
        const userNameModel = userInfoMasterCreateModel.userNameModel;
        const userBirthdayModel = userInfoMasterCreateModel.userBirthDayModel;
        const createDate = userInfoMasterCreateModel.createDateModel;
        const updateDate = userInfoMasterCreateModel.updateDateModel;
        const deleteFlgModel = userInfoMasterCreateModel.deleteFlgModel;

        return new UserInfoMasterModel(
            userIdModel,
            userNameModel,
            userBirthdayModel,
            createDate,
            updateDate,
            deleteFlgModel
        );
    }


    /**
     * 未削除のユーザーデータを取得
     * @returns 
     */
    public getActiveUserInfoMaster(userInfoMasterList: UserInfoMasterModel[]) {

        // 未削除のユーザーを取得
        const activeUserInfoMasterList = userInfoMasterList.filter((e: UserInfoMasterModel) => {

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
    public createUserInfoMasterCreateBody(userId: UserIdModel, userName: UserNameModel, userBirthDay: UserBirthdayModel) {

        return new UserInfoMasterCreateModel(userId, userName, userBirthDay);
    }


    /**
     * ユーザーマスタに対する書き込み用データの作成
     * @param userInfoMasterCreateModel 
     */
    public createUserInfoMasterWriteData(
        userInfoMasterList: UserInfoMasterModel[],
        userInfoMasterCreateModel: UserInfoMasterCreateModel): UserInfoMasterModel[] {

        const createUserInfoMaster: UserInfoMasterModel = this.parseCreateUserInfoMaster(userInfoMasterCreateModel);

        // ユーザーを追加する
        userInfoMasterList = [...userInfoMasterList, createUserInfoMaster];

        return userInfoMasterList;
    }


    /**
     * ユーザーマスタファイルにデータを書き込む
     * @param userInfoMasterList 
     */
    public overWriteUserInfoMaster(userInfoMasterList: UserInfoMasterModel[]) {

        // json形式に変換する
        const jsonUserInfoMasterList = userInfoMasterList.map((e: UserInfoMasterModel) => {

            return this.parseJsonUserInfoMaster(e);
        })

        try {

            JsonFileOperation.overWriteJsonFileData(USER_INFO_MASTER_FILE_PATH, jsonUserInfoMasterList);
        } catch (err) {

            throw Error(`ユーザーマスタファイルのデータ書き込み処理中にエラーが発生しました。ERROR:${err}`);
        }
    }
}