import { GoogleBooksAPIsModelItemsType } from "../../../externalapi/googlebookinfo/model/GoogleBooksAPIsModelItemsType";
import { GoogleBooksAPIsVolumeInfoModelType } from "../../../externalapi/googlebookinfo/model/GoogleBooksAPIsVolumeInfoModelType";
import { KeywordModel } from "../../googlebooksapiaccesshistory/properties/KeywordModel";
import { GoogleBooksApiAuthorNameModel } from "../../googlebooksapiauthorscache/model/GoogleBooksApiAuthorNameModel";
import { GoogleBooksApiAuthorNoModel } from "../../googlebooksapiauthorscache/model/GoogleBooksApiAuthorNoModel";
import { GoogleBooksApiAuthorsCacheModelType } from "../../googlebooksapiauthorscache/model/GoogleBooksApiAuthorsCacheModelType";
import { GoogleBooksApiInfoAuthorCreateModel } from "../../googlebooksapiauthorscache/model/GoogleBooksApiInfoAuthorCreateModel";
import { GoogleBooksApiInfoAuthorUpdateModel } from "../../googlebooksapiauthorscache/model/GoogleBooksApiInfoAuthorUpdateModel";
import { GoogleBooksApiAuthorsCacheService } from "../../googlebooksapiauthorscache/service/GoogleBooksApiAuthorsCacheService";
import { GoogleBooksApiDescriptionModel } from "../../googlebooksapiinfocache/model/GoogleBooksApiDescriptionModel";
import { GoogleBooksApiIdModel } from "../../googlebooksapiinfocache/model/GoogleBooksApiIdModel";
import { GoogleBooksApiInfoCacheCreateModel } from "../../googlebooksapiinfocache/model/GoogleBooksApiInfoCacheCreateModel";
import { GoogleBooksApiInfoCacheModelType } from "../../googlebooksapiinfocache/model/GoogleBooksApiInfoCacheModelType";
import { GoogleBooksApiInfoCacheUpdateModel } from "../../googlebooksapiinfocache/model/GoogleBooksApiInfoCacheUpdateModel";
import { GoogleBooksApiPublishedDateModel } from "../../googlebooksapiinfocache/model/GoogleBooksApiPublishedDateModel";
import { GoogleBooksApiTitleModel } from "../../googlebooksapiinfocache/model/GoogleBooksApiTitleModel";
import { GoogleBooksApiInfoCacheService } from "../../googlebooksapiinfocache/service/GoogleBooksApiInfoCacheService";
import { GoogleBooksApiSmallThumbnailCacheCreateModel } from "../../googlebooksapismallthumbnailcache/model/GoogleBooksApiSmallThumbnailCacheCreateModel";
import { GoogleBooksApiSmallThumbnailCacheModelType } from "../../googlebooksapismallthumbnailcache/model/GoogleBooksApiSmallThumbnailCacheModelType";
import { GoogleBooksApiSmallThumbnailCacheUpdateModel } from "../../googlebooksapismallthumbnailcache/model/GoogleBooksApiSmallThumbnailCacheUpdateModel";
import { SmallThumbnailModel } from "../../googlebooksapismallthumbnailcache/model/SmallThumbnailModel";
import { GoogleBooksApiSmallThumbnailCacheService } from "../../googlebooksapismallthumbnailcache/service/GoogleBooksApiSmallThumbnailCacheService";
import { GoogleBooksApiThumbnailCacheCreateModel } from "../../googlebooksapithumbnail/model/GoogleBooksApiThumbnailCacheCreateModel";
import { GoogleBooksApiThumbnailCacheModelType } from "../../googlebooksapithumbnail/model/GoogleBooksApiThumbnailCacheModelType";
import { GoogleBooksApiThumbnailCacheUpdateModel } from "../../googlebooksapithumbnail/model/GoogleBooksApiThumbnailCacheUpdateModel";
import { ThumbnailModel } from "../../googlebooksapithumbnail/model/ThumbnailModel";
import { GoogleBooksApiThumbnailCacheService } from "../../googlebooksapithumbnail/service/GoogleBooksApiThumbnailCacheService";


export class GoogleBooksApiThumbnailCacheParseService {


    // Google Books Apiサムネイル情報キャッシュ
    private googleBooksApiThumbnailCacheService = new GoogleBooksApiThumbnailCacheService();


    /**
     * Google Books Apiの型(GoogleBooksAPIsModelItemsType)からサムネイルキャッシュの型(GoogleBooksApiSmallThumbnailCacheCreateModel)に変換する
     * @param googleBooksAPIsModelItems 
     * @returns 
     */
    public parseGoogleBooksApiThumbnailCacheCreate(googleBooksAPIsModelItems: GoogleBooksAPIsModelItemsType): GoogleBooksApiThumbnailCacheCreateModel {

        const bookIdModel = new GoogleBooksApiIdModel(googleBooksAPIsModelItems.id);
        const thumbnail = new ThumbnailModel(googleBooksAPIsModelItems.volumeInfo.imageLinks?.thumbnail ?? ``);

        return this.googleBooksApiThumbnailCacheService.GoogleBooksApiThumbnailCacheCreateModel(bookIdModel, thumbnail);
    }


    /**
     * Google Books Apiの型(GoogleBooksAPIsModelItemsType)からサムネイルキャッシュの型(GoogleBooksApiThumbnailCacheUpdateModel)に変換する
     * @param googleBooksAPIsModelItems 
     * @returns 
     */
    public parseGoogleBooksApiThumbnailCacheUpdate(googleBooksAPIsModelItems: GoogleBooksAPIsModelItemsType): GoogleBooksApiThumbnailCacheUpdateModel {

        const bookIdModel = new GoogleBooksApiIdModel(googleBooksAPIsModelItems.id);
        const thumbnail = new ThumbnailModel(googleBooksAPIsModelItems.volumeInfo.imageLinks?.thumbnail ?? ``);

        return this.googleBooksApiThumbnailCacheService.GoogleBooksApiThumbnailCacheUpdateModel(bookIdModel, thumbnail);
    }

}