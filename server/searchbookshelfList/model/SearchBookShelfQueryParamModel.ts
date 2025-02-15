import { TitleModel } from "../../internaldata/bookinfomaster/properties/TitleModel";
import { ReadStatusModel } from "../../internaldata/bookshelf/properties/ReadStatusModel";

export class SearchBookShelfQueryParamModel {

    // 読書状況
    private readonly _readStatusModel: ReadStatusModel;
    // タイトル
    private readonly _titleModel: TitleModel;


    constructor(readStatusModel: ReadStatusModel,
        titleModel: TitleModel
    ) {

        this._readStatusModel = readStatusModel;
        this._titleModel = titleModel;
    }

    get readStatusModel() {
        return this._readStatusModel;
    }

    get titleModel() {
        return this._titleModel;
    }
}