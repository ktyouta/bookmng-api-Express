import { UserBirthdayModel } from "../../internaldata/userinfomaster/model/UserBirthDayModel";
import { UserIdModel } from "../../internaldata/userinfomaster/model/UserIdModel";
import { UserInfoMasterCreateModel } from "../../internaldata/userinfomaster/model/UserInfoMasterCreateModel";
import { UserInfoMasterJsonModelType } from "../../internaldata/userinfomaster/model/UserInfoMasterJsonModelType";
import { UserNameModel } from "../../internaldata/userinfomaster/model/UserNameModel";
import { UserInfoMasterSerivce } from "../../internaldata/userinfomaster/service/UserInfoMasterSerivce";
import ENV from '../../env.json';
import { UserInfoMasterModel } from "../../internaldata/userinfomaster/model/UserInfoMasterModel";
import { UserInfoCreateRequestModel } from "../model/UserInfoCreateRequestModel";
import { UserInfoCreateRequestType } from "../model/UserInfoCreateRequestType";


export class CreateUserInfoService {


    // ユーザー情報マスタ
    private userInfoMasterSerivce = new UserInfoMasterSerivce();


    /**
     * マスタからユーザー情報を取得する
     * @returns 
     */
    public getUserMasterInfo(): UserInfoMasterModel[] {

        const userInfoMasterList: UserInfoMasterModel[] = this.userInfoMasterSerivce.getUserInfoMaster();

        return userInfoMasterList;
    }


    /**
     * 未削除のユーザー情報データを取得
     * @returns 
     */
    public getActiveUserMasterInfo(userInfoMasterList: UserInfoMasterModel[]): UserInfoMasterModel[] {

        const activeUserInfoMasterList: UserInfoMasterModel[] = this.userInfoMasterSerivce.getActiveUserInfoMaster(userInfoMasterList);

        return activeUserInfoMasterList;
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
    public checkUserNameExists(activeUserMasterList: UserInfoMasterModel[], parsedRequestBody: UserInfoCreateRequestModel): boolean {

        const userNameModel: UserNameModel = parsedRequestBody.userNameModel;

        const activeUserMaster = activeUserMasterList.find((e: UserInfoMasterModel) => {
            return e.userNameModel.checkUsernameDuplicate(userNameModel);
        });

        return !!activeUserMaster;
    }


    /**
     * ユーザー登録用データの作成
     * @param title 
     * @param publishedDate 
     * @param description 
     * @returns 
     */
    public createUserInfoMasterCreateBody(userId: UserIdModel, parsedRequestBody: UserInfoCreateRequestModel): UserInfoMasterCreateModel {

        return this.userInfoMasterSerivce.createUserInfoMasterCreateBody(
            userId, parsedRequestBody.userNameModel, parsedRequestBody.userBirthdayModel);
    }


    /**
     * ユーザーマスタに対する書き込み用データの作成
     * @param userInfoMasterCreateModel 
     */
    public createUserInfoMasterWriteData(
        userInfoMasterList: UserInfoMasterModel[],
        userInfoMasterCreateModel: UserInfoMasterCreateModel): UserInfoMasterModel[] {

        // ユーザーを追加する
        userInfoMasterList = this.userInfoMasterSerivce.createUserInfoMasterWriteData(userInfoMasterList, userInfoMasterCreateModel);

        return userInfoMasterList;
    }


    /**
     * ユーザーマスタファイルにデータを書き込む
     * @param userInfoMasterList 
     */
    public overWriteUserInfoMaster(userInfoMasterList: UserInfoMasterModel[]) {

        try {

            this.userInfoMasterSerivce.overWriteUserInfoMaster(userInfoMasterList);
        } catch (err) {

            throw Error(`${err} endpoint:${ENV.CREATE_USER_INFO}`);
        }
    }

}