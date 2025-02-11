import { DeleteFlgModel } from "../../internaldata/common/model/DeleteFlgModel";
import { UpdateDateModel } from "../../internaldata/common/model/UpdateDateModel";
import { FrontUserBirthdayModel } from "../../internaldata/frontuserinfomaster/properties/FrontUserBirthdayModel";
import { FrontUserIdModel } from "../../internaldata/frontuserinfomaster/properties/FrontUserIdModel";
import { FrontUserNameModel } from "../../internaldata/frontuserinfomaster/properties/FrontUserNameModel";
import { AccessDateModel } from "../../internaldata/googlebooksapiaccesshistory/properties/AccessDateModel";
import { KeywordModel } from "../../internaldata/googlebooksapiaccesshistory/properties/KeywordModel";
import { FLG } from "../../util/const/CommonConst";



export class SearchBookInfoGoogleBooksApiAccessHistorySelectEntity {

    // Google Books Api検索キーワード
    private readonly _keywordModel: KeywordModel;
    // Google Books Apiアクセス日付
    private readonly _accessDateModel: AccessDateModel;

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

    public get keyword() {
        return this._keywordModel.keyword;
    }

    public get accessDate() {
        return this._accessDateModel.accessDate;
    }

}