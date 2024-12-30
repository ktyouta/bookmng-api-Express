import { GoogleBookInfoApis } from "../../externalapi/googlebookinfo/service/GoogleBookInfoApis";
import { AuthorsMasterModeType } from "../../internaldata/authorsinfomaster/model/AuthorsMasterModeType";
import { AuthorsMasterService } from "../../internaldata/authorsinfomaster/service/AuthorsMasterService";
import { BOOK_AUTHROS_MASTER_FILE_PATH } from "../../internaldata/bookauthorsmaster/const/BookAuthrosMasterConst";
import { BookAuthorsMasterCreateModel } from "../../internaldata/bookauthorsmaster/model/BookAuthorsMasterCreateModel";
import { BookAuthorsModelType } from "../../internaldata/bookauthorsmaster/model/BookAuthorsMasterModelType";
import { BookAuthorsMasterService } from "../../internaldata/bookauthorsmaster/service/BookAuthorsMasterService";
import { BOOK_INFO_MASTER_FILE_PATH } from "../../internaldata/bookinfomaster/const/BookInfoMasterConst";
import { BookIdModel } from "../../internaldata/bookinfomaster/model/BookIdModel";
import { BookInfoMasterCreateModel } from "../../internaldata/bookinfomaster/model/BookInfoMasterCreateModel";
import { BookInfoModelType } from "../../internaldata/bookinfomaster/model/BookInfoMasterModelType";
import { BookInfoMasterService } from "../../internaldata/bookinfomaster/service/BookInfoMasterService";
import { ArrayUtil } from "../../util/service/ArrayUtil";
import { FileOperation } from "../../util/service/FileOperation";
import { JsonFileOperation } from "../../util/service/JsonFileOperation";
import { BookInfoAddRequestModelType } from "../model/BookInfoAddRequestModelType";

export class AddBookInfoService {

    private bookInfoMasterService = new BookInfoMasterService();
    private bookAuthorsMasterService = new BookAuthorsMasterService();
    private authorsMasterService = new AuthorsMasterService();


    /**
     * マスタから書籍情報を取得する
     * @returns 
     */
    public getBookMasterInfo(): BookInfoModelType[] {

        const bookInfoMasterList: BookInfoModelType[] = this.bookInfoMasterService.getBookInfoMaster();

        return bookInfoMasterList;
    }


    /**
     * 未削除の書籍情報データを取得
     * @returns 
     */
    public getActiveBookMasterInfo(bookInfoMasterList: BookInfoModelType[]): BookInfoModelType[] {

        const activeBookInfoMasterList: BookInfoModelType[] = this.bookInfoMasterService.getActiveBookInfoMaster(bookInfoMasterList);

        return activeBookInfoMasterList;
    }


    /**
     * リクエストボディから書籍情報登録用のデータを作成する
     * @param title 
     * @param publishedDate 
     * @param description 
     */
    public createBookInfoMasterCreateBody(bookId: BookIdModel, requestBody: BookInfoAddRequestModelType): BookInfoMasterCreateModel {

        const bookInfoMasterCareteBody: BookInfoMasterCreateModel = this.bookInfoMasterService.createBookInfoMasterCreateBody(
            bookId,
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
     * 未削除の書籍著者マスタデータを取得
     * @param bookAuthrosMasterList 
     * @returns 
     */
    public getActiveBookAuthorsMasterInfo(bookAuthrosMasterList: BookAuthorsModelType[]): BookAuthorsModelType[] {

        const activeBookInfoMasterList: BookAuthorsModelType[] = this.bookAuthorsMasterService.getActiveBookAuthorsMaster(bookAuthrosMasterList);

        return activeBookInfoMasterList;
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


    /**
     * リクエストボディから書籍情報登録用のリストを作成する
     * @param bookId 
     * @param requestBody 
     * @returns 
     */
    public createBookAuthorsMasterCreateBodyList(bookId: BookIdModel, requestBody: BookInfoAddRequestModelType)
        : BookAuthorsMasterCreateModel[] {

        // 著者IDリスト
        const authorIdList: string[] = requestBody.authorIdList;

        // 書籍著者マスタ登録用データを作成する
        const bookAuthorsMasterCreateModelList: BookAuthorsMasterCreateModel[] = authorIdList.map((e) => {

            return this.createBookAuthorsMasterCreateBody(
                bookId,
                e
            );
        });

        return bookAuthorsMasterCreateModelList;
    }


    /**
     * リクエストボディから書籍情報登録用のデータを作成する
     * @param bookId 
     * @param authorId 
     * @returns 
     */
    private createBookAuthorsMasterCreateBody(bookId: BookIdModel, authorId: string): BookAuthorsMasterCreateModel {

        const bookAuthorsMasterCreateModel: BookAuthorsMasterCreateModel = this.bookAuthorsMasterService.createBookAuthorsMasterCreateBody(
            bookId,
            authorId);

        return bookAuthorsMasterCreateModel;
    }


    /**
     * 書籍著者情報マスタに対する書き込み用データの作成
     * @param bookId 
     * @param requestBody 
     * @returns 
     */
    public createBookAuthorsMasterWriteData(
        bookAuthorsMasterList: BookAuthorsModelType[],
        bookAuthorsMasterCreateBody: BookAuthorsMasterCreateModel[]): BookAuthorsModelType[] {

        bookAuthorsMasterList = this.bookAuthorsMasterService.createBookInfoMasterWriteData(bookAuthorsMasterList, bookAuthorsMasterCreateBody);

        return bookAuthorsMasterList;
    }


    /**
     * 書籍著者情報マスタファイルにデータを書き込む
     * @param bookInfoMasterList 
     * @returns 
     */
    public overWriteBookAuthorsMaster(bookAuthorsMasterList: BookAuthorsModelType[]): string {

        const errMessge = JsonFileOperation.overWriteJsonFileData(BOOK_AUTHROS_MASTER_FILE_PATH, bookAuthorsMasterList);

        return errMessge;
    }


    /**
     * マスタから著者情報を取得する
     * @returns 
     */
    public getAuthorsMasterInfo(): AuthorsMasterModeType[] {

        const authorsMasterList: AuthorsMasterModeType[] = this.authorsMasterService.getAuthorsMaster();

        return authorsMasterList;
    }

    /**
     * 未削除の著者マスタを取得する
     * @param authorsMasterList 
     * @returns 
     */
    public getActiveAuthorsMaster(authorsMasterList: AuthorsMasterModeType[]): AuthorsMasterModeType[] {

        const activeAuthorsMasterList = this.authorsMasterService.getActiveAuthorsMaster(authorsMasterList);

        return activeAuthorsMasterList;
    }


    /**
     * 著者IDのマスタ存在チェック
     */
    public checkAuthorIdExists(authorsMasterList: AuthorsMasterModeType[], authorIdList: string[]): string {

        let errMessge = "";

        authorIdList.some((e: string) => {

            // 著者マスタにIDが存在するか確認する
            const authorMaster = authorsMasterList.find((e1: AuthorsMasterModeType) => {

                return e1.authorId === e;
            });

            if (!authorMaster) {
                errMessge = "著者マスタに存在しない著者が選択されています。";
                return true;
            }
        });

        return errMessge;
    }



    /**
     * 書籍情報の重複チェック
     * @param acticeBookInfoMasterList 
     * @param activeBookAuthorsMasterList 
     * @param requestBody 
     */
    public checkBookInfoExists(activeBookInfoMasterList: BookInfoModelType[],
        activeBookAuthorsMasterList: BookAuthorsModelType[], requestBody: BookInfoAddRequestModelType): string {

        let errMessage = "";
        // リクエストボディから値を取得
        const title = requestBody.title;
        const publishedDate = requestBody.publishedDate;
        const authorIdList = requestBody.authorIdList;

        // リクエストのタイトルと発売日に一致する書籍情報を取得する
        const possibleDuplicateBooksInfoList = activeBookInfoMasterList.filter((e: BookInfoModelType) => {

            return e.title === title && e.publishedDate === publishedDate;
        });

        // 著者IDがすべて一致する書籍情報を取得する
        possibleDuplicateBooksInfoList.some((e: BookInfoModelType) => {

            // 書籍IDの一致する書籍著者リストを取得する
            const activeBookAuthorsMaster: BookAuthorsModelType[] = activeBookAuthorsMasterList.filter((e1: BookAuthorsModelType) => {

                return e1.bookId === e.bookId;
            });

            if (activeBookAuthorsMaster.length === 0) {
                return true;
            }

            // 書籍著者情報マスタの著者IDリスト
            const masterAuthorIdList = activeBookAuthorsMaster.map((e1: BookAuthorsModelType) => {

                return e1.authorId;
            });

            // リクエストの著者IDリストと書籍著者マスタの著者IDリストが完全に一致している場合はエラーとする
            if (ArrayUtil.checkArrayEqual(authorIdList, masterAuthorIdList)) {

                errMessage = "登録しようとしている書籍情報が既に存在しています。"
                return true;
            }

        });

        return errMessage;
    }
}