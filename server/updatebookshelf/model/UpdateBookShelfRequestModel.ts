import { BookIdModel } from "../../internaldata/bookinfomaster/properties/BookIdModel";
import { ReadStatusModel } from "../../internaldata/bookshelf/properties/ReadStatusModel";
import { ThoughtsModel } from "../../internaldata/bookshelf/properties/ThoughtsModel";
import { UpdateBookShelfRequestType } from "./UpdateBookShelfRequestType";

export class UpdateBookShelfRequestModel {

    // 書籍ID
    private readonly _bookIdModel: BookIdModel;
    // 感想
    private readonly _thoughtsModel: ThoughtsModel;
    // 読書状況
    private readonly _readStatusModel: ReadStatusModel;


    constructor(bookIdModel: BookIdModel,
        UpdateBookShelfBody: UpdateBookShelfRequestType) {

        this._bookIdModel = bookIdModel;
        this._thoughtsModel = new ThoughtsModel(UpdateBookShelfBody.thoughts);
        this._readStatusModel = new ReadStatusModel(UpdateBookShelfBody.readStatus);
    }

    public get bookIdModel() {
        return this._bookIdModel;
    }

    public get thoughtsModel() {
        return this._thoughtsModel;
    }

    public get readStatusModel() {
        return this._readStatusModel;
    }
}