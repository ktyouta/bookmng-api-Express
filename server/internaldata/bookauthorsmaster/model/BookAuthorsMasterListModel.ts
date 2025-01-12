import { FLG } from "../../../util/const/CommonConst";
import { JsonFileData } from "../../../util/service/JsonFileData";
import { AuthorIdModel } from "../../authorsinfomaster/model/AuthorIdMode";
import { BookIdModel } from "../../bookinfomaster/model/BookIdModel";
import { BOOK_AUTHROS_MASTER_FILE_PATH } from "../const/BookAuthrosMasterConst";
import { BookAuthorsMasterCreateModel } from "./BookAuthorsMasterCreateModel";
import { BookAuthorsMasterJsonType } from "./BookAuthorsMasterJsonType";
import { BookAuthorsMasterModel } from "./BookAuthorsMasterModel";
import { CreateDateModel } from "./CreateDateModel";
import { DeleteFlgModel } from "./DeleteFlgModel";
import { UpdateDateModel } from "./UpdateDateModel";

export class BookAuthorsMasterListModel {

    private readonly _bookAuthorsMasterModelList: ReadonlyArray<BookAuthorsMasterModel>;

    private constructor(bookInfoMasterModelList: BookAuthorsMasterModel[]) {

        this._bookAuthorsMasterModelList = bookInfoMasterModelList;
    }


    /**
     * 書籍著者情報を取得する
     * @returns 
     */
    public static getBookAuthorsMasterList() {

        // 書籍著者マスタファイルからデータを取得
        const bookAuthorsMasterList: BookAuthorsMasterJsonType[] = JsonFileData.getFileObj(BOOK_AUTHROS_MASTER_FILE_PATH);

        // json形式からBookInfoMasterModelに変換する
        const parsedBookAuthorsMasterList: BookAuthorsMasterModel[] = bookAuthorsMasterList.map((e: BookAuthorsMasterJsonType) => {
            return this.parseBookAuthorsMaster(e);
        });

        return new BookAuthorsMasterListModel(parsedBookAuthorsMasterList);
    }


    /**
     * getter
     */
    public get bookAuthorsMasterModelList() {
        return this._bookAuthorsMasterModelList;
    }


    /**
     * json形式からBookAuthorsMasterModelに変換する
     * @param jsonBookAuthorsMaster 
     * @returns 
     */
    private static parseBookAuthorsMaster(jsonBookAuthorsMaster: BookAuthorsMasterJsonType): BookAuthorsMasterModel {

        const bookIdModel = BookIdModel.reConstruct(jsonBookAuthorsMaster.bookId);
        const authorIdModel = AuthorIdModel.reConstruct(jsonBookAuthorsMaster.authorId);
        const createDate = CreateDateModel.reConstruct(jsonBookAuthorsMaster.createDate, `書籍著者マスタ`);
        const updateDate = UpdateDateModel.reConstruct(jsonBookAuthorsMaster.updateDate, `書籍著者マスタ`);
        const deleteFlgModel = new DeleteFlgModel(jsonBookAuthorsMaster.deleteFlg);

        return new BookAuthorsMasterModel(
            bookIdModel,
            authorIdModel,
            createDate,
            updateDate,
            deleteFlgModel
        );
    }


    /**
     * BookAuthorsMasterCreateModelからBookAuthorsMasterModel形式に変換する
     * @param bookAuthorsMasterCreateModel 
     * @returns 
     */
    private parseCreateBookInfoMaster(bookAuthorsMasterCreateModel: BookAuthorsMasterCreateModel): BookAuthorsMasterModel {

        return new BookAuthorsMasterModel(
            bookAuthorsMasterCreateModel.bookIdModel,
            bookAuthorsMasterCreateModel.authorIdModel,
            bookAuthorsMasterCreateModel.createDateModel,
            bookAuthorsMasterCreateModel.updateDateModel,
            bookAuthorsMasterCreateModel.deleteFlgModel,
        );
    }


    /**
     * 書籍著者情報マスタに対する書き込み用データの作成
     * @param bookAuthorsMasterList 
     * @param bookInfoMasterCreateModel 
     * @returns 
     */
    public createBookInfoMasterWriteData(
        bookAuthorsMasterCreateModelList: BookAuthorsMasterCreateModel[]): BookAuthorsMasterListModel {

        // BookAuthorsMasterModelに変換する
        const createBookInfoMasterBodyList: BookAuthorsMasterModel[] =
            bookAuthorsMasterCreateModelList.map((e: BookAuthorsMasterCreateModel) => {
                return this.parseCreateBookInfoMaster(e);
            });

        // 書籍著者情報を追加する
        const addBookAuthorsMasterList = [...this._bookAuthorsMasterModelList, ...createBookInfoMasterBodyList];

        return new BookAuthorsMasterListModel(addBookAuthorsMasterList);
    }

}