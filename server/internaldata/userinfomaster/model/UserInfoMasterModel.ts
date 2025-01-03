import { FLG } from "../../../util/const/CommonConst";
import { CreateDateModel } from "../../common/model/CreateDateModel";
import { DeleteFlgModel } from "../../common/model/DeleteFlgModel";
import { UpdateDateModel } from "../../common/model/UpdateDateModel";
import { UserBirthdayModel } from "./UserBirthDayModel";
import { UserIdModel } from "./UserIdModel";
import { UserNameModel } from "./UserNameModel";


/**
 * ユーザーマスタデータ
 */
export class UserInfoMasterModel {

    // ユーザーID
    private readonly _userId: UserIdModel;
    // ユーザー名
    private readonly _userName: UserNameModel;
    // ユーザー誕生日
    private readonly _userBirthDay: UserBirthdayModel;
    // データ作成日
    private readonly _createDate: CreateDateModel = new CreateDateModel(`ユーザーマスタ`);
    // データ更新日
    private readonly _updateDate: UpdateDateModel = new UpdateDateModel(`ユーザーマスタ`);
    // 削除フラグ
    private readonly _deleteFlg: DeleteFlgModel = new DeleteFlgModel(FLG.OFF);


    constructor(userId: UserIdModel, userName: UserNameModel, userBirthDay: UserBirthdayModel) {

        this._userId = userId;
        this._userName = userName;
        this._userBirthDay = userBirthDay;
    }

    public get userId() {
        return this._userId;
    }

    public get userName() {
        return this._userName;
    }

    public get userBirthDay() {
        return this._userBirthDay;
    }

    public get createDate() {
        return this._createDate;
    }

    public get updateDate() {
        return this._updateDate;
    }

    public get deleteFlg() {
        return this._deleteFlg;
    }
}