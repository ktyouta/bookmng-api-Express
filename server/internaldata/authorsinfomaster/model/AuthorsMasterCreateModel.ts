import { FLG } from "../../../util/const/CommonConst";
import { CreateDateModel } from "../../common/model/CreateDateModel";
import { DeleteFlgModel } from "../../common/model/DeleteFlgModel";
import { UpdateDateModel } from "../../common/model/UpdateDateModel";
import { AuthorBirthDayModel } from "./AuthorBirthDayModel";
import { AuthorIdModel } from "./AuthorIdMode";
import { AuthorNameModel } from "./AuthorNameModel";

export class AuthorsMasterCreateModel {

    // 著者ID
    private readonly _authorId: AuthorIdModel;
    // 著者名
    private readonly _authorName: AuthorNameModel;
    // 生年月日
    private readonly _authorBirthDay: AuthorBirthDayModel;
    // データ作成日
    private readonly _createDate: CreateDateModel = new CreateDateModel(`著者情報マスタ`);
    // データ更新日
    private readonly _updateDate: UpdateDateModel = new UpdateDateModel(`著者情報マスタ`);
    // 削除フラグ
    private readonly _deleteFlg: DeleteFlgModel = new DeleteFlgModel(FLG.OFF);


    constructor(authorId: AuthorIdModel, authorName: AuthorNameModel, authorBirthDay: AuthorBirthDayModel) {

        this._authorId = authorId;
        this._authorName = authorName;
        this._authorBirthDay = authorBirthDay;
    }


    public get authorId() {
        return this._authorId;
    }

    public get authorName() {
        return this._authorName;
    }

    public get authorBirthDay() {
        return this._authorBirthDay;
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