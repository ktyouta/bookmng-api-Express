import { FLG } from "../../../util/const/CommonConst";
import { AuthorIdModel } from "../../authorsinfomaster/properties/AuthorIdMode";
import { CreateDateModel } from "../../common/model/CreateDateModel";
import { DeleteFlgModel } from "../../common/model/DeleteFlgModel";
import { UpdateDateModel } from "../../common/model/UpdateDateModel";
import { GoogleBooksApiIdModel } from "../../googlebooksapiinfocache/properties/GoogleBooksApiIdModel";
import { SmallThumbnailModel } from "../properties/SmallThumbnailModel";


export class GoogleBooksApiSmallThumbnailCacheInsertEntity {

    // Google Books Apiの書籍ID
    private readonly _bookIdModel: GoogleBooksApiIdModel;
    // Google Books Apiのサムネイル(小)
    private readonly _smallThumbnailModel: SmallThumbnailModel;
    // データ作成日
    private readonly _createDate: CreateDateModel = CreateDateModel.create(`Google Books Apiサムネイル(小)キャッシュ情報`);
    // データ更新日
    private readonly _updateDate: UpdateDateModel = UpdateDateModel.create(`Google Books Apiサムネイル(小)キャッシュ情報`);


    constructor(bookIdModel: GoogleBooksApiIdModel,
        smallThumbnailModel: SmallThumbnailModel,
    ) {
        this._bookIdModel = bookIdModel;
        this._smallThumbnailModel = smallThumbnailModel;
    }

    public get bookId() {
        return this._bookIdModel.bookId;
    }


    public get smallThumbnail() {
        return this._smallThumbnailModel.smallThumbnail;
    }


    public get createDate() {
        return this._createDate.createDate;
    }

    public get updateDate() {
        return this._updateDate.updateDate;
    }

}