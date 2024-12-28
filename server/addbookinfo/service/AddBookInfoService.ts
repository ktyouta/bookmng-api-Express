import { GoogleBookInfoApis } from "../../api/googlebookinfo/service/GoogleBookInfoApis";
import { BookAuthorsModelType } from "../../internaldata/bookauthorsmaster/model/BookAuthorsMasterModelType";
import { BookAuthorsMasterService } from "../../internaldata/bookauthorsmaster/service/BookAuthorsMasterService";
import { BOOK_INFO_MASTER_FILE_PATH } from "../../internaldata/bookinfomaster/const/BookInfoMasterConst";
import { BookInfoMasterCreateModel } from "../../internaldata/bookinfomaster/model/BookInfoMasterCreateModel";
import { BookInfoModelType } from "../../internaldata/bookinfomaster/model/BookInfoMasterModelType";
import { BookInfoMasterService } from "../../internaldata/bookinfomaster/service/BookInfoMasterService";
import { FileOperation } from "../../util/service/FileOperation";
import { JsonFileOperation } from "../../util/service/JsonFileOperation";
import { BookInfoAddRequestModelType } from "../model/BookInfoAddRequestModelType";

export class AddBookInfoService {

    private bookInfoMasterService = new BookInfoMasterService();
    private bookAuthorsMasterService = new BookAuthorsMasterService();


    /**
     * マスタから書籍情報を取得する
     * @returns 
     */
    public getBookMasterInfo(): BookInfoModelType[] {

        const bookInfoMasterList: BookInfoModelType[] = this.bookInfoMasterService.getBookInfoMaster();

        return bookInfoMasterList;
    }


    /**
     * リクエストボディから書籍情報登録用のデータを作成する
     * @param title 
     * @param publishedDate 
     * @param description 
     */
    public getCreateBookInfoMasterCreateBody(requestBody: BookInfoAddRequestModelType): BookInfoMasterCreateModel {

        const bookInfoMasterCareteBody: BookInfoMasterCreateModel = this.bookInfoMasterService.createBookInfoMasterCreateBody(
            requestBody.title,
            requestBody.publishedDate,
            requestBody.description);

        return bookInfoMasterCareteBody;
    }


    /**
     * マスタから書籍著者情報を取得する
     * @returns 
     */
    public getBookAuthorsMasterInfo() {

        let bookAuthrosMasterList: BookAuthorsModelType[] = this.bookAuthorsMasterService.getBookAuthorsMaster();

        return bookAuthrosMasterList;
    }


    /**
     * 書籍情報マスタに対する書き込み用データの作成
     * @param bookInfoMasterList 
     * @param bookInfoMasterCreateModel 
     * @returns 
     */
    public createBookInfoMasterWriteData(
        bookInfoMasterList: BookInfoModelType[],
        bookInfoMasterCreateModel: BookInfoMasterCreateModel): BookInfoModelType[] {

        bookInfoMasterList = this.bookInfoMasterService.createBookInfoMasterWriteData(bookInfoMasterList, bookInfoMasterCreateModel);

        return bookInfoMasterList;
    }


    /**
     * 書籍情報マスタファイルにデータを書き込む
     * @param bookInfoMasterList 
     */
    public overWriteBookInfoMaster(bookInfoMasterList: BookInfoModelType[]): string {

        const errMessge = JsonFileOperation.overWriteJsonFileData(BOOK_INFO_MASTER_FILE_PATH, bookInfoMasterList);

        return errMessge;
    }
}