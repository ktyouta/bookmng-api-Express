import { BookIdModel } from "../../internaldata/bookinfomaster/properties/BookIdModel";
import { DeleteFlgModel } from "../../internaldata/common/model/DeleteFlgModel";
import { UpdateDateModel } from "../../internaldata/common/model/UpdateDateModel";
import { FrontUserBirthdayModel } from "../../internaldata/frontuserinfomaster/properties/FrontUserBirthdayModel";
import { FrontUserIdModel } from "../../internaldata/frontuserinfomaster/properties/FrontUserIdModel";
import { FrontUserNameModel } from "../../internaldata/frontuserinfomaster/properties/FrontUserNameModel";
import { FLG } from "../../util/const/CommonConst";



export class UpdateBookShelfSelectEntity {

    // 書籍ID
    private readonly _bookIdModel: BookIdModel;
    // ユーザーID
    private readonly _frontUserIdModel: FrontUserIdModel;

    constructor(frontUserIdModel: FrontUserIdModel, bookIdModel: BookIdModel) {

        this._bookIdModel = bookIdModel;
        this._frontUserIdModel = frontUserIdModel;
    }

    public get bookIdModel() {
        return this._bookIdModel;
    }

    public get bookId() {
        return this._bookIdModel.bookId;
    }

    public get frontUserIdModel() {
        return this._frontUserIdModel;
    }

    public get frontUserId() {
        return this._frontUserIdModel.frontUserId;
    }

}