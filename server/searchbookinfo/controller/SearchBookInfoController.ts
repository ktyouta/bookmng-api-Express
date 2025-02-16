import { Router, Request, Response, NextFunction } from 'express';
import ENV from '../../env.json';
import { HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_INTERNAL_SERVER_ERROR, HTTP_STATUS_OK, HTTP_STATUS_UNPROCESSABLE_ENTITY } from '../../util/const/HttpStatusConst';
import { GoogleBooksAPIsModelType } from '../../externalapi/googlebookinfo/model/GoogleBooksAPIsModelType';
import { RouteController } from '../../router/controller/RouteController';
import { AsyncErrorHandler } from '../../router/service/AsyncErrorHandler';
import { SearchBookInfoQueryParameterSchema } from '../model/SearchBookInfoQueryParameterSchema';
import { ZodIssue } from 'zod';
import { AccessDateModel } from '../../internaldata/googlebooksapiaccesshistory/properties/AccessDateModel';
import { KeywordModel } from '../../internaldata/googlebooksapiaccesshistory/properties/KeywordModel';
import { GoogleBooksAPIsModelItemsType } from '../../externalapi/googlebookinfo/model/GoogleBooksAPIsModelItemsType';
import { ApiResponse } from '../../util/service/ApiResponse';
import { GoogleBooksApiCacheModelType } from '../model/GoogleBooksApiCacheModelType';
import { GoogleBooksApiCacheRepositorys } from '../model/GoogleBooksApiCacheRepositorys';
import { SearchBookInfoService } from '../service/SearchBookInfoService';
import { SearchBookInfoRepositoryInterface } from '../repository/interface/SearchBookInfoRepositoryInterface';
import { SearchBookInfoResponseModel } from '../model/SearchBookInfoResponseModel';
import { SUCCESS_MESSAGE } from '../const/SearchBookInfoConst';
import { HttpMethodType, RouteSettingModel } from '../../router/model/RouteSettingModel';
import { ApiEndopoint } from '../../router/conf/ApiEndpoint';


export class SearchBookInfoController extends RouteController {

    private searchBookInfoService = new SearchBookInfoService();

    protected getRouteSettingModel(): RouteSettingModel {

        return new RouteSettingModel(
            HttpMethodType.GET,
            this.doExecute,
            ApiEndopoint.BOOK_INFO
        );
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
        const validateResult = SearchBookInfoQueryParameterSchema.safeParse(query);

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

        // SearchBookInfoの永続ロジックを取得
        const searchBookInfoRepository: SearchBookInfoRepositoryInterface = this.searchBookInfoService.getSearchBookInfoRepository();

        // Google Books Apiの書籍情報リスト
        let googleBooksApiItems: GoogleBooksAPIsModelItemsType[] = [];

        // 現在日付を取得する
        const accessDateModel = new AccessDateModel();

        /** Google Books Apiのアクセス履歴をチェックする */
        if (this.searchBookInfoService.checkAccessHistoryExist(keywordModel, accessDateModel)) {

            // アクセス履歴が存在する場合は書籍キャッシュ情報を取得する
            const googleBooksApiCacheList: ReadonlyArray<GoogleBooksApiCacheModelType> =
                this.searchBookInfoService.getGoogleBooksApiCacheList(searchBookInfoRepository, keywordModel);

            // フィルターしたキャッシュ情報をGoogle Books Apiの型に変換する
            googleBooksApiItems = this.searchBookInfoService.parseGoogleBooksAPIsModelItems(googleBooksApiCacheList);
        }
        // アクセス履歴が存在しない
        else {

            // Google Books Apiから書籍情報を取得する
            const googleBookInfo: GoogleBooksAPIsModelType = await this.searchBookInfoService.callGoogleBookApi(keyword);

            // Google Books Apiの書籍情報リスト
            googleBooksApiItems = googleBookInfo.items;

            // Google Books Apiの永続ロジックを取得
            const booksApiCacheRepositorys: GoogleBooksApiCacheRepositorys =
                this.searchBookInfoService.getGoogleBooksApiCacheRepositorys();

            // Google Books Apiの書籍キャッシュ情報の追加/更新
            this.searchBookInfoService.updateGoogleBooksApiInfoCache(
                searchBookInfoRepository,
                booksApiCacheRepositorys.googleBooksApiInfoCacheRepository,
                googleBooksApiItems,
            );

            // Google Books Apiの著者キャッシュ情報の追加/更新
            this.searchBookInfoService.updateGoogleBooksApiAuthorsCache(
                searchBookInfoRepository,
                booksApiCacheRepositorys.googleBooksApiAuthorsCacheRepository,
                googleBooksApiItems,
            );

            // Google Books Apiのサムネイルキャッシュ情報の追加/更新
            this.searchBookInfoService.updateGoogleBooksApiThumbnailCache(
                searchBookInfoRepository,
                booksApiCacheRepositorys.googleBooksApiThumbnailCacheRepository,
                googleBooksApiItems,
            );

            // Google Books Apiアクセス情報を登録
            this.searchBookInfoService.insertGoogleBooksApiAccessHistory(
                booksApiCacheRepositorys.googleBooksApiAccessHistoryRepository,
                keywordModel,
                accessDateModel,
            );

            // コミット
            this.searchBookInfoService.commit(booksApiCacheRepositorys);
        }

        // 書籍マスタからデータを取得する
        const bookInfoMasterList: GoogleBooksAPIsModelItemsType[] =
            this.searchBookInfoService.getGoogleBooksApiBookInfoMaster(searchBookInfoRepository, keywordModel);

        // 書籍情報マスタとGoogle Books Apiの書籍情報をマージする
        const mergedBookInfoList: GoogleBooksAPIsModelItemsType[] =
            this.searchBookInfoService.mergeGoogleBooksApiAndBookInfoMaster(googleBooksApiItems, bookInfoMasterList);

        // レスポンスの書籍情報
        const searchBookInfoResponseModel = new SearchBookInfoResponseModel(mergedBookInfoList);

        return ApiResponse.create(res, HTTP_STATUS_OK, SUCCESS_MESSAGE, searchBookInfoResponseModel);
    }
}