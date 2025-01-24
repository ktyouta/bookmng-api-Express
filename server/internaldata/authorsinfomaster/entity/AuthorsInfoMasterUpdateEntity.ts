import { FLG } from "../../../util/const/CommonConst";
import { CreateDateModel } from "../../common/model/CreateDateModel";
import { DeleteFlgModel } from "../../common/model/DeleteFlgModel";
import { UpdateDateModel } from "../../common/model/UpdateDateModel";
import { AuthorIdModel } from "../properties/AuthorIdMode";
import { AuthorNameModel } from "../properties/AuthorNameModel";


export class AuthorsInfoMasterUpdateEntity {

    // 著者ID
    private readonly _authorIdModel: AuthorIdModel;
    // 著者名
    private readonly _authorNameModel: AuthorNameModel;
    // データ更新日
    private readonly _updateDateModel: UpdateDateModel = UpdateDateModel.create(`著者情報マスタ`);
    // 削除フラグ
    private readonly _deleteFlgModel: DeleteFlgModel = new DeleteFlgModel(FLG.OFF);


    constructor(authorId: AuthorIdModel,
        authorName: AuthorNameModel,
    ) {
        this._authorIdModel = authorId;
        this._authorNameModel = authorName;
    }

    public get authorIdModel() {
        return this._authorIdModel;
    }

    public get authorNameModel() {
        return this._authorNameModel;
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

    public get updateDate() {
        return this._updateDateModel.updateDate;
    }

    public get deleteFlg() {
        return this._deleteFlgModel.deleteFlg;
    }

}