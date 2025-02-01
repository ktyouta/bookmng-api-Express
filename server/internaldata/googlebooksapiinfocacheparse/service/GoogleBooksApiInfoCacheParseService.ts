import { GoogleBooksAPIsModelItemsType } from "../../../externalapi/googlebookinfo/model/GoogleBooksAPIsModelItemsType";
import { GoogleBooksApiDescriptionModel } from "../../googlebooksapiinfocache/properties/GoogleBooksApiDescriptionModel";
import { GoogleBooksApiIdModel } from "../../googlebooksapiinfocache/properties/GoogleBooksApiIdModel";
import { GoogleBooksApiInfoCacheCreateModel } from "../../googlebooksapiinfocache/model/GoogleBooksApiInfoCacheCreateModel";
import { GoogleBooksApiInfoCacheUpdateModel } from "../../googlebooksapiinfocache/model/GoogleBooksApiInfoCacheUpdateModel";
import { GoogleBooksApiPublishedDateModel } from "../../googlebooksapiinfocache/properties/GoogleBooksApiPublishedDateModel";
import { GoogleBooksApiTitleModel } from "../../googlebooksapiinfocache/properties/GoogleBooksApiTitleModel";
import { GoogleBooksApiInfoCacheService } from "../../googlebooksapiinfocache/service/GoogleBooksApiInfoCacheService";


export class GoogleBooksApiCacheInfoParseService {


    // Google Books Api書籍情報キャッシュ
    private googleBooksApiInfoCacheService = new GoogleBooksApiInfoCacheService();


    /**
     * Google Books Apiの型(GoogleBooksAPIsModelItemsType)から書籍キャッシュの型(GoogleBooksApiInfoCacheCreateModel)に変換する
     * @param googleBooksAPIsModelItems 
     * @returns 
     */
    public parseGoogleBooksApiInfoCacheCreate(googleBooksAPIsModelItems: GoogleBooksAPIsModelItemsType): GoogleBooksApiInfoCacheCreateModel {

        const bookIdModel = new GoogleBooksApiIdModel(googleBooksAPIsModelItems.id);
        const titleModel = new GoogleBooksApiTitleModel(googleBooksAPIsModelItems.volumeInfo.title ?? ``);
        const publishedDateModel = new GoogleBooksApiPublishedDateModel(googleBooksAPIsModelItems.volumeInfo.publishedDate ?? ``);
        const descriptionModel = new GoogleBooksApiDescriptionModel(googleBooksAPIsModelItems.volumeInfo.description ?? ``);

        return this.googleBooksApiInfoCacheService.createGoogleBooksApiInfoCacheCreateModel(bookIdModel,
            titleModel, publishedDateModel, descriptionModel
        );
    }


    /**
     * Google Books Apiの型(GoogleBooksAPIsModelItemsType)から書籍キャッシュの型(GoogleBooksApiInfoCacheUpdateModel)に変換する
     * @param googleBooksAPIsModelItems 
     * @returns 
     */
    public parseGoogleBooksApiInfoCacheUpdate(googleBooksAPIsModelItems: GoogleBooksAPIsModelItemsType): GoogleBooksApiInfoCacheUpdateModel {

        const bookIdModel = new GoogleBooksApiIdModel(googleBooksAPIsModelItems.id);
        const titleModel = new GoogleBooksApiTitleModel(googleBooksAPIsModelItems.volumeInfo.title ?? ``);
        const publishedDateModel = new GoogleBooksApiPublishedDateModel(googleBooksAPIsModelItems.volumeInfo.publishedDate ?? ``);
        const descriptionModel = new GoogleBooksApiDescriptionModel(googleBooksAPIsModelItems.volumeInfo.description ?? ``);

        return this.googleBooksApiInfoCacheService.createGoogleBooksApiInfoCacheUpdateModel(bookIdModel,
            titleModel, publishedDateModel, descriptionModel
        );
    }

}