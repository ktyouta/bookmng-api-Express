import { FrontUserBirthdayModel } from "../../internaldata/frontuserinfomaster/properties/FrontUserBirthdayModel";
import { FrontUserNameModel } from "../../internaldata/frontuserinfomaster/properties/FrontUserNameModel";
import { FrontUserInfoCreateRequestType } from "./FrontUserInfoCreateRequestType";

export class FrontUserInfoCreateRequestModel {

    private _frontUserNameModel: FrontUserNameModel;
    private _frontUserBidthdayModel: FrontUserBirthdayModel;


    constructor(userInfoCreateBody: FrontUserInfoCreateRequestType) {

        this._frontUserNameModel = new FrontUserNameModel(userInfoCreateBody.userName);
        this._frontUserBidthdayModel = new FrontUserBirthdayModel(userInfoCreateBody.userBirthday);
    }


    public get frontUserNameModel() {
        return this._frontUserNameModel;
    }

    public get frontUserBirthdayModel() {
        return this._frontUserBidthdayModel;
    }
}