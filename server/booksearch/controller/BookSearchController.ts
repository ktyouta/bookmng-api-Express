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
import { GoogleBooksAPIsModelItemsType } from '../../externalapi/googlebookinfo/model/GoogleBooksAPIsModelItemsType';
import { SUCCESS_MESSAGE } from '../const/BookSearchConst';
import { ApiResponse } from '../../util/service/ApiResponse';
import { BookSearchRepositoryInterface } from '../repository/interface/BookSearchRepositoryInterface';
import { BookInfoListModelType } from '../model/BookInfoListModelType';
import { GoogleBooksApiCacheModelType } from '../model/GoogleBooksApiCacheModelType';
import { BookSearchResponseModel } from '../model/BookSearchResponseModel';
import { GoogleBooksApiCacheRepositorys } from '../model/GoogleBooksApiCacheRepositorys';


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
            const googleBooksApiCacheList: ReadonlyArray<GoogleBooksApiCacheModelType> =
                this.bookSearchService.getGoogleBooksApiCacheList(bookSearchRepository, keywordModel);

            // フィルターしたキャッシュ情報をGoogle Books Apiの型に変換する
            googleBooksApiItems = this.bookSearchService.parseGoogleBooksAPIsModelItems(googleBooksApiCacheList);
        }
        // アクセス履歴が存在しない
        else {

            // Google Books Apiから書籍情報を取得する
            const googleBookInfo: GoogleBooksAPIsModelType = await this.bookSearchService.callGoogleBookApi(keyword);

            // Google Books Apiの書籍情報リスト
            googleBooksApiItems = googleBookInfo.items;

            // Google Books Apiの永続ロジックを取得
            const booksApiCacheRepositorys: GoogleBooksApiCacheRepositorys =
                this.bookSearchService.getGoogleBooksApiCacheRepositorys();

            // Google Books Apiの書籍キャッシュ情報の追加/更新
            this.bookSearchService.updateGoogleBooksApiInfoCache(
                bookSearchRepository,
                booksApiCacheRepositorys.googleBooksApiInfoCacheRepository,
                googleBooksApiItems,
            );

            // Google Books Apiの著者キャッシュ情報の追加/更新
            this.bookSearchService.updateGoogleBooksApiAuthorsCache(
                bookSearchRepository,
                booksApiCacheRepositorys.googleBooksApiAuthorsCacheRepository,
                googleBooksApiItems,
            );

            // Google Books Apiのサムネイル(小)キャッシュ情報の追加/更新
            this.bookSearchService.updateGoogleBooksApiSmallThumbnailCache(
                bookSearchRepository,
                booksApiCacheRepositorys.googleBooksApiSmallThumbnailCacheRepository,
                googleBooksApiItems,
            );

            // Google Books Apiのサムネイルキャッシュ情報の追加/更新
            this.bookSearchService.updateGoogleBooksApiThumbnailCache(
                bookSearchRepository,
                booksApiCacheRepositorys.googleBooksApiThumbnailCacheRepository,
                googleBooksApiItems,
            );

            // Google Books Apiアクセス情報を登録
            this.bookSearchService.insertGoogleBooksApiAccessHistory(
                booksApiCacheRepositorys.googleBooksApiAccessHistoryRepository,
                keywordModel,
                accessDateModel,
            );

            // コミット
            this.bookSearchService.commit(booksApiCacheRepositorys);
        }

        // 書籍マスタからデータを取得する
        const bookInfoMasterList: GoogleBooksAPIsModelItemsType[] =
            this.bookSearchService.getGoogleBooksApiBookInfoMaster(bookSearchRepository, keywordModel);

        // 書籍情報マスタとGoogle Books Apiの書籍情報をマージする
        const mergedBookInfoList: GoogleBooksAPIsModelItemsType[] =
            this.bookSearchService.mergeGoogleBooksApiAndBookInfoMaster(googleBooksApiItems, bookInfoMasterList);

        // レスポンスの書籍情報
        const bookSearchResponseModel = new BookSearchResponseModel(mergedBookInfoList);

        return ApiResponse.create(res, HTTP_STATUS_OK, SUCCESS_MESSAGE, bookSearchResponseModel);
    }
}