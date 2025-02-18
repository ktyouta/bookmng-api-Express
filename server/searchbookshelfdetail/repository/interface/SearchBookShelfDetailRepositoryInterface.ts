import { AuthorsMasterJsonType } from "../../../internaldata/authorsinfomaster/model/AuthorsMasterJsonType";
import { BookAuthorsMasterJsonType } from "../../../internaldata/bookauthorsmaster/model/BookAuthorsMasterJsonType";
import { BookShelfJsonModelType } from "../../../internaldata/bookshelf/model/BookShelfJsonModelType";
import { GoogleBooksApiAuthorsCacheJsonModelType } from "../../../internaldata/googlebooksapiauthorscache/model/GoogleBooksApiAuthorsCacheJsonModelType";
import { GoogleBooksApiThumbnailCacheJsonModelType } from "../../../internaldata/googlebooksapithumbnailcache/model/GoogleBooksApiThumbnailCacheJsonModelType";
import { SearchBookShelfDetailAuthorsSelectEntity } from "../../entity/SearchBookShelfDetailAuthorsSelectEntity";
import { SearchBookShelfDetailBookAuthorsSelectEntity } from "../../entity/SearchBookShelfDetailBookAuthorsSelectEntity";
import { SearchBookShelfDetailSelectEntity } from "../../entity/SearchBookShelfDetailSelectEntity";
import { SearchBooksShelfListGoogleAuthorsCacheSelectEntity } from "../../entity/SearchBooksShelfDetailGoogleAuthorsCacheSelectEntity";
import { SearchBooksShelfListGoogleThumbnailCacheSelectModel } from "../../entity/SearchBooksShelfDetailGoogleThumbnailCacheSelectModel";
import { SearchBookShelfDetailType } from "../../model/SearchBookShelfDetailType";


/**
 * 永続ロジック用インターフェース
 */
export interface SearchBookShelfDetailRepositoryInterface {

    /**
     * 書籍情報取得
     * @param searchBookShelfDetailSelectEntity 
     */
    selectBookShelfDetail(searchBookShelfDetailSelectEntity: SearchBookShelfDetailSelectEntity): ReadonlyArray<SearchBookShelfDetailType>;

    /**
     * 書籍著者情報を取得
     * @param searchBookShelfDetailBookAuthorsSelectEntity 
     */
    selectBookAuthorList(searchBookShelfDetailBookAuthorsSelectEntity: SearchBookShelfDetailBookAuthorsSelectEntity): ReadonlyArray<BookAuthorsMasterJsonType>;

    /**
     * 著者情報を取得
     * @param searchBookShelfDetailAuthorsSelectEntity 
     */
    selectAuthorList(searchBookShelfDetailAuthorsSelectEntity: SearchBookShelfDetailAuthorsSelectEntity): ReadonlyArray<AuthorsMasterJsonType>;

    /**
     * Google Books Api著者キャッシュ情報を取得
     * @param searchBookShelfDetailAuthorsSelectEntity 
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