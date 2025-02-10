import { BookIdModel } from "../../internaldata/bookinfomaster/properties/BookIdModel";
import { ThoughtsModel } from "../../internaldata/bookshelf/properties/ThoughtsModel";
import { UpdateBookShelfRequestType } from "./UpdateBookShelfRequestType";

export class UpdateBookShelfRequestModel {

    // 書籍ID
    private readonly _bookIdModel: BookIdModel;
    // 感想
    private readonly _thoughtsModel: ThoughtsModel;


    constructor(UpdateBookShelfBody: UpdateBookShelfRequestType) {

        this._bookIdModel = BookIdModel.reConstruct(UpdateBookShelfBody.bookId);
        this._thoughtsModel = new ThoughtsModel(UpdateBookShelfBody.thoughts);
    }

    public get bookIdModel() {
        return this._bookIdModel;
    }

    public get thoughtsModel() {
        return this._thoughtsModel;
    }

}