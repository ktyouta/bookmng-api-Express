import { FLG } from "../../../util/const/CommonConst";
import { AuthorIdModel } from "../../authorsinfomaster/properties/AuthorIdMode";
import { CreateDateModel } from "../../common/model/CreateDateModel";
import { DeleteFlgModel } from "../../common/model/DeleteFlgModel";
import { UpdateDateModel } from "../../common/model/UpdateDateModel";
import { GoogleBooksApiIdModel } from "../../googlebooksapiinfocache/properties/GoogleBooksApiIdModel";
import { GoogleBooksApiAuthorNameModel } from "../properties/GoogleBooksApiAuthorNameModel";
import { GoogleBooksApiAuthorNoModel } from "../properties/GoogleBooksApiAuthorNoModel";


export class GoogleBooksApiAuthorsCacheDeleteEntity {

    // Google Books Apiの書籍ID
    private readonly _bookIdModel: GoogleBooksApiIdModel;


    constructor(bookIdModel: GoogleBooksApiIdModel,) {
        this._bookIdModel = bookIdModel;
    }

    public get bookId() {
        return this._bookIdModel.bookId;
    }

}