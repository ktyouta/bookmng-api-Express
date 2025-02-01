import { FLG } from "../../../util/const/CommonConst";
import { AuthorIdModel } from "../../authorsinfomaster/properties/AuthorIdMode";
import { CreateDateModel } from "../../common/model/CreateDateModel";
import { DeleteFlgModel } from "../../common/model/DeleteFlgModel";
import { UpdateDateModel } from "../../common/model/UpdateDateModel";
import { GoogleBooksApiIdModel } from "../../googlebooksapiinfocache/properties/GoogleBooksApiIdModel";
import { GoogleBooksApiAuthorNoModel } from "../properties/GoogleBooksApiAuthorNoModel";
import { GoogleBooksApiAuthorNameModel } from "../properties/GoogleBooksApiAuthorNameModel";


export class GoogleBooksApiAuthorsCacheInsertEntity {

    // Google Books Apiの書籍ID
    private readonly _bookIdModel: GoogleBooksApiIdModel;
    // Google Books Apiの行番号
    private readonly _authorNoModel: GoogleBooksApiAuthorNoModel;
    // Google Books Apiの著者
    private readonly _authorNameModel: GoogleBooksApiAuthorNameModel;
    // データ作成日
    private readonly _createDate: CreateDateModel = CreateDateModel.create(`Google Books Api書籍キャッシュ情報`);
    // データ更新日
    private readonly _updateDate: UpdateDateModel = UpdateDateModel.create(`Google Books Api書籍キャッシュ情報`);


    constructor(bookIdModel: GoogleBooksApiIdModel,
        authorNoModel: GoogleBooksApiAuthorNoModel,
        authorNameModel: GoogleBooksApiAuthorNameModel,
    ) {
        this._bookIdModel = bookIdModel;
        this._authorNoModel = authorNoModel;
        this._authorNameModel = authorNameModel;
    }

    public get bookId() {
        return this._bookIdModel.bookId;
    }


    public get authorNo() {
        return this._authorNoModel.authorNo;
    }


    public get authorName() {
        return this._authorNameModel.authorName;
    }


    public get createDate() {
        return this._createDate.createDate;
    }

    public get updateDate() {
        return this._updateDate.updateDate;
    }

}