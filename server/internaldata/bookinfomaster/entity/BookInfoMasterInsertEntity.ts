import { FLG } from "../../../util/const/CommonConst";
import { AuthorIdModel } from "../../authorsinfomaster/properties/AuthorIdMode";
import { BookIdModel } from "../properties/BookIdModel";
import { CreateDateModel } from "../../common/model/CreateDateModel";
import { DeleteFlgModel } from "../../common/model/DeleteFlgModel";
import { UpdateDateModel } from "../../common/model/UpdateDateModel";
import { TitleModel } from "../properties/TitleModel";
import { PublishedDateModel } from "../properties/PublishedDateModel";
import { DescriptionModel } from "../properties/DescriptionModel";


export class BookInfoMasterInsertEntity {

    // 書籍ID
    private readonly _bookIdModel: BookIdModel;
    // 書籍タイトル
    private readonly _titleModel: TitleModel;
    // 発売日
    private readonly _publishedDateModel: PublishedDateModel;
    // 書籍詳細
    private readonly _descriptionModel: DescriptionModel;
    // データ作成日
    private readonly _createDateModel: CreateDateModel = CreateDateModel.create(`書籍著者情報マスタ`);
    // データ更新日
    private readonly _updateDateModel: UpdateDateModel = UpdateDateModel.create(`書籍著者情報マスタ`);
    // 削除フラグ
    private readonly _deleteFlgModel: DeleteFlgModel = new DeleteFlgModel(FLG.OFF);


    constructor(bookIdModel: BookIdModel,
        titleModel: TitleModel,
        publishedDateModel: PublishedDateModel,
        descriptionModel: DescriptionModel,
    ) {
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

    public get bookId() {
        return this._bookIdModel.bookId;
    }


    public get title() {
        return this._titleModel.title;
    }

    public get publishedDate() {
        return this._publishedDateModel.publishedDate;
    }


    public get description() {
        return this._descriptionModel.description;
    }


    public get createDate() {
        return this._createDateModel.createDate;
    }

    public get updateDate() {
        return this._updateDateModel.updateDate;
    }

    public get deleteFlg() {
        return this._deleteFlgModel.deleteFlg;
    }

}