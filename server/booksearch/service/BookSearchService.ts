import ENV from '../../env.json';
import { CreateDateModel } from "../../internaldata/common/model/CreateDateModel";
import { KeywordModel } from "../../internaldata/googlebooksapiaccesshistory/properties/KeywordModel";
import { AccessDateModel } from "../../internaldata/googlebooksapiaccesshistory/properties/AccessDateModel";
import { GoogleBooksApiInfoCacheService } from "../../internaldata/googlebooksapiinfocache/service/GoogleBooksApiInfoCacheService";
import { GoogleBooksApiAuthorsCacheService } from "../../internaldata/googlebooksapiauthorscache/service/GoogleBooksApiAuthorsCacheService";
import { GoogleBooksApiSmallThumbnailCacheService } from "../../internaldata/googlebooksapismallthumbnailcache/service/GoogleBooksApiSmallThumbnailCacheService";
import { GoogleBooksApiThumbnailCacheService } from "../../internaldata/googlebooksapithumbnail/service/GoogleBooksApiThumbnailCacheService";
import { GoogleBooksApiInfoCacheJsonModelType } from "../../internaldata/googlebooksapiinfocache/model/GoogleBooksApiInfoCacheJsonModelType";
import { GoogleBooksApiAuthorsCacheJsonModelType } from "../../internaldata/googlebooksapiauthorscache/model/GoogleBooksApiAuthorsCacheJsonModelType";
import { GoogleBooksApiSmallThumbnailCacheJsonModelType } from "../../internaldata/googlebooksapismallthumbnailcache/model/GoogleBooksApiSmallThumbnailCacheJsonModelType";
import { GoogleBooksApiThumbnailCacheJsonModelType } from "../../internaldata/googlebooksapithumbnail/model/GoogleBooksApiThumbnailCacheJsonModelType";
import { GoogleBooksApiCacheOperationService } from "../../internaldata/googlebooksapicacheoperation/service/GoogleBooksApiCacheOperationService";
import { GoogleBooksApiCacheModelType } from "../../internaldata/googlebooksapicacheoperation/model/GoogleBooksApiCacheModelType";
import { GoogleBooksAPIsModelItemsType } from "../../externalapi/googlebookinfo/model/GoogleBooksAPIsModelItemsType";
import { GoogleBooksAPIsModelType } from "../../externalapi/googlebookinfo/model/GoogleBooksAPIsModelType";
import { GoogleBooksApiAccessHistoryCreateModel } from "../../internaldata/googlebooksapiaccesshistory/model/GoogleBooksApiAccessHistoryCreateModel";
import { GoogleBooksApiInfoCacheUpdateModel } from "../../internaldata/googlebooksapiinfocache/model/GoogleBooksApiInfoCacheUpdateModel";
import { GoogleBooksApiIdModel } from "../../internaldata/googlebooksapiinfocache/properties/GoogleBooksApiIdModel";
import { GoogleBooksApiTitleModel } from "../../internaldata/googlebooksapiinfocache/properties/GoogleBooksApiTitleModel";
import { GoogleBooksApiPublishedDateModel } from "../../internaldata/googlebooksapiinfocache/properties/GoogleBooksApiPublishedDateModel";
import { GoogleBooksApiDescriptionModel } from "../../internaldata/googlebooksapiinfocache/properties/GoogleBooksApiDescriptionModel";
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
import { GoogleBookInfoApis } from '../../externalapi/googlebookinfo/service/GoogleBookInfoApis';
import { GoogleBookInfoApisKeyword } from '../../externalapi/properties/GoogleBookInfoApisKeyword';
import { BookSearchRepositoryInterface } from '../repository/interface/BookSearchRepositoryInterface';
import { GoogleBooksApiCacheSelectEntity } from '../entity/GoogleBooksApiCacheSelectEntity';
import { GoogleBooksApiSmallThumbnailCacheRepositorys } from '../../internaldata/googlebooksapismallthumbnailcache/repository/GoogleBooksApiSmallThumbnailCacheRepositorys';
import { GoogleBooksApiSmallThumbnailCacheRepositoryInterface } from '../../internaldata/googlebooksapismallthumbnailcache/repository/interface/GoogleBooksApiSmallThumbnailCacheRepositoryInterface';
import { GoogleBooksApiThumbnailCacheRepositoryInterface } from '../../internaldata/googlebooksapithumbnail/repository/interface/GoogleBooksApiThumbnailCacheRepositoryInterface';
import { GoogleBooksApiThumbnailCacheRepositorys } from '../../internaldata/googlebooksapithumbnail/repository/GoogleBooksApiThumbnailCacheRepositorys';
import { GoogleBooksApiAuthorsCacheRepositorys } from '../../internaldata/googlebooksapiauthorscache/repository/GoogleBooksApiAuthorsCacheRepositorys';
import { GoogleBooksApiAuthorsCacheRepositoryInterface } from '../../internaldata/googlebooksapiauthorscache/repository/interface/GoogleBooksApiAuthorsCacheRepositoryInterface';
import { GoogleBooksApiInfoCacheRepositorys } from '../../internaldata/googlebooksapiinfocache/repository/GoogleBooksApiInfoCacheRepositorys';
import { GoogleBooksApiInfoCacheRepositoryInterface } from '../../internaldata/googlebooksapiinfocache/repository/interface/GoogleBooksApiInfoCacheRepositoryInterface';
import { GoogleBooksApiSmallThumbnailCacheSelectEntity } from '../entity/GoogleBooksApiSmallThumbnailCacheSelectEntity';
import { GoogleBooksApiSmallThumbnailCacheInsertEntity } from '../../internaldata/googlebooksapismallthumbnailcache/entity/GoogleBooksApiSmallThumbnailCacheInsertEntity';
import { SmallThumbnailModel } from '../../internaldata/googlebooksapismallthumbnailcache/properties/SmallThumbnailModel';
import { GoogleBooksApiSmallThumbnailCacheUpdateEntity } from '../../internaldata/googlebooksapismallthumbnailcache/entity/GoogleBooksApiSmallThumbnailCacheUpdateEntity';
import { ThumbnailModel } from '../../internaldata/googlebooksapithumbnail/properties/ThumbnailModel';
import { GoogleBooksApiThumbnailCacheUpdateEntity } from '../../internaldata/googlebooksapithumbnail/entity/GoogleBooksApiThumbnailCacheUpdateEntity';
import { GoogleBooksApiThumbnailCacheInsertEntity } from '../../internaldata/googlebooksapithumbnail/entity/GoogleBooksApiThumbnailCacheInsertEntity';
import { GoogleBooksApiThumbnailCacheSelectEntity } from '../entity/GoogleBooksApiThumbnailCacheSelectEntity';
import { GoogleBooksApiInfoCacheSelectEntity } from '../entity/GoogleBooksApiInfoCacheSelectEntity';
import { GoogleBooksApiInfoCacheInsertEntity } from '../../internaldata/googlebooksapiinfocache/entity/GoogleBooksApiInfoCacheInsertEntity';
import { GoogleBooksApiInfoCacheUpdateEntity } from '../../internaldata/googlebooksapiinfocache/entity/GoogleBooksApiAuthorsCacheUpdateEntity';


export class BookSearchService {

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

            const googleBookInfoApisKeyword = new GoogleBookInfoApisKeyword(keyword);

            // Google Books Apiデータ取得
            const googleBookInfoApis: GoogleBookInfoApis = new GoogleBookInfoApis(googleBookInfoApisKeyword);

            // Google Books Apiを呼び出す
            const googleBookInfoList = await googleBookInfoApis.call();

            return googleBookInfoList;

        } catch (err) {
            throw Error(`ERROR:${err} endpoint:${ENV.BOOK_SEARCH} keyword:${keyword}`);
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
        const googleBooksApiInfoCacheList: GoogleBooksApiInfoCacheJsonModelType[] =
            this.googleBooksApiInfoCacheService.getGoogleBooksApiInfoCache();

        return googleBooksApiInfoCacheList;
    }


    /**
     * Google Books Api著者キャッシュ情報ファイルからデータを取得
     * @returns 
     */
    public getGoogleBooksApiAuthorsCache() {

        // Google Books Api著者キャッシュ情報ファイルからデータを取得
        const googleBooksApiAuthorsCacheList: GoogleBooksApiAuthorsCacheJsonModelType[] =
            this.googleBooksApiAuthorsCacheService.getGoogleBooksApiAuthorsCache();

        return googleBooksApiAuthorsCacheList;
    }


    /**
     * Google Books Apiサムネイル(小)キャッシュ情報ファイルからデータを取得
     * @returns 
     */
    public getGoogleBooksApiSmallThumbnailCache() {

        // Google Books Apiサムネイル(小)キャッシュ情報ファイルからデータを取得
        const googleBooksApiSmallThumbnailCacheList: GoogleBooksApiSmallThumbnailCacheJsonModelType[]
            = this.googleBooksApiSmallThumbnailCacheService.getGoogleBooksApiSmallThumbnailCache();

        return googleBooksApiSmallThumbnailCacheList;
    }


    /**
     * Google Books Apiサムネイルキャッシュ情報ファイルからデータを取得
     * @returns 
     */
    public getGoogleBooksApiThumbnailCache() {

        // Google Books Apiサムネイルキャッシュ情報ファイルからデータを取得
        const googleBooksApiThumbnailCacheList: GoogleBooksApiThumbnailCacheJsonModelType[]
            = this.googleBooksApiThumbnailCacheService.getGoogleBooksApiThumbnailCache();

        return googleBooksApiThumbnailCacheList;
    }


    /**
     * キャッシュ情報をGoogle Books Api用の型に変換する
     * @param googleBooksApiCacheMergedList 
     * @returns 
     */
    public parseGoogleBooksAPIsModelItems(googleBooksApiCacheMergedList: ReadonlyArray<GoogleBooksApiCacheModelType>) {

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
    public createOrUpdateGoogleBooksApiInfoCache(googleBooksApiInfoCacheList: GoogleBooksApiInfoCacheJsonModelType[],
        bookItems: GoogleBooksAPIsModelItemsType[]): GoogleBooksApiInfoCacheJsonModelType[] {

        // 登録用キャッシュデータリスト
        let createGoogleBooksApiInfoCacheList: GoogleBooksAPIsModelItemsType[] = [];

        // Google Books Apiから取得した書籍情報をキャッシュに登録/更新する
        bookItems.forEach((e: GoogleBooksAPIsModelItemsType) => {

            let googleBooksApiInfoCache = googleBooksApiInfoCacheList.find((e1: GoogleBooksApiInfoCacheJsonModelType) => {
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
    public overWriteGoogleBooksApiInfoCache(googleBooksApiInfoCacheList: GoogleBooksApiInfoCacheJsonModelType[]) {

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
    public createOrUpdateGoogleBooksApiAuthorsCache(googleBooksApiAuthorsCacheList: GoogleBooksApiAuthorsCacheJsonModelType[],
        bookItems: GoogleBooksAPIsModelItemsType[]): GoogleBooksApiAuthorsCacheJsonModelType[] {

        // 登録用キャッシュデータリスト
        let createGoogleBooksApiAuthorsCacheList: GoogleBooksAPIsModelItemsType[] = [];

        // Google Books Apiから取得した著者情報をキャッシュに登録/更新する
        bookItems.forEach((e: GoogleBooksAPIsModelItemsType) => {

            let googleBooksApiAuthorsCache = googleBooksApiAuthorsCacheList.filter((e1: GoogleBooksApiInfoCacheJsonModelType) => {
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
    public overWriteGoogleBooksApiAuthorsCache(googleBooksApiAuthorsCacheList: GoogleBooksApiAuthorsCacheJsonModelType[]) {

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
    public createOrUpdateGoogleBooksApiSmallThumbnailCache(googleBooksApiSmallThumbnailCacheList: GoogleBooksApiSmallThumbnailCacheJsonModelType[],
        bookItems: GoogleBooksAPIsModelItemsType[]): GoogleBooksApiSmallThumbnailCacheJsonModelType[] {

        // 登録用キャッシュデータリスト
        let createGoogleBooksApiSmallThumbnailCacheList: GoogleBooksAPIsModelItemsType[] = [];

        // Google Books Apiから取得したサムネイル(小)情報をキャッシュに登録/更新する
        bookItems.forEach((e: GoogleBooksAPIsModelItemsType) => {

            let googleBooksApiSmallThumbnailCache = googleBooksApiSmallThumbnailCacheList.find((e1: GoogleBooksApiInfoCacheJsonModelType) => {
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
    public overWriteGoogleBooksApiSmallThumbnailCache(googleBooksApiSmallThumbnailCacheList: GoogleBooksApiSmallThumbnailCacheJsonModelType[]) {

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
    public createOrUpdateGoogleBooksApiThumbnailCache(googleBooksApiThumbnailCacheList: GoogleBooksApiThumbnailCacheJsonModelType[],
        bookItems: GoogleBooksAPIsModelItemsType[]): GoogleBooksApiThumbnailCacheJsonModelType[] {

        // 登録用キャッシュデータリスト
        let createGoogleBooksApiThumbnailCacheList: GoogleBooksAPIsModelItemsType[] = [];

        // Google Books Apiから取得したサムネイル情報をキャッシュに登録/更新する
        bookItems.forEach((e: GoogleBooksAPIsModelItemsType) => {

            let googleBooksApiThumbnailCache = googleBooksApiThumbnailCacheList.find((e1: GoogleBooksApiInfoCacheJsonModelType) => {
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
    public overWriteGoogleBooksApiThumbnailCache(googleBooksApiThumbnailCacheList: GoogleBooksApiThumbnailCacheJsonModelType[]) {

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

        return (new GoogleBooksApiAccessHistoryRepositorys()).get(RepositoryType.JSON);
    }


    /**
     * BookSearchの永続ロジックを取得
     */
    public getBookSearchRepository(): BookSearchRepositoryInterface {

        return (new BookSearchRepositorys()).get(RepositoryType.JSON);
    }


    /**
     * Google Books Api書籍の永続ロジックを取得
     */
    public getGoogleBooksApiInfoCacheRepository(): GoogleBooksApiInfoCacheRepositoryInterface {

        return (new GoogleBooksApiInfoCacheRepositorys()).get(RepositoryType.JSON);
    }


    /**
     * Google Books Api著者の永続ロジックを取得
     */
    public getGoogleBooksApiAuthorsCacheRepository(): GoogleBooksApiAuthorsCacheRepositoryInterface {

        return (new GoogleBooksApiAuthorsCacheRepositorys()).get(RepositoryType.JSON);
    }


    /**
     * Google Books Apiのサムネイル(小)の永続ロジックを取得
     */
    public getGoogleBooksApiSmallThumbnailCacheRepository(): GoogleBooksApiSmallThumbnailCacheRepositoryInterface {

        return (new GoogleBooksApiSmallThumbnailCacheRepositorys()).get(RepositoryType.JSON);
    }


    /**
     * Google Books Apiのサムネイルの永続ロジックを取得
     */
    public getGoogleBooksApiThumbnailCacheRepository(): GoogleBooksApiThumbnailCacheRepositoryInterface {

        return (new GoogleBooksApiThumbnailCacheRepositorys()).get(RepositoryType.JSON);
    }


    /**
     * Google Books Apiのキャッシュ情報取得
     */
    public getGoogleBooksApiCacheList(BookSearchRepository: BookSearchRepositoryInterface, keywordModel: KeywordModel) {

        const googleBooksApiCacheSelectEntity = new GoogleBooksApiCacheSelectEntity(keywordModel);

        const googleBooksApiCacheList = BookSearchRepository.selectGoogleBooksApiCacheList(googleBooksApiCacheSelectEntity);

        return googleBooksApiCacheList;
    }


    /**
     * Google Books Apiのサムネイル(小)キャッシュ情報の追加/更新
     * @param googleBooksApiSmallThumbnailCacheRepository 
     * @param googleBooksApiItems 
     */
    public updateGoogleBooksApiSmallThumbnailCache(
        bookSearchRepository: BookSearchRepositoryInterface,
        googleBooksApiSmallThumbnailCacheRepository: GoogleBooksApiSmallThumbnailCacheRepositoryInterface,
        googleBooksApiItems: GoogleBooksAPIsModelItemsType[]) {

        googleBooksApiItems.forEach((e: GoogleBooksAPIsModelItemsType) => {

            // 検索条件
            const googleBooksApiSmallThumbnailCacheSelectEntity =
                new GoogleBooksApiSmallThumbnailCacheSelectEntity(new GoogleBooksApiIdModel(e.id));

            // Google Books Apiのサムネイル(小)キャッシュ情報を取得
            const googleBooksApiSmallThumbnailCacheList =
                bookSearchRepository.selectGoogleBooksApiSmallThumbnailCacheList(googleBooksApiSmallThumbnailCacheSelectEntity);

            const smallThumbnail = e.volumeInfo.imageLinks?.smallThumbnail ?? ``;

            // リストが取得できた場合は更新する
            if (googleBooksApiSmallThumbnailCacheList.length > 0) {

                // 更新条件を作成
                const googleBooksApiSmallThumbnailCacheUpdateEntity =
                    new GoogleBooksApiSmallThumbnailCacheUpdateEntity(
                        new GoogleBooksApiIdModel(e.id),
                        new SmallThumbnailModel(smallThumbnail),
                    );

                // 更新
                googleBooksApiSmallThumbnailCacheRepository.update(googleBooksApiSmallThumbnailCacheUpdateEntity);
            }
            // リストが取得できない場合は登録
            else {

                // 登録条件を作成
                const googleBooksApiSmallThumbnailCacheInsertEntity =
                    new GoogleBooksApiSmallThumbnailCacheInsertEntity(
                        new GoogleBooksApiIdModel(e.id),
                        new SmallThumbnailModel(smallThumbnail),
                    );

                // 登録
                googleBooksApiSmallThumbnailCacheRepository.insert(googleBooksApiSmallThumbnailCacheInsertEntity);
            }
        });
    }


    /**
     * Google Books Apiのサムネイルキャッシュ情報の追加/更新データを作成する
     * @param googleBooksApiThumbnailCacheRepository 
     * @param googleBooksApiItems 
     */
    public updateGoogleBooksApiThumbnailCache(
        bookSearchRepository: BookSearchRepositoryInterface,
        googleBooksApiThumbnailCacheRepository: GoogleBooksApiThumbnailCacheRepositoryInterface,
        googleBooksApiItems: GoogleBooksAPIsModelItemsType[]) {

        googleBooksApiItems.forEach((e: GoogleBooksAPIsModelItemsType) => {

            // 検索条件
            const googleBooksApiThumbnailCacheSelectEntity =
                new GoogleBooksApiThumbnailCacheSelectEntity(new GoogleBooksApiIdModel(e.id));

            // Google Books Apiのサムネイルキャッシュ情報を取得
            const googleBooksApiThumbnailCacheList =
                bookSearchRepository.selectGoogleBooksApiThumbnailCacheList(googleBooksApiThumbnailCacheSelectEntity);

            const thumbnail = e.volumeInfo.imageLinks?.thumbnail ?? ``;

            // リストが取得できた場合は更新する
            if (googleBooksApiThumbnailCacheList.length > 0) {

                // 更新条件を作成
                const googleBooksApiThumbnailCacheUpdateEntity =
                    new GoogleBooksApiThumbnailCacheUpdateEntity(
                        new GoogleBooksApiIdModel(e.id),
                        new ThumbnailModel(thumbnail),
                    );

                // 更新
                googleBooksApiThumbnailCacheRepository.update(googleBooksApiThumbnailCacheUpdateEntity);
            }
            // リストが取得できない場合は登録
            else {

                // 登録条件を作成
                const googleBooksApiThumbnailCacheInsertEntity =
                    new GoogleBooksApiThumbnailCacheInsertEntity(
                        new GoogleBooksApiIdModel(e.id),
                        new ThumbnailModel(thumbnail),
                    );

                // 登録
                googleBooksApiThumbnailCacheRepository.insert(googleBooksApiThumbnailCacheInsertEntity);
            }
        });
    }


    /**
     * Google Books Apiの書籍キャッシュ情報の追加/更新データを作成する
     * @param googleBooksApiThumbnailCacheRepository 
     * @param googleBooksApiItems 
     */
    public updateGoogleBooksApiInfoCache(
        bookSearchRepository: BookSearchRepositoryInterface,
        googleBooksApiInfoCacheRepository: GoogleBooksApiInfoCacheRepositoryInterface,
        googleBooksApiItems: GoogleBooksAPIsModelItemsType[]) {

        googleBooksApiItems.forEach((e: GoogleBooksAPIsModelItemsType) => {

            const bookId = e.id;

            // 検索条件
            const googleBooksApiInfoCacheSelectEntity =
                new GoogleBooksApiInfoCacheSelectEntity(new GoogleBooksApiIdModel(bookId));

            // Google Books Apiの書籍キャッシュ情報を取得
            const googleBooksApiInfoCacheList =
                bookSearchRepository.selectGoogleBooksApiInfoCacheList(googleBooksApiInfoCacheSelectEntity);

            const title = e.volumeInfo.title ?? ``;
            const publishedDate = e.volumeInfo.publishedDate ?? ``;
            const description = e.volumeInfo.description ?? ``;

            // リストが取得できた場合は更新する
            if (googleBooksApiInfoCacheList.length > 0) {

                // 更新条件を作成
                const googleBooksApiInfoCacheUpdateEntity =
                    new GoogleBooksApiInfoCacheUpdateEntity(
                        new GoogleBooksApiIdModel(bookId),
                        new GoogleBooksApiTitleModel(title),
                        new GoogleBooksApiPublishedDateModel(publishedDate),
                        new GoogleBooksApiDescriptionModel(description)
                    );

                // 更新
                googleBooksApiInfoCacheRepository.update(googleBooksApiInfoCacheUpdateEntity);
            }
            // リストが取得できない場合は登録
            else {

                // 登録条件を作成
                const googleBooksApiInfoCacheInsertEntity =
                    new GoogleBooksApiInfoCacheInsertEntity(
                        new GoogleBooksApiIdModel(bookId),
                        new GoogleBooksApiTitleModel(title),
                        new GoogleBooksApiPublishedDateModel(publishedDate),
                        new GoogleBooksApiDescriptionModel(description)
                    );

                // 登録
                googleBooksApiInfoCacheRepository.insert(googleBooksApiInfoCacheInsertEntity);
            }
        });
    }
}