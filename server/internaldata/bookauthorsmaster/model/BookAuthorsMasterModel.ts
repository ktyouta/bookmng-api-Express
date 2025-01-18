import { FLG } from "../../../util/const/CommonConst";
import { AuthorIdModel } from "../../authorsinfomaster/model/AuthorIdMode";
import { BookIdModel } from "../../bookinfomaster/model/BookIdModel";
import { CreateDateModel } from "../../common/model/CreateDateModel";
import { DeleteFlgModel } from "../../common/model/DeleteFlgModel";
import { UpdateDateModel } from "../../common/model/UpdateDateModel";


/**
 * 書籍著者情報マスタデータ
 */
export class BookAuthorsMasterModel {

    // 書籍ID
    private readonly _bookIdModel: BookIdModel;
    // 著者ID
    private readonly _authorIdModel: AuthorIdModel;
    // データ作成日
    private readonly _createDateModel: CreateDateModel;
    // データ更新日
    private readonly _updateDateModel: UpdateDateModel;
    // 削除フラグ
    private readonly _deleteFlgModel: DeleteFlgModel;


    constructor(bookId: BookIdModel, authorId: AuthorIdModel, createDate: CreateDateModel,
        updateDate: UpdateDateModel, deleteFlg: DeleteFlgModel) {

        this._bookIdModel = bookId;
        this._authorIdModel = authorId;
        this._createDateModel = createDate;
        this._updateDateModel = updateDate;
        this._deleteFlgModel = deleteFlg;
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

    public get bookId() {
        return this._bookIdModel.bookId;
    }

    public get authorId() {
        return this._authorIdModel.authorId;
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