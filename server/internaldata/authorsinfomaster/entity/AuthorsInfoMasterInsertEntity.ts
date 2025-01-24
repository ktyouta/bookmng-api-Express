import { FLG } from "../../../util/const/CommonConst";
import { CreateDateModel } from "../../common/model/CreateDateModel";
import { DeleteFlgModel } from "../../common/model/DeleteFlgModel";
import { UpdateDateModel } from "../../common/model/UpdateDateModel";
import { AuthorBirthDayModel } from "../properties/AuthorBirthDayModel";
import { AuthorIdModel } from "../properties/AuthorIdMode";
import { AuthorNameModel } from "../properties/AuthorNameModel";


export class AuthorsInfoMasterInsertEntity {

    // 著者ID
    private readonly _authorIdModel: AuthorIdModel;
    // 著者名
    private readonly _authorNameModel: AuthorNameModel;
    // 著者生年月日
    private readonly _authorBirthDayModel: AuthorBirthDayModel;
    // データ作成日
    private readonly _createDateModel: CreateDateModel = CreateDateModel.create(`著者情報マスタ`);
    // データ更新日
    private readonly _updateDateModel: UpdateDateModel = UpdateDateModel.create(`著者情報マスタ`);
    // 削除フラグ
    private readonly _deleteFlgModel: DeleteFlgModel = new DeleteFlgModel(FLG.OFF);


    constructor(authorId: AuthorIdModel,
        authorName: AuthorNameModel,
        authorBirthDayModel: AuthorBirthDayModel
    ) {

        this._authorIdModel = authorId;
        this._authorNameModel = authorName;
        this._authorBirthDayModel = authorBirthDayModel;
    }

    public get authorIdModel() {
        return this._authorIdModel;
    }

    public get authorNameModel() {
        return this._authorNameModel;
    }

    public get authorBirthDayModel() {
        return this._authorBirthDayModel;
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
        return this.authorIdModel.authorId;
    }

    public get authorName() {
        return this.authorNameModel.authorName;
    }

    public get authorBirthDay() {
        return this._authorBirthDayModel.authorBirthDay;
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