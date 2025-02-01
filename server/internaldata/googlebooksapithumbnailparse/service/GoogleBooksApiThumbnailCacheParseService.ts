import { GoogleBooksAPIsModelItemsType } from "../../../externalapi/googlebookinfo/model/GoogleBooksAPIsModelItemsType";
import { GoogleBooksApiIdModel } from "../../googlebooksapiinfocache/properties/GoogleBooksApiIdModel";
import { GoogleBooksApiThumbnailCacheCreateModel } from "../../googlebooksapithumbnail/model/GoogleBooksApiThumbnailCacheCreateModel";
import { GoogleBooksApiThumbnailCacheUpdateModel } from "../../googlebooksapithumbnail/model/GoogleBooksApiThumbnailCacheUpdateModel";
import { ThumbnailModel } from "../../googlebooksapithumbnail/properties/ThumbnailModel";
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