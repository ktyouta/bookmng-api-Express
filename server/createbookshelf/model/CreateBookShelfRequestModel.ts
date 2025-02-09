import { BookIdModel } from "../../internaldata/bookinfomaster/properties/BookIdModel";
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