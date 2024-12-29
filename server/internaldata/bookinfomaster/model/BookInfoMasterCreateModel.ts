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
    private readonly _bookId: BookIdModel;
    // 書籍タイトル
    private readonly _title: TitleModel;
    // 発売日
    private readonly _publishedDate: PublishedDateModel;
    // 書籍詳細
    private readonly _description: DescriptionModel;
    // データ作成日
    private readonly _createDate: CreateDateModel = new CreateDateModel(`書籍情報マスタ`);
    // データ更新日
    private readonly _updateDate: UpdateDateModel = new UpdateDateModel(`書籍情報マスタ`);
    // 削除フラグ
    private readonly _deleteFlg: DeleteFlgModel = new DeleteFlgModel(FLG.OFF);


    constructor(bookId: BookIdModel, title: string, publishedDate: string, description: string) {

        this._bookId = bookId;
        this._title = new TitleModel(title);
        this._publishedDate = new PublishedDateModel(publishedDate);
        this._description = new DescriptionModel(description);
    }

    public get bookId() {
        return this._bookId;
    }

    public get title() {
        return this._title;
    }

    public get publishedDate() {
        return this._publishedDate;
    }

    public get description() {
        return this._description;
    }

    public get createDate() {
        return this._createDate;
    }

    public get updateDate() {
        return this._updateDate;
    }

    public get deleteFlg() {
        return this._deleteFlg;
    }
}