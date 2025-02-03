import { FLG } from "../../../util/const/CommonConst";
import { AuthorIdModel } from "../../authorsinfomaster/properties/AuthorIdMode";
import { CreateDateModel } from "../../common/model/CreateDateModel";
import { DeleteFlgModel } from "../../common/model/DeleteFlgModel";
import { UpdateDateModel } from "../../common/model/UpdateDateModel";
import { GoogleBooksApiIdModel } from "../../googlebooksapiinfocache/properties/GoogleBooksApiIdModel";
import { ThumbnailModel } from "../properties/ThumbnailModel";


export class GoogleBooksApiThumbnailCacheUpdateEntity {

    // Google Books Apiの書籍ID
    private readonly _bookIdModel: GoogleBooksApiIdModel;
    // Google Books Apiのサムネイル
    private readonly _thumbnailModel: ThumbnailModel;
    // データ更新日
    private readonly _updateDate: UpdateDateModel = UpdateDateModel.create(`Google Books Apiサムネイルキャッシュ情報`);


    constructor(bookIdModel: GoogleBooksApiIdModel,
        thumbnailModel: ThumbnailModel,
    ) {
        this._bookIdModel = bookIdModel;
        this._thumbnailModel = thumbnailModel;
    }

    public get bookId() {
        return this._bookIdModel.bookId;
    }

    public get smallThumbnail() {
        return this._thumbnailModel.thumbnail;
    }

    public get updateDate() {
        return this._updateDate.updateDate;
    }

}