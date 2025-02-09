import { FLG } from "../../../util/const/CommonConst";
import { CreateDateModel } from "../../common/model/CreateDateModel";
import { DeleteFlgModel } from "../../common/model/DeleteFlgModel";
import { UpdateDateModel } from "../../common/model/UpdateDateModel";
import { FrontUserIdModel } from "../../frontuserinfomaster/properties/FrontUserIdModel";
import { FrontUserPasswordModel } from "../properties/FrontUserPasswordModel";


export class FrontUserLoginMasterUpdateEntity {

    // ユーザーID
    private readonly _frontUserIdModel: FrontUserIdModel;
    // パスワード
    private readonly _frontUserPasswordModel: FrontUserPasswordModel;
    // データ更新日
    private readonly _updateDateModel: UpdateDateModel = UpdateDateModel.create(`フロントユーザーログインマスタ`);
    // 削除フラグ
    private readonly _deleteFlgModel: DeleteFlgModel = new DeleteFlgModel(FLG.OFF);


    constructor(userId: FrontUserIdModel,
        frontUserPasswordModel: FrontUserPasswordModel,
    ) {

        this._frontUserIdModel = userId;
        this._frontUserPasswordModel = frontUserPasswordModel;
    }

    public get frontUserIdModel() {
        return this._frontUserIdModel;
    }

    public get frontUserPasswordModel() {
        return this._frontUserPasswordModel;
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

    public get frontUserPassword() {
        return this._frontUserPasswordModel.frontUserPassword;
    }

    public get updateDate() {
        return this._updateDateModel.updateDate;
    }

    public get deleteFlg() {
        return this._deleteFlgModel.deleteFlg;
    }

}