import { BookIdModel } from "../../internaldata/bookinfomaster/properties/BookIdModel";
import { TitleModel } from "../../internaldata/bookinfomaster/properties/TitleModel";
import { ReadStatusModel } from "../../internaldata/bookshelf/properties/ReadStatusModel";
import { DeleteFlgModel } from "../../internaldata/common/model/DeleteFlgModel";
import { UpdateDateModel } from "../../internaldata/common/model/UpdateDateModel";
import { FrontUserBirthdayModel } from "../../internaldata/frontuserinfomaster/properties/FrontUserBirthdayModel";
import { FrontUserIdModel } from "../../internaldata/frontuserinfomaster/properties/FrontUserIdModel";
import { FrontUserNameModel } from "../../internaldata/frontuserinfomaster/properties/FrontUserNameModel";
import { FLG } from "../../util/const/CommonConst";



export class SearchBookShelfDetailSelectEntity {

    // ユーザーID
    private readonly _frontUserIdModel: FrontUserIdModel;
    // 読書状況
    private readonly _bookIdModel: BookIdModel;


    constructor(frontUserIdModel: FrontUserIdModel,
        bookIdModel: BookIdModel
    ) {

        this._frontUserIdModel = frontUserIdModel;
        this._bookIdModel = bookIdModel;
    }

    get frontUserIdModel() {
        return this._frontUserIdModel;
    }

    get bookIdModel() {
        return this._bookIdModel;
    }

    get frontUserId() {
        return this._frontUserIdModel.frontUserId;
    }

    get bookId() {
        return this._bookIdModel.bookId;
    }

}