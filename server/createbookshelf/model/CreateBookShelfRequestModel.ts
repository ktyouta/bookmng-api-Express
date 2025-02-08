import { BookIdModel } from "../../internaldata/bookinfomaster/properties/BookIdModel";
import { FrontUserBirthdayModel } from "../../internaldata/frontuserinfomaster/properties/FrontUserBirthdayModel";
import { FrontUserNameModel } from "../../internaldata/frontuserinfomaster/properties/FrontUserNameModel";
import { FrontUserPasswordModel } from "../../internaldata/frontuserinfomaster/properties/FrontUserPasswordModel";
import { CreateBookShelfRequestType } from "./CreateBookShelfRequestType";

export class CreateBookShelfRequestModel {

    private readonly _bookIdModel: BookIdModel;


    constructor(createBookShelfBody: CreateBookShelfRequestType) {

        this._bookIdModel = BookIdModel.reConstruct(createBookShelfBody.bookId);
    }

    public get bookIdModel() {
        return this._bookIdModel;
    }

}