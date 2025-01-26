import { GoogleBookInfoApis } from "../../externalapi/googlebookinfo/service/GoogleBookInfoApis";
import ENV from '../../env.json';
import { CreateDateModel } from "../../internaldata/common/model/CreateDateModel";
import { KeywordModel } from "../../internaldata/googlebooksapiaccesshistory/properties/KeywordModel";
import { AccessDateModel } from "../../internaldata/googlebooksapiaccesshistory/properties/AccessDateModel";
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
import { GoogleBooksApiSmallThumbnailCacheUpdateModel } from "../../internaldata/googlebooksapismallthumbnailcache/model/GoogleBooksApiSmallThumbnailCacheUpdateModel";
import { GoogleBooksApiSmallThumbnailCacheCreateModel } from "../../internaldata/googlebooksapismallthumbnailcache/model/GoogleBooksApiSmallThumbnailCacheCreateModel";
import { GoogleBooksApiThumbnailCacheUpdateModel } from "../../internaldata/googlebooksapithumbnail/model/GoogleBooksApiThumbnailCacheUpdateModel";
import { GoogleBooksApiThumbnailCacheCreateModel } from "../../internaldata/googlebooksapithumbnail/model/GoogleBooksApiThumbnailCacheCreateModel";
import { BookInfoJsonModelType } from "../../internaldata/bookinfomaster/model/BookInfoMasterJsonModelType";
import { GoogleBooksApiCacheInfoParseService } from "../../internaldata/googlebooksapiinfocacheparse/service/GoogleBooksApiInfoCacheParseService";
import { GoogleBooksApiAuthorsCacheParseService } from "../../internaldata/googlebooksapiauthorscacheparse/service/GoogleBooksApiAuthorsCacheParseService";
import { GoogleBooksApiSmallThumbnailCacheParseService } from "../../internaldata/googlebooksapismallthumbnailcacheparse/servce/GoogleBooksApiSmallThumbnailCacheParseService";
import { GoogleBooksApiThumbnailCacheParseService } from "../../internaldata/googlebooksapithumbnailparse/service/GoogleBooksApiThumbnailCacheParseService";
import { GoogleBooksApiMergedCacheService } from "../../internaldata/googlebooksapimergedcacheparse/service/GoogleBooksApiMergedCacheService";
import { BookInfoMergeService } from "../../internaldata/bookinfomerge/service/BookInfoMergeService";
import { BookInfoMergedModelType } from "../../internaldata/bookinfomerge/model/BookInfoMergedModelType";
import { BookInfoOperationService } from "../../internaldata/bookinfooperation/service/BookInfoOperationService";
import { GoogleBooksApiBookInfoMasterParseService } from "../../internaldata/googlebooksapibookinfomasterparse/service/GoogleBooksApiBookInfoMasterParseService";
import { ArrayUtil } from "../../util/service/ArrayUtil";
import { BookAuthorsMasterModel } from "../../internaldata/bookauthorsmaster/model/BookAuthorsMasterModel";
import { BookInfoMasterModel } from "../../internaldata/bookinfomaster/model/BookInfoMasterModel";
import { AuthorsMasterModel } from "../../internaldata/authorsinfomaster/model/AuthorsMasterModel";
import { BookSearchRepositorys } from "../repository/BookSearchRepositorys";
import { RepositoryType } from "../../util/const/CommonConst";
import { BookSearchGoogleBooksApiAccessHistorySelectEntity } from "../entity/BookSearchGoogleBooksApiAccessHistorySelectEntity";
import { GoogleBooksApiAccessHistoryRepositorys } from "../../internaldata/googlebooksapiaccesshistory/repository/GoogleBooksApiAccessHistoryRepositorys";
import { GoogleBooksApiAccessHistoryInsertEntity } from "../../internaldata/googlebooksapiaccesshistory/entity/GoogleBooksApiAccessHistoryInsertEntity";


export class BookSearchService {

    // Google Books Apiデータ取得
    private googleBookInfoApis: GoogleBookInfoApis = new GoogleBookInfoApis();
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
    // Google Books Api → 書籍キャッシュ情報変換
    private googleBooksApiCacheInfoParseService = new GoogleBooksApiCacheInfoParseService();
    // Google Books Api → 著者キャッシュ情報変換
    private googleBooksApiAuthorsCacheParseService = new GoogleBooksApiAuthorsCacheParseService();
    // Google Books Api → サムネイル(小)キャッシュ情報変換
    private googleBooksApiSmallThumbnailCacheParseService = new GoogleBooksApiSmallThumbnailCacheParseService();
    // Google Books Api → サムネイルキャッシュ情報変換
    private GoogleBooksApiThumbnailCacheParseService = new GoogleBooksApiThumbnailCacheParseService();
    // マージ済みのキャッシュ情報 → Google Books Api 
    private googleBooksApiMergedCacheService = new GoogleBooksApiMergedCacheService();
    // 書籍情報マージ
    private bookInfoMergeService = new BookInfoMergeService();
    // 書籍マスタ操作
    private BookInfoOperationService = new BookInfoOperationService();
    // マージ済みの書籍マスタ情報 → Google Books Api
    private googleBooksApiBookInfoMasterParseService = new GoogleBooksApiBookInfoMasterParseService();


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
     * キーワードと日付でGoogle Books Apiのアクセス履歴をチェックする
     * @param googleBooksApiAccessHistoryList 
     * @param keywordModel 
     * @param accessDateModel 
     */
    public checkAccessHistoryExist(keywordModel: KeywordModel, accessDateModel: AccessDateModel,) {

        const bookSearchRepositorys = new BookSearchRepositorys();
        const bookSearchJsonRepository = bookSearchRepositorys.get(RepositoryType.JSON);

        const bookSearchGoogleBooksApiAccessHistorySelectEntity =
            new BookSearchGoogleBooksApiAccessHistorySelectEntity(keywordModel, accessDateModel);

        const GoogleBooksApiAccessHistory =
            bookSearchJsonRepository.selectGoogleBooksApiAccessHistory(bookSearchGoogleBooksApiAccessHistorySelectEntity);

        // キーワードと日付に一致するデータが存在する
        return GoogleBooksApiAccessHistory.length > 0
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
            this.googleBooksApiMergedCacheService.parseGoogleBooksAPIsModelItems(googleBooksApiCacheMergedList);

        return googleBooksAPIsModelItemsTypeList;
    }


    /**
     * Google Books Apiアクセス情報にデータを追加する
     * @param bookInfoMasterCreateModel 
     */
    public createGoogleBookApiAccessHistory(keywordModel: KeywordModel, accessDateModel: AccessDateModel) {

        // Google Books Apiアクセス情報登録用データを作成
        const googleBooksApiAccessHistoryInsertEntity: GoogleBooksApiAccessHistoryInsertEntity =
            new GoogleBooksApiAccessHistoryInsertEntity(keywordModel, accessDateModel);

        return googleBooksApiAccessHistoryInsertEntity;
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
                    this.googleBooksApiCacheInfoParseService.parseGoogleBooksApiInfoCacheUpdate(e);

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
                return this.googleBooksApiCacheInfoParseService.parseGoogleBooksApiInfoCacheCreate(e);
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
                    this.googleBooksApiAuthorsCacheParseService.parseGoogleBooksApiAuthorsCacheUpdate(e);

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
                return this.googleBooksApiAuthorsCacheParseService.parseGoogleBooksApiAuthorsCacheCreate(e);
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


    /**
     * Google Books Apiのサムネイル(小)キャッシュ情報の追加/更新データを作成する
     * @param googleBooksApiSmallThumbnailCacheList 
     * @param bookItems 
     */
    public createOrUpdateGoogleBooksApiSmallThumbnailCache(googleBooksApiSmallThumbnailCacheList: GoogleBooksApiSmallThumbnailCacheModelType[],
        bookItems: GoogleBooksAPIsModelItemsType[]): GoogleBooksApiSmallThumbnailCacheModelType[] {

        // 登録用キャッシュデータリスト
        let createGoogleBooksApiSmallThumbnailCacheList: GoogleBooksAPIsModelItemsType[] = [];

        // Google Books Apiから取得したサムネイル(小)情報をキャッシュに登録/更新する
        bookItems.forEach((e: GoogleBooksAPIsModelItemsType) => {

            let googleBooksApiSmallThumbnailCache = googleBooksApiSmallThumbnailCacheList.find((e1: GoogleBooksApiInfoCacheModelType) => {
                return e1.bookId === e.id;
            });

            // サムネイル(小)IDの一致するデータが存在する場合は更新する
            if (googleBooksApiSmallThumbnailCache) {

                // Google Books Apiの型をサムネイル(小)キャッシュ更新用の型に変換する
                const googleBooksApiSmallThumbnailCacheUpdateModel: GoogleBooksApiSmallThumbnailCacheUpdateModel =
                    this.googleBooksApiSmallThumbnailCacheParseService.parseGoogleBooksApiSmallThumbnailCacheUpdate(e);

                // サムネイル(小)キャッシュ情報を更新する
                googleBooksApiSmallThumbnailCache = this.googleBooksApiSmallThumbnailCacheService.createGoogleBooksApiSmallThumbnailCacheUpdateWriteData(
                    googleBooksApiSmallThumbnailCache, googleBooksApiSmallThumbnailCacheUpdateModel);
            }
            // キャッシュ登録用のリストに追加する
            else {
                createGoogleBooksApiSmallThumbnailCacheList = [...createGoogleBooksApiSmallThumbnailCacheList, e];
            }

        });

        // 登録用のリストをサムネイル(小)キャッシュ情報の型に変換する
        const parsedGoogleBooksApiSmallThumbnailCacheCreateList: GoogleBooksApiSmallThumbnailCacheCreateModel[] =
            createGoogleBooksApiSmallThumbnailCacheList.map((e: GoogleBooksAPIsModelItemsType) => {

                // Google Books Apiの型をサムネイル(小)キャッシュ登録用の型に変換する
                return this.googleBooksApiSmallThumbnailCacheParseService.parseGoogleBooksApiSmallThumbnailCacheCreate(e);
            });

        // サムネイル(小)キャッシュ情報登録用データを作成する
        parsedGoogleBooksApiSmallThumbnailCacheCreateList.forEach((e: GoogleBooksApiSmallThumbnailCacheCreateModel) => {

            googleBooksApiSmallThumbnailCacheList = this.googleBooksApiSmallThumbnailCacheService.createGoogleBooksApiSmallThumbnailCacheCreateWriteData(
                googleBooksApiSmallThumbnailCacheList, e);
        });

        return googleBooksApiSmallThumbnailCacheList;
    }


    /**
     * Google Books Apiサムネイル(小)キャッシュ情報ファイルにデータを書き込む
     * @param googleBooksApiInfoCacheList 
     */
    public overWriteGoogleBooksApiSmallThumbnailCache(googleBooksApiSmallThumbnailCacheList: GoogleBooksApiSmallThumbnailCacheModelType[]) {

        try {

            // Google Books Apiサムネイル(小)キャッシュ情報ファイルにデータを書き込む
            this.googleBooksApiSmallThumbnailCacheService.overWriteGoogleBooksApiSmallThumbnailCache(googleBooksApiSmallThumbnailCacheList);
        } catch (err) {
            throw Error(`${err} endpoint:${ENV.BOOK_SEARCH}`);
        }
    }


    /**
     * Google Books Apiのサムネイルキャッシュ情報の追加/更新データを作成する
     * @param googleBooksApiThumbnailCacheList 
     * @param bookItems 
     */
    public createOrUpdateGoogleBooksApiThumbnailCache(googleBooksApiThumbnailCacheList: GoogleBooksApiThumbnailCacheModelType[],
        bookItems: GoogleBooksAPIsModelItemsType[]): GoogleBooksApiThumbnailCacheModelType[] {

        // 登録用キャッシュデータリスト
        let createGoogleBooksApiThumbnailCacheList: GoogleBooksAPIsModelItemsType[] = [];

        // Google Books Apiから取得したサムネイル情報をキャッシュに登録/更新する
        bookItems.forEach((e: GoogleBooksAPIsModelItemsType) => {

            let googleBooksApiThumbnailCache = googleBooksApiThumbnailCacheList.find((e1: GoogleBooksApiInfoCacheModelType) => {
                return e1.bookId === e.id;
            });

            // サムネイルIDの一致するデータが存在する場合は更新する
            if (googleBooksApiThumbnailCache) {

                // Google Books Apiの型をサムネイルキャッシュ更新用の型に変換する
                const googleBooksApiThumbnailCacheUpdateModel: GoogleBooksApiThumbnailCacheUpdateModel =
                    this.GoogleBooksApiThumbnailCacheParseService.parseGoogleBooksApiThumbnailCacheUpdate(e);

                // サムネイルキャッシュ情報を更新する
                googleBooksApiThumbnailCache = this.googleBooksApiThumbnailCacheService.createGoogleBooksApiThumbnailCacheUpdateWriteData(
                    googleBooksApiThumbnailCache, googleBooksApiThumbnailCacheUpdateModel);
            }
            // キャッシュ登録用のリストに追加する
            else {
                createGoogleBooksApiThumbnailCacheList = [...createGoogleBooksApiThumbnailCacheList, e];
            }

        });

        // 登録用のリストをサムネイルキャッシュ情報の型に変換する
        const parsedGoogleBooksApiThumbnailCacheCreateList: GoogleBooksApiThumbnailCacheCreateModel[] =
            createGoogleBooksApiThumbnailCacheList.map((e: GoogleBooksAPIsModelItemsType) => {

                // Google Books Apiの型をサムネイルキャッシュ登録用の型に変換する
                return this.GoogleBooksApiThumbnailCacheParseService.parseGoogleBooksApiThumbnailCacheCreate(e);
            });

        // サムネイルキャッシュ情報登録用データを作成する
        parsedGoogleBooksApiThumbnailCacheCreateList.forEach((e: GoogleBooksApiThumbnailCacheCreateModel) => {

            googleBooksApiThumbnailCacheList = this.googleBooksApiThumbnailCacheService.createGoogleBooksApiThumbnailCacheWriteData(
                googleBooksApiThumbnailCacheList, e);
        });

        return googleBooksApiThumbnailCacheList;
    }


    /**
     * Google Books Apiサムネイルキャッシュ情報ファイルにデータを書き込む
     * @param googleBooksApiInfoCacheList 
     */
    public overWriteGoogleBooksApiThumbnailCache(googleBooksApiThumbnailCacheList: GoogleBooksApiThumbnailCacheModelType[]) {

        try {

            // Google Books Apiサムネイルキャッシュ情報ファイルにデータを書き込む
            this.googleBooksApiThumbnailCacheService.overWriteGoogleBooksApiThumbnailCache(googleBooksApiThumbnailCacheList);
        } catch (err) {
            throw Error(`${err} endpoint:${ENV.BOOK_SEARCH}`);
        }
    }


    /**
     * 未削除の書籍情報データを取得
     * @param bookInfoMasterList 
     * @returns 
     */
    private getActiveBookMasterInfo(): BookInfoMasterModel[] {

        // 書籍情報マスタからデータを取得
        //let bookInfoMasterList: BookInfoMasterModel[] = this.bookInfoMasterService.getBookInfoMaster();

        // 未削除の書籍情報データを取得
        //const activeBookInfoMasterList: BookInfoMasterModel[] = this.bookInfoMasterService.getActiveBookInfoMaster(bookInfoMasterList);

        return [];
    }


    /**
     * 未削除の書籍著者マスタデータを取得
     * @param bookAuthrosMasterList 
     * @returns 
     */
    private getActiveBookAuthorsMasterInfo(): BookAuthorsMasterModel[] {

        //let bookAuthrosMasterList: BookAuthorsMasterModel[] = this.bookAuthorsMasterService.getBookAuthorsMaster();

        //const activeBookInfoMasterList: BookAuthorsMasterModel[] = this.bookAuthorsMasterService.getActiveBookAuthorsMaster(bookAuthrosMasterList);

        return [];
    }


    /**
     * マージした書籍マスタ情報をキーワードでフィルターする
     * @param mergedBookInfoList 
     * @param keywordModel 
     */
    public filterdMergedBookInfoMasterByKeyword(keywordModel: KeywordModel) {

        // 未削除の書籍情報を取得
        const bookInfoMasterList: BookInfoMasterModel[] = this.getActiveBookMasterInfo();

        // 未削除の書籍著者情報を取得
        const activeBookAuthorsMasterList: BookAuthorsMasterModel[] = this.getActiveBookAuthorsMasterInfo();

        // 未削除の著者情報マスタを取得
        //const activeAuthorsMasterList: AuthorsMasterModel[] = this.getActiveAuthorsMaster();

        // 書籍情報をマージ
        const mergedBookInfoList: BookInfoMergedModelType[] = this.bookInfoMergeService.megrgeBookInfoMaster(
            bookInfoMasterList, activeBookAuthorsMasterList, []);

        // タイトル、説明、著者に対してキーワードでフィルターする
        const filterdMergedBookInfoMasterList: BookInfoMergedModelType[] =
            this.BookInfoOperationService.filterdMergedBookInfoMasterByKeyword(mergedBookInfoList, keywordModel);

        return filterdMergedBookInfoMasterList;
    }


    /**
     * 書籍マスタ情報をGoogle Books Apiの型に変換する
     * @param mergedBookInfoMasterList 
     * @returns 
     */
    public parseGoogleBooksApiBookInfoMaster(
        mergedBookInfoMasterList: BookInfoMergedModelType[]): GoogleBooksAPIsModelItemsType[] {

        const googleBooksAPIsModelItems: GoogleBooksAPIsModelItemsType[] =
            this.googleBooksApiBookInfoMasterParseService.parseGoogleBooksApiBookInfoMaster(mergedBookInfoMasterList);

        return googleBooksAPIsModelItems;
    }


    /**
     * 書籍情報マスタとGoogle Books Apiの書籍情報をマージする
     * @param googleBooksApiItems 
     * @param parsedBookInfoMasterList 
     */
    public mergeGoogleBooksApiAndBookInfoMaster(googleBooksApiItems: GoogleBooksAPIsModelItemsType[],
        parsedBookInfoMasterList: GoogleBooksAPIsModelItemsType[]
    ): GoogleBooksAPIsModelItemsType[] {

        // 書籍情報マスタとGoogle Books Apiで同一の書籍が存在する場合は書籍情報マスタを優先する(Google Books Apiを情報を削除する)
        const mergedBookInfoList: GoogleBooksAPIsModelItemsType[] =
            googleBooksApiItems.filter((e: GoogleBooksAPIsModelItemsType) => {

                // タイトルと著者が一致する場合は同一の書籍とする
                const googleBooksAPIsVolume = e.volumeInfo;
                const googleBooksAPIsTitle = googleBooksAPIsVolume.title;
                const googleBooksAPIsAuthorsList = googleBooksAPIsVolume.authors ?? [];

                // 書籍マスタに対して書籍情報一致検索を実行する
                const googleBooksApiItem = parsedBookInfoMasterList.find((e1: GoogleBooksAPIsModelItemsType) => {

                    const bookInfoMasterVolume = e1.volumeInfo;
                    const bookInfoMasterTitle = bookInfoMasterVolume.title;
                    const bookInfoMasterAuthorsList = bookInfoMasterVolume.authors ?? [];

                    return bookInfoMasterTitle === googleBooksAPIsTitle &&
                        ArrayUtil.checkArrayEqual(bookInfoMasterAuthorsList, googleBooksAPIsAuthorsList);
                });

                return !googleBooksApiItem;
            });

        return [...parsedBookInfoMasterList, ...mergedBookInfoList];
    }


    /**
     * Google Books Apiアクセス情報の永続ロジックを取得
     * @returns 
     */
    public getGoogleBooksApiAccessHistoryRepository() {
        const googleBooksApiAccessHistoryRepositorys = new GoogleBooksApiAccessHistoryRepositorys();

        return googleBooksApiAccessHistoryRepositorys.get(RepositoryType.JSON);
    }
}