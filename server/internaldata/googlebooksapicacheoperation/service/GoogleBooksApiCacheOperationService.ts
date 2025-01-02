import { GoogleBooksAPIsModelItemsType } from "../../../externalapi/googlebookinfo/model/GoogleBooksAPIsModelItemsType";
import { GoogleBooksAPIsVolumeInfoModelType } from "../../../externalapi/googlebookinfo/model/GoogleBooksAPIsVolumeInfoModelType";
import { KeywordModel } from "../../googlebooksapiaccesshistory/model/KeywordModel";
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
import { GoogleBooksApiSmallThumbnailCacheModelType } from "../../googlebooksapismallthumbnailcache/model/GoogleBooksApiSmallThumbnailCacheModelType";
import { GoogleBooksApiSmallThumbnailCacheService } from "../../googlebooksapismallthumbnailcache/service/GoogleBooksApiSmallThumbnailCacheService";
import { GoogleBooksApiThumbnailCacheModelType } from "../../googlebooksapithumbnail/model/GoogleBooksApiThumbnailCacheModelType";
import { GoogleBooksApiThumbnailCacheService } from "../../googlebooksapithumbnail/service/GoogleBooksApiThumbnailCacheService";
import { GoogleBooksApiCacheMergedModelType } from "../model/GoogleBooksApiCacheMergedModelType";

export class GoogleBooksApiCacheOperationService {


    // Google Books Api書籍情報キャッシュ
    private googleBooksApiInfoCacheService = new GoogleBooksApiInfoCacheService();
    // Google Books Api著者情報キャッシュ
    private googleBooksApiAuthorsCacheService = new GoogleBooksApiAuthorsCacheService();
    // Google Books Apiサムネイル(小)情報キャッシュ
    private googleBooksApiSmallThumbnailCacheService = new GoogleBooksApiSmallThumbnailCacheService();
    // Google Books Apiサムネイル情報キャッシュ
    private googleBooksApiThumbnailCacheService = new GoogleBooksApiThumbnailCacheService();


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
     * マージされたキャッシュ情報をGoogle Books Api用の型(GoogleBooksAPIsModelItemsType)に変換する
     * @param googleBooksApiCacheMergedList 
     * @returns 
     */
    public parseGoogleBooksAPIsModelItems(googleBooksApiCacheMergedList: GoogleBooksApiCacheMergedModelType[]): GoogleBooksAPIsModelItemsType[] {

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

    /**
     * Google Books Apiの型(GoogleBooksAPIsModelItemsType)から書籍キャッシュの型(GoogleBooksApiInfoCacheCreateModel)に変換する
     * @param googleBooksAPIsModelItems 
     * @returns 
     */
    public parseGoogleBooksApiInfoCacheCreate(googleBooksAPIsModelItems: GoogleBooksAPIsModelItemsType): GoogleBooksApiInfoCacheCreateModel {

        const bookIdModel = new GoogleBooksApiIdModel(googleBooksAPIsModelItems.id);
        const titleModel = new GoogleBooksApiTitleModel(googleBooksAPIsModelItems.googleBooksAPIsVolumeInfoModel.title ?? ``);
        const publishedDateModel = new GoogleBooksApiPublishedDateModel(googleBooksAPIsModelItems.googleBooksAPIsVolumeInfoModel.publishedDate ?? ``);
        const descriptionModel = new GoogleBooksApiDescriptionModel(googleBooksAPIsModelItems.googleBooksAPIsVolumeInfoModel.description ?? ``);

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
        const titleModel = new GoogleBooksApiTitleModel(googleBooksAPIsModelItems.googleBooksAPIsVolumeInfoModel.title ?? ``);
        const publishedDateModel = new GoogleBooksApiPublishedDateModel(googleBooksAPIsModelItems.googleBooksAPIsVolumeInfoModel.publishedDate ?? ``);
        const descriptionModel = new GoogleBooksApiDescriptionModel(googleBooksAPIsModelItems.googleBooksAPIsVolumeInfoModel.description ?? ``);

        return this.googleBooksApiInfoCacheService.createGoogleBooksApiInfoCacheUpdateModel(bookIdModel,
            titleModel, publishedDateModel, descriptionModel
        );
    }


    /**
     * Google Books Apiの型(GoogleBooksAPIsModelItemsType)から書籍キャッシュの型(createGoogleBooksApiAuthorsCacheCreateBody)に変換する
     * @param googleBooksAPIsModelItems 
     * @returns 
     */
    public parseGoogleBooksApiAuthorsCacheCreate(googleBooksAPIsModelItems: GoogleBooksAPIsModelItemsType): GoogleBooksApiInfoAuthorCreateModel[] {

        // Google Books Apiの著者リスト
        const authrosList = googleBooksAPIsModelItems.googleBooksAPIsVolumeInfoModel.authors;
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
        const authrosList = googleBooksAPIsModelItems.googleBooksAPIsVolumeInfoModel.authors;
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