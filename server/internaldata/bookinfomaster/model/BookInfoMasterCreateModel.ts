import { FLG } from "../../../util/const/CommonConst";
import { CreateDateModel } from "../../common/model/CreateDateModel";
import { DeleteFlgModel } from "../../common/model/DeleteFlgModel";
import { UpdateDateModel } from "../../common/model/UpdateDateModel";
import { BookIdModel } from "./BookIdModel";
import { DescriptionModel } from "./DescriptionModel";
import { PublishedDateModel } from "./PublishedDateModel";
import { TitleModel } from "./TitleModel";


/**
 * 書籍情報マスタデータ追加用
 */
export class BookInfoMasterCreateModel {

    // 書籍ID
    private readonly _bookIdModel: BookIdModel;
    // 書籍タイトル
    private readonly _titleModel: TitleModel;
    // 発売日
    private readonly _publishedDateModel: PublishedDateModel;
    // 書籍詳細
    private readonly _descriptionModel: DescriptionModel;
    // データ作成日
    private readonly _createDateModel: CreateDateModel = CreateDateModel.create(`書籍情報マスタ`);
    // データ更新日
    private readonly _updateDateModel: UpdateDateModel = UpdateDateModel.create(`書籍情報マスタ`);
    // 削除フラグ
    private readonly _deleteFlgModel: DeleteFlgModel = new DeleteFlgModel(FLG.OFF);


    constructor(bookIdModel: BookIdModel, titleModel: TitleModel,
        publishedDateModel: PublishedDateModel, descriptionModel: DescriptionModel) {

        this._bookIdModel = bookIdModel;
        this._titleModel = titleModel;
        this._publishedDateModel = publishedDateModel;
        this._descriptionModel = descriptionModel;
    }

    public get bookIdModel() {
        return this._bookIdModel;
    }

    public get titleModel() {
        return this._titleModel;
    }

    public get publishedDateModel() {
        return this._publishedDateModel;
    }

    public get descriptionModel() {
        return this._descriptionModel;
    }

    public get createDateModel() {
        return this._createDateModel;
    }

    public get updateDateModel() {
        return this._updateDateModel;
    }

    public get deleteFlgModel() {
        return this._deleteFlgModel;
    }

}