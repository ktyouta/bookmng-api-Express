import { AuthorsMasterJsonType } from "../../../internaldata/authorsinfomaster/model/AuthorsMasterJsonType";
import { AUTHROS_MASTER_FILE_PATH } from "../../../internaldata/authorsinfomaster/repository/concrete/AuthorsInfoMasterRepositoryJson";
import { BookAuthorsMasterJsonType } from "../../../internaldata/bookauthorsmaster/model/BookAuthorsMasterJsonType";
import { BookAuthorsMasterModel } from "../../../internaldata/bookauthorsmaster/model/BookAuthorsMasterModel";
import { BOOK_AUTHROS_MASTER_FILE_PATH } from "../../../internaldata/bookauthorsmaster/repository/concrete/BookAuthorsMasterRepositoryJson";
import { BookInfoJsonModelType } from "../../../internaldata/bookinfomaster/model/BookInfoMasterJsonModelType";
import { BookInfoMasterModel } from "../../../internaldata/bookinfomaster/model/BookInfoMasterModel";
import { BOOK_INFO_MASTER_FILE_PATH } from "../../../internaldata/bookinfomaster/repository/concrete/BookInfoMasterRepositoryJson";
import { FrontUserInfoMasterInsertEntity } from "../../../internaldata/frontuserinfomaster/entity/FrontUserInfoMasterInsertEntity";
import { FrontUserInfoMasterJsonModelType } from "../../../internaldata/frontuserinfomaster/model/FrontUserInfoMasterJsonModelType";
import { FRONT_USER_INFO_MASTER_FILE_PATH } from "../../../internaldata/frontuserinfomaster/repository/concrete/FrontUserInfoMasterRepositoryJson";
import { GoogleBooksApiAccessHistoryJsonModelType } from "../../../internaldata/googlebooksapiaccesshistory/model/GoogleBooksApiAccessHistoryJsonModelType";
import { GOOGLE_BOOKS_API_ACCESS_HISTORY_TRANSACTION_FILE_PATH } from "../../../internaldata/googlebooksapiaccesshistory/repository/concrete/GoogleBooksApiAccessHistoryRepositoryJson";
import { GoogleBooksApiAuthorsCacheJsonModelType } from "../../../internaldata/googlebooksapiauthorscache/model/GoogleBooksApiAuthorsCacheJsonModelType";
import { GOOGLE_BOOKS_API_AUTHORS_CACHE_FILE_PATH } from "../../../internaldata/googlebooksapiauthorscache/repository/concrete/GoogleBooksApiAuthorsCacheRepositoryJson";
import { GoogleBooksApiInfoCacheJsonModelType } from "../../../internaldata/googlebooksapiinfocache/model/GoogleBooksApiInfoCacheJsonModelType";
import { GOOGLE_BOOKS_API_INFO_CACHE_FILE_PATH } from "../../../internaldata/googlebooksapiinfocache/repository/concrete/GoogleBooksApiInfoCacheRepositoryJson";
import { GoogleBooksApiSmallThumbnailCacheJsonModelType } from "../../../internaldata/googlebooksapismallthumbnailcache/model/GoogleBooksApiSmallThumbnailCacheJsonModelType";
import { GOOGLE_BOOKS_API_SMALLTHUMBNAIL_CACHE_FILE_PATH } from "../../../internaldata/googlebooksapismallthumbnailcache/repository/concrete/GoogleBooksApiSmallThumbnailCacheRepositoryJson";
import { GoogleBooksApiThumbnailCacheJsonModelType } from "../../../internaldata/googlebooksapithumbnailcache/model/GoogleBooksApiThumbnailCacheJsonModelType";
import { GOOGLE_BOOKS_API_THUMBNAIL_CACHE_FILE_PATH } from "../../../internaldata/googlebooksapithumbnailcache/repository/concrete/GoogleBooksApiThumbnailCacheRepositoryJson";
import { JsonFileData } from "../../../util/service/JsonFileData";
import { BookInfoMasterListSelectEntity } from "../../entity/BookInfoMasterListSelectEntity";
import { SearchBookInfoGoogleBooksApiAccessHistorySelectEntity, } from "../../entity/SearchBookInfoGoogleBooksApiAccessHistorySelectEntity";
import { GoogleBooksApiAuthorsCacheSelectEntity } from "../../entity/GoogleBooksApiAuthorsCacheSelectEntity";
import { GoogleBooksApiCacheSelectEntity } from "../../entity/GoogleBooksApiCacheSelectEntity";
import { GoogleBooksApiInfoCacheSelectEntity } from "../../entity/GoogleBooksApiInfoCacheSelectEntity";
import { GoogleBooksApiSmallThumbnailCacheSelectEntity } from "../../entity/GoogleBooksApiSmallThumbnailCacheSelectEntity";
import { GoogleBooksApiThumbnailCacheSelectEntity } from "../../entity/GoogleBooksApiThumbnailCacheSelectEntity";
import { BookInfoListModelType } from "../../model/BookInfoListModelType";
import { BookInfoMergedModelType } from "../../model/BookInfoMergedModelType";
import { GoogleBooksApiCacheModelType } from "../../model/GoogleBooksApiCacheModelType";
import { SearchBookInfoRepositoryInterface } from "../interface/SearchBookInfoRepositoryInterface";



/**
 * json形式の永続ロジック用クラス
 */
export class SearchBookInfoRepositoryJson implements SearchBookInfoRepositoryInterface {

    // Google Books Apiアクセス情報
    private _googleBooksApiAccessHistoryJsonList: ReadonlyArray<GoogleBooksApiAccessHistoryJsonModelType>;
    // Google Books Api書籍キャッシュ情報
    private _googleBooksApiInfoCacheList: ReadonlyArray<GoogleBooksApiInfoCacheJsonModelType>;
    // Google Books Api著者キャッシュ情報
    private _googleBooksApiAuthorsCacheList: ReadonlyArray<GoogleBooksApiAuthorsCacheJsonModelType>;
    // Google Books Apiサムネイル(小)情報
    private _googleBooksApiSmallThumbnailCacheList: ReadonlyArray<GoogleBooksApiSmallThumbnailCacheJsonModelType>;
    // Google Books Apiサムネイル情報
    private _googleBooksApiThumbnailCacheList: ReadonlyArray<GoogleBooksApiThumbnailCacheJsonModelType>;
    // 著者マスタ情報
    private _authorsMasterJsonList: ReadonlyArray<AuthorsMasterJsonType>;
    // 書籍著者情報
    private _bookAuthorsMasterJsonList: ReadonlyArray<BookAuthorsMasterJsonType>;
    // 書籍情報
    private _bookInfoMasterJsonList: ReadonlyArray<BookInfoJsonModelType>;


    constructor() {

        // Google Books Apiアクセス情報ファイルのデータを取得
        const googleBooksApiAccessHistoryJsonList: GoogleBooksApiAccessHistoryJsonModelType[] =
            JsonFileData.getFileObj(GOOGLE_BOOKS_API_ACCESS_HISTORY_TRANSACTION_FILE_PATH);

        // Google Books Api著者キャッシュ情報ファイルのデータを取得
        const googleBooksApiInfoCacheList: GoogleBooksApiInfoCacheJsonModelType[] = JsonFileData.getFileObj(GOOGLE_BOOKS_API_INFO_CACHE_FILE_PATH);

        // Google Books Api著者キャッシュ情報ファイルからデータを取得
        const googleBooksApiAuthorsCacheList: GoogleBooksApiAuthorsCacheJsonModelType[] = JsonFileData.getFileObj(GOOGLE_BOOKS_API_AUTHORS_CACHE_FILE_PATH);

        // Google Books Apiサムネイル(小)キャッシュ情報ファイルからデータを取得
        const googleBooksApiSmallThumbnailCacheList: GoogleBooksApiSmallThumbnailCacheJsonModelType[]
            = JsonFileData.getFileObj(GOOGLE_BOOKS_API_SMALLTHUMBNAIL_CACHE_FILE_PATH);

        // Google Books Apiサムネイルキャッシュ情報ファイルからデータを取得
        const googleBooksApiThumbnailCacheList: GoogleBooksApiThumbnailCacheJsonModelType[]
            = JsonFileData.getFileObj(GOOGLE_BOOKS_API_THUMBNAIL_CACHE_FILE_PATH);

        // 著者マスタファイルからデータを取得
        const authorsMasterList: AuthorsMasterJsonType[] = JsonFileData.getFileObj(AUTHROS_MASTER_FILE_PATH);

        // 書籍著者マスタファイルからデータを取得
        const bookAuthorsMasterList: BookAuthorsMasterJsonType[] = JsonFileData.getFileObj(BOOK_AUTHROS_MASTER_FILE_PATH);

        // 書籍情報マスタファイルからデータを取得
        const jsonBookInfoMasterList: BookInfoJsonModelType[] = JsonFileData.getFileObj(BOOK_INFO_MASTER_FILE_PATH);

        this._googleBooksApiAccessHistoryJsonList = googleBooksApiAccessHistoryJsonList;
        this._googleBooksApiInfoCacheList = googleBooksApiInfoCacheList;
        this._googleBooksApiAuthorsCacheList = googleBooksApiAuthorsCacheList;
        this._googleBooksApiSmallThumbnailCacheList = googleBooksApiSmallThumbnailCacheList;
        this._googleBooksApiThumbnailCacheList = googleBooksApiThumbnailCacheList;
        this._authorsMasterJsonList = authorsMasterList;
        this._bookAuthorsMasterJsonList = bookAuthorsMasterList;
        this._bookInfoMasterJsonList = jsonBookInfoMasterList;
    }


    /**
     * Google Books Apiのアクセス履歴取得
     * @returns 
     */
    public selectGoogleBooksApiAccessHistory(searchBookInfoGoogleBooksApiAccessHistorySelectEntity: SearchBookInfoGoogleBooksApiAccessHistorySelectEntity)
        : ReadonlyArray<GoogleBooksApiAccessHistoryJsonModelType> {

        // FrontUserInfoCreateSelectEntityでselectする
        const selectedFrontUserInfoMasterJsonList = this._googleBooksApiAccessHistoryJsonList.filter((e: GoogleBooksApiAccessHistoryJsonModelType) => {
            return e.keyword === searchBookInfoGoogleBooksApiAccessHistorySelectEntity.keyword &&
                e.accessDate === searchBookInfoGoogleBooksApiAccessHistorySelectEntity.accessDate;
        });

        return selectedFrontUserInfoMasterJsonList;
    }

    /**
     * Google Books Apiのキャッシュ情報取得
     */
    public selectGoogleBooksApiCacheList(googleBooksApiCacheSelectEntity: GoogleBooksApiCacheSelectEntity): GoogleBooksApiCacheModelType[] {

        // キャッシュ情報をマージする
        const GoogleBooksApiCacheMergedList: GoogleBooksApiCacheModelType[] =
            this._googleBooksApiInfoCacheList.map((e: GoogleBooksApiInfoCacheJsonModelType) => {

                let authors: string[] = [];
                let smallThumbnail = "";
                let thumbnail = "";

                // 著者キャッシュ情報から書籍IDに一致するデータを取得する
                const googleBooksApiAuthorsCache: GoogleBooksApiAuthorsCacheJsonModelType[] =
                    this._googleBooksApiAuthorsCacheList.filter((e1: GoogleBooksApiAuthorsCacheJsonModelType) => {

                        return e1.bookId === e.bookId;
                    });

                if (googleBooksApiAuthorsCache && googleBooksApiAuthorsCache.length > 0) {

                    authors = googleBooksApiAuthorsCache.map((e1: GoogleBooksApiAuthorsCacheJsonModelType) => {
                        return e1.authorName;
                    });
                }

                // サムネイル(小)情報から書籍IDに一致するデータを取得する
                const googleBooksApiSmallThumbnailCache = this._googleBooksApiSmallThumbnailCacheList.find((e1: GoogleBooksApiSmallThumbnailCacheJsonModelType) => {
                    return e1.bookId === e.bookId;
                });

                if (googleBooksApiSmallThumbnailCache) {
                    smallThumbnail = googleBooksApiSmallThumbnailCache.smallThumbnail;
                }

                // サムネイル(小)情報から書籍IDに一致するデータを取得する
                const googleBooksApiThumbnailCache = this._googleBooksApiThumbnailCacheList.find((e1: GoogleBooksApiThumbnailCacheJsonModelType) => {
                    return e1.bookId === e.bookId;
                });

                if (googleBooksApiThumbnailCache) {
                    thumbnail = googleBooksApiThumbnailCache.thumbnail;
                }

                return {
                    bookId: e.bookId,
                    title: e.title,
                    authors: authors,
                    publishedDate: e.publishedDate,
                    imageLinks: {
                        smallThumbnail: smallThumbnail,
                        thumbnail: thumbnail,
                    },
                    description: e.description,
                };

            });

        const keyword = googleBooksApiCacheSelectEntity.keyword;

        const filterGoogleBooksApiCacheList: GoogleBooksApiCacheModelType[] =
            GoogleBooksApiCacheMergedList.filter((e: GoogleBooksApiCacheModelType) => {

                // タイトル、説明、著者に対してキーワードでデータを取得する
                const titleRegex = new RegExp(e.title ?? ``, "i");
                const descriptionRegex = new RegExp(e.description ?? ``, "i");

                return titleRegex.test(keyword) || descriptionRegex.test(keyword) || e.authors?.some((e1) => {

                    const authorNameRegex = new RegExp(e1, "i");
                    return authorNameRegex.test(keyword);
                });
            });

        return filterGoogleBooksApiCacheList;
    }


    /**
     * Google Books Apiのサムネイル(小)キャッシュ情報取得
     * @returns 
     */
    public selectGoogleBooksApiSmallThumbnailCacheList(
        googleBooksApiSmallThumbnailCacheSelectEntity: GoogleBooksApiSmallThumbnailCacheSelectEntity)
        : ReadonlyArray<GoogleBooksApiSmallThumbnailCacheJsonModelType> {

        const googleBooksApiSmallThumbnailCacheList =
            this._googleBooksApiSmallThumbnailCacheList.filter((e: GoogleBooksApiSmallThumbnailCacheJsonModelType) => {

                return e.bookId === googleBooksApiSmallThumbnailCacheSelectEntity.bookId;
            });

        return googleBooksApiSmallThumbnailCacheList;
    }


    /**
     * Google Books Apiのサムネイルキャッシュ情報取得
     * @returns 
     */
    public selectGoogleBooksApiThumbnailCacheList(
        googleBooksApiThumbnailCacheSelectEntity: GoogleBooksApiThumbnailCacheSelectEntity)
        : ReadonlyArray<GoogleBooksApiThumbnailCacheJsonModelType> {

        const googleBooksApiThumbnailCacheList =
            this._googleBooksApiThumbnailCacheList.filter((e: GoogleBooksApiThumbnailCacheJsonModelType) => {

                return e.bookId === googleBooksApiThumbnailCacheSelectEntity.bookId;
            });

        return googleBooksApiThumbnailCacheList;
    }


    /**
     * Google Books Apiの書籍キャッシュ情報取得
     * @returns 
     */
    public selectGoogleBooksApiInfoCacheList(
        googleBooksApiInfoCacheSelectEntity: GoogleBooksApiInfoCacheSelectEntity)
        : ReadonlyArray<GoogleBooksApiInfoCacheJsonModelType> {

        const googleBooksApiInfoCacheList =
            this._googleBooksApiInfoCacheList.filter((e: GoogleBooksApiInfoCacheJsonModelType) => {

                return e.bookId === googleBooksApiInfoCacheSelectEntity.bookId;
            });

        return googleBooksApiInfoCacheList;
    }


    /**
     * Google Books Apiの著者キャッシュ情報取得
     * @returns 
     */
    public selectGoogleBooksApiAuthorsCacheList(
        googleBooksApiAuthorsCacheSelectEntity: GoogleBooksApiAuthorsCacheSelectEntity)
        : ReadonlyArray<GoogleBooksApiAuthorsCacheJsonModelType> {

        const googleBooksApiAuthorsCacheList =
            this._googleBooksApiAuthorsCacheList.filter((e: GoogleBooksApiInfoCacheJsonModelType) => {

                return e.bookId === googleBooksApiAuthorsCacheSelectEntity.bookId;
            });

        return googleBooksApiAuthorsCacheList;
    }


    /**
     * 書籍マスタ情報取得
     * @returns 
     */
    public selectBookInfoMasterList(
        bookInfoMasterListSelectEntity: BookInfoMasterListSelectEntity)
        : ReadonlyArray<BookInfoListModelType> {

        const bookInfoList: BookInfoMergedModelType[] = this._bookInfoMasterJsonList.map((e: BookInfoJsonModelType) => {

            // 書籍IDに一致する著者IDリストを取得する
            const authorsIdList: string[] =
                this._bookAuthorsMasterJsonList.filter((e1: BookAuthorsMasterJsonType) => {
                    return e1.bookId === e.bookId;
                }).map((e1: BookAuthorsMasterJsonType) => {
                    return e1.authorId;
                });

            // 著者マスタから著者を取得
            const authorsNameList: string[] = this._authorsMasterJsonList.filter((e1: AuthorsMasterJsonType) => {
                return authorsIdList.includes(e1.authorId);
            }).map((e1: AuthorsMasterJsonType) => {
                return e1.authorName;
            });

            return {
                bookId: e.bookId,
                title: e.title,
                publishedDate: e.publishedDate,
                description: e.description,
                authors: authorsNameList,
            }
        });

        const keyword = bookInfoMasterListSelectEntity.keyword;

        const filterdBookInfoList = bookInfoList.filter((e: BookInfoMergedModelType) => {

            const titleRegex = new RegExp(e.title ?? ``, "i");
            const descriptionRegex = new RegExp(e.description ?? ``, "i");

            return titleRegex.test(keyword) || descriptionRegex.test(keyword) || e.authors.some((e1: string) => {

                const authorNameRegex = new RegExp(e1, "i");
                return authorNameRegex.test(keyword);
            });
        });

        return filterdBookInfoList;
    }
}