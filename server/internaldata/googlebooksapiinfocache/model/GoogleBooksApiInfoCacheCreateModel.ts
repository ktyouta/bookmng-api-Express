import { CreateDateModel } from "../../common/model/CreateDateModel";
import { UpdateDateModel } from "../../common/model/UpdateDateModel";
import { GoogleBooksApiDescriptionModel } from "./GoogleBooksApiDescriptionModel";
import { GoogleBooksApiIdModel } from "./GoogleBooksApiIdModel";
import { GoogleBooksApiPublishedDateModel } from "./GoogleBooksApiPublishedDateModel";
import { GoogleBooksApiTitleModel } from "./GoogleBooksApiTitleModel";

// jsonファイルのGoogle Books Api の書籍キャッシュ情報
export class GoogleBooksApiInfoCacheCreateModel {

    // Google Books Apiの書籍ID
    private readonly _bookId: GoogleBooksApiIdModel;
    // Google Books Apiの書籍タイトル
    private readonly _title: GoogleBooksApiTitleModel;
    // Google Books Apiの書籍発売日
    private readonly _publishedDate: GoogleBooksApiPublishedDateModel;
    // Google Books Apiの書籍説明
    private readonly _description: GoogleBooksApiDescriptionModel;
    private readonly _createDate: CreateDateModel = new CreateDateModel(`Google Books Api書籍キャッシュ情報`);
    private readonly _updateDate: UpdateDateModel = new UpdateDateModel(`Google Books Api書籍キャッシュ情報`);


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

    public get createDate() {
        return this._createDate;
    }

    public get updateDate() {
        return this._updateDate;
    }
}