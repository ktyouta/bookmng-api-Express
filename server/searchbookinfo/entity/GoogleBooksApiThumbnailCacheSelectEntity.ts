import { KeywordModel } from "../../internaldata/googlebooksapiaccesshistory/properties/KeywordModel";
import { GoogleBooksApiIdModel } from "../../internaldata/googlebooksapiinfocache/properties/GoogleBooksApiIdModel";

export class GoogleBooksApiThumbnailCacheSelectEntity {

    private _googleBooksApiIdModel: GoogleBooksApiIdModel;

    constructor(googleBooksApiIdModel: GoogleBooksApiIdModel) {

        this._googleBooksApiIdModel = googleBooksApiIdModel;
    }

    get bookId() {
        return this._googleBooksApiIdModel.bookId;
    }
}