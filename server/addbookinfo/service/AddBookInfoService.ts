import { GoogleBookInfoApis } from "../../api/googlebookinfo/service/GoogleBookInfoApis";
import { BookAuthorsModelType } from "../../internaldata/bookauthorsmaster/model/BookAuthorsMasterModelType";
import { BookAuthorsMasterService } from "../../internaldata/bookauthorsmaster/service/BookAuthorsMasterService";
import { BookInfoModelType } from "../../internaldata/bookinfomaster/model/BookInfoMasterModelType";
import { BookInfoMasterService } from "../../internaldata/bookinfomaster/service/BookInfoMasterService";
import { FileOperation } from "../../util/service/FileOperation";
import { JsonFileOperation } from "../../util/service/JsonFileOperation";

export class AddBookInfoService {

    private bookInfoMasterService = new BookInfoMasterService();
    private bookAuthorsMasterService = new BookAuthorsMasterService();


    /**
     * マスタから書籍情報を取得する
     * @returns 
     */
    public getBookMasterInfo() {

        let bookInfoMasterList: BookInfoModelType[] = this.bookInfoMasterService.getBookInfoMaster();

        return bookInfoMasterList;
    }


    /**
     * マスタから書籍著者情報を取得する
     * @returns 
     */
    public getBookAuthorsMasterInfo() {

        let bookAuthrosMasterList: BookAuthorsModelType[] = this.bookAuthorsMasterService.getBookAuthorsMaster();

        return bookAuthrosMasterList;
    }


}