import { FrontUserInfoMasterInsertEntity } from "../../../internaldata/frontuserinfomaster/entity/FrontUserInfoMasterInsertEntity";
import { FrontUserInfoMasterJsonModelType } from "../../../internaldata/frontuserinfomaster/model/FrontUserInfoMasterJsonModelType";
import { FRONT_USER_INFO_MASTER_FILE_PATH } from "../../../internaldata/frontuserinfomaster/repository/concrete/FrontUserInfoMasterRepositoryJson";
import { GoogleBooksApiAccessHistoryJsonModelType } from "../../../internaldata/googlebooksapiaccesshistory/model/GoogleBooksApiAccessHistoryJsonModelType";
import { GOOGLE_BOOKS_API_ACCESS_HISTORY_TRANSACTION_FILE_PATH } from "../../../internaldata/googlebooksapiaccesshistory/repository/concrete/GoogleBooksApiAccessHistoryRepositoryJson";
import { GoogleBooksApiAuthorsCacheJsonModelType } from "../../../internaldata/googlebooksapiauthorscache/model/GoogleBooksApiAuthorsCacheJsonModelType";
import { GOOGLE_BOOKS_API_AUTHORS_CACHE_FILE_PATH } from "../../../internaldata/googlebooksapiauthorscache/repository/concrete/GoogleBooksApiAuthorsCacheRepositoryJson";
import { GoogleBooksApiCacheModelType } from "../../../internaldata/googlebooksapicacheoperation/model/GoogleBooksApiCacheModelType";
import { GoogleBooksApiInfoCacheJsonModelType } from "../../../internaldata/googlebooksapiinfocache/model/GoogleBooksApiInfoCacheJsonModelType";
import { GOOGLE_BOOKS_API_INFO_CACHE_FILE_PATH } from "../../../internaldata/googlebooksapiinfocache/repository/concrete/GoogleBooksApiInfoCacheRepositoryJson";
import { GoogleBooksApiSmallThumbnailCacheJsonModelType } from "../../../internaldata/googlebooksapismallthumbnailcache/model/GoogleBooksApiSmallThumbnailCacheJsonModelType";
import { GOOGLE_BOOKS_API_SMALLTHUMBNAIL_CACHE_FILE_PATH } from "../../../internaldata/googlebooksapismallthumbnailcache/repository/concrete/GoogleBooksApiSmallThumbnailCacheRepositoryJson";
import { GoogleBooksApiThumbnailCacheJsonModelType } from "../../../internaldata/googlebooksapithumbnail/model/GoogleBooksApiThumbnailCacheJsonModelType";
import { GOOGLE_BOOKS_API_THUMBNAIL_CACHE_FILE_PATH } from "../../../internaldata/googlebooksapithumbnail/repository/concrete/GoogleBooksApiThumbnailCacheRepositoryJson";
import { JsonFileData } from "../../../util/service/JsonFileData";
import { BookSearchGoogleBooksApiAccessHistorySelectEntity, } from "../../entity/BookSearchGoogleBooksApiAccessHistorySelectEntity";
import { GoogleBooksApiCacheSelectEntity } from "../../entity/GoogleBooksApiCacheSelectEntity";
import { GoogleBooksApiSmallThumbnailCacheSelectEntity } from "../../entity/GoogleBooksApiSmallThumbnailCacheSelectEntity";
import { BookSearchRepositoryInterface, } from "../interface/BookSearchRepositoryInterface";



/**
 * json形式の永続ロジック用クラス
 */
export class BookSearchRepositoryJson implements BookSearchRepositoryInterface {

    private _googleBooksApiAccessHistoryJsonList: ReadonlyArray<GoogleBooksApiAccessHistoryJsonModelType>;
    private _googleBooksApiInfoCacheList: ReadonlyArray<GoogleBooksApiInfoCacheJsonModelType>;
    private _googleBooksApiAuthorsCacheList: ReadonlyArray<GoogleBooksApiAuthorsCacheJsonModelType>;
    private _googleBooksApiSmallThumbnailCacheList: ReadonlyArray<GoogleBooksApiSmallThumbnailCacheJsonModelType>;
    private _googleBooksApiThumbnailCacheList: ReadonlyArray<GoogleBooksApiThumbnailCacheJsonModelType>;

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


        this._googleBooksApiAccessHistoryJsonList = googleBooksApiAccessHistoryJsonList;
        this._googleBooksApiInfoCacheList = googleBooksApiInfoCacheList;
        this._googleBooksApiAuthorsCacheList = googleBooksApiAuthorsCacheList;
        this._googleBooksApiSmallThumbnailCacheList = googleBooksApiSmallThumbnailCacheList;
        this._googleBooksApiThumbnailCacheList = googleBooksApiThumbnailCacheList;
    }


    /**
     * Google Books Apiのアクセス履歴取得
     * @returns 
     */
    public selectGoogleBooksApiAccessHistory(bookSearchGoogleBooksApiAccessHistorySelectEntity: BookSearchGoogleBooksApiAccessHistorySelectEntity)
        : ReadonlyArray<GoogleBooksApiAccessHistoryJsonModelType> {

        // FrontUserInfoCreateSelectEntityでselectする
        const selectedFrontUserInfoMasterJsonList = this._googleBooksApiAccessHistoryJsonList.filter((e: GoogleBooksApiAccessHistoryJsonModelType) => {
            return e.keyword === bookSearchGoogleBooksApiAccessHistorySelectEntity.keyword &&
                e.accessDate === bookSearchGoogleBooksApiAccessHistorySelectEntity.accessDate;
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

        const filterGoogleBooksApiCacheList = GoogleBooksApiCacheMergedList.filter((e: GoogleBooksApiCacheModelType) => {

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

        return [];
    }

}