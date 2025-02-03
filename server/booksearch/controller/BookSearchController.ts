import { Router, Request, Response, NextFunction } from 'express';
import ENV from '../../env.json';
import { BookSearchService } from '../service/BookSearchService';
import { HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_INTERNAL_SERVER_ERROR, HTTP_STATUS_OK, HTTP_STATUS_UNPROCESSABLE_ENTITY } from '../../util/const/HttpStatusConst';
import { GoogleBooksAPIsModelType } from '../../externalapi/googlebookinfo/model/GoogleBooksAPIsModelType';
import { RouteController } from '../../router/controller/RouteController';
import { AsyncErrorHandler } from '../../router/service/AsyncErrorHandler';
import { BookSearchQueryParameterSchema } from '../model/BookSearchQueryParameterSchema';
import { ZodIssue } from 'zod';
import { AccessDateModel } from '../../internaldata/googlebooksapiaccesshistory/properties/AccessDateModel';
import { KeywordModel } from '../../internaldata/googlebooksapiaccesshistory/properties/KeywordModel';
import { GoogleBooksApiCacheModelType } from '../../internaldata/googlebooksapicacheoperation/model/GoogleBooksApiCacheModelType';
import { GoogleBooksAPIsModelItemsType } from '../../externalapi/googlebookinfo/model/GoogleBooksAPIsModelItemsType';
import { GOOGLE_BOOKS_API_KIND, SUCCESS_MESSAGE } from '../const/BookSearchConst';
import { ApiResponse } from '../../util/service/ApiResponse';
import { BookSearchRepositoryInterface } from '../repository/interface/BookSearchRepositoryInterface';
import { BookInfoListModelType } from '../model/BookInfoListModelType';


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

        // BookSearchの永続ロジックを取得
        const bookSearchRepository: BookSearchRepositoryInterface = this.bookSearchService.getBookSearchRepository();

        // Google Books Apiの書籍情報リスト
        let googleBooksApiItems: GoogleBooksAPIsModelItemsType[] = [];

        // 現在日付を取得する
        const accessDateModel = new AccessDateModel();

        /** Google Books Apiのアクセス履歴をチェックする */
        if (this.bookSearchService.checkAccessHistoryExist(keywordModel, accessDateModel)) {

            // アクセス履歴が存在する場合は書籍キャッシュ情報を取得する
            const filterdGoogleBooksApiCacheMergedList: ReadonlyArray<GoogleBooksApiCacheModelType> =
                this.bookSearchService.getGoogleBooksApiCacheList(bookSearchRepository, keywordModel);

            // フィルターしたキャッシュ情報をGoogle Books Apiの型に変換する
            googleBooksApiItems = this.bookSearchService.parseGoogleBooksAPIsModelItems(filterdGoogleBooksApiCacheMergedList);
        }
        // アクセス履歴が存在しない
        else {

            // Google Books Apiから書籍情報を取得する
            const googleBookInfo: GoogleBooksAPIsModelType = await this.bookSearchService.callGoogleBookApi(keyword);

            // Google Books Apiの書籍情報リスト
            googleBooksApiItems = googleBookInfo.items;

            // Google Books Api書籍の永続ロジックを取得
            const googleBooksApiInfoCacheRepository =
                this.bookSearchService.getGoogleBooksApiInfoCacheRepository();

            // Google Books Apiの書籍キャッシュ情報の追加/更新
            this.bookSearchService.updateGoogleBooksApiInfoCache(
                bookSearchRepository,
                googleBooksApiInfoCacheRepository,
                googleBooksApiItems,
            );

            // Google Books Api著者の永続ロジックを取得
            const googleBooksApiAuthorsCacheRepository =
                this.bookSearchService.getGoogleBooksApiAuthorsCacheRepository();

            // Google Books Apiの著者キャッシュ情報の追加/更新
            this.bookSearchService.updateGoogleBooksApiAuthorsCache(
                bookSearchRepository,
                googleBooksApiAuthorsCacheRepository,
                googleBooksApiItems,
            );

            // Google Books Apiのサムネイルの永続ロジックを取得
            const googleBooksApiSmallThumbnailCacheRepository =
                this.bookSearchService.getGoogleBooksApiSmallThumbnailCacheRepository();

            // Google Books Apiのサムネイル(小)キャッシュ情報の追加/更新
            this.bookSearchService.updateGoogleBooksApiSmallThumbnailCache(
                bookSearchRepository,
                googleBooksApiSmallThumbnailCacheRepository,
                googleBooksApiItems,
            );

            // Google Books Apiのサムネイルの永続ロジックを取得
            const googleBooksApiThumbnailCacheRepository =
                this.bookSearchService.getGoogleBooksApiThumbnailCacheRepository();

            // Google Books Apiのサムネイルキャッシュ情報の追加/更新
            this.bookSearchService.updateGoogleBooksApiThumbnailCache(
                bookSearchRepository,
                googleBooksApiThumbnailCacheRepository,
                googleBooksApiItems,
            );

            // Google Books Apiアクセス情報の永続ロジックを取得
            const googleBooksApiAccessHistoryRepository = this.bookSearchService.getGoogleBooksApiAccessHistoryRepository();

            // Google Books Apiアクセス情報を登録
            this.bookSearchService.insertGoogleBooksApiAccessHistory(
                googleBooksApiAccessHistoryRepository,
                keywordModel,
                accessDateModel,
            );

            // コミット
            this.bookSearchService.commit(
                googleBooksApiInfoCacheRepository,
                googleBooksApiAuthorsCacheRepository,
                googleBooksApiSmallThumbnailCacheRepository,
                googleBooksApiThumbnailCacheRepository,
                googleBooksApiAccessHistoryRepository,
            );
        }

        // 書籍マスタからデータを取得する
        const bookInfoMasterList: ReadonlyArray<BookInfoListModelType> =
            this.bookSearchService.getBookInfoMasterList(bookSearchRepository, keywordModel);

        // フィルターした書籍情報をGoogle Books Apiの型に変換する
        const parsedBookInfoMasterList: GoogleBooksAPIsModelItemsType[] =
            this.bookSearchService.parseGoogleBooksApiBookInfoMaster(bookInfoMasterList);

        // 書籍情報マスタとGoogle Books Apiの書籍情報をマージする
        const mergedBookInfoList: GoogleBooksAPIsModelItemsType[] = this.bookSearchService.mergeGoogleBooksApiAndBookInfoMaster(
            googleBooksApiItems, parsedBookInfoMasterList
        );

        // レスポンスの書籍情報
        const retBookInfo: GoogleBooksAPIsModelType = {
            kind: GOOGLE_BOOKS_API_KIND,
            totalItems: mergedBookInfoList.length,
            items: mergedBookInfoList
        };

        return ApiResponse.create(res, HTTP_STATUS_OK, SUCCESS_MESSAGE, retBookInfo);
    }
}