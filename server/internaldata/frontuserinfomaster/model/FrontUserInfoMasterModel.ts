import { CreateDateModel } from "./CreateDateModel";
import { DeleteFlgModel } from "./DeleteFlgModel";
import { UpdateDateModel } from "./UpdateDateModel";
import { FrontUserIdModel } from "./FrontUserIdModel";
import { FrontUserNameModel } from "./FrontUserNameModel";
import { FrontUserBirthdayModel } from "./FrontUserBirthdayModel";


/**
 * ユーザーマスタデータ
 */
export class FrontUserInfoMasterModel {

    // ユーザーID
    private readonly _frontUserIdModel: FrontUserIdModel;
    // ユーザー名
    private readonly _frontUserNameModel: FrontUserNameModel;
    // ユーザー誕生日
    private readonly _frontUserBirthDayModel: FrontUserBirthdayModel;
    // データ作成日
    private readonly _createDateModel: CreateDateModel;
    // データ更新日
    private readonly _updateDateModel: UpdateDateModel;
    // 削除フラグ
    private readonly _deleteFlgModel: DeleteFlgModel;


    constructor(userId: FrontUserIdModel,
        userName: FrontUserNameModel,
        userBirthDay: FrontUserBirthdayModel,
        createDate: CreateDateModel,
        updateDate: UpdateDateModel,
        deleteFlg: DeleteFlgModel
    ) {

        this._frontUserIdModel = userId;
        this._frontUserNameModel = userName;
        this._frontUserBirthDayModel = userBirthDay;
        this._createDateModel = createDate;
        this._updateDateModel = updateDate;
        this._deleteFlgModel = deleteFlg;
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

    public get createDateModel() {
        return this._createDateModel;
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

    public get createDate() {
        return this._createDateModel.createDate;
    }

    public get updateDate() {
        return this._updateDateModel.updateDate;
    }

    public get deleteFlg() {
        return this._deleteFlgModel.deleteFlg;
    }
}