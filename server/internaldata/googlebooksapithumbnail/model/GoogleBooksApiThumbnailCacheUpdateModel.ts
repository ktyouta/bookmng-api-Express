import { CreateDateModel } from "../../common/model/CreateDateModel";
import { UpdateDateModel } from "../../common/model/UpdateDateModel";
import { GoogleBooksApiIdModel } from "../../googlebooksapiinfocache/properties/GoogleBooksApiIdModel";
import { ThumbnailModel } from "./ThumbnailModel";


export class GoogleBooksApiThumbnailCacheUpdateModel {

    // Google Books Apiの書籍ID
    private readonly _bookId: GoogleBooksApiIdModel;
    // Google Books Apiのサムネイル
    private readonly _thumbnail: ThumbnailModel;
    private readonly _updateDate: UpdateDateModel = UpdateDateModel.create(`Google Books Apiサムネイルキャッシュ情報`);

    constructor(bookId: GoogleBooksApiIdModel, thumbnail: ThumbnailModel) {

        this._bookId = bookId;
        this._thumbnail = thumbnail;
    }

    public get bookId() {
        return this._bookId;
    }

    public get thumbnail() {
        return this._thumbnail;
    }

    public get updateDate() {
        return this._updateDate;
    }
}