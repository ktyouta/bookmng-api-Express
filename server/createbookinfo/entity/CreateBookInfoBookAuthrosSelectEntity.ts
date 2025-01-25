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

    constructor(titleModel: TitleModel,
        publishedDateModel: PublishedDateModel,
        authorIdModelList: AuthorIdModel[]) {

        this._titleModel = titleModel;
        this._publishedDateModel = publishedDateModel;
        this._authorIdModelList = authorIdModelList;
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

}