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


export class GoogleBooksApiAuthorsCacheParseService {


    // Google Books Api著者情報キャッシュ
    private googleBooksApiAuthorsCacheService = new GoogleBooksApiAuthorsCacheService();


    /**
     * Google Books Apiの型(GoogleBooksAPIsModelItemsType)から書籍キャッシュの型(createGoogleBooksApiAuthorsCacheCreateBody)に変換する
     * @param googleBooksAPIsModelItems 
     * @returns 
     */
    public parseGoogleBooksApiAuthorsCacheCreate(googleBooksAPIsModelItems: GoogleBooksAPIsModelItemsType): GoogleBooksApiInfoAuthorCreateModel[] {

        // Google Books Apiの著者リスト
        const authrosList = googleBooksAPIsModelItems.volumeInfo.authors;
        const bookIdModel = new GoogleBooksApiIdModel(googleBooksAPIsModelItems.id);

        if (!authrosList) {
            return [];
        }

        // 登録用著者リストを作成
        const createAuthorsList: GoogleBooksApiInfoAuthorCreateModel[] = authrosList?.map((e: string, index) => {

            const authorNo = new GoogleBooksApiAuthorNoModel(index);
            const authorName = new GoogleBooksApiAuthorNameModel(e);

            return this.googleBooksApiAuthorsCacheService.createGoogleBooksApiAuthorsCacheCreateBody(bookIdModel,
                authorNo, authorName
            );
        });

        return createAuthorsList;
    }


    /**
     * Google Books Apiの型(GoogleBooksAPIsModelItemsType)から書籍キャッシュの型(createGoogleBooksApiAuthorsCacheUpdateBody)に変換する
     * @param googleBooksAPIsModelItems 
     * @returns 
     */
    public parseGoogleBooksApiAuthorsCacheUpdate(googleBooksAPIsModelItems: GoogleBooksAPIsModelItemsType): GoogleBooksApiInfoAuthorUpdateModel[] {

        // Google Books Apiの著者リスト
        const authrosList = googleBooksAPIsModelItems.volumeInfo.authors;
        const bookIdModel = new GoogleBooksApiIdModel(googleBooksAPIsModelItems.id);

        if (!authrosList) {
            return [];
        }

        // 更新用著者リストを作成
        const createAuthorsList: GoogleBooksApiInfoAuthorUpdateModel[] = authrosList?.map((e: string, index) => {

            const authorNo = new GoogleBooksApiAuthorNoModel(index);
            const authorName = new GoogleBooksApiAuthorNameModel(e);

            return this.googleBooksApiAuthorsCacheService.createGoogleBooksApiAuthorsCacheUpdateBody(bookIdModel,
                authorNo, authorName
            );
        });

        return createAuthorsList;
    }

}