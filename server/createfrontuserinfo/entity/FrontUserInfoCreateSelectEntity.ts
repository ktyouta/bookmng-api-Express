import { DeleteFlgModel } from "../../internaldata/common/model/DeleteFlgModel";
import { UpdateDateModel } from "../../internaldata/common/model/UpdateDateModel";
import { FrontUserBirthdayModel } from "../../internaldata/frontuserinfomaster/properties/FrontUserBirthdayModel";
import { FrontUserIdModel } from "../../internaldata/frontuserinfomaster/properties/FrontUserIdModel";
import { FrontUserNameModel } from "../../internaldata/frontuserinfomaster/properties/FrontUserNameModel";
import { FLG } from "../../util/const/CommonConst";



export class FrontUserInfoCreateSelectEntity {

    // ユーザー名
    private readonly _frontUserNameModel: FrontUserNameModel;

    constructor(userName: FrontUserNameModel) {

        this._frontUserNameModel = userName;
    }

    public get frontUserNameModel() {
        return this._frontUserNameModel;
    }

    public get frontUserName() {
        return this._frontUserNameModel.frontUserName;
    }


}