import { FLG } from "../../../util/const/CommonConst";
import { CreateDateModel } from "../../common/model/CreateDateModel";
import { DeleteFlgModel } from "../../common/model/DeleteFlgModel";
import { UpdateDateModel } from "../../common/model/UpdateDateModel";
import { FrontUserInfoMasterJsonModelType } from "../model/FrontUserInfoMasterJsonModelType";
import { FrontUserBirthdayModel } from "../properties/FrontUserBirthdayModel";
import { FrontUserIdModel } from "../properties/FrontUserIdModel";
import { FrontUserNameModel } from "../properties/FrontUserNameModel";


export class FrontUserInfoMasterUpdateEntity {

    // ユーザーID
    private readonly _frontUserIdModel: FrontUserIdModel;
    // ユーザー名
    private readonly _frontUserNameModel: FrontUserNameModel;
    // ユーザー生年月日
    private readonly _frontUserBirthDayModel: FrontUserBirthdayModel;
    // データ更新日
    private readonly _updateDateModel: UpdateDateModel = UpdateDateModel.create(`ユーザーマスタ`);
    // 削除フラグ
    private readonly _deleteFlgModel: DeleteFlgModel = new DeleteFlgModel(FLG.OFF);


    constructor(userId: FrontUserIdModel,
        userName: FrontUserNameModel,
        userBirthDay: FrontUserBirthdayModel,
    ) {

        this._frontUserIdModel = userId;
        this._frontUserNameModel = userName;
        this._frontUserBirthDayModel = userBirthDay;
    }

    public get frontUserIdModel() {
        return this._frontUserIdModel;
    }

    public get frontUserNameModel() {
        return this._frontUserNameModel;
    }

    public get frontUserBirthDayModel() {
        return this._frontUserBirthDayModel;
    }

    public get updateDateModel() {
        return this._updateDateModel;
    }

    public get deleteFlgModel() {
        return this._deleteFlgModel;
    }

    public get frontUserId() {
        return this._frontUserIdModel.frontUserId;
    }

    public get frontUserName() {
        return this._frontUserNameModel.frontUserName;
    }

    public get frontUserBirthDay() {
        return this._frontUserBirthDayModel.frontUserBirthDay;
    }

    public get updateDate() {
        return this._updateDateModel.updateDate;
    }

    public get deleteFlg() {
        return this._deleteFlgModel.deleteFlg;
    }

}