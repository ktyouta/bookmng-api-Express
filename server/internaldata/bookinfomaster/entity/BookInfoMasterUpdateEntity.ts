import { FLG } from "../../../util/const/CommonConst";
import { AuthorIdModel } from "../../authorsinfomaster/properties/AuthorIdMode";
import { BookIdModel } from "../properties/BookIdModel";
import { CreateDateModel } from "../../common/model/CreateDateModel";
import { DeleteFlgModel } from "../../common/model/DeleteFlgModel";
import { UpdateDateModel } from "../../common/model/UpdateDateModel";


export class BookInfoMasterUpdateEntity {

    // 書籍ID
    private readonly _bookIdModel: BookIdModel;
    // 著者ID
    private readonly _authorIdModel: AuthorIdModel;
    // データ更新日
    private readonly _updateDateModel: UpdateDateModel = UpdateDateModel.create(`書籍情報マスタ`);
    // 削除フラグ
    private readonly _deleteFlgModel: DeleteFlgModel = new DeleteFlgModel(FLG.OFF);


    constructor(bookIdModel: BookIdModel,
        authorIdModel: AuthorIdModel,
    ) {
        this._bookIdModel = bookIdModel;
        this._authorIdModel = authorIdModel;
    }

    public get bookIdModel() {
        return this._bookIdModel;
    }

    public get authorIdModel() {
        return this._authorIdModel;
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

    public get bookId() {
        return this._bookIdModel.bookId;
    }

    public get updateDate() {
        return this._updateDateModel.updateDate;
    }

    public get deleteFlg() {
        return this._deleteFlgModel.deleteFlg;
    }

}