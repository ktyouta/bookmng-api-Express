import { CreateDateModel } from "../../common/model/CreateDateModel";
import { UpdateDateModel } from "../../common/model/UpdateDateModel";
import { GoogleBooksApiDescriptionModel } from "../properties/GoogleBooksApiDescriptionModel";
import { GoogleBooksApiIdModel } from "../properties/GoogleBooksApiIdModel";
import { GoogleBooksApiPublishedDateModel } from "../properties/GoogleBooksApiPublishedDateModel";
import { GoogleBooksApiTitleModel } from "../properties/GoogleBooksApiTitleModel";


// jsonファイルのGoogle Books Api の書籍キャッシュ更新情報
export class GoogleBooksApiInfoCacheUpdateModel {

    // Google Books Apiの書籍ID
    private readonly _bookId: GoogleBooksApiIdModel;
    // Google Books Apiの書籍タイトル
    private readonly _title: GoogleBooksApiTitleModel;
    // Google Books Apiの書籍発売日
    private readonly _publishedDate: GoogleBooksApiPublishedDateModel;
    // Google Books Apiの書籍説明
    private readonly _description: GoogleBooksApiDescriptionModel;
    private readonly _updateDate: UpdateDateModel = UpdateDateModel.create(`Google Books Api書籍キャッシュ情報`);


    constructor(bookId: GoogleBooksApiIdModel, title: GoogleBooksApiTitleModel,
        publishedDate: GoogleBooksApiPublishedDateModel, description: GoogleBooksApiDescriptionModel) {

        this._bookId = bookId;
        this._title = title;
        this._publishedDate = publishedDate;
        this._description = description;
    }

    public get bookId() {
        return this._bookId;
    }

    public get title() {
        return this._title;
    }

    public get publishedDate() {
        return this._publishedDate;
    }

    public get description() {
        return this._description;
    }

    public get updateDate() {
        return this._updateDate;
    }
}