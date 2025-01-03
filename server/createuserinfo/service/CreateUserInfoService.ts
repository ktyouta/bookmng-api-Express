import { UserBirthdayModel } from "../../internaldata/userinfomaster/model/UserBirthDayModel";
import { UserIdModel } from "../../internaldata/userinfomaster/model/UserIdModel";
import { UserInfoMasterCreateModel } from "../../internaldata/userinfomaster/model/UserInfoMasterCreateModel";
import { UserInfoMasterJsonModelType } from "../../internaldata/userinfomaster/model/UserInfoMasterJsonModelType";
import { UserNameModel } from "../../internaldata/userinfomaster/model/UserNameModel";
import { UserInfoMasterSerivce } from "../../internaldata/userinfomaster/service/UserInfoMasterSerivce";
import { UserInfoCreateRequestModelType } from "../model/UserInfoCreateRequestModelType";
import ENV from '../../env.json';


export class CreateUserInfoService {


    // ユーザー情報マスタ
    private userInfoMasterSerivce = new UserInfoMasterSerivce();


    /**
     * マスタからユーザー情報を取得する
     * @returns 
     */
    public getUserMasterInfo(): UserInfoMasterJsonModelType[] {

        const userInfoMasterList: UserInfoMasterJsonModelType[] = this.userInfoMasterSerivce.getUserInfoMaster();

        return userInfoMasterList;
    }


    /**
     * 未削除のユーザー情報データを取得
     * @returns 
     */
    public getActiveUserMasterInfo(userInfoMasterList: UserInfoMasterJsonModelType[]): UserInfoMasterJsonModelType[] {

        const activeUserInfoMasterList: UserInfoMasterJsonModelType[] = this.userInfoMasterSerivce.getActiveUserInfoMaster(userInfoMasterList);

        return activeUserInfoMasterList;
    }


    /**
     * ユーザー重複チェック
     * @param userNameModel 
     */
    public checkUserNameExists(activeUserMasterList: UserInfoMasterJsonModelType[], requestBody: UserInfoCreateRequestModelType): boolean {

        const userNameModel = new UserNameModel(requestBody.userName);

        const activeUserMaster = activeUserMasterList.find((e: UserInfoMasterJsonModelType) => {
            return e.userName === userNameModel.userName;
        });

        return !!activeUserMaster

    }


    /**
     * ユーザー登録用データの作成
     * @param title 
     * @param publishedDate 
     * @param description 
     * @returns 
     */
    public createUserInfoMasterCreateBody(userId: UserIdModel, requestBody: UserInfoCreateRequestModelType): UserInfoMasterCreateModel {

        const userNameModel = new UserNameModel(requestBody.userName);
        const userBirthday = new UserBirthdayModel(requestBody.userBirthday);

        return this.userInfoMasterSerivce.createUserInfoMasterCreateBody(
            userId, userNameModel, userBirthday);
    }


    /**
     * ユーザーマスタに対する書き込み用データの作成
     * @param bookInfoMasterCreateModel 
     */
    public createUserInfoMasterWriteData(
        bookInfoMasterList: UserInfoMasterJsonModelType[],
        bookInfoMasterCreateModel: UserInfoMasterCreateModel): UserInfoMasterJsonModelType[] {

        // ユーザーを追加する
        bookInfoMasterList = this.userInfoMasterSerivce.createUserInfoMasterWriteData(bookInfoMasterList, bookInfoMasterCreateModel);

        return bookInfoMasterList;
    }


    /**
     * ユーザーマスタファイルにデータを書き込む
     * @param bookInfoMasterList 
     */
    public overWriteUserInfoMaster(bookInfoMasterList: UserInfoMasterJsonModelType[]) {

        try {

            this.userInfoMasterSerivce.overWriteUserInfoMaster(bookInfoMasterList);
        } catch (err) {

            throw Error(`${err} endpoint:${ENV.CREATE_USER_INFO}`);
        }
    }

}