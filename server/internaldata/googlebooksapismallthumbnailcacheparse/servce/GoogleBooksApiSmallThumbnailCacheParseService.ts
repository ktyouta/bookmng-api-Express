import { GoogleBooksAPIsModelItemsType } from "../../../externalapi/googlebookinfo/model/GoogleBooksAPIsModelItemsType";
import { GoogleBooksApiIdModel } from "../../googlebooksapiinfocache/properties/GoogleBooksApiIdModel";
import { GoogleBooksApiSmallThumbnailCacheCreateModel } from "../../googlebooksapismallthumbnailcache/model/GoogleBooksApiSmallThumbnailCacheCreateModel";
import { GoogleBooksApiSmallThumbnailCacheUpdateModel } from "../../googlebooksapismallthumbnailcache/model/GoogleBooksApiSmallThumbnailCacheUpdateModel";
import { SmallThumbnailModel } from "../../googlebooksapismallthumbnailcache/model/SmallThumbnailModel";
import { GoogleBooksApiSmallThumbnailCacheService } from "../../googlebooksapismallthumbnailcache/service/GoogleBooksApiSmallThumbnailCacheService";


export class GoogleBooksApiSmallThumbnailCacheParseService {


    // Google Books Apiサムネイル(小)情報キャッシュ
    private googleBooksApiSmallThumbnailCacheService = new GoogleBooksApiSmallThumbnailCacheService();


    /**
     * Google Books Apiの型(GoogleBooksAPIsModelItemsType)からサムネイル(小)キャッシュの型(GoogleBooksApiSmallThumbnailCacheCreateModel)に変換する
     * @param googleBooksAPIsModelItems 
     * @returns 
     */
    public parseGoogleBooksApiSmallThumbnailCacheCreate(googleBooksAPIsModelItems: GoogleBooksAPIsModelItemsType): GoogleBooksApiSmallThumbnailCacheCreateModel {

        const bookIdModel = new GoogleBooksApiIdModel(googleBooksAPIsModelItems.id);
        const smallThumbnail = new SmallThumbnailModel(googleBooksAPIsModelItems.volumeInfo.imageLinks?.smallThumbnail ?? ``);

        return this.googleBooksApiSmallThumbnailCacheService.GoogleBooksApiSmallThumbnailCacheCreateModel(bookIdModel, smallThumbnail);
    }


    /**
     * Google Books Apiの型(GoogleBooksAPIsModelItemsType)からサムネイル(小)キャッシュの型(GoogleBooksApiSmallThumbnailCacheUpdateModel)に変換する
     * @param googleBooksAPIsModelItems 
     * @returns 
     */
    public parseGoogleBooksApiSmallThumbnailCacheUpdate(googleBooksAPIsModelItems: GoogleBooksAPIsModelItemsType): GoogleBooksApiSmallThumbnailCacheUpdateModel {

        const bookIdModel = new GoogleBooksApiIdModel(googleBooksAPIsModelItems.id);
        const smallThumbnail = new SmallThumbnailModel(googleBooksAPIsModelItems.volumeInfo.imageLinks?.smallThumbnail ?? ``);

        return this.googleBooksApiSmallThumbnailCacheService.GoogleBooksApiSmallThumbnailCacheUpdateModel(bookIdModel, smallThumbnail);
    }

}