import { FrontUserInfoMasterJsonModelType } from "../../../internaldata/frontuserinfomaster/model/FrontUserInfoMasterJsonModelType";
import { GoogleBooksApiAccessHistoryJsonModelType } from "../../../internaldata/googlebooksapiaccesshistory/model/GoogleBooksApiAccessHistoryJsonModelType";
import { GoogleBooksApiAuthorsCacheJsonModelType } from "../../../internaldata/googlebooksapiauthorscache/model/GoogleBooksApiAuthorsCacheJsonModelType";
import { GoogleBooksApiInfoCacheJsonModelType } from "../../../internaldata/googlebooksapiinfocache/model/GoogleBooksApiInfoCacheJsonModelType";
import { GoogleBooksApiSmallThumbnailCacheJsonModelType } from "../../../internaldata/googlebooksapismallthumbnailcache/model/GoogleBooksApiSmallThumbnailCacheJsonModelType";
import { GoogleBooksApiThumbnailCacheJsonModelType } from "../../../internaldata/googlebooksapithumbnailcache/model/GoogleBooksApiThumbnailCacheJsonModelType";
import { BookInfoMasterListSelectEntity } from "../../entity/BookInfoMasterListSelectEntity";
import { SearchBookInfoGoogleBooksApiAccessHistorySelectEntity, } from "../../entity/SearchBookInfoGoogleBooksApiAccessHistorySelectEntity";
import { GoogleBooksApiAuthorsCacheSelectEntity } from "../../entity/GoogleBooksApiAuthorsCacheSelectEntity";
import { GoogleBooksApiCacheSelectEntity } from "../../entity/GoogleBooksApiCacheSelectEntity";
import { GoogleBooksApiInfoCacheSelectEntity } from "../../entity/GoogleBooksApiInfoCacheSelectEntity";
import { GoogleBooksApiSmallThumbnailCacheSelectEntity } from "../../entity/GoogleBooksApiSmallThumbnailCacheSelectEntity";
import { GoogleBooksApiThumbnailCacheSelectEntity } from "../../entity/GoogleBooksApiThumbnailCacheSelectEntity";
import { BookInfoListModelType } from "../../model/BookInfoListModelType";
import { GoogleBooksApiCacheModelType } from "../../model/GoogleBooksApiCacheModelType";


/**
 * 永続ロジック用インターフェース
 */
export interface SearchBookInfoRepositoryInterface {

    /**
     * Google Books Apiのアクセス履歴取得
     */
    selectGoogleBooksApiAccessHistory(searchBookInfoGoogleBooksApiAccessHistorySelectEntity: SearchBookInfoGoogleBooksApiAccessHistorySelectEntity)
        : ReadonlyArray<GoogleBooksApiAccessHistoryJsonModelType>;

    /**
     * Google Books Apiのキャッシュ情報取得
     */
    selectGoogleBooksApiCacheList(googleBooksApiCacheSelectEntity: GoogleBooksApiCacheSelectEntity): ReadonlyArray<GoogleBooksApiCacheModelType>;

    /**
     * Google Books Apiのサムネイル(小)キャッシュ情報取得
     * @param googleBooksApiCacheSelectEntity 
     */
    selectGoogleBooksApiSmallThumbnailCacheList(
        googleBooksApiSmallThumbnailCacheSelectEntity: GoogleBooksApiSmallThumbnailCacheSelectEntity)
        : ReadonlyArray<GoogleBooksApiSmallThumbnailCacheJsonModelType>;

    /**
     * Google Books Apiのサムネイルキャッシュ情報取得
     * @param googleBooksApiSmallThumbnailCacheSelectEntity 
     */
    selectGoogleBooksApiThumbnailCacheList(
        googleBooksApiThumbnailCacheSelectEntity: GoogleBooksApiThumbnailCacheSelectEntity)
        : ReadonlyArray<GoogleBooksApiThumbnailCacheJsonModelType>;

    /**
     * Google Books Apiの書籍キャッシュ情報取得
     * @param googleBooksApiInfoCacheSelectEntity 
     */
    selectGoogleBooksApiInfoCacheList(
        googleBooksApiInfoCacheSelectEntity: GoogleBooksApiInfoCacheSelectEntity)
        : ReadonlyArray<GoogleBooksApiInfoCacheJsonModelType>;

    /**
     * Google Books Apiの著者キャッシュ情報取得
     * @param googleBooksApiInfoCacheSelectEntity 
     */
    selectGoogleBooksApiAuthorsCacheList(
        googleBooksApiAuthorsCacheSelectEntity: GoogleBooksApiAuthorsCacheSelectEntity)
        : ReadonlyArray<GoogleBooksApiAuthorsCacheJsonModelType>;

    /**
     * 書籍マスタ情報取得
     * @param googleBooksApiInfoCacheSelectEntity 
     */
    selectBookInfoMasterList(
        bookInfoMasterListSelectEntity: BookInfoMasterListSelectEntity)
        : ReadonlyArray<BookInfoListModelType>;
}