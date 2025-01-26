import { AuthorIdModel } from "../../internaldata/authorsinfomaster/properties/AuthorIdMode";
import { BookIdModel } from "../../internaldata/bookinfomaster/properties/BookIdModel";
import { PublishedDateModel } from "../../internaldata/bookinfomaster/properties/PublishedDateModel";
import { TitleModel } from "../../internaldata/bookinfomaster/properties/TitleModel";
import { DeleteFlgModel } from "../../internaldata/common/model/DeleteFlgModel";
import { UpdateDateModel } from "../../internaldata/common/model/UpdateDateModel";
import { FrontUserBirthdayModel } from "../../internaldata/frontuserinfomaster/properties/FrontUserBirthdayModel";
import { FrontUserIdModel } from "../../internaldata/frontuserinfomaster/properties/FrontUserIdModel";
import { FrontUserNameModel } from "../../internaldata/frontuserinfomaster/properties/FrontUserNameModel";
import { FLG } from "../../util/const/CommonConst";



export class CreateBookInfoBookAuthrosSelectEntity {

    // 書籍タイトル
    private readonly _titleModel: TitleModel;
    // 発売日
    private readonly _publishedDateModel: PublishedDateModel;
    // 著者ID
    private readonly _authorIdModelList: ReadonlyArray<AuthorIdModel>;
    // 書籍情報削除フラグ
    private readonly _bookInfoDeleteFlgModel: DeleteFlgModel;
    // 書籍著者情報削除フラグ
    private readonly _bookAuthordeleteFlgModel: DeleteFlgModel;

    constructor(titleModel: TitleModel,
        publishedDateModel: PublishedDateModel,
        authorIdModelList: AuthorIdModel[],
        bookInfoDeleteFlgModel: DeleteFlgModel,
        bookAuthordeleteFlgModel: DeleteFlgModel) {

        this._titleModel = titleModel;
        this._publishedDateModel = publishedDateModel;
        this._authorIdModelList = authorIdModelList;
        this._bookInfoDeleteFlgModel = bookInfoDeleteFlgModel;
        this._bookAuthordeleteFlgModel = bookAuthordeleteFlgModel;
    }


    public get titleModel() {
        return this._titleModel;
    }

    public get publishedDateModel() {
        return this._publishedDateModel;
    }

    public get authorIdModelList() {
        return this._authorIdModelList;
    }

    public get title() {
        return this._titleModel.title;
    }

    public get publishedDate() {
        return this._publishedDateModel.publishedDate;
    }

    public get bookInfoDeleteFlg() {
        return this._bookInfoDeleteFlgModel.deleteFlg;
    }

    public get bookAuthordeleteFlg() {
        return this._bookAuthordeleteFlgModel.deleteFlg;
    }
}