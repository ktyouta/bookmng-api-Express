import { FrontUserInfoMasterJsonModelType } from "../../../internaldata/frontuserinfomaster/model/FrontUserInfoMasterJsonModelType";
import { GoogleBooksApiAccessHistoryJsonModelType } from "../../../internaldata/googlebooksapiaccesshistory/model/GoogleBooksApiAccessHistoryJsonModelType";
import { GoogleBooksApiCacheModelType } from "../../../internaldata/googlebooksapicacheoperation/model/GoogleBooksApiCacheModelType";
import { GoogleBooksApiInfoCacheJsonModelType } from "../../../internaldata/googlebooksapiinfocache/model/GoogleBooksApiInfoCacheJsonModelType";
import { GoogleBooksApiSmallThumbnailCacheJsonModelType } from "../../../internaldata/googlebooksapismallthumbnailcache/model/GoogleBooksApiSmallThumbnailCacheJsonModelType";
import { GoogleBooksApiThumbnailCacheJsonModelType } from "../../../internaldata/googlebooksapithumbnail/model/GoogleBooksApiThumbnailCacheJsonModelType";
import { BookSearchGoogleBooksApiAccessHistorySelectEntity, } from "../../entity/BookSearchGoogleBooksApiAccessHistorySelectEntity";
import { GoogleBooksApiCacheSelectEntity } from "../../entity/GoogleBooksApiCacheSelectEntity";
import { GoogleBooksApiInfoCacheSelectEntity } from "../../entity/GoogleBooksApiInfoCacheSelectEntity";
import { GoogleBooksApiSmallThumbnailCacheSelectEntity } from "../../entity/GoogleBooksApiSmallThumbnailCacheSelectEntity";
import { GoogleBooksApiThumbnailCacheSelectEntity } from "../../entity/GoogleBooksApiThumbnailCacheSelectEntity";


/**
 * 永続ロジック用インターフェース
 */
export interface BookSearchRepositoryInterface {

    /**
     * Google Books Apiのアクセス履歴取得
     */
    selectGoogleBooksApiAccessHistory(bookSearchGoogleBooksApiAccessHistorySelectEntity: BookSearchGoogleBooksApiAccessHistorySelectEntity)
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
}