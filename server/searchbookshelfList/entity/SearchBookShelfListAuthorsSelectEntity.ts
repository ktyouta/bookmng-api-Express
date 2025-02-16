import { AuthorIdModel } from "../../internaldata/authorsinfomaster/properties/AuthorIdMode";
import { BookIdModel } from "../../internaldata/bookinfomaster/properties/BookIdModel";
import { TitleModel } from "../../internaldata/bookinfomaster/properties/TitleModel";
import { ReadStatusModel } from "../../internaldata/bookshelf/properties/ReadStatusModel";
import { DeleteFlgModel } from "../../internaldata/common/model/DeleteFlgModel";
import { UpdateDateModel } from "../../internaldata/common/model/UpdateDateModel";
import { FrontUserBirthdayModel } from "../../internaldata/frontuserinfomaster/properties/FrontUserBirthdayModel";
import { FrontUserIdModel } from "../../internaldata/frontuserinfomaster/properties/FrontUserIdModel";
import { FrontUserNameModel } from "../../internaldata/frontuserinfomaster/properties/FrontUserNameModel";
import { FLG } from "../../util/const/CommonConst";



export class SearchBookShelfListAuthorsSelectEntity {

    // 著者ID
    private readonly _authorIdModel: AuthorIdModel;


    constructor(authorIdModel: AuthorIdModel) {

        this._authorIdModel = authorIdModel;
    }

    get authorIdModel() {
        return this._authorIdModel;
    }

    get authorId() {
        return this._authorIdModel.authorId;
    }

}