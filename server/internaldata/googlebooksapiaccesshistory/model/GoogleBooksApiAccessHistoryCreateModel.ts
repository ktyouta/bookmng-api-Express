import { CreateDateModel } from "../../common/model/CreateDateModel";
import { UpdateDateModel } from "../../common/model/UpdateDateModel";
import { AccessDateModel } from "./AccessDateModel";
import { KeywordModel } from "./KeywordModel";


export class GoogleBooksApiAccessHistoryCreateModel {

    // Google Books Api検索キーワード
    private readonly _keyword: KeywordModel;
    // Google Books Apiアクセス日付
    private readonly _accessDate: AccessDateModel;
    // データ作成日
    private readonly _createDate: CreateDateModel = CreateDateModel.create(`Google Books Apiアクセス情報`);
    // データ更新日
    private readonly _updateDate: UpdateDateModel = UpdateDateModel.create(`Google Books Apiアクセス情報`);


    constructor(keyword: KeywordModel, accessDate: AccessDateModel) {

        this._keyword = keyword;
        this._accessDate = accessDate;
    }

    public get keyword() {
        return this._keyword;
    }

    public get accessDate() {
        return this._accessDate;
    }

    public get createDate() {
        return this._createDate;
    }

    public get updateDate() {
        return this._updateDate;
    }
}