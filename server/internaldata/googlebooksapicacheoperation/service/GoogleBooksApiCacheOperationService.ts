import { GoogleBooksAPIsModelItemsType } from "../../../externalapi/googlebookinfo/model/GoogleBooksAPIsModelItemsType";
import { GoogleBooksAPIsVolumeInfoModelType } from "../../../externalapi/googlebookinfo/model/GoogleBooksAPIsVolumeInfoModelType";
import { KeywordModel } from "../../googlebooksapiaccesshistory/properties/KeywordModel";
import { GoogleBooksApiAuthorNameModel } from "../../googlebooksapiauthorscache/properties/GoogleBooksApiAuthorNameModel";
import { GoogleBooksApiAuthorNoModel } from "../../googlebooksapiauthorscache/properties/GoogleBooksApiAuthorNoModel";
import { GoogleBooksApiAuthorsCacheJsonModelType } from "../../googlebooksapiauthorscache/model/GoogleBooksApiAuthorsCacheJsonModelType";
import { GoogleBooksApiInfoAuthorCreateModel } from "../../googlebooksapiauthorscache/model/GoogleBooksApiInfoAuthorCreateModel";
import { GoogleBooksApiInfoAuthorUpdateModel } from "../../googlebooksapiauthorscache/model/GoogleBooksApiInfoAuthorUpdateModel";
import { GoogleBooksApiAuthorsCacheService } from "../../googlebooksapiauthorscache/service/GoogleBooksApiAuthorsCacheService";
import { GoogleBooksApiDescriptionModel } from "../../googlebooksapiinfocache/properties/GoogleBooksApiDescriptionModel";
import { GoogleBooksApiIdModel } from "../../googlebooksapiinfocache/properties/GoogleBooksApiIdModel";
import { GoogleBooksApiInfoCacheCreateModel } from "../../googlebooksapiinfocache/model/GoogleBooksApiInfoCacheCreateModel";
import { GoogleBooksApiInfoCacheJsonModelType } from "../../googlebooksapiinfocache/model/GoogleBooksApiInfoCacheJsonModelType";
import { GoogleBooksApiInfoCacheUpdateModel } from "../../googlebooksapiinfocache/model/GoogleBooksApiInfoCacheUpdateModel";
import { GoogleBooksApiPublishedDateModel } from "../../googlebooksapiinfocache/properties/GoogleBooksApiPublishedDateModel";
import { GoogleBooksApiTitleModel } from "../../googlebooksapiinfocache/properties/GoogleBooksApiTitleModel";
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
import { GoogleBooksApiCacheModelType } from "../model/GoogleBooksApiCacheModelType";


export class GoogleBooksApiCacheOperationService {


    /**
     * Google Books Apiのキャッシュ情報をマージする
     * @param googleBooksApiInfoCacheList 
     * @param googleBooksApiAuthorsCacheList 
     * @param googleBooksApiSmallThumbnailCacheList 
     * @param googleBooksApiThumbnailCacheList 
     */
    public mergeGoogleBooksApiCacheInfo(googleBooksApiInfoCacheList: GoogleBooksApiInfoCacheJsonModelType[],
        googleBooksApiAuthorsCacheList: GoogleBooksApiAuthorsCacheJsonModelType[],
        googleBooksApiSmallThumbnailCacheList: GoogleBooksApiSmallThumbnailCacheModelType[],
        googleBooksApiThumbnailCacheList: GoogleBooksApiThumbnailCacheModelType[]
    ): GoogleBooksApiCacheModelType[] {


        // キャッシュ情報をマージする
        const GoogleBooksApiCacheMergedList: GoogleBooksApiCacheModelType[] =
            googleBooksApiInfoCacheList.map((e: GoogleBooksApiInfoCacheJsonModelType) => {

                let authors: string[] = [];
                let smallThumbnail = "";
                let thumbnail = "";

                // 著者キャッシュ情報から書籍IDに一致するデータを取得する
                const googleBooksApiAuthorsCache: GoogleBooksApiAuthorsCacheJsonModelType[] =
                    googleBooksApiAuthorsCacheList.filter((e1: GoogleBooksApiAuthorsCacheJsonModelType) => {

                        return e1.bookId === e.bookId;
                    });

                if (googleBooksApiAuthorsCache && googleBooksApiAuthorsCache.length > 0) {

                    authors = googleBooksApiAuthorsCache.map((e1: GoogleBooksApiAuthorsCacheJsonModelType) => {
                        return e1.authorName;
                    });
                }

                // サムネイル(小)情報から書籍IDに一致するデータを取得する
                const googleBooksApiSmallThumbnailCache = googleBooksApiSmallThumbnailCacheList.find((e1: GoogleBooksApiSmallThumbnailCacheModelType) => {
                    return e1.bookId === e.bookId;
                });

                if (googleBooksApiSmallThumbnailCache) {
                    smallThumbnail = googleBooksApiSmallThumbnailCache.smallThumbnail;
                }

                // サムネイル(小)情報から書籍IDに一致するデータを取得する
                const googleBooksApiThumbnailCache = googleBooksApiThumbnailCacheList.find((e1: GoogleBooksApiThumbnailCacheModelType) => {
                    return e1.bookId === e.bookId;
                });

                if (googleBooksApiThumbnailCache) {
                    thumbnail = googleBooksApiThumbnailCache.thumbnail;
                }

                return {
                    bookId: e.bookId,
                    title: e.title,
                    authors: authors,
                    publishedDate: e.publishedDate,
                    imageLinks: {
                        smallThumbnail: smallThumbnail,
                        thumbnail: thumbnail,
                    },
                    description: e.description,
                };

            });

        return GoogleBooksApiCacheMergedList;
    }


    /**
     * Google Books Apiキャッシュ情報ファイルをキーワードでフィルターする
     * @param googleBooksApiCacheMergedList 
     * @param keywordModel 
     */
    public getGoogleBooksApiInfoCacheByKeyword(googleBooksApiCacheMergedList: GoogleBooksApiCacheModelType[],
        keywordModel: KeywordModel
    ): GoogleBooksApiCacheModelType[] {

        const keyword = keywordModel.keyword;

        const filterGoogleBooksApiCacheMergedList = googleBooksApiCacheMergedList.filter((e: GoogleBooksApiCacheModelType) => {

            // タイトル、説明、著者に対してキーワードでデータを取得する
            const titleRegex = new RegExp(e.title ?? ``, "i");
            const descriptionRegex = new RegExp(e.description ?? ``, "i");

            return titleRegex.test(keyword) || descriptionRegex.test(keyword) || e.authors?.some((e1) => {

                const authorNameRegex = new RegExp(e1, "i");
                return authorNameRegex.test(keyword);
            });
        });

        return filterGoogleBooksApiCacheMergedList;
    }

}