import { GoogleBooksApiIdModel } from "../../internaldata/googlebooksapiinfocache/properties/GoogleBooksApiIdModel";


export class SearchBooksShelfListGoogleAuthorsCacheSelectEntity {

    // Google Books Apiの書籍ID
    private readonly _bookIdModel: GoogleBooksApiIdModel;


    constructor(bookIdModel: GoogleBooksApiIdModel) {
        this._bookIdModel = bookIdModel;
    }

    public get bookId() {
        return this._bookIdModel.bookId;
    }

}