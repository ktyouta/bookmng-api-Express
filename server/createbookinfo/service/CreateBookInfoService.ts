import { GoogleBookInfoApis } from "../../externalapi/googlebookinfo/service/GoogleBookInfoApis";
import { AuthorsMasterService } from "../../internaldata/authorsinfomaster/service/AuthorsMasterService";
import { BOOK_AUTHROS_MASTER_FILE_PATH } from "../../internaldata/bookauthorsmaster/const/BookAuthrosMasterConst";
import { BookAuthorsMasterCreateModel } from "../../internaldata/bookauthorsmaster/model/BookAuthorsMasterCreateModel";
import { BookAuthorsMasterService } from "../../internaldata/bookauthorsmaster/service/BookAuthorsMasterService";
import { BOOK_INFO_MASTER_FILE_PATH } from "../../internaldata/bookinfomaster/const/BookInfoMasterConst";
import { BookIdModel } from "../../internaldata/bookinfomaster/model/BookIdModel";
import { BookInfoMasterCreateModel } from "../../internaldata/bookinfomaster/model/BookInfoMasterCreateModel";
import { BookInfoJsonModelType } from "../../internaldata/bookinfomaster/model/BookInfoMasterJsonModelType";
import { BookInfoMasterService } from "../../internaldata/bookinfomaster/service/BookInfoMasterService";
import { ArrayUtil } from "../../util/service/ArrayUtil";
import { FileOperation } from "../../util/service/FileOperation";
import { JsonFileOperation } from "../../util/service/JsonFileOperation";
import ENV from '../../env.json';
import { BookInfoMasterModel } from "../../internaldata/bookinfomaster/model/BookInfoMasterModel";
import { BookInfoCreateRequestType } from "../model/BookInfoCreateRequestType";
import { BookInfoCreateRequestModel } from "../model/BookInfoCreateRequestModel";
import { TitleModel } from "../../internaldata/bookinfomaster/model/TitleModel";
import { PublishedDateModel } from "../../internaldata/bookinfomaster/model/PublishedDateModel";
import { AuthorIdModel } from "../../internaldata/authorsinfomaster/model/AuthorIdMode";
import { BookAuthorsMasterModel } from "../../internaldata/bookauthorsmaster/model/BookAuthorsMasterModel";
import { AuthorsMasterModel } from "../../internaldata/authorsinfomaster/model/AuthorsMasterModel";


export class CreateBookInfoService {

    private bookInfoMasterService = new BookInfoMasterService();
    private bookAuthorsMasterService = new BookAuthorsMasterService();
    private authorsMasterService = new AuthorsMasterService();


    /**
     * マスタから書籍情報を取得する
     * @returns 
     */
    public getBookMasterInfo(): BookInfoMasterModel[] {

        const bookInfoMasterList: BookInfoMasterModel[] = this.bookInfoMasterService.getBookInfoMaster();

        return bookInfoMasterList;
    }


    /**
     * 未削除の書籍情報データを取得
     * @returns 
     */
    public getActiveBookMasterInfo(bookInfoMasterList: BookInfoMasterModel[]): BookInfoMasterModel[] {

        const activeBookInfoMasterList: BookInfoMasterModel[] = this.bookInfoMasterService.getActiveBookInfoMaster(bookInfoMasterList);

        return activeBookInfoMasterList;
    }


    /**
     * BookInfoCreateRequestTypeからBookInfoCreateRequestModelに変換する
     * @param requestBody 
     */
    public parseRequestBody(requestBody: BookInfoCreateRequestType): BookInfoCreateRequestModel {

        return new BookInfoCreateRequestModel(requestBody);
    }


    /**
     * リクエストボディから書籍情報登録用のデータを作成する
     * @param title 
     * @param publishedDate 
     * @param description 
     */
    public createBookInfoMasterCreateBody(bookId: BookIdModel, requestBody: BookInfoCreateRequestModel): BookInfoMasterCreateModel {

        const bookInfoMasterCareteBody: BookInfoMasterCreateModel = this.bookInfoMasterService.createBookInfoMasterCreateBody(
            bookId,
            requestBody.titleModel,
            requestBody.publishedDateModel,
            requestBody.descriptionModel);

        return bookInfoMasterCareteBody;
    }


    /**
     * マスタから書籍著者情報を取得する
     * @returns 
     */
    public getBookAuthorsMasterInfo() {

        const bookAuthrosMasterList: BookAuthorsMasterModel[] = this.bookAuthorsMasterService.getBookAuthorsMaster();

        return bookAuthrosMasterList;
    }


    /**
     * 未削除の書籍著者マスタデータを取得
     * @param bookAuthrosMasterList 
     * @returns 
     */
    public getActiveBookAuthorsMasterInfo(bookAuthrosMasterList: BookAuthorsMasterModel[]): BookAuthorsMasterModel[] {

        const activeBookInfoMasterList: BookAuthorsMasterModel[] = this.bookAuthorsMasterService.getActiveBookAuthorsMaster(bookAuthrosMasterList);

        return activeBookInfoMasterList;
    }


    /**
     * 書籍情報マスタに対する書き込み用データの作成
     * @param bookInfoMasterList 
     * @param bookInfoMasterCreateModel 
     * @returns 
     */
    public createBookInfoMasterWriteData(
        bookInfoMasterList: BookInfoMasterModel[],
        bookInfoMasterCreateModel: BookInfoMasterCreateModel): BookInfoMasterModel[] {

        bookInfoMasterList = this.bookInfoMasterService.createBookInfoMasterWriteData(bookInfoMasterList, bookInfoMasterCreateModel);

        return bookInfoMasterList;
    }


    /**
     * 書籍情報マスタファイルにデータを書き込む
     * @param bookInfoMasterList 
     */
    public overWriteBookInfoMaster(bookInfoMasterList: BookInfoMasterModel[]) {

        try {

            this.bookInfoMasterService.overWriteBookInfoMaster(bookInfoMasterList);
        } catch (err) {

            throw Error(`${err} endpoint:${ENV.CREATE_BOOK_INFO}`);
        }
    }


    /**
     * リクエストボディから書籍情報登録用のリストを作成する
     * @param bookId 
     * @param requestBody 
     * @returns 
     */
    public createBookAuthorsMasterCreateBodyList(bookId: BookIdModel, requestBody: BookInfoCreateRequestModel)
        : BookAuthorsMasterCreateModel[] {

        // 著者IDリスト
        const authorIdList: AuthorIdModel[] = requestBody.authorIdListModel;

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
    private createBookAuthorsMasterCreateBody(bookIdModel: BookIdModel, authorIdModel: AuthorIdModel): BookAuthorsMasterCreateModel {

        const bookAuthorsMasterCreateModel: BookAuthorsMasterCreateModel = this.bookAuthorsMasterService.createBookAuthorsMasterCreateBody(
            bookIdModel,
            authorIdModel
        );

        return bookAuthorsMasterCreateModel;
    }


    /**
     * 書籍著者情報マスタに対する書き込み用データの作成
     * @param bookId 
     * @param requestBody 
     * @returns 
     */
    public createBookAuthorsMasterWriteData(
        bookAuthorsMasterList: BookAuthorsMasterModel[],
        bookAuthorsMasterCreateBody: BookAuthorsMasterCreateModel[]): BookAuthorsMasterModel[] {

        bookAuthorsMasterList = this.bookAuthorsMasterService.createBookInfoMasterWriteData(bookAuthorsMasterList, bookAuthorsMasterCreateBody);

        return bookAuthorsMasterList;
    }


    /**
     * 書籍著者情報マスタファイルにデータを書き込む
     * @param bookInfoMasterList 
     * @returns 
     */
    public overWriteBookAuthorsMaster(bookAuthorsMasterList: BookAuthorsMasterModel[]) {

        try {

            this.bookAuthorsMasterService.overWriteBookAuthorsMaster(bookAuthorsMasterList);
        } catch (err) {

            throw Error(`${err} endpoint:${ENV.CREATE_BOOK_INFO}`);
        }
    }


    /**
     * 未削除の著者マスタを取得する
     * @returns 
     */
    public getActiveAuthorsMaster(): AuthorsMasterModel[] {

        const authorsMasterList: AuthorsMasterModel[] = this.authorsMasterService.getAuthorsMaster();

        const activeAuthorsMasterList = this.authorsMasterService.getActiveAuthorsMaster(authorsMasterList);

        return activeAuthorsMasterList;
    }


    /**
     * 著者IDのマスタ存在チェック
     */
    public checkAuthorIdExists(authorsMasterList: AuthorsMasterModel[], parsedRequestBody: BookInfoCreateRequestModel): string {

        const errMessge = this.authorsMasterService.checkAuthorIdExists(authorsMasterList, parsedRequestBody.authorIdListModel);

        return errMessge;
    }


    /**
     * 書籍情報の重複チェック
     * @param acticeBookInfoMasterList 
     * @param activeBookAuthorsMasterList 
     * @param requestBody 
     */
    public checkBookInfoExists(activeBookInfoMasterList: BookInfoMasterModel[],
        activeBookAuthorsMasterList: BookAuthorsMasterModel[], requestBody: BookInfoCreateRequestModel): string {

        let errMessage = "";
        // リクエストボディから値を取得
        const titleModel: TitleModel = requestBody.titleModel;
        const publishedDateModel: PublishedDateModel = requestBody.publishedDateModel;

        // リクエストのタイトルと発売日に一致する書籍情報を取得する
        const possibleDuplicateBooksInfoList: BookInfoMasterModel[] = activeBookInfoMasterList.filter((e: BookInfoMasterModel) => {

            return e.titleModel.checkTitleDuplicate(titleModel) && e.publishedDateModel.checkPublishedDateDuplicate(publishedDateModel);
        });

        // 著者IDがすべて一致する書籍情報を取得する
        possibleDuplicateBooksInfoList.some((e: BookInfoMasterModel) => {

            // 書籍IDの一致する書籍著者リストを取得する
            const activeBookAuthorsMaster: BookAuthorsMasterModel[] = activeBookAuthorsMasterList.filter((e1: BookAuthorsMasterModel) => {

                return e1.bookId === e.bookId;
            });

            if (activeBookAuthorsMaster.length === 0) {
                return true;
            }

            // 書籍著者情報マスタの著者IDリスト
            const masterAuthorIdList = activeBookAuthorsMaster.map((e1: BookAuthorsMasterModel) => {

                return e1.authorIdModel;
            });

            // リクエストの著者IDリストと書籍著者マスタの著者IDリストが完全に一致している場合はエラーとする
            if (requestBody.checkAuthorIdListDuplicate(masterAuthorIdList)) {

                errMessage = "登録しようとしている書籍情報が既に存在しています。"
                return true;
            }

        });

        return errMessage;
    }
}