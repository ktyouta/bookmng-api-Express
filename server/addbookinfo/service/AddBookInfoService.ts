import { GoogleBookInfoApis } from "../../api/googlebookinfo/service/GoogleBookInfoApis";
import { BookInfoMasterService } from "../../internaldata/bookinfomaster/service/BookInfoMasterService";
import { FileOperation } from "../../util/service/FileOperation";
import { JsonFileOperation } from "../../util/service/JsonFileOperation";

export class AddBookInfoService {

    private bookInfoMasterService = new BookInfoMasterService();

    // マスタから書籍情報を取得する
    public getBookMasterInfo() {

        let bookInfoMasterList = this.bookInfoMasterService.getBookInfoMaster();

        return bookInfoMasterList;
    }
}