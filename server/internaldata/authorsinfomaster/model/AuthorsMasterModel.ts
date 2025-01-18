import { FLG } from "../../../util/const/CommonConst";
import { CreateDateModel } from "../../common/model/CreateDateModel";
import { DeleteFlgModel } from "../../common/model/DeleteFlgModel";
import { UpdateDateModel } from "../../common/model/UpdateDateModel";
import { AuthorBirthDayModel } from "./AuthorBirthDayModel";
import { AuthorIdModel } from "./AuthorIdMode";
import { AuthorNameModel } from "./AuthorNameModel";


export class AuthorsMasterModel {

    // 著者ID
    private readonly _authorIdModel: AuthorIdModel;
    // 著者名
    private readonly _authorNameModel: AuthorNameModel;
    // データ作成日
    private readonly _createDateModel: CreateDateModel;
    // データ更新日
    private readonly _updateDateModel: UpdateDateModel;
    // 削除フラグ
    private readonly _deleteFlgModel: DeleteFlgModel;


    constructor(authorIdModel: AuthorIdModel, authorNameModel: AuthorNameModel,
        createDateModel: CreateDateModel, updateDateModel: UpdateDateModel, deleteFlgModel: DeleteFlgModel
    ) {

        this._authorIdModel = authorIdModel;
        this._authorNameModel = authorNameModel;
        this._createDateModel = createDateModel;
        this._updateDateModel = updateDateModel;
        this._deleteFlgModel = deleteFlgModel;
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

    public get authorId() {
        return this._authorIdModel.authorId;
    }

    public get authorName() {
        return this._authorNameModel.authorName;
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