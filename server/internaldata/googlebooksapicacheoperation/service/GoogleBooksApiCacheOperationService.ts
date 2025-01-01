import { GoogleBooksAPIsModelItemsType } from "../../../externalapi/googlebookinfo/model/GoogleBooksAPIsModelItemsType";
import { GoogleBooksAPIsVolumeInfoModelType } from "../../../externalapi/googlebookinfo/model/GoogleBooksAPIsVolumeInfoModelType";
import { KeywordModel } from "../../googlebooksapiaccesshistory/model/KeywordModel";
import { GoogleBooksApiAuthorsCacheModelType } from "../../googlebooksapiauthorscache/model/GoogleBooksApiAuthorsCacheModelType";
import { GoogleBooksApiInfoCacheModelType } from "../../googlebooksapiinfocache/model/GoogleBooksApiInfoCacheModelType";
import { GoogleBooksApiSmallThumbnailCacheModelType } from "../../googlebooksapismallthumbnailcache/model/GoogleBooksApiSmallThumbnailCacheModelType";
import { GoogleBooksApiThumbnailCacheModelType } from "../../googlebooksapithumbnail/model/GoogleBooksApiThumbnailCacheModelType";
import { GoogleBooksApiCacheMergedModelType } from "../model/GoogleBooksApiCacheMergedModelType";

export class GoogleBooksApiCacheOperationService {


    /**
     * Google Books Apiのキャッシュ情報をマージする
     * @param googleBooksApiInfoCacheList 
     * @param googleBooksApiAuthorsCacheList 
     * @param googleBooksApiSmallThumbnailCacheList 
     * @param googleBooksApiThumbnailCacheList 
     */
    public mergeGoogleBooksApiCacheInfo(googleBooksApiInfoCacheList: GoogleBooksApiInfoCacheModelType[],
        googleBooksApiAuthorsCacheList: GoogleBooksApiAuthorsCacheModelType[],
        googleBooksApiSmallThumbnailCacheList: GoogleBooksApiSmallThumbnailCacheModelType[],
        googleBooksApiThumbnailCacheList: GoogleBooksApiThumbnailCacheModelType[]
    ): GoogleBooksApiCacheMergedModelType[] {


        // キャッシュ情報をマージする
        const GoogleBooksApiCacheMergedList: GoogleBooksApiCacheMergedModelType[] = googleBooksApiInfoCacheList.map((e: GoogleBooksApiInfoCacheModelType) => {

            let authors: string[] = [];
            let smallThumbnail = "";
            let thumbnail = "";

            // 著者キャッシュ情報から書籍IDに一致するデータを取得する
            const googleBooksApiAuthorsCache = googleBooksApiAuthorsCacheList.filter((e1: GoogleBooksApiAuthorsCacheModelType) => {

                return e1.bookId === e.bookId;
            });

            if (googleBooksApiAuthorsCache) {

                authors = googleBooksApiAuthorsCache.map((e1: GoogleBooksApiAuthorsCacheModelType) => {
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
    public getGoogleBooksApiInfoCacheByKeyword(googleBooksApiCacheMergedList: GoogleBooksApiCacheMergedModelType[],
        keywordModel: KeywordModel
    ): GoogleBooksApiCacheMergedModelType[] {

        const keyword = keywordModel.keyword;

        const filterGoogleBooksApiCacheMergedList = googleBooksApiCacheMergedList.filter((e: GoogleBooksApiCacheMergedModelType) => {

            // タイトル、説明、著者に対してキーワードでデータを取得する
            return e.title?.includes(keyword) || e.description?.includes(keyword) || e.authors?.some((e1) => {
                e1.includes(keyword);
            })
        });

        return filterGoogleBooksApiCacheMergedList;
    }


    /**
     * キャッシュ情報をGoogle Books Api用の型に変換する
     * @param googleBooksApiCacheMergedList 
     * @returns 
     */
    public convertGoogleBooksApiInfoCache(googleBooksApiCacheMergedList: GoogleBooksApiCacheMergedModelType[]) {

        const googleBooksAPIsModelItemsTypeList: GoogleBooksAPIsModelItemsType[] = googleBooksApiCacheMergedList.map((e: GoogleBooksApiCacheMergedModelType) => {

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
                googleBooksAPIsVolumeInfoModel: googleBooksAPIsVolumeInfoModelType
            }
        });

        return googleBooksAPIsModelItemsTypeList;
    }

}