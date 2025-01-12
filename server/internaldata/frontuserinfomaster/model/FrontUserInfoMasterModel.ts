import { CreateDateModel } from "./CreateDateModel";
import { DeleteFlgModel } from "./DeleteFlgModel";
import { UpdateDateModel } from "./FrontUpdateDateModel";
import { FrontUserIdModel } from "./FrontUserIdModel";
import { FrontUserNameModel } from "./FrontUserNameModel";
import { FrontUserBirthdayModel } from "./UserBirthdayModel";


/**
 * ユーザーマスタデータ
 */
export class FrontUserInfoMasterModel {

    // ユーザーID
    private readonly _userIdModel: FrontUserIdModel;
    // ユーザー名
    private readonly _userNameModel: FrontUserNameModel;
    // ユーザー誕生日
    private readonly _userBirthDayModel: FrontUserBirthdayModel;
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

        this._userIdModel = userId;
        this._userNameModel = userName;
        this._userBirthDayModel = userBirthDay;
        this._createDateModel = createDate;
        this._updateDateModel = updateDate;
        this._deleteFlgModel = deleteFlg;
    }

    public get userIdModel() {
        return this._userIdModel;
    }

    public get userNameModel() {
        return this._userNameModel;
    }

    public get userBirthDayModel() {
        return this._userBirthDayModel;
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

    public get userId() {
        return this._userIdModel.userId;
    }

    public get userName() {
        return this._userNameModel.userName;
    }

    public get userBirthDay() {
        return this._userBirthDayModel.userBirthDay;
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