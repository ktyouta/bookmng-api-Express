import { CreateDateModel } from "../../common/model/CreateDateModel";
import { UpdateDateModel } from "../../common/model/UpdateDateModel";
import { GoogleBooksApiIdModel } from "../../googlebooksapiinfocache/properties/GoogleBooksApiIdModel";
import { SmallThumbnailModel } from "../properties/SmallThumbnailModel";
import { ThumbnailModel } from "../properties/ThumbnailModel";


export class GoogleBooksApiThumbnailCacheUpdateModel {

    // Google Books Apiの書籍ID
    private readonly _bookId: GoogleBooksApiIdModel;
    // Google Books Apiのサムネイル
    private readonly _thumbnail: ThumbnailModel;
    // Google Books Apiのサムネイル(小)
    private readonly _smallThumbnail: SmallThumbnailModel;
    private readonly _updateDate: UpdateDateModel = UpdateDateModel.create(`Google Books Apiサムネイルキャッシュ情報`);

    constructor(bookId: GoogleBooksApiIdModel,
        thumbnail: ThumbnailModel,
        smallThumbnail: SmallThumbnailModel) {

        this._bookId = bookId;
        this._thumbnail = thumbnail;
        this._smallThumbnail = smallThumbnail;
    }

    public get bookId() {
        return this._bookId;
    }

    public get thumbnail() {
        return this._thumbnail;
    }

    public get smallThumbnail() {
        return this._smallThumbnail;
    }

    public get updateDate() {
        return this._updateDate;
    }
}