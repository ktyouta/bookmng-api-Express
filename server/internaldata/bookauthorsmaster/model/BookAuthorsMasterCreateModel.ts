import { FLG } from "../../../util/const/CommonConst";
import { AuthorIdModel } from "../../authorsinfomaster/model/AuthorIdMode";
import { BookIdModel } from "../../bookinfomaster/model/BookIdModel";
import { CreateDateModel } from "../../common/model/CreateDateModel";
import { DeleteFlgModel } from "../../common/model/DeleteFlgModel";
import { UpdateDateModel } from "../../common/model/UpdateDateModel";


/**
 * 書籍著者情報マスタデータ追加用
 */
export class BookAuthorsMasterCreateModel {

    // 書籍ID
    private readonly _bookId: BookIdModel;
    // 著者ID
    private readonly _authorId: string;
    // データ作成日
    private readonly _createDate: CreateDateModel = new CreateDateModel(`書籍著者情報マスタ`);
    // データ更新日
    private readonly _updateDate: UpdateDateModel = new UpdateDateModel(`書籍著者情報マスタ`);
    // 削除フラグ
    private readonly _deleteFlg: DeleteFlgModel = new DeleteFlgModel(FLG.OFF);


    constructor(bookId: BookIdModel, authorId: string) {

        this._bookId = bookId;
        this._authorId = authorId;
    }

    public get bookId() {
        return this._bookId;
    }

    public get authorId() {
        return this._authorId;
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