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
    private bookId: BookIdModel;
    // 書籍タイトル
    private title: TitleModel;
    // 発売日
    private publishedDate: PublishedDateModel;
    // 書籍詳細
    private description: DescriptionModel;
    // データ作成日
    private createDate: CreateDateModel = new CreateDateModel(`書籍情報マスタ`);
    // データ更新日
    private updateDate: UpdateDateModel = new UpdateDateModel(`書籍情報マスタ`);
    // 削除フラグ
    private deleteFlg: DeleteFlgModel = new DeleteFlgModel(FLG.OFF);


    constructor(bookId: BookIdModel, title: string, publishedDate: string, description: string) {

        this.bookId = bookId;
        this.title = new TitleModel(title);
        this.publishedDate = new PublishedDateModel(publishedDate);
        this.description = new DescriptionModel(description);
    }

    public getBookId() {
        return this.bookId;
    }

    public getTitle() {
        return this.title;
    }

    public getPublishedDate() {
        return this.publishedDate;
    }

    public getdDescription() {
        return this.description;
    }

    public getCreateDate() {
        return this.createDate;
    }

    public getUpdateDate() {
        return this.updateDate;
    }

    public getDeleteFlg() {
        return this.deleteFlg;
    }
}