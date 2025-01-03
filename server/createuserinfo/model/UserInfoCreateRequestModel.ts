import { UserBirthdayModel } from "../../internaldata/userinfomaster/model/UserBirthDayModel";
import { UserNameModel } from "../../internaldata/userinfomaster/model/UserNameModel";
import { UserInfoCreateRequestType } from "./UserInfoCreateRequestType";

export class UserInfoCreateRequestModel {

    private _userNameModel: UserNameModel;
    private _userBidthdayModel: UserBirthdayModel;


    constructor(userInfoCreateBody: UserInfoCreateRequestType) {

        this._userNameModel = new UserNameModel(userInfoCreateBody.userName);
        this._userBidthdayModel = new UserBirthdayModel(userInfoCreateBody.userBirthday);
    }


    public get userNameModel() {
        return this._userNameModel;
    }

    public get userBirthdayModel() {
        return this._userBidthdayModel;
    }
}