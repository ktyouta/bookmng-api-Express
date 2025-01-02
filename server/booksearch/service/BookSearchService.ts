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
import { GoogleBooksAPIsModelType } from "../../externalapi/googlebookinfo/model/GoogleBooksAPIsModelType";
import { GoogleBooksApiAccessHistoryCreateModel } from "../../internaldata/googlebooksapiaccesshistory/model/GoogleBooksApiAccessHistoryCreateModel";
import { GoogleBooksApiInfoCacheUpdateModel } from "../../internaldata/googlebooksapiinfocache/model/GoogleBooksApiInfoCacheUpdateModel";
import { GoogleBooksApiIdModel } from "../../internaldata/googlebooksapiinfocache/model/GoogleBooksApiIdModel";
import { GoogleBooksApiTitleModel } from "../../internaldata/googlebooksapiinfocache/model/GoogleBooksApiTitleModel";
import { GoogleBooksApiPublishedDateModel } from "../../internaldata/googlebooksapiinfocache/model/GoogleBooksApiPublishedDateModel";
import { GoogleBooksApiDescriptionModel } from "../../internaldata/googlebooksapiinfocache/model/GoogleBooksApiDescriptionModel";
import { GoogleBooksApiInfoCacheCreateModel } from "../../internaldata/googlebooksapiinfocache/model/GoogleBooksApiInfoCacheCreateModel";
import { GoogleBooksApiInfoAuthorUpdateModel } from "../../internaldata/googlebooksapiauthorscache/model/GoogleBooksApiInfoAuthorUpdateModel";
import { GoogleBooksApiInfoAuthorCreateModel } from "../../internaldata/googlebooksapiauthorscache/model/GoogleBooksApiInfoAuthorCreateModel";


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
    // Google Books Apiとキャッシュ情報操作
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
    public parseGoogleBooksAPIsModelItems(googleBooksApiCacheMergedList: GoogleBooksApiCacheMergedModelType[]) {

        const googleBooksAPIsModelItemsTypeList: GoogleBooksAPIsModelItemsType[] =
            this.googleBooksApiCacheOperationService.parseGoogleBooksAPIsModelItems(googleBooksApiCacheMergedList);

        return googleBooksAPIsModelItemsTypeList;
    }


    /**
     * 書籍情報をレスポンス用の型に変換する
     * @param retBookInfo 
     * @param googleBooksAPIsModelItemsTypeList 
     */
    public parseRetGoogleBooksApiInfo(retBookInfo: GoogleBooksAPIsModelType,
        googleBooksAPIsModelItemsTypeList: GoogleBooksAPIsModelItemsType[]) {

        retBookInfo.items = googleBooksAPIsModelItemsTypeList;
        retBookInfo.totalItems = googleBooksAPIsModelItemsTypeList.length;

        return retBookInfo
    }


    /**
     * Google Books Apiアクセス情報にデータを追加する
     * @param bookInfoMasterCreateModel 
     */
    public createGoogleBookApiAccessHistory(googleBooksApiAccessHistoryList: GoogleBooksApiAccessHistoryModelType[],
        keywordModel: KeywordModel, accessDateModel: AccessDateModel) {

        // Google Books Apiアクセス情報登録用データを作成
        const GoogleBookApiAccessHistoryCreateBody: GoogleBooksApiAccessHistoryCreateModel =
            this.googleBookApiAccessHistoryService.createGoogleBookApiAccessHistoryCreateBody(keywordModel, accessDateModel);

        // 登録用データをリストに追加    
        googleBooksApiAccessHistoryList = this.googleBookApiAccessHistoryService.createGoogleBookApiAccessHistoryWriteData(googleBooksApiAccessHistoryList,
            GoogleBookApiAccessHistoryCreateBody
        );

        return googleBooksApiAccessHistoryList;
    }


    /**
     * Google Books Apiアクセス情報ファイルにデータを書き込む
     * @param bookAuthorsMasterList 
     */
    public overWriteGoogleBookApiAccessHistory(googleBooksApiAccessHistoryList: GoogleBooksApiAccessHistoryModelType[]) {

        try {

            // Google Books Apiアクセス情報ファイルにデータを書き込む
            this.googleBookApiAccessHistoryService.overWriteGoogleBookApiAccessHistory(googleBooksApiAccessHistoryList);
        } catch (err) {
            throw Error(`${err} endpoint:${ENV.BOOK_SEARCH}`);
        }
    }


    /**
     * Google Books Apiの書籍キャッシュ情報の追加/更新データを作成する
     * @param googleBooksApiInfoCacheList 
     * @param bookItems 
     */
    public createOrUpdateGoogleBooksApiInfoCache(googleBooksApiInfoCacheList: GoogleBooksApiInfoCacheModelType[],
        bookItems: GoogleBooksAPIsModelItemsType[]): GoogleBooksApiInfoCacheModelType[] {

        // 登録用キャッシュデータリスト
        let createGoogleBooksApiInfoCacheList: GoogleBooksAPIsModelItemsType[] = [];

        // Google Books Apiから取得した書籍情報をキャッシュに登録/更新する
        bookItems.forEach((e: GoogleBooksAPIsModelItemsType) => {

            let googleBooksApiInfoCache = googleBooksApiInfoCacheList.find((e1: GoogleBooksApiInfoCacheModelType) => {
                return e1.bookId === e.id;
            });

            // 書籍IDの一致するデータが存在する場合は更新する
            if (googleBooksApiInfoCache) {

                // Google Books Apiの型を書籍キャッシュ更新用の型に変換する
                const googleBooksApiInfoCacheUpdateModel: GoogleBooksApiInfoCacheUpdateModel =
                    this.googleBooksApiCacheOperationService.parseGoogleBooksApiInfoCacheUpdate(e);

                // 書籍キャッシュ情報を更新する
                googleBooksApiInfoCache = this.googleBooksApiInfoCacheService.createGoogleBooksApiInfoCacheUpdateWriteData(
                    googleBooksApiInfoCache, googleBooksApiInfoCacheUpdateModel);
            }
            // キャッシュ登録用のリストに追加する
            else {
                createGoogleBooksApiInfoCacheList = [...createGoogleBooksApiInfoCacheList, e];
            }

        });

        // 登録用のリストを書籍キャッシュ情報の型に変換する
        const parsedGoogleBooksApiInfoCacheCreateList: GoogleBooksApiInfoCacheCreateModel[] =
            createGoogleBooksApiInfoCacheList.map((e: GoogleBooksAPIsModelItemsType) => {

                // Google Books Apiの型を書籍キャッシュ登録用の型に変換する
                return this.googleBooksApiCacheOperationService.parseGoogleBooksApiInfoCacheCreate(e);
            });

        // 書籍キャッシュ情報登録用データを作成する
        parsedGoogleBooksApiInfoCacheCreateList.forEach((e: GoogleBooksApiInfoCacheCreateModel) => {

            googleBooksApiInfoCacheList = this.googleBooksApiInfoCacheService.createGoogleBooksApiInfoCacheCreateWriteData(
                googleBooksApiInfoCacheList, e);
        });

        return googleBooksApiInfoCacheList;
    }


    /**
     * Google Books Api書籍キャッシュ情報ファイルにデータを書き込む
     * @param googleBooksApiAccessHistoryList 
     */
    public overWriteGoogleBooksApiInfoCache(googleBooksApiInfoCacheList: GoogleBooksApiInfoCacheModelType[]) {

        try {

            // Google Books Apiアクセス情報ファイルにデータを書き込む
            this.googleBooksApiInfoCacheService.overWriteGoogleBooksApiInfoCache(googleBooksApiInfoCacheList);
        } catch (err) {
            throw Error(`${err} endpoint:${ENV.BOOK_SEARCH}`);
        }
    }


    /**
     * Google Books Apiの著者キャッシュ情報の追加/更新データを作成する
     * @param googleBooksApiInfoCacheList 
     * @param bookItems 
     * @returns 
     */
    public createOrUpdateGoogleBooksApiAuthorsCache(googleBooksApiAuthorsCacheList: GoogleBooksApiAuthorsCacheModelType[],
        bookItems: GoogleBooksAPIsModelItemsType[]): GoogleBooksApiAuthorsCacheModelType[] {

        // 登録用キャッシュデータリスト
        let createGoogleBooksApiAuthorsCacheList: GoogleBooksAPIsModelItemsType[] = [];

        // Google Books Apiから取得した著者情報をキャッシュに登録/更新する
        bookItems.forEach((e: GoogleBooksAPIsModelItemsType) => {

            let googleBooksApiAuthorsCache = googleBooksApiAuthorsCacheList.filter((e1: GoogleBooksApiInfoCacheModelType) => {
                return e1.bookId === e.id;
            });

            // 書籍IDの一致するデータが存在する場合は更新する
            if (googleBooksApiAuthorsCache && googleBooksApiAuthorsCache.length > 0) {

                // Google Books Apiの型を著者キャッシュ更新用の型に変換する
                const googleBooksApiAuthorsCacheUpdateModelList: GoogleBooksApiInfoAuthorUpdateModel[] =
                    this.googleBooksApiCacheOperationService.parseGoogleBooksApiAuthorsCacheUpdate(e);

                // 著者キャッシュ情報を更新する
                googleBooksApiAuthorsCacheList = this.googleBooksApiAuthorsCacheService.createGoogleBooksApiAuthorsCacheUpdateWriteData(
                    googleBooksApiAuthorsCacheList, googleBooksApiAuthorsCacheUpdateModelList);
            }
            // キャッシュ登録用のリストに追加する
            else {
                createGoogleBooksApiAuthorsCacheList = [...createGoogleBooksApiAuthorsCacheList, e];
            }

        });

        // 登録用のリストを著者キャッシュ情報の型に変換する
        const parsedGoogleBooksApiAuthorsCacheCreateList: GoogleBooksApiInfoAuthorCreateModel[] =
            createGoogleBooksApiAuthorsCacheList.flatMap((e: GoogleBooksAPIsModelItemsType) => {

                // Google Books Apiの型を著者キャッシュ登録用の型に変換する
                return this.googleBooksApiCacheOperationService.parseGoogleBooksApiAuthorsCacheCreate(e);
            });

        // 著者キャッシュ情報登録用データを作成する
        parsedGoogleBooksApiAuthorsCacheCreateList.forEach((e: GoogleBooksApiInfoAuthorCreateModel) => {

            googleBooksApiAuthorsCacheList = this.googleBooksApiAuthorsCacheService.createGoogleBooksApiAuthorsCacheCreateWriteData(
                googleBooksApiAuthorsCacheList, e);
        });

        return googleBooksApiAuthorsCacheList;
    }


    /**
     * Google Books Api著者キャッシュ情報ファイルにデータを書き込む
     * @param googleBooksApiInfoCacheList 
     */
    public overWriteGoogleBooksApiAuthorsCache(googleBooksApiAuthorsCacheList: GoogleBooksApiAuthorsCacheModelType[]) {

        try {

            // Google Books Api著者キャッシュ情報ファイルにデータを書き込む
            this.googleBooksApiAuthorsCacheService.overWriteGoogleBooksApiAuthorsCache(googleBooksApiAuthorsCacheList);
        } catch (err) {
            throw Error(`${err} endpoint:${ENV.BOOK_SEARCH}`);
        }
    }

}