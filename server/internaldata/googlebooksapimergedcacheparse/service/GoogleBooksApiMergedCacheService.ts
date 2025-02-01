import { GoogleBooksAPIsModelItemsType } from "../../../externalapi/googlebookinfo/model/GoogleBooksAPIsModelItemsType";
import { GoogleBooksAPIsVolumeInfoModelType } from "../../../externalapi/googlebookinfo/model/GoogleBooksAPIsVolumeInfoModelType";
import { KeywordModel } from "../../googlebooksapiaccesshistory/properties/KeywordModel";
import { GoogleBooksApiAuthorNameModel } from "../../googlebooksapiauthorscache/model/GoogleBooksApiAuthorNameModel";
import { GoogleBooksApiAuthorNoModel } from "../../googlebooksapiauthorscache/model/GoogleBooksApiAuthorNoModel";
import { GoogleBooksApiAuthorsCacheModelType } from "../../googlebooksapiauthorscache/model/GoogleBooksApiAuthorsCacheModelType";
import { GoogleBooksApiInfoAuthorCreateModel } from "../../googlebooksapiauthorscache/model/GoogleBooksApiInfoAuthorCreateModel";
import { GoogleBooksApiInfoAuthorUpdateModel } from "../../googlebooksapiauthorscache/model/GoogleBooksApiInfoAuthorUpdateModel";
import { GoogleBooksApiAuthorsCacheService } from "../../googlebooksapiauthorscache/service/GoogleBooksApiAuthorsCacheService";
import { GoogleBooksApiCacheModelType } from "../../googlebooksapicacheoperation/model/GoogleBooksApiCacheModelType";
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


export class GoogleBooksApiMergedCacheService {


    /**
     * マージされたキャッシュ情報をGoogle Books Api用の型(GoogleBooksAPIsModelItemsType)に変換する
     * @param googleBooksApiCacheMergedList 
     * @returns 
     */
    public parseGoogleBooksAPIsModelItems(googleBooksApiCacheMergedList: GoogleBooksApiCacheModelType[]): GoogleBooksAPIsModelItemsType[] {

        const googleBooksAPIsModelItemsTypeList: GoogleBooksAPIsModelItemsType[] = googleBooksApiCacheMergedList.map((e: GoogleBooksApiCacheModelType) => {

            const googleBooksAPIsVolumeInfoModelType: GoogleBooksAPIsVolumeInfoModelType = {
                title: e.title,
                authors: e.authors,
                publishedDate: e.publishedDate,
                imageLinks: {
                    smallThumbnail: e.imageLinks?.smallThumbnail,
                    thumbnail: e.imageLinks?.thumbnail,
                },
                description: e.description,
            };

            return {
                id: e.bookId,
                volumeInfo: googleBooksAPIsVolumeInfoModelType
            }
        });

        return googleBooksAPIsModelItemsTypeList;
    }

}