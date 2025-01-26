import { FLG } from "../../../util/const/CommonConst";
import { CreateDateModel } from "../../common/model/CreateDateModel";
import { DeleteFlgModel } from "../../common/model/DeleteFlgModel";
import { UpdateDateModel } from "../../common/model/UpdateDateModel";
import { AccessDateModel } from "../properties/AccessDateModel";
import { KeywordModel } from "../properties/KeywordModel";


export class GoogleBooksApiAccessHistoryInsertEntity {

    // Google Books Api検索キーワード
    private readonly _keywordModel: KeywordModel;
    // Google Books Apiアクセス日付
    private readonly _accessDateModel: AccessDateModel;
    // データ作成日
    private readonly _createDateModel: CreateDateModel = CreateDateModel.create(`Google Books Apiアクセス情報`);
    // データ更新日
    private readonly _updateDateModel: UpdateDateModel = UpdateDateModel.create(`Google Books Apiアクセス情報`);


    constructor(keyword: KeywordModel, accessDate: AccessDateModel) {

        this._keywordModel = keyword;
        this._accessDateModel = accessDate;
    }

    public get keywordModel() {
        return this._keywordModel;
    }

    public get accessDateModel() {
        return this._accessDateModel;
    }

    public get createDateModel() {
        return this._createDateModel;
    }

    public get updateDateModel() {
        return this._updateDateModel;
    }

    public get keyword() {
        return this._keywordModel.keyword;
    }

    public get accessDate() {
        return this._accessDateModel.accessDate;
    }

    public get createDate() {
        return this._createDateModel.createDate;
    }

    public get updateDate() {
        return this._updateDateModel.updateDate;
    }

}