import { FLG } from "../../../util/const/CommonConst";
import { AuthorIdModel } from "../../authorsinfomaster/properties/AuthorIdMode";
import { CreateDateModel } from "../../common/model/CreateDateModel";
import { DeleteFlgModel } from "../../common/model/DeleteFlgModel";
import { UpdateDateModel } from "../../common/model/UpdateDateModel";
import { GoogleBooksApiIdModel } from "../../googlebooksapiinfocache/properties/GoogleBooksApiIdModel";
import { GoogleBooksApiDescriptionModel } from "../properties/GoogleBooksApiDescriptionModel";
import { GoogleBooksApiPublishedDateModel } from "../properties/GoogleBooksApiPublishedDateModel";
import { GoogleBooksApiTitleModel } from "../properties/GoogleBooksApiTitleModel";


export class GoogleBooksApiInfoCacheUpdateEntity {

    // Google Books Apiの書籍ID
    private readonly _bookIdModel: GoogleBooksApiIdModel;
    // Google Books Apiの書籍タイトル
    private readonly _titleModel: GoogleBooksApiTitleModel;
    // Google Books Apiの書籍発売日
    private readonly _publishedDateModel: GoogleBooksApiPublishedDateModel;
    // Google Books Apiの書籍説明
    private readonly _descriptionModel: GoogleBooksApiDescriptionModel;
    // データ更新日
    private readonly _updateDate: UpdateDateModel = UpdateDateModel.create(`Google Books Api書籍キャッシュ情報`);


    constructor(bookIdModel: GoogleBooksApiIdModel,
        titleModel: GoogleBooksApiTitleModel,
        publishedDateModel: GoogleBooksApiPublishedDateModel,
        descriptionModel: GoogleBooksApiDescriptionModel,
    ) {
        this._bookIdModel = bookIdModel;
        this._titleModel = titleModel;
        this._publishedDateModel = publishedDateModel;
        this._descriptionModel = descriptionModel;
    }

    public get bookId() {
        return this._bookIdModel.bookId;
    }


    public get title() {
        return this._titleModel.title;
    }


    public get publishedDate() {
        return this._publishedDateModel.publishedDate;
    }

    public get descriptionModel() {
        return this._descriptionModel.description;
    }

}