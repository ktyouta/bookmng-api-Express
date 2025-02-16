import { GoogleBooksApiIdModel } from "../../internaldata/googlebooksapiinfocache/properties/GoogleBooksApiIdModel";


export class SearchBooksShelfListGoogleThumbnailCacheSelectModel {

    // Google Books Apiの書籍ID
    private readonly _bookId: GoogleBooksApiIdModel;

    constructor(bookId: GoogleBooksApiIdModel) {

        this._bookId = bookId;
    }

    public get bookId() {
        return this._bookId.bookId;
    }

}