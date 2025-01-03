import { UserInfoModelType } from "../../internaldata/userinfomaster/model/UserInfoModelType";
import { UserNameModel } from "../../internaldata/userinfomaster/model/UserNameModel";
import { UserInfoMasterSerivce } from "../../internaldata/userinfomaster/service/UserInfoMasterSerivce";

export class CreateUserInfoService {


    // ユーザー情報マスタ
    private userInfoMasterSerivce = new UserInfoMasterSerivce();


    /**
     * マスタからユーザー情報を取得する
     * @returns 
     */
    public getUserMasterInfo(): UserInfoModelType[] {

        const userInfoMasterList: UserInfoModelType[] = this.userInfoMasterSerivce.getUserInfoMaster();

        return userInfoMasterList;
    }


    /**
     * 未削除のユーザー情報データを取得
     * @returns 
     */
    public getActiveUserMasterInfo(userInfoMasterList: UserInfoModelType[]): UserInfoModelType[] {

        const activeUserInfoMasterList: UserInfoModelType[] = this.userInfoMasterSerivce.getActiveUserInfoMaster(userInfoMasterList);

        return activeUserInfoMasterList;
    }


    /**
     * ユーザー重複チェック
     * @param userNameModel 
     */
    public checkUserNameExists(activeUserMasterList: UserInfoModelType[], userNameModel: UserNameModel): boolean {

        const activeUserMaster = activeUserMasterList.find((e: UserInfoModelType) => {
            return e.userName === userNameModel.userName;
        });

        return !!activeUserMaster

    }

}