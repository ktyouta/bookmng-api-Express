import { FLG } from "../../../util/const/CommonConst";
import { CreateDateModel } from "../../common/model/CreateDateModel";
import { DeleteFlgModel } from "../../common/model/DeleteFlgModel";
import { UpdateDateModel } from "../../common/model/UpdateDateModel";
import { AuthorBirthDayModel } from "./AuthorBirthDayModel";
import { AuthorIdModel } from "./AuthorIdMode";
import { AuthorNameModel } from "./AuthorNameModel";

export class AuthorsMasterCreateModel {

    // 著者ID
    private readonly _authorIdModel: AuthorIdModel;
    // 著者名
    private readonly _authorNameModel: AuthorNameModel;
    // データ作成日
    private readonly _createDateModel: CreateDateModel = CreateDateModel.create(`著者情報マスタ`);
    // データ更新日
    private readonly _updateDateModel: UpdateDateModel = UpdateDateModel.create(`著者情報マスタ`);
    // 削除フラグ
    private readonly _deleteFlgModel: DeleteFlgModel = new DeleteFlgModel(FLG.OFF);


    constructor(authorId: AuthorIdModel, authorName: AuthorNameModel, authorBirthDay: AuthorBirthDayModel) {

        this._authorIdModel = authorId;
        this._authorNameModel = authorName;
    }


    public get authorIdModel() {
        return this._authorIdModel;
    }

    public get authorNameModel() {
        return this._authorNameModel;
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
}