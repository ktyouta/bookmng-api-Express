import { FrontUserBirthdayModel } from "../../internaldata/frontuserinfomaster/model/UserBirthdayModel";
import { FrontUserNameModel } from "../../internaldata/frontuserinfomaster/model/FrontUserNameModel";
import { FrontUserInfoCreateRequestType } from "./FrontUserInfoCreateRequestType";

export class FrontUserInfoCreateRequestModel {

    private _userNameModel: FrontUserNameModel;
    private _userBidthdayModel: FrontUserBirthdayModel;


    constructor(userInfoCreateBody: FrontUserInfoCreateRequestType) {

        this._userNameModel = new FrontUserNameModel(userInfoCreateBody.userName);
        this._userBidthdayModel = new FrontUserBirthdayModel(userInfoCreateBody.userBirthday);
    }


    public get userNameModel() {
        return this._userNameModel;
    }

    public get userBirthdayModel() {
        return this._userBidthdayModel;
    }
}