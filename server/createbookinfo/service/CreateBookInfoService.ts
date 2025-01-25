import { GoogleBookInfoApis } from "../../externalapi/googlebookinfo/service/GoogleBookInfoApis";
import { BookAuthorsMasterCreateModel } from "../../internaldata/bookauthorsmaster/model/BookAuthorsMasterCreateModel";
import { BookIdModel } from "../../internaldata/bookinfomaster/properties/BookIdModel";
import { BookInfoJsonModelType } from "../../internaldata/bookinfomaster/model/BookInfoMasterJsonModelType";
import { ArrayUtil } from "../../util/service/ArrayUtil";
import ENV from '../../env.json';
import { BookInfoMasterModel } from "../../internaldata/bookinfomaster/model/BookInfoMasterModel";
import { BookInfoCreateRequestType } from "../model/BookInfoCreateRequestType";
import { BookInfoCreateRequestModel } from "../model/BookInfoCreateRequestModel";
import { TitleModel } from "../../internaldata/bookinfomaster/properties/TitleModel";
import { PublishedDateModel } from "../../internaldata/bookinfomaster/properties/PublishedDateModel";
import { AuthorIdModel } from "../../internaldata/authorsinfomaster/properties/AuthorIdMode";
import { BookAuthorsMasterModel } from "../../internaldata/bookauthorsmaster/model/BookAuthorsMasterModel";
import { AuthorsMasterModel } from "../../internaldata/authorsinfomaster/model/AuthorsMasterModel";
import { FLG, RepositoryType } from "../../util/const/CommonConst";
import { CreateBookInfoRepositorys } from "../repository/CreateBookInfoRepositorys";
import { CreateBookInfoRepositoryInterface } from "../repository/interface/CreateBookInfoRepositoryInterface";
import { CreateBookInfoAuthrosSelectEntity } from "../entity/CreateBookInfoAuthrosSelectEntity";
import { AuthorsMasterJsonType } from "../../internaldata/authorsinfomaster/model/AuthorsMasterJsonType";
import { CreateBookInfoBookAuthrosSelectEntity } from "../entity/CreateBookInfoBookAuthrosSelectEntity";
import { BookInfoMasterInsertEntity } from "../../internaldata/bookinfomaster/entity/BookInfoMasterInsertEntity";
import { BookInfoMasterRepositoryInterface } from "../../internaldata/bookinfomaster/repository/interface/BookInfoMasterRepositoryInterface";
import { BookInfoMasterRepositorys } from "../../internaldata/bookinfomaster/repository/BookInfoMasterRepositorys";
import { BookAuthorsMasterRepositorys } from "../../internaldata/bookauthorsmaster/repository/BookAuthorsMasterRepositorys";
import { BookAuthorsMasterRepositoryInterface } from "../../internaldata/bookauthorsmaster/repository/interface/BookAuthorsMasterRepositoryInterface";
import { BookAuthorsMasterInsertEntity } from "../../internaldata/bookauthorsmaster/entity/BookAuthorsMasterInsertEntity";


export class CreateBookInfoService {


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
    public createBookInfoMasterCreateBody(bookId: BookIdModel, requestBody: BookInfoCreateRequestModel): BookInfoMasterInsertEntity {

        return new BookInfoMasterInsertEntity(
            bookId,
            requestBody.titleModel,
            requestBody.publishedDateModel,
            requestBody.descriptionModel
        );
    }


    /**
     * リクエストボディから書籍著者情報登録用のデータを作成する
     * @param bookId 
     * @param authorId 
     * @returns 
     */
    public createBookAuthorsMasterCreateBody(bookIdModel: BookIdModel, requestBody: BookInfoCreateRequestModel)
        : BookAuthorsMasterInsertEntity[] {

        return requestBody.authorIdListModel.map((e: AuthorIdModel) => {
            return new BookAuthorsMasterInsertEntity(bookIdModel, e);
        })
    }


    // /**
    //  * 書籍著者情報マスタファイルにデータを書き込む
    //  * @param bookInfoMasterList 
    //  * @returns 
    //  */
    // public overWriteBookAuthorsMaster(bookAuthorsMasterListModel: BookAuthorsMasterListModel) {

    //     // json形式に変換する
    //     const bookAuthorsMasterJsonListMode = new BookAuthorsMasterJsonListMode(bookAuthorsMasterListModel);

    //     try {

    //         bookAuthorsMasterJsonListMode.overWriteBookAuthorsMaster();
    //     } catch (err) {

    //         throw Error(`${err} endpoint:${ENV.CREATE_BOOK_INFO}`);
    //     }
    // }


    /**
     * 著者マスタからデータを取得
     */
    public checkExistAuthor(createBookInfoRepositorys: CreateBookInfoRepositoryInterface,
        parsedRequestBody: BookInfoCreateRequestModel): boolean {

        // select用のentityを作成
        const createBookInfoAuthrosSelectEntity: CreateBookInfoAuthrosSelectEntity =
            new CreateBookInfoAuthrosSelectEntity(
                parsedRequestBody.authorIdListModel
            );

        // データを取得
        const selectedAuthorsList = createBookInfoRepositorys.selectAuthors(createBookInfoAuthrosSelectEntity);

        return selectedAuthorsList.length > 0;
    }


    /**
     * 書籍情報の重複チェック
     * @param acticeBookInfoMasterList 
     * @param activeBookAuthorsMasterList 
     * @param requestBody 
     */
    // public checkBookInfoExists(activeBookInfoMasterList: ReadonlyArray<BookInfoMasterModel>,
    //     acticeBookAuthorsMasterList: ReadonlyArray<BookAuthorsMasterModel>, requestBody: BookInfoCreateRequestModel): string {

    //     let errMessage = "";
    //     // リクエストボディから値を取得
    //     const titleModel: TitleModel = requestBody.titleModel;
    //     const publishedDateModel: PublishedDateModel = requestBody.publishedDateModel;

    //     // リクエストのタイトルと発売日に一致する書籍情報を取得する
    //     const booksFilteredByTitleAndDate: BookInfoMasterModel[] = activeBookInfoMasterList.filter((e: BookInfoMasterModel) => {
    //         return e.titleModel.checkTitleDuplicate(titleModel) &&
    //             e.publishedDateModel.checkPublishedDateDuplicate(publishedDateModel);
    //     });

    //     // 著者IDがすべて一致する書籍情報を取得する
    //     booksFilteredByTitleAndDate.some((e: BookInfoMasterModel) => {

    //         // 書籍IDの一致する書籍著者リストを取得する
    //         const activeBookAuthorsMaster: BookAuthorsMasterModel[] =
    //             acticeBookAuthorsMasterList.filter((e1: BookAuthorsMasterModel) => {

    //                 return e1.bookId === e.bookId;
    //             });

    //         if (activeBookAuthorsMaster.length === 0) {
    //             return true;
    //         }

    //         // 書籍著者情報マスタの著者IDリスト
    //         const masterAuthorIdList = activeBookAuthorsMaster.map((e1: BookAuthorsMasterModel) => {

    //             return e1.authorIdModel;
    //         });

    //         // リクエストの著者IDリストと書籍著者マスタの著者IDリストが完全に一致している場合はエラーとする
    //         if (requestBody.checkAuthorIdListDuplicate(masterAuthorIdList)) {

    //             errMessage = "登録しようとしている書籍情報が既に存在しています。"
    //             return true;
    //         }

    //     });

    //     return errMessage;
    // }


    /**
     * 書籍情報の重複チェック
     * @param acticeBookInfoMasterList 
     * @param activeBookAuthorsMasterList 
     * @param requestBody 
     */
    public checkBookInfoExists(createBookInfoRepositorys: CreateBookInfoRepositoryInterface,
        parsedRequestBody: BookInfoCreateRequestModel): boolean {

        // select用のentityを作成
        const createBookInfoBookAuthrosSelectEntity: CreateBookInfoBookAuthrosSelectEntity =
            new CreateBookInfoBookAuthrosSelectEntity(
                parsedRequestBody.titleModel,
                parsedRequestBody.publishedDateModel,
                parsedRequestBody.authorIdListModel,
            );

        // データを取得
        const selectedAuthorsList = createBookInfoRepositorys.selectBookInfo(createBookInfoBookAuthrosSelectEntity);

        return selectedAuthorsList.length > 0;
    }


    /**
     * 永続ロジック用オブジェクトを取得
     * @returns 
     */
    public getCreateBookInfoRepository(): CreateBookInfoRepositoryInterface {

        const createBookInfoRepositorys = new CreateBookInfoRepositorys();

        return createBookInfoRepositorys.get(RepositoryType.JSON);
    }


    /**
     * 書籍情報の永続ロジック用オブジェクトを取得
     * @returns 
     */
    public getBookInfoMasterRepository(): BookInfoMasterRepositoryInterface {

        const bookInfoMasterRepositorys = new BookInfoMasterRepositorys();

        return bookInfoMasterRepositorys.get(RepositoryType.JSON);
    }

    /**
     * 書籍情報の永続ロジック用オブジェクトを取得
     * @returns 
     */
    public getBookAuthorsMasterRepository(): BookAuthorsMasterRepositoryInterface {

        const bookAuthorsMasterRepositorys = new BookAuthorsMasterRepositorys();

        return bookAuthorsMasterRepositorys.get(RepositoryType.JSON);
    }


    /**
     * コミットする
     * @param bookInfoMasterList 
     */
    public commit(bookInfoMasterRepository: BookInfoMasterRepositoryInterface,
        bookAuthorsMasterRepository: BookAuthorsMasterRepositoryInterface
    ) {

        try {
            bookInfoMasterRepository.commit();
            bookAuthorsMasterRepository.commit();
        } catch (err) {

            throw Error(`${err} endpoint:${ENV.CREATE_BOOK_INFO}`);
        }
    }
}