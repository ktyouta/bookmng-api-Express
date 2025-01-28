import { Router, Request, Response, NextFunction } from 'express';
import ENV from '../../env.json';
import { BookSearchService } from '../service/BookSearchService';
import { HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_INTERNAL_SERVER_ERROR, HTTP_STATUS_OK, HTTP_STATUS_UNPROCESSABLE_ENTITY } from '../../util/const/HttpStatusConst';
import { GoogleBooksAPIsModelType } from '../../externalapi/googlebookinfo/model/GoogleBooksAPIsModelType';
import { RouteController } from '../../router/controller/RouteController';
import { AsyncErrorHandler } from '../../router/service/AsyncErrorHandler';
import { BookSearchQueryParameterSchema } from '../model/BookSearchQueryParameterSchema';
import { ZodIssue } from 'zod';
import { CreateDateModel } from '../../internaldata/common/model/CreateDateModel';
import { AccessDateModel } from '../../internaldata/googlebooksapiaccesshistory/properties/AccessDateModel';
import { KeywordModel } from '../../internaldata/googlebooksapiaccesshistory/properties/KeywordModel';
import { GoogleBooksApiInfoCacheModelType } from '../../internaldata/googlebooksapiinfocache/model/GoogleBooksApiInfoCacheModelType';
import { GoogleBooksApiAuthorsCacheModelType } from '../../internaldata/googlebooksapiauthorscache/model/GoogleBooksApiAuthorsCacheModelType';
import { GoogleBooksApiSmallThumbnailCacheModelType } from '../../internaldata/googlebooksapismallthumbnailcache/model/GoogleBooksApiSmallThumbnailCacheModelType';
import { GoogleBooksApiThumbnailCacheModelType } from '../../internaldata/googlebooksapithumbnail/model/GoogleBooksApiThumbnailCacheModelType';
import { GoogleBooksApiCacheMergedModelType } from '../../internaldata/googlebooksapicacheoperation/model/GoogleBooksApiCacheMergedModelType';
import { GoogleBooksAPIsModelItemsType } from '../../externalapi/googlebookinfo/model/GoogleBooksAPIsModelItemsType';
import { GOOGLE_BOOKS_API_KIND } from '../const/BookSearchConst';
import { BookInfoMergedModelType } from '../../internaldata/bookinfomerge/model/BookInfoMergedModelType';
import { ApiResponse } from '../../util/service/ApiResponse';
import { GoogleBooksApiAccessHistoryJsonModelType } from '../../internaldata/googlebooksapiaccesshistory/model/GoogleBooksApiAccessHistoryJsonModelType';
import { GoogleBooksApiAccessHistoryRepositorys } from '../../internaldata/googlebooksapiaccesshistory/repository/GoogleBooksApiAccessHistoryRepositorys';
import { RepositoryType } from '../../util/const/CommonConst';


export class BookSearchController extends RouteController {

    private bookSearchService = new BookSearchService();

    public routes() {
        this.router.get(`${ENV.BOOK_SEARCH}`, AsyncErrorHandler.asyncHandler(this.doExecute.bind(this)));
    }

    /**
     * 書籍情報を取得する
     * @param req 
     * @param res 
     * @returns 
     */
    public async doExecute(req: Request, res: Response) {

        // クエリパラメータを取得
        const query = req.query;

        // クエリパラメータのバリデーションチェック
        const validateResult = BookSearchQueryParameterSchema.safeParse(query);

        // バリデーションエラー
        if (!validateResult.success) {

            // エラーメッセージを取得
            const validatErrMessage = validateResult.error.errors.map((e: ZodIssue) => {
                return e.message;
            }).join(`,`);

            return ApiResponse.create(res, HTTP_STATUS_UNPROCESSABLE_ENTITY, validatErrMessage);
        }

        // キーワードを取得
        const keyword = query[`q`] as string;
        const keywordModel = new KeywordModel(keyword);

        // レスポンスの書籍情報
        let retBookInfo: GoogleBooksAPIsModelType = {
            kind: GOOGLE_BOOKS_API_KIND,
            totalItems: 0,
            items: []
        };

        // Google Books Apiの書籍情報リスト
        let googleBooksApiItems: GoogleBooksAPIsModelItemsType[] = [];

        // Google Books Apiの書籍キャッシュ情報を取得する
        let googleBooksApiInfoCacheList: GoogleBooksApiInfoCacheModelType[] = this.bookSearchService.getGoogleBooksApiInfoCache();

        // Google Books Apiの著者キャッシュ情報を取得する
        let googleBooksApiAuthorsCacheList: GoogleBooksApiAuthorsCacheModelType[] = this.bookSearchService.getGoogleBooksApiAuthorsCache();

        // Google Books Apiのサムネイル(小)キャッシュ情報を取得する
        let googleBooksApiSmallThumbnailCacheList: GoogleBooksApiSmallThumbnailCacheModelType[] = this.bookSearchService.getGoogleBooksApiSmallThumbnailCache();

        // Google Books Apiのサムネイルキャッシュ情報を取得する
        let googleBooksApiThumbnailCacheList: GoogleBooksApiThumbnailCacheModelType[] = this.bookSearchService.getGoogleBooksApiThumbnailCache();

        // 現在日付を取得する
        const accessDateModel = new AccessDateModel();

        /** Google Books Apiのアクセス履歴をチェックする */
        if (this.bookSearchService.checkAccessHistoryExist(keywordModel, accessDateModel)) {

            // キャッシュ情報をマージする
            const GoogleBooksApiCacheMergedList: GoogleBooksApiCacheMergedModelType[] = this.bookSearchService.mergeGoogleBooksApiCacheInfo(googleBooksApiInfoCacheList,
                googleBooksApiAuthorsCacheList,
                googleBooksApiSmallThumbnailCacheList,
                googleBooksApiThumbnailCacheList
            );

            // アクセス履歴が存在する場合は書籍キャッシュ情報をキーワードでフィルターする
            const filterdGoogleBooksApiCacheMergedList = this.bookSearchService.getGoogleBooksApiAuthorsCacheByKeyword(
                GoogleBooksApiCacheMergedList, keywordModel);

            // フィルターしたキャッシュ情報をGoogle Books Apiの型に変換する
            googleBooksApiItems = this.bookSearchService.parseGoogleBooksAPIsModelItems(filterdGoogleBooksApiCacheMergedList);
        }
        // アクセス履歴が存在しない
        else {

            // Google Books Apiから書籍情報を取得する
            retBookInfo = await this.bookSearchService.callGoogleBookApi(keyword);

            // Google Books Apiの書籍情報リスト
            googleBooksApiItems = retBookInfo.items;

            // Google Books Apiの書籍キャッシュ情報の追加/更新データを作成する
            googleBooksApiInfoCacheList = this.bookSearchService.createOrUpdateGoogleBooksApiInfoCache(
                googleBooksApiInfoCacheList, googleBooksApiItems);

            // Google Books Api書籍キャッシュ情報ファイルにデータを書き込む
            this.bookSearchService.overWriteGoogleBooksApiInfoCache(googleBooksApiInfoCacheList);

            // Google Books Apiの著者キャッシュ情報の追加/更新データを作成する
            googleBooksApiAuthorsCacheList = this.bookSearchService.createOrUpdateGoogleBooksApiAuthorsCache(
                googleBooksApiAuthorsCacheList, googleBooksApiItems);

            // Google Books Api著者キャッシュにデータを書き込む
            this.bookSearchService.overWriteGoogleBooksApiAuthorsCache(googleBooksApiAuthorsCacheList);

            // Google Books Apiのサムネイル(小)キャッシュ情報の追加/更新データを作成する
            googleBooksApiSmallThumbnailCacheList = this.bookSearchService.createOrUpdateGoogleBooksApiSmallThumbnailCache(
                googleBooksApiSmallThumbnailCacheList, googleBooksApiItems);

            // Google Books Apiのサムネイル(小)キャッシュにデータを書き込む
            this.bookSearchService.overWriteGoogleBooksApiSmallThumbnailCache(googleBooksApiSmallThumbnailCacheList);

            // Google Books Apiのサムネイルキャッシュ情報の追加/更新データを作成する
            googleBooksApiThumbnailCacheList = this.bookSearchService.createOrUpdateGoogleBooksApiThumbnailCache(
                googleBooksApiThumbnailCacheList, googleBooksApiItems);

            // Google Books Apiサムネイルキャッシュにデータを書き込む
            this.bookSearchService.overWriteGoogleBooksApiThumbnailCache(googleBooksApiThumbnailCacheList);

            // Google Books Apiのアクセス履歴の登録用データを作成する
            const googleBooksApiAccessHistoryInsertEntity = this.bookSearchService.createGoogleBookApiAccessHistory(keywordModel, accessDateModel);

            // Google Books Apiアクセス情報ファイルにデータを書き込む
            const googleBooksApiAccessHistoryRepository = this.bookSearchService.getGoogleBooksApiAccessHistoryRepository();
            googleBooksApiAccessHistoryRepository.insert(googleBooksApiAccessHistoryInsertEntity);
        }

        // マージした書籍情報をキーワードでフィルターする
        const filterdMergedBookInfoMasterList: BookInfoMergedModelType[] =
            this.bookSearchService.filterdMergedBookInfoMasterByKeyword(keywordModel);

        // フィルターした書籍情報をGoogle Books Apiの型に変換する
        const parsedBookInfoMasterList: GoogleBooksAPIsModelItemsType[] =
            this.bookSearchService.parseGoogleBooksApiBookInfoMaster(filterdMergedBookInfoMasterList);

        // 書籍情報マスタとGoogle Books Apiの書籍情報をマージする
        const mergedBookInfoList: GoogleBooksAPIsModelItemsType[] = this.bookSearchService.mergeGoogleBooksApiAndBookInfoMaster(
            googleBooksApiItems, parsedBookInfoMasterList
        );

        // レスポンスにデータをセットする
        retBookInfo.totalItems = mergedBookInfoList.length;
        retBookInfo.items = mergedBookInfoList;

        return ApiResponse.create(res, HTTP_STATUS_OK, `Book Data found`, retBookInfo);
    }
}