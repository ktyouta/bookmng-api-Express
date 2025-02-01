import { FrontUserInfoMasterJsonModelType } from "../../../internaldata/frontuserinfomaster/model/FrontUserInfoMasterJsonModelType";
import { GoogleBooksApiAccessHistoryJsonModelType } from "../../../internaldata/googlebooksapiaccesshistory/model/GoogleBooksApiAccessHistoryJsonModelType";
import { GoogleBooksApiCacheModelType } from "../../../internaldata/googlebooksapicacheoperation/model/GoogleBooksApiCacheModelType";
import { GoogleBooksApiSmallThumbnailCacheJsonModelType } from "../../../internaldata/googlebooksapismallthumbnailcache/model/GoogleBooksApiSmallThumbnailCacheJsonModelType";
import { BookSearchGoogleBooksApiAccessHistorySelectEntity, } from "../../entity/BookSearchGoogleBooksApiAccessHistorySelectEntity";
import { GoogleBooksApiCacheSelectEntity } from "../../entity/GoogleBooksApiCacheSelectEntity";
import { GoogleBooksApiSmallThumbnailCacheSelectEntity } from "../../entity/GoogleBooksApiSmallThumbnailCacheSelectEntity";


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
        : ReadonlyArray<GoogleBooksApiSmallThumbnailCacheJsonModelType>

}