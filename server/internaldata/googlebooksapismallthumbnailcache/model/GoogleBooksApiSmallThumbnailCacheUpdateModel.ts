import { CreateDateModel } from "../../common/model/CreateDateModel";
import { UpdateDateModel } from "../../common/model/UpdateDateModel";
import { GoogleBooksApiIdModel } from "../../googlebooksapiinfocache/model/GoogleBooksApiIdModel";
import { SmallThumbnailModel } from "./SmallThumbnailModel";


export class GoogleBooksApiSmallThumbnailCacheUpdateModel {

    // Google Books Apiの書籍ID
    private readonly _bookId: GoogleBooksApiIdModel;
    // Google Books Apiのサムネイル(小)
    private readonly _smallThumbnail: SmallThumbnailModel;
    private readonly _updateDate: UpdateDateModel = UpdateDateModel.create(`Google Books Apiサムネイル(小)キャッシュ情報`);

    constructor(bookId: GoogleBooksApiIdModel, smallThumbnail: SmallThumbnailModel) {

        this._bookId = bookId;
        this._smallThumbnail = smallThumbnail;
    }

    public get bookId() {
        return this._bookId;
    }

    public get smallThumbnail() {
        return this._smallThumbnail;
    }

    public get updateDate() {
        return this._updateDate;
    }
}