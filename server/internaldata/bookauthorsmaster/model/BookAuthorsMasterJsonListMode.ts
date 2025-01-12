import { JsonFileData } from "../../../util/service/JsonFileData";
import { BOOK_AUTHROS_MASTER_FILE_PATH } from "../const/BookAuthrosMasterConst";
import { BookAuthorsMasterJsonType } from "./BookAuthorsMasterJsonType";
import { BookAuthorsMasterListModel } from "./BookAuthorsMasterListModel";
import { BookAuthorsMasterModel } from "./BookAuthorsMasterModel";

export class BookAuthorsMasterJsonListMode {

    private readonly _bookInfoJsonList: ReadonlyArray<BookAuthorsMasterJsonType>;


    constructor(bookInfoMasterListModel: BookAuthorsMasterListModel) {

        // jsonファイル登録用の型に変換する
        const jsonBookInfoMasterListModel = bookInfoMasterListModel.bookAuthorsMasterModelList.map((e: BookAuthorsMasterModel) => {
            return this.parseJsonBookAuthorsMaster(e);
        });

        this._bookInfoJsonList = jsonBookInfoMasterListModel;
    }


    /**
     * BookAuthorsMasterModelからjson形式に変換する
     * @param bookAuthorsMaster 
     * @returns 
     */
    private parseJsonBookAuthorsMaster(bookAuthorsMaster: BookAuthorsMasterModel): BookAuthorsMasterJsonType {

        // jsonファイル登録用の型に変換する
        const jsonBookAuthorsMaster: BookAuthorsMasterJsonType = {
            bookId: bookAuthorsMaster.bookId,
            authorId: bookAuthorsMaster.authorId,
            createDate: bookAuthorsMaster.createDate,
            updateDate: bookAuthorsMaster.updateDate,
            deleteFlg: bookAuthorsMaster.deleteFlg,
        };

        return jsonBookAuthorsMaster;
    }


    /**
     * 書籍著者情報マスタファイルにデータを書き込む
     * @param bookAuthorsMasterList 
     */
    public overWriteBookAuthorsMaster() {

        try {
            JsonFileData.overWrite(BOOK_AUTHROS_MASTER_FILE_PATH, this._bookInfoJsonList);
        } catch (err) {
            throw Error(`書籍著者情報マスタファイルのデータ書き込み中にエラーが発生しました。ERROR:${err}`);
        }
    }
}