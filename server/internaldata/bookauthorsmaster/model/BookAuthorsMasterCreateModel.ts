import { FLG } from "../../../util/const/CommonConst";
import { AuthorIdMode } from "../../authorsinfomaster/model/AuthorIdMode";
import { BookIdModel } from "../../bookinfomaster/model/BookIdModel";
import { CreateDateModel } from "../../common/model/CreateDateModel";
import { DeleteFlgModel } from "../../common/model/DeleteFlgModel";
import { UpdateDateModel } from "../../common/model/UpdateDateModel";


/**
 * 書籍著者情報マスタデータ追加用
 */
export class BookAuthorsMasterCreateModel {

    // 書籍ID
    private bookId: BookIdModel;
    // 著者ID
    private authorId: string;
    // データ作成日
    private createDate: CreateDateModel = new CreateDateModel(`書籍著者情報マスタ`);
    // データ更新日
    private updateDate: UpdateDateModel = new UpdateDateModel(`書籍著者情報マスタ`);
    // 削除フラグ
    private deleteFlg: DeleteFlgModel = new DeleteFlgModel(FLG.OFF);


    constructor(bookId: BookIdModel, authorId: string) {

        this.bookId = bookId;
        this.authorId = authorId;
    }

    public getBookId() {
        return this.bookId;
    }

    public getAuthorId() {
        return this.authorId;
    }

    public getCreateDate() {
        return this.createDate;
    }

    public getUpdateDate() {
        return this.updateDate;
    }

    public getDeleteFlg() {
        return this.deleteFlg;
    }
}