import { FLG } from "../../../util/const/CommonConst";
import { AuthorIdModel } from "../../authorsinfomaster/properties/AuthorIdMode";
import { BookIdModel } from "../../bookinfomaster/properties/BookIdModel";
import { CreateDateModel } from "../../common/model/CreateDateModel";
import { DeleteFlgModel } from "../../common/model/DeleteFlgModel";
import { UpdateDateModel } from "../../common/model/UpdateDateModel";


/**
 * 書籍著者情報マスタデータ追加用
 */
export class BookAuthorsMasterCreateModel {

    // 書籍ID
    private readonly _bookIdModel: BookIdModel;
    // 著者ID
    private readonly _authorIdModel: AuthorIdModel;
    // データ作成日
    private readonly _createDateModel: CreateDateModel = CreateDateModel.create(`書籍著者情報マスタ`);
    // データ更新日
    private readonly _updateDateModel: UpdateDateModel = UpdateDateModel.create(`書籍著者情報マスタ`);
    // 削除フラグ
    private readonly _deleteFlgModel: DeleteFlgModel = new DeleteFlgModel(FLG.OFF);


    constructor(bookId: BookIdModel, authorId: AuthorIdModel) {

        this._bookIdModel = bookId;
        this._authorIdModel = authorId;
    }

    public get bookIdModel() {
        return this._bookIdModel;
    }

    public get authorIdModel() {
        return this._authorIdModel;
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