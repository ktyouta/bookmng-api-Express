import { GoogleBookInfoApis } from "../../externalapi/googlebookinfo/service/GoogleBookInfoApis";
import ENV from '../../env.json';
import { CreateDateModel } from "../../internaldata/common/model/CreateDateModel";
import { GoogleBookApiAccessHistoryService } from "../../internaldata/googlebooksapiaccesshistory/service/GoogleBookApiAccessHistoryService";
import { GoogleBooksApiAccessHistoryModelType } from "../../internaldata/googlebooksapiaccesshistory/model/GoogleBooksApiAccessHistoryModelType";
import { KeywordModel } from "../../internaldata/googlebooksapiaccesshistory/model/KeywordModel";
import { AccessDateModel } from "../../internaldata/googlebooksapiaccesshistory/model/AccessDateModel";
import { GoogleBooksApiInfoCacheService } from "../../internaldata/googlebooksapiinfocache/service/GoogleBooksApiInfoCacheService";
import { GoogleBooksApiAuthorsCacheService } from "../../internaldata/googlebooksapiauthorscache/service/GoogleBooksApiAuthorsCacheService";
import { GoogleBooksApiSmallThumbnailCacheService } from "../../internaldata/googlebooksapismallthumbnailcache/service/GoogleBooksApiSmallThumbnailCacheService";
import { GoogleBooksApiThumbnailCacheService } from "../../internaldata/googlebooksapithumbnail/service/GoogleBooksApiThumbnailCacheService";
import { GoogleBooksApiInfoCacheModelType } from "../../internaldata/googlebooksapiinfocache/model/GoogleBooksApiInfoCacheModelType";
import { GoogleBooksApiAuthorsCacheModelType } from "../../internaldata/googlebooksapiauthorscache/model/GoogleBooksApiAuthorsCacheModelType";
import { GoogleBooksApiSmallThumbnailCacheModelType } from "../../internaldata/googlebooksapismallthumbnailcache/model/GoogleBooksApiSmallThumbnailCacheModelType";
import { GoogleBooksApiThumbnailCacheModelType } from "../../internaldata/googlebooksapithumbnail/model/GoogleBooksApiThumbnailCacheModelType";
import { GoogleBooksApiCacheOperationService } from "../../internaldata/googlebooksapicacheoperation/service/GoogleBooksApiCacheOperationService";
import { GoogleBooksApiCacheMergedModelType } from "../../internaldata/googlebooksapicacheoperation/model/GoogleBooksApiCacheMergedModelType";
import { GoogleBooksAPIsModelItemsType } from "../../externalapi/googlebookinfo/model/GoogleBooksAPIsModelItemsType";


export class BookSearchService {

    // Google Books Apiデータ取得
    private googleBookInfoApis: GoogleBookInfoApis = new GoogleBookInfoApis();
    // Google Books Apiアクセス履歴
    private googleBookApiAccessHistoryService = new GoogleBookApiAccessHistoryService();
    // Google Books Api書籍情報キャッシュ
    private googleBooksApiInfoCacheService = new GoogleBooksApiInfoCacheService();
    // Google Books Api著者情報キャッシュ
    private googleBooksApiAuthorsCacheService = new GoogleBooksApiAuthorsCacheService();
    // Google Books Apiサムネイル(小)情報キャッシュ
    private googleBooksApiSmallThumbnailCacheService = new GoogleBooksApiSmallThumbnailCacheService();
    // Google Books Apiサムネイル情報キャッシュ
    private googleBooksApiThumbnailCacheService = new GoogleBooksApiThumbnailCacheService();
    // Google Books Apiキャッシュ情報マージ用
    private googleBooksApiCacheOperationService = new GoogleBooksApiCacheOperationService();


    /**
     * Google Books Apiを呼び出す
     * @param keyword 
     */
    public async callGoogleBookApi(keyword: string) {

        try {
            // Google Books Apiを呼び出す
            let googleBookInfoList = await this.googleBookInfoApis.getGoogleBookInfo(keyword);

            return googleBookInfoList;

        } catch (err) {
            throw Error(`ERROR:${err} endpoing:${ENV.BOOK_SEARCH} keyword:${keyword}`);
        }
    }


    /**
     * Google Books Apiのアクセス履歴を取得する
     */
    public getGoogleBooksApiAccessHistory() {

        const googleBookApiAccessHistoryList: GoogleBooksApiAccessHistoryModelType[] =
            this.googleBookApiAccessHistoryService.GoogleBookApiAccessHistory();

        return googleBookApiAccessHistoryList;
    }


    /**
     * キーワードと日付でGoogle Books Apiのアクセス履歴をチェックする
     * @param googleBooksApiAccessHistoryList 
     * @param keywordModel 
     * @param accessDateModel 
     */
    public checkAccessHistoryByKeywordAndDate(googleBooksApiAccessHistoryList: GoogleBooksApiAccessHistoryModelType[],
        keywordModel: KeywordModel, accessDateModel: AccessDateModel,) {

        const filterdAccessHistoryList: GoogleBooksApiAccessHistoryModelType[] =
            this.googleBookApiAccessHistoryService.getAccessHistoryByKeywordAndDate(googleBooksApiAccessHistoryList,
                keywordModel, accessDateModel
            );

        // キーワードと日付に一致するデータが存在する
        return filterdAccessHistoryList && filterdAccessHistoryList.length > 0
    }


    /**
     * Google Books Api書籍キャッシュ情報ファイルからデータを取得
     * @returns 
     */
    public getGoogleBooksApiInfoCache() {

        // Google Books Api著者キャッシュ情報ファイルからデータを取得
        const googleBooksApiInfoCacheList: GoogleBooksApiInfoCacheModelType[] =
            this.googleBooksApiInfoCacheService.getGoogleBooksApiInfoCache();

        return googleBooksApiInfoCacheList;
    }


    /**
     * Google Books Api著者キャッシュ情報ファイルからデータを取得
     * @returns 
     */
    public getGoogleBooksApiAuthorsCache() {

        // Google Books Api著者キャッシュ情報ファイルからデータを取得
        const googleBooksApiAuthorsCacheList: GoogleBooksApiAuthorsCacheModelType[] =
            this.googleBooksApiAuthorsCacheService.getGoogleBooksApiAuthorsCache();

        return googleBooksApiAuthorsCacheList;
    }


    /**
     * Google Books Apiサムネイル(小)キャッシュ情報ファイルからデータを取得
     * @returns 
     */
    public getGoogleBooksApiSmallThumbnailCache() {

        // Google Books Apiサムネイル(小)キャッシュ情報ファイルからデータを取得
        const googleBooksApiSmallThumbnailCacheList: GoogleBooksApiSmallThumbnailCacheModelType[]
            = this.googleBooksApiSmallThumbnailCacheService.getGoogleBooksApiSmallThumbnailCache();

        return googleBooksApiSmallThumbnailCacheList;
    }


    /**
     * Google Books Apiサムネイルキャッシュ情報ファイルからデータを取得
     * @returns 
     */
    public getGoogleBooksApiThumbnailCache() {

        // Google Books Apiサムネイルキャッシュ情報ファイルからデータを取得
        const googleBooksApiThumbnailCacheList: GoogleBooksApiThumbnailCacheModelType[]
            = this.googleBooksApiThumbnailCacheService.getGoogleBooksApiThumbnailCache();

        return googleBooksApiThumbnailCacheList;
    }


    /**
     * Google Books Apiキャッシュ情報ファイルをキーワードでフィルターする
     * @param googleBooksApiAuthorsCacheList 
     * @param keywordModel 
     * @returns 
     */
    public getGoogleBooksApiAuthorsCacheByKeyword(GoogleBooksApiCacheMergedList: GoogleBooksApiCacheMergedModelType[],
        keywordModel: KeywordModel) {

        // タイトル、説明、著者に対してキーワードでフィルターする
        const filterdGoogleBooksApiCacheMergedList = this.googleBooksApiCacheOperationService.getGoogleBooksApiInfoCacheByKeyword(
            GoogleBooksApiCacheMergedList, keywordModel);

        return filterdGoogleBooksApiCacheMergedList;
    }


    /**
     * Google Books Apiのキャッシュ情報をマージする
     * @param googleBooksApiInfoCacheList 
     * @param googleBooksApiAuthorsCacheList 
     * @param googleBooksApiSmallThumbnailCacheList 
     * @param googleBooksApiThumbnailCacheList 
     * @returns 
     */
    public mergeGoogleBooksApiCacheInfo(googleBooksApiInfoCacheList: GoogleBooksApiInfoCacheModelType[],
        googleBooksApiAuthorsCacheList: GoogleBooksApiAuthorsCacheModelType[],
        googleBooksApiSmallThumbnailCacheList: GoogleBooksApiSmallThumbnailCacheModelType[],
        googleBooksApiThumbnailCacheList: GoogleBooksApiThumbnailCacheModelType[]): GoogleBooksApiCacheMergedModelType[] {

        // キャッシュ情報をマージ
        const GoogleBooksApiCacheMergedList: GoogleBooksApiCacheMergedModelType[] =
            this.googleBooksApiCacheOperationService.mergeGoogleBooksApiCacheInfo(googleBooksApiInfoCacheList,
                googleBooksApiAuthorsCacheList,
                googleBooksApiSmallThumbnailCacheList,
                googleBooksApiThumbnailCacheList
            );

        return GoogleBooksApiCacheMergedList;
    }


    /**
     * キャッシュ情報をGoogle Books Api用の型に変換する
     * @param googleBooksApiCacheMergedList 
     * @returns 
     */
    public convertGoogleBooksApiInfoCache(googleBooksApiCacheMergedList: GoogleBooksApiCacheMergedModelType[]) {

        const googleBooksAPIsModelItemsTypeList: GoogleBooksAPIsModelItemsType[] =
            this.googleBooksApiCacheOperationService.convertGoogleBooksApiInfoCache(googleBooksApiCacheMergedList);

        return googleBooksAPIsModelItemsTypeList;
    }
}