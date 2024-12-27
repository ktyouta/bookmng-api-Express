import { JsonFileOperation } from "../../../util/service/JsonFileOperation";
import { BOOK_INFO_MASTER_FILE_PATH } from "../const/BookInfoMasterConst";
import { BookInfoModelType } from "../model/BookInfoMasterModelType";

export class BookInfoMasterService {


    /**
     * 書籍情報マスタファイルのデータを取得
     */
    public getBookInfoMaster() {

        // 書籍情報マスタファイルからデータを取得
        const bookInfoMasterList: BookInfoModelType[] = JsonFileOperation.getFileObj(BOOK_INFO_MASTER_FILE_PATH);

        return bookInfoMasterList;
    }
}