import { AuthorsMasterJsonType } from "../../../internaldata/authorsinfomaster/model/AuthorsMasterJsonType";
import { AUTHROS_MASTER_FILE_PATH } from "../../../internaldata/authorsinfomaster/repository/concrete/AuthorsInfoMasterRepositoryJson";
import { BookAuthorsMasterJsonType } from "../../../internaldata/bookauthorsmaster/model/BookAuthorsMasterJsonType";
import { BOOK_AUTHROS_MASTER_FILE_PATH } from "../../../internaldata/bookauthorsmaster/repository/concrete/BookAuthorsMasterRepositoryJson";
import { BookInfoJsonModelType } from "../../../internaldata/bookinfomaster/model/BookInfoMasterJsonModelType";
import { BOOK_INFO_MASTER_FILE_PATH } from "../../../internaldata/bookinfomaster/repository/concrete/BookInfoMasterRepositoryJson";
import { BookShelfJsonModelType } from "../../../internaldata/bookshelf/model/BookShelfJsonModelType";
import { BOOKSHELF_FILE_PATH } from "../../../internaldata/bookshelf/repository/concrete/BookShelfRepositoryJson";
import { BookShelfRepositoryInterface } from "../../../internaldata/bookshelf/repository/interface/BookShelfRepositoryInterface";
import { GoogleBooksApiAuthorsCacheJsonModelType } from "../../../internaldata/googlebooksapiauthorscache/model/GoogleBooksApiAuthorsCacheJsonModelType";
import { GOOGLE_BOOKS_API_AUTHORS_CACHE_FILE_PATH } from "../../../internaldata/googlebooksapiauthorscache/repository/concrete/GoogleBooksApiAuthorsCacheRepositoryJson";
import { GoogleBooksApiInfoCacheJsonModelType } from "../../../internaldata/googlebooksapiinfocache/model/GoogleBooksApiInfoCacheJsonModelType";
import { GOOGLE_BOOKS_API_INFO_CACHE_FILE_PATH } from "../../../internaldata/googlebooksapiinfocache/repository/concrete/GoogleBooksApiInfoCacheRepositoryJson";
import { GoogleBooksApiThumbnailCacheJsonModelType } from "../../../internaldata/googlebooksapithumbnailcache/model/GoogleBooksApiThumbnailCacheJsonModelType";
import { GOOGLE_BOOKS_API_THUMBNAIL_CACHE_FILE_PATH } from "../../../internaldata/googlebooksapithumbnailcache/repository/concrete/GoogleBooksApiThumbnailCacheRepositoryJson";
import { FLG } from "../../../util/const/CommonConst";
import { JsonFileData } from "../../../util/service/JsonFileData";
import { SearchBookShelfListAuthorsSelectEntity } from "../../entity/SearchBookShelfListAuthorsSelectEntity";
import { SearchBookShelfListBookAuthorsSelectEntity } from "../../entity/SearchBookShelfListBookAuthorsSelectEntity";
import { SearchBookShelfListSelectEntity } from "../../entity/SearchBookShelfListSelectEntity";
import { SearchBooksShelfListGoogleAuthorsCacheSelectEntity } from "../../entity/SearchBooksShelfListGoogleAuthorsCacheSelectEntity";
import { SearchBooksShelfListGoogleThumbnailCacheSelectModel } from "../../entity/SearchBooksShelfListGoogleThumbnailCacheSelectModel";
import { SearchBookShelfListType } from "../../model/SearchBookShelfListType";
import { SearchBookShelfListRepositoryInterface } from "../interface/SearchBookShelfListRepositoryInterface";



/**
 * json形式の永続ロジック用クラス
 */
export class SearchBookShelfListRepositoryJson implements SearchBookShelfListRepositoryInterface {

    // 本棚情報
    private _bookShelfJsonList: ReadonlyArray<BookShelfJsonModelType>;
    // 著者マスタ情報
    private _authorsMasterJsonList: ReadonlyArray<AuthorsMasterJsonType>;
    // 書籍著者情報
    private _bookAuthorsMasterJsonList: ReadonlyArray<BookAuthorsMasterJsonType>;
    // 書籍情報
    private _bookInfoMasterJsonList: ReadonlyArray<BookInfoJsonModelType>;
    // Google Books Api書籍キャッシュ情報
    private _googleBooksApiInfoCacheList: ReadonlyArray<GoogleBooksApiInfoCacheJsonModelType>;
    // Google Books Api著者キャッシュ情報
    private _googleBooksApiAuthorsCacheList: ReadonlyArray<GoogleBooksApiAuthorsCacheJsonModelType>;
    // Google Books Apiサムネイル情報
    private _googleBooksApiThumbnailCacheList: ReadonlyArray<GoogleBooksApiThumbnailCacheJsonModelType>;


    constructor() {

        // 本棚情報ファイルからデータを取得
        const bookShelfJsonModelType: BookShelfJsonModelType[] = JsonFileData.getFileObj(BOOKSHELF_FILE_PATH);
        // 著者マスタファイルからデータを取得
        const authorsMasterList: AuthorsMasterJsonType[] = JsonFileData.getFileObj(AUTHROS_MASTER_FILE_PATH);
        // 書籍著者マスタファイルからデータを取得
        const bookAuthorsMasterList: BookAuthorsMasterJsonType[] = JsonFileData.getFileObj(BOOK_AUTHROS_MASTER_FILE_PATH);
        // 書籍情報マスタファイルからデータを取得
        const jsonBookInfoMasterList: BookInfoJsonModelType[] = JsonFileData.getFileObj(BOOK_INFO_MASTER_FILE_PATH);
        // Google Books Api著者キャッシュ情報ファイルのデータを取得
        const googleBooksApiInfoCacheList: GoogleBooksApiInfoCacheJsonModelType[] = JsonFileData.getFileObj(GOOGLE_BOOKS_API_INFO_CACHE_FILE_PATH);
        // Google Books Api著者キャッシュ情報ファイルからデータを取得
        const googleBooksApiAuthorsCacheList: GoogleBooksApiAuthorsCacheJsonModelType[] = JsonFileData.getFileObj(GOOGLE_BOOKS_API_AUTHORS_CACHE_FILE_PATH);
        // Google Books Apiサムネイルキャッシュ情報ファイルからデータを取得
        const googleBooksApiThumbnailCacheList: GoogleBooksApiThumbnailCacheJsonModelType[] = JsonFileData.getFileObj(GOOGLE_BOOKS_API_THUMBNAIL_CACHE_FILE_PATH);

        this._bookShelfJsonList = bookShelfJsonModelType;
        this._authorsMasterJsonList = authorsMasterList;
        this._bookAuthorsMasterJsonList = bookAuthorsMasterList;
        this._bookInfoMasterJsonList = jsonBookInfoMasterList;
        this._googleBooksApiInfoCacheList = googleBooksApiInfoCacheList;
        this._googleBooksApiAuthorsCacheList = googleBooksApiAuthorsCacheList;
        this._googleBooksApiThumbnailCacheList = googleBooksApiThumbnailCacheList;
    }


    /**
     * 本棚情報を取得
     * @param frontBookShelfInfoMasterModel 
     * @returns 
     */
    public selectBookShelfList(searchBookShelfListSelectEntity: SearchBookShelfListSelectEntity): ReadonlyArray<SearchBookShelfListType> {

        const frontUserId = searchBookShelfListSelectEntity.frontUserId;
        const readStatusCondition = searchBookShelfListSelectEntity.readStatus;
        const titleCondition = searchBookShelfListSelectEntity.title;

        const bookShelfList: ReadonlyArray<BookShelfJsonModelType> =
            this._bookShelfJsonList.filter((e: BookShelfJsonModelType) => {
                return e.userId === frontUserId &&
                    e.deleteFlg === FLG.OFF &&
                    (!readStatusCondition || e.readStatus === readStatusCondition);
            });

        const retBookShelf: ReadonlyArray<SearchBookShelfListType> = bookShelfList.map((e: BookShelfJsonModelType) => {

            const bookId = e.bookId;

            // 書籍情報を取得
            const bookInfoMaster = this._bookInfoMasterJsonList.find((e1: BookInfoJsonModelType) => {
                return e1.bookId === bookId && (!titleCondition || e1.title.includes(titleCondition));
            });

            if (bookInfoMaster) {

                return {
                    userId: frontUserId,
                    bookId: bookId,
                    title: bookInfoMaster.title,
                    readStatus: e.readStatus,
                    thumbnail: ``,
                    smallThumbnail: ``,
                }
            }

            // 書籍マスタにデータが存在しない場合はGoogle Books Apiのキャッシュからデータを取得する
            const googleBooksApiInfo = this._googleBooksApiInfoCacheList.find((e1: GoogleBooksApiInfoCacheJsonModelType) => {
                return e1.bookId === e.bookId;
            });

            if (!googleBooksApiInfo) {
                return;
            }

            // Google Books Apiのサムネイル情報を取得する

            return {
                userId: frontUserId,
                bookId: bookId,
                title: googleBooksApiInfo.title ?? ``,
                readStatus: e.readStatus,
                thumbnail: ``,
                smallThumbnail: ``,
            }
        }).flatMap(e => e ? [e] : []);

        return retBookShelf;
    }


    /**
     * 書籍著者情報を取得
     * @param frontBookShelfInfoMasterModel 
     * @returns 
     */
    public selectBookAuthorList(searchBookShelfListBookAuthorsSelectEntity: SearchBookShelfListBookAuthorsSelectEntity)
        : ReadonlyArray<BookAuthorsMasterJsonType> {

        const bookId = searchBookShelfListBookAuthorsSelectEntity.bookId;

        const bookShelfList: ReadonlyArray<BookAuthorsMasterJsonType> =
            this._bookAuthorsMasterJsonList.filter((e: BookAuthorsMasterJsonType) => {
                return e.bookId === bookId && e.deleteFlg === FLG.OFF;
            });

        return bookShelfList;
    }


    /**
     * 著者情報を取得
     * @param frontBookShelfInfoMasterModel 
     * @returns 
     */
    public selectAuthorList(searchBookShelfListAuthorsSelectEntity: SearchBookShelfListAuthorsSelectEntity):
        ReadonlyArray<AuthorsMasterJsonType> {

        const authorId = searchBookShelfListAuthorsSelectEntity.authorId;

        const authorsList: ReadonlyArray<AuthorsMasterJsonType> =
            this._authorsMasterJsonList.filter((e: AuthorsMasterJsonType) => {
                return e.authorId === authorId && e.deleteFlg === FLG.OFF;
            });

        return authorsList;
    }


    /**
     * Google Books Api著者キャッシュ情報を取得
     * @param searchBooksShelfListGoogleAuthorsCacheSelectEntity 
     */
    public selectGoogleBooksApiAuthorsCacheList(searchBooksShelfListGoogleAuthorsCacheSelectEntity: SearchBooksShelfListGoogleAuthorsCacheSelectEntity)
        : GoogleBooksApiAuthorsCacheJsonModelType[] {

        const bookId = searchBooksShelfListGoogleAuthorsCacheSelectEntity.bookId;

        const googleBooksApiAuthorsCacheList = this._googleBooksApiAuthorsCacheList.filter((e: GoogleBooksApiAuthorsCacheJsonModelType) => {
            return e.bookId === bookId;
        });

        return googleBooksApiAuthorsCacheList;
    }


    /**
     * Google Books Api著者キャッシュ情報を取得
     * @param searchBooksShelfListGoogleAuthorsCacheSelectEntity 
     */
    public selectGoogleBooksApiThumbnailCacheList(searchBooksShelfListGoogleThumbnailCacheSelectModel: SearchBooksShelfListGoogleThumbnailCacheSelectModel)
        : ReadonlyArray<GoogleBooksApiThumbnailCacheJsonModelType> {

        const bookId = searchBooksShelfListGoogleThumbnailCacheSelectModel.bookId;

        const googleBooksApiThumbnailCacheList: ReadonlyArray<GoogleBooksApiThumbnailCacheJsonModelType> =
            this._googleBooksApiThumbnailCacheList.filter((e: GoogleBooksApiThumbnailCacheJsonModelType) => {
                return e.bookId === bookId;
            });

        return googleBooksApiThumbnailCacheList;
    }
}