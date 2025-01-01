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
import { GoogleBooksApiAccessHistoryModelType } from '../../internaldata/googlebooksapiaccesshistory/model/GoogleBooksApiAccessHistoryModelType';
import { AccessDateModel } from '../../internaldata/googlebooksapiaccesshistory/model/AccessDateModel';
import { KeywordModel } from '../../internaldata/googlebooksapiaccesshistory/model/KeywordModel';
import { GoogleBooksApiInfoCacheModelType } from '../../internaldata/googlebooksapiinfocache/model/GoogleBooksApiInfoCacheModelType';
import { GoogleBooksApiAuthorsCacheModelType } from '../../internaldata/googlebooksapiauthorscache/model/GoogleBooksApiAuthorsCacheModelType';
import { GoogleBooksApiSmallThumbnailCacheModelType } from '../../internaldata/googlebooksapismallthumbnailcache/model/GoogleBooksApiSmallThumbnailCacheModelType';
import { GoogleBooksApiThumbnailCacheModelType } from '../../internaldata/googlebooksapithumbnail/model/GoogleBooksApiThumbnailCacheModelType';
import { GoogleBooksApiCacheMergedModelType } from '../../internaldata/googlebooksapicacheoperation/model/GoogleBooksApiCacheMergedModelType';
import { GoogleBooksAPIsModelItemsType } from '../../externalapi/googlebookinfo/model/GoogleBooksAPIsModelItemsType';
import { GOOGLE_BOOKS_API_KIND } from '../const/BookSearchConst';


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

            return res.status(HTTP_STATUS_UNPROCESSABLE_ENTITY).json({
                status: HTTP_STATUS_UNPROCESSABLE_ENTITY,
                message: validatErrMessage,
            });
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

        // Google Books Apiの書籍キャッシュ情報を取得する
        let googleBooksApiInfoCacheList: GoogleBooksApiInfoCacheModelType[] = this.bookSearchService.getGoogleBooksApiInfoCache();

        // Google Books Apiの書籍キャッシュ情報を取得する
        let googleBooksApiAuthorsCacheList: GoogleBooksApiAuthorsCacheModelType[] = this.bookSearchService.getGoogleBooksApiAuthorsCache();

        // Google Books Apiのサムネイルキャッシュ情報を取得する
        let googleBooksApiSmallThumbnailCacheList: GoogleBooksApiSmallThumbnailCacheModelType[] = this.bookSearchService.getGoogleBooksApiSmallThumbnailCache();

        // Google Books Apiのサムネイル(小)キャッシュ情報を取得する
        let googleBooksApiThumbnailCacheList: GoogleBooksApiThumbnailCacheModelType[] = this.bookSearchService.getGoogleBooksApiThumbnailCache();

        // 現在日付を取得する
        const accessDateModel = new AccessDateModel();

        // Google Books Apiのアクセス履歴を取得する
        let googleBooksApiAccessHistoryList: GoogleBooksApiAccessHistoryModelType[] = this.bookSearchService.getGoogleBooksApiAccessHistory();

        /** キーワードと日付でGoogle Books Apiのアクセス履歴をチェックする */
        if (this.bookSearchService.checkAccessHistoryByKeywordAndDate(googleBooksApiAccessHistoryList, keywordModel, accessDateModel)) {

            // キャッシュ情報をマージする
            let GoogleBooksApiCacheMergedList: GoogleBooksApiCacheMergedModelType[] = this.bookSearchService.mergeGoogleBooksApiCacheInfo(googleBooksApiInfoCacheList,
                googleBooksApiAuthorsCacheList,
                googleBooksApiSmallThumbnailCacheList,
                googleBooksApiThumbnailCacheList
            );

            // アクセス履歴が存在する場合は書籍キャッシュ情報をキーワードでフィルターする
            GoogleBooksApiCacheMergedList = this.bookSearchService.getGoogleBooksApiAuthorsCacheByKeyword(googleBooksApiInfoCacheList, keywordModel);

            // フィルターしたキャッシュ情報をGoogle Books Apiの型に変換する
            const googleBooksAPIsModelItemsTypeList: GoogleBooksAPIsModelItemsType[] =
                this.bookSearchService.convertGoogleBooksApiInfoCache(GoogleBooksApiCacheMergedList);

            // レスポンスの型に変換する
            retBookInfo = this.bookSearchService.convertRetGoogleBooksApiInfo(retBookInfo, googleBooksAPIsModelItemsTypeList);
        }
        else {

            // アクセス履歴が存在しない場合はGoogle Books Apiから書籍情報を取得する
            retBookInfo = await this.bookSearchService.callGoogleBookApi(keyword);

            // Google Books Apiの書籍キャッシュ情報にデータを追加/更新する

            // Google Books Apiの著者キャッシュ情報にデータを追加/更新する

            // Google Books Apiのサムネイルキャッシュ情報にデータを追加/更新する

            // Google Books Apiのサムネイル(小)キャッシュ情報にデータを追加/更新する

            // Google Books Apiのアクセス履歴にデータを追加する
            this.bookSearchService.overWriteGoogleBookApiAccessHistory(googleBooksApiAccessHistoryList, keywordModel, accessDateModel);
        }

        // 書籍マスタ情報を取得する

        // 書籍情報マスタとマージする

        return res.status(HTTP_STATUS_OK).json({
            status: HTTP_STATUS_OK,
            message: "Book Data found",
            data: retBookInfo
        });
    }
}