import { BookIdModel } from "../../internaldata/bookinfomaster/properties/BookIdModel";
import { TitleModel } from "../../internaldata/bookinfomaster/properties/TitleModel";
import { ReadStatusModel } from "../../internaldata/bookshelf/properties/ReadStatusModel";
import { DeleteFlgModel } from "../../internaldata/common/model/DeleteFlgModel";
import { UpdateDateModel } from "../../internaldata/common/model/UpdateDateModel";
import { FrontUserBirthdayModel } from "../../internaldata/frontuserinfomaster/properties/FrontUserBirthdayModel";
import { FrontUserIdModel } from "../../internaldata/frontuserinfomaster/properties/FrontUserIdModel";
import { FrontUserNameModel } from "../../internaldata/frontuserinfomaster/properties/FrontUserNameModel";
import { FLG } from "../../util/const/CommonConst";



export class SearchBookShelfListSelectEntity {

    // ユーザーID
    private readonly _frontUserIdModel: FrontUserIdModel;
    // 読書状況
    private readonly _readStatusModel: ReadStatusModel;
    // タイトル
    private readonly _titleModel: TitleModel;


    constructor(frontUserIdModel: FrontUserIdModel,
        readStatusModel: ReadStatusModel,
        titleModel: TitleModel
    ) {

        this._frontUserIdModel = frontUserIdModel;
        this._readStatusModel = readStatusModel;
        this._titleModel = titleModel;
    }

    get frontUserIdModel() {
        return this._frontUserIdModel;
    }

    get readStatusModel() {
        return this._readStatusModel;
    }

    get titleModel() {
        return this._frontUserIdModel;
    }

    get frontUserId() {
        return this._frontUserIdModel.frontUserId;
    }

    get readStatus() {
        return this._readStatusModel.readStatus;
    }

    get title() {
        return this._titleModel.title;
    }
}