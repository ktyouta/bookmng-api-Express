import { UserBirthdayModel } from "../../internaldata/userinfomaster/model/UserBirthDayModel";
import { UserIdModel } from "../../internaldata/userinfomaster/model/UserIdModel";
import { UserInfoMasterCreateModel } from "../../internaldata/userinfomaster/model/UserInfoMasterCreateModel";
import { UserInfoMasterJsonModelType } from "../../internaldata/userinfomaster/model/UserInfoMasterJsonModelType";
import { UserNameModel } from "../../internaldata/userinfomaster/model/UserNameModel";
import ENV from '../../env.json';
import { UserInfoMasterModel } from "../../internaldata/userinfomaster/model/UserInfoMasterModel";
import { UserInfoCreateRequestModel } from "../model/UserInfoCreateRequestModel";
import { UserInfoCreateRequestType } from "../model/UserInfoCreateRequestType";
import { UserInfoMasterListModel } from "../../internaldata/userinfomaster/model/UserInfoMasterListModel";
import { UserInfoMasterJsonListModel } from "../../internaldata/userinfomaster/model/UserInfoMasterJsonListModel";


export class CreateUserInfoService {



    /**
     * マスタからユーザー情報を取得する
     * @returns 
     */
    public getUserMasterInfo(): UserInfoMasterListModel {

        const userInfoMasterListModel: UserInfoMasterListModel = UserInfoMasterListModel.getUserInfoMasterList();

        return userInfoMasterListModel;
    }


    /**
     * 未削除のユーザー情報データを取得
     * @returns 
     */
    public getActiveUserMasterInfo(userInfoMasterListModel: UserInfoMasterListModel): UserInfoMasterListModel {

        const activeUserInfoMasterListModel: UserInfoMasterListModel = userInfoMasterListModel.getActiveUserInfoMaster();

        return activeUserInfoMasterListModel;
    }


    /**
     * UserInfoCreateRequestModelTypeからUserInfoCreateRequestModelに変換する
     * @param requestBody 
     */
    public parseRequestBody(requestBody: UserInfoCreateRequestType): UserInfoCreateRequestModel {

        return new UserInfoCreateRequestModel(requestBody);
    }

    /**
     * ユーザー重複チェック
     * @param userNameModel 
     */
    public checkUserNameExists(activeUserInfoMasterListModel: UserInfoMasterListModel, parsedRequestBody: UserInfoCreateRequestModel): boolean {

        const userNameModel: UserNameModel = parsedRequestBody.userNameModel;

        return activeUserInfoMasterListModel.checkUserNameExists(userNameModel);
    }


    /**
     * ユーザー登録用データの作成
     * @param title 
     * @param publishedDate 
     * @param description 
     * @returns 
     */
    public createUserInfoMasterCreateBody(userId: UserIdModel, parsedRequestBody: UserInfoCreateRequestModel): UserInfoMasterCreateModel {

        return new UserInfoMasterCreateModel(
            userId, parsedRequestBody.userNameModel, parsedRequestBody.userBirthdayModel);
    }


    /**
     * ユーザーマスタに対する書き込み用データの作成
     * @param userInfoMasterCreateModel 
     */
    public createUserInfoMasterWriteData(
        userInfoMasterListModel: UserInfoMasterListModel,
        userInfoMasterCreateModel: UserInfoMasterCreateModel): UserInfoMasterListModel {

        // ユーザーを追加する
        const userInfoMasterListWriteModel: UserInfoMasterListModel =
            userInfoMasterListModel.createUserInfoMasterWriteData(userInfoMasterCreateModel);

        return userInfoMasterListWriteModel;
    }


    /**
     * ユーザーマスタファイルにデータを書き込む
     * @param userInfoMasterList 
     */
    public overWriteUserInfoMaster(userInfoMasterListWriteModel: UserInfoMasterListModel) {

        // json用のモデルに変換する
        const userInfoMasterJsonListModel: UserInfoMasterJsonListModel = new UserInfoMasterJsonListModel(userInfoMasterListWriteModel);

        try {

            // ユーザーマスタファイルにデータを書き込む
            userInfoMasterJsonListModel.overWriteUserInfoMaster();
        } catch (err) {

            throw Error(`${err} endpoint:${ENV.CREATE_USER_INFO}`);
        }
    }

}