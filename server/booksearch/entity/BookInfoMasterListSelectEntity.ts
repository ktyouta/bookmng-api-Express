import { KeywordModel } from "../../internaldata/googlebooksapiaccesshistory/properties/KeywordModel";

export class BookInfoMasterListSelectEntity {

    private _keywrodModel: KeywordModel;

    constructor(keywrodModel: KeywordModel) {

        this._keywrodModel = keywrodModel;
    }

    get keyword() {
        return this._keywrodModel.keyword;
    }
}