import { AuthorsMasterJsonType } from "../../../internaldata/authorsinfomaster/model/AuthorsMasterJsonType";
import { BookAuthorsMasterJsonType } from "../../../internaldata/bookauthorsmaster/model/BookAuthorsMasterJsonType";
import { BookShelfJsonModelType } from "../../../internaldata/bookshelf/model/BookShelfJsonModelType";
import { GoogleBooksApiAuthorsCacheJsonModelType } from "../../../internaldata/googlebooksapiauthorscache/model/GoogleBooksApiAuthorsCacheJsonModelType";
import { GoogleBooksApiThumbnailCacheJsonModelType } from "../../../internaldata/googlebooksapithumbnailcache/model/GoogleBooksApiThumbnailCacheJsonModelType";
import { SearchBookShelfListAuthorsSelectEntity } from "../../entity/SearchBookShelfListAuthorsSelectEntity";
import { SearchBookShelfListBookAuthorsSelectEntity } from "../../entity/SearchBookShelfListBookAuthorsSelectEntity";
import { SearchBookShelfListSelectEntity } from "../../entity/SearchBookShelfListSelectEntity";
import { SearchBooksShelfListGoogleAuthorsCacheSelectEntity } from "../../entity/SearchBooksShelfListGoogleAuthorsCacheSelectEntity";
import { SearchBooksShelfListGoogleThumbnailCacheSelectModel } from "../../entity/SearchBooksShelfListGoogleThumbnailCacheSelectModel";
import { SearchBookShelfListType } from "../../model/SearchBookShelfListType";


/**
 * 永続ロジック用インターフェース
 */
export interface SearchBookShelfListRepositoryInterface {

    /**
     * 書籍情報取得
     * @param searchBookShelfListSelectEntity 
     */
    selectBookShelfList(searchBookShelfListSelectEntity: SearchBookShelfListSelectEntity): ReadonlyArray<SearchBookShelfListType>;

    /**
     * 書籍著者情報を取得
     * @param searchBookShelfListBookAuthorsSelectEntity 
     */
    selectBookAuthorList(searchBookShelfListBookAuthorsSelectEntity: SearchBookShelfListBookAuthorsSelectEntity): ReadonlyArray<BookAuthorsMasterJsonType>;

    /**
     * 著者情報を取得
     * @param searchBookShelfListAuthorsSelectEntity 
     */
    selectAuthorList(searchBookShelfListAuthorsSelectEntity: SearchBookShelfListAuthorsSelectEntity): ReadonlyArray<AuthorsMasterJsonType>;

    /**
     * Google Books Api著者キャッシュ情報を取得
     * @param searchBookShelfListAuthorsSelectEntity 
     */
    selectGoogleBooksApiAuthorsCacheList(searchBooksShelfListGoogleAuthorsCacheSelectEntity: SearchBooksShelfListGoogleAuthorsCacheSelectEntity):
        ReadonlyArray<GoogleBooksApiAuthorsCacheJsonModelType>;

    /**
     * Google Books Apiサムネイルキャッシュ情報を取得
     * @param searchBooksShelfListGoogleThumbnailCacheSelectModel 
     */
    selectGoogleBooksApiThumbnailCacheList(searchBooksShelfListGoogleThumbnailCacheSelectModel: SearchBooksShelfListGoogleThumbnailCacheSelectModel):
        ReadonlyArray<GoogleBooksApiThumbnailCacheJsonModelType>;

}