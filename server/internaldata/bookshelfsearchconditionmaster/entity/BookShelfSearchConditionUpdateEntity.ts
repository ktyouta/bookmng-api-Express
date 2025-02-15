import { FLG } from "../../../util/const/CommonConst";
import { BookIdModel } from "../../bookinfomaster/properties/BookIdModel";
import { CreateDateModel } from "../../common/model/CreateDateModel";
import { DeleteFlgModel } from "../../common/model/DeleteFlgModel";
import { UpdateDateModel } from "../../common/model/UpdateDateModel";
import { FrontUserIdModel } from "../../frontuserinfomaster/properties/FrontUserIdModel";
import { BookShelfSearchConditionIdModel } from "../properties/BookShelfSearchConditionIdModel";
import { BookShelfSearchConditionNameModel } from "../properties/BookShelfSearchConditionNameModel";


export class BookShelfSearchConditionUpdateEntity {

    // 本棚検索条件ID
    private readonly _bookShelfSearchConditionIdModel: BookShelfSearchConditionIdModel;
    // 本棚検索条件名称
    private readonly _bookShelfSearchConditionNameModel: BookShelfSearchConditionNameModel;
    // データ更新日
    private readonly _updateDateModel: UpdateDateModel = UpdateDateModel.create(`本棚検索条件`);
    // 削除フラグ
    private readonly _deleteFlgModel: DeleteFlgModel = new DeleteFlgModel(FLG.OFF);


    constructor(bookShelfSearchConditionIdModel: BookShelfSearchConditionIdModel,
        bookShelfSearchConditionNameModel: BookShelfSearchConditionNameModel
    ) {

        this._bookShelfSearchConditionIdModel = bookShelfSearchConditionIdModel;
        this._bookShelfSearchConditionNameModel = bookShelfSearchConditionNameModel;
    }

    public get bookShelfSearchConditionIdModel() {
        return this._bookShelfSearchConditionIdModel;
    }

    public get bookShelfSearchConditionNameModel() {
        return this._bookShelfSearchConditionNameModel;
    }

    public get updateDateModel() {
        return this._updateDateModel;
    }

    public get deleteFlgModel() {
        return this._deleteFlgModel;
    }

    public get bookShelfSearchConditionId() {
        return this._bookShelfSearchConditionIdModel.bookShelfSearchConditionId;
    }

    public get bookShelfSearchConditionName() {
        return this._bookShelfSearchConditionNameModel.bookShelfSearchConditionName;
    }

    public get updateDate() {
        return this._updateDateModel.updateDate;
    }

    public get deleteFlg() {
        return this._deleteFlgModel.deleteFlg;
    }

}