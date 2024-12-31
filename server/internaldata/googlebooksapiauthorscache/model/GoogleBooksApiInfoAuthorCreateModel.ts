import { CreateDateModel } from "../../common/model/CreateDateModel";
import { UpdateDateModel } from "../../common/model/UpdateDateModel";
import { GoogleBooksApiIdModel } from "../../googlebooksapiinfocache/model/GoogleBooksApiIdModel";
import { GoogleBooksApiAuthorNameModel } from "./GoogleBooksApiAuthorNameModel";
import { GoogleBooksApiAuthorNoModel } from "./GoogleBooksApiAuthorNoModel";


export class GoogleBooksApiInfoAuthorCreateModel {

    // Google Books Apiの書籍ID
    private readonly _bookId: GoogleBooksApiIdModel;
    // Google Books Apiの行番号
    private readonly _authorNo: GoogleBooksApiAuthorNoModel;
    // Google Books Apiの著者
    private readonly _authorName: GoogleBooksApiAuthorNameModel;
    private readonly _createDate: CreateDateModel = new CreateDateModel(`Google Books Api書籍キャッシュ情報`);
    private readonly _updateDate: UpdateDateModel = new UpdateDateModel(`Google Books Api書籍キャッシュ情報`);


    constructor(bookId: GoogleBooksApiIdModel, authorNo: GoogleBooksApiAuthorNoModel,
        authorName: GoogleBooksApiAuthorNameModel) {

        this._bookId = bookId;
        this._authorNo = authorNo;
        this._authorName = authorName;
    }

    public get bookId() {
        return this._bookId;
    }

    public get authorNo() {
        return this._authorNo;
    }

    public get authorName() {
        return this._authorName;
    }

    public get createDate() {
        return this._createDate;
    }

    public get updateDate() {
        return this._updateDate;
    }
}