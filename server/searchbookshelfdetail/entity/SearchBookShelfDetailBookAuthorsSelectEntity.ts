import { BookIdModel } from "../../internaldata/bookinfomaster/properties/BookIdModel";
import { TitleModel } from "../../internaldata/bookinfomaster/properties/TitleModel";
import { ReadStatusModel } from "../../internaldata/bookshelf/properties/ReadStatusModel";
import { DeleteFlgModel } from "../../internaldata/common/model/DeleteFlgModel";
import { UpdateDateModel } from "../../internaldata/common/model/UpdateDateModel";
import { FrontUserBirthdayModel } from "../../internaldata/frontuserinfomaster/properties/FrontUserBirthdayModel";
import { FrontUserIdModel } from "../../internaldata/frontuserinfomaster/properties/FrontUserIdModel";
import { FrontUserNameModel } from "../../internaldata/frontuserinfomaster/properties/FrontUserNameModel";
import { FLG } from "../../util/const/CommonConst";



export class SearchBookShelfDetailBookAuthorsSelectEntity {

    // 書籍ID
    private readonly _bookIdModel: BookIdModel;


    constructor(bookIdModel: BookIdModel) {

        this._bookIdModel = bookIdModel;
    }

    get bookIdModel() {
        return this._bookIdModel;
    }

    get bookId() {
        return this._bookIdModel.bookId;
    }
}