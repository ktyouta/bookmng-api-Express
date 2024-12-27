import { JsonFileOperation } from "../../../util/service/JsonFileOperation";
import { BOOK_AUTHROS_MASTER_FILE_PATH } from "../const/BookAuthrosMasterConst";
import { BookAuthorsModelType } from "../model/BookAuthorsMasterModelType";


export class BookAuthorsMasterService {


    /**
     * 書籍著者マスタファイルのデータを取得
     */
    public getBookAuthorsMaster() {

        // 書籍著者マスタファイルからデータを取得
        const bookAuthorsMasterList: BookAuthorsModelType[] = JsonFileOperation.getFileObj(BOOK_AUTHROS_MASTER_FILE_PATH);

        return bookAuthorsMasterList;
    }
}