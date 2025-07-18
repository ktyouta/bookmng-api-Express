import { FLG } from "../../../util/const/CommonConst";
import { BookIdModel } from "../../bookinfomaster/properties/BookIdModel";
import { CreateDateModel } from "../../common/model/CreateDateModel";
import { DeleteFlgModel } from "../../common/model/DeleteFlgModel";
import { UpdateDateModel } from "../../common/model/UpdateDateModel";
import { FrontUserIdModel } from "../../frontuserinfomaster/properties/FrontUserIdModel";
import { ReadStatusModel } from "../properties/ReadStatusModel";
import { ThoughtsModel } from "../properties/ThoughtsModel";


export class BookShelfUpdateEntity {

    // ユーザーID
    private readonly _frontUserIdModel: FrontUserIdModel;
    // 書籍ID
    private readonly _bookIdModel: BookIdModel;
    // 感想
    private readonly _thoughtsModel: ThoughtsModel;
    // 読書状況
    private readonly _readStatusModel: ReadStatusModel;
    // データ更新日
    private readonly _updateDateModel: UpdateDateModel = UpdateDateModel.create(`本棚情報`);
    // 削除フラグ
    private readonly _deleteFlgModel: DeleteFlgModel;


    constructor(userId: FrontUserIdModel,
        bookIdModel: BookIdModel,
        thoughtsModel: ThoughtsModel,
        readStatusModel: ReadStatusModel,
        deleteFlgModel: DeleteFlgModel
    ) {

        this._frontUserIdModel = userId;
        this._bookIdModel = bookIdModel;
        this._thoughtsModel = thoughtsModel;
        this._readStatusModel = readStatusModel;
        this._deleteFlgModel = deleteFlgModel;
    }

    public get frontUserIdModel() {
        return this._frontUserIdModel;
    }

    public get bookIdModel() {
        return this._bookIdModel;
    }

    public get readStatusModel() {
        return this._readStatusModel;
    }

    public get updateDateModel() {
        return this._updateDateModel;
    }

    public get deleteFlgModel() {
        return this._deleteFlgModel;
    }

    public get frontUserId() {
        return this._frontUserIdModel.frontUserId;
    }

    public get bookId() {
        return this._bookIdModel.bookId;
    }

    public get thoughts() {
        return this._thoughtsModel.thoughts;
    }

    get readStatus() {
        return this._readStatusModel.readStatus;
    }

    public get updateDate() {
        return this._updateDateModel.updateDate;
    }

    public get deleteFlg() {
        return this._deleteFlgModel.deleteFlg;
    }

}