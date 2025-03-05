import { Router, Request, Response } from 'express';
import ENV from '../../env.json';
import { RouteController } from '../../router/controller/RouteController';
import { AsyncErrorHandler } from '../../router/service/AsyncErrorHandler';
import { HTTP_STATUS_CREATED, HTTP_STATUS_METHOD_NOT_ALLOWED, HTTP_STATUS_UNPROCESSABLE_ENTITY } from '../../util/const/HttpStatusConst';
import { ApiResponse } from '../../util/service/ApiResponse';
import { ZodIssue } from 'zod';
import { JsonWebTokenVerifyModel } from '../../jsonwebtoken/model/JsonWebTokenVerifyModel';
import { FrontUserIdModel } from '../../internaldata/frontuserinfomaster/properties/FrontUserIdModel';
import { BookShelfRepositoryInterface } from '../../internaldata/bookshelf/repository/interface/BookShelfRepositoryInterface';
import { SearchBookShelfDetailService } from '../service/SearchBookShelfDetailService';
import { HttpMethodType, RouteSettingModel } from '../../router/model/RouteSettingModel';
import { ApiEndopoint } from '../../router/conf/ApiEndpoint';
import { SearchBookShelfDetailSelectEntity } from '../entity/SearchBookShelfDetailSelectEntity';
import { SUCCESS_MESSAGE } from '../const/SearchBookShelfDetailConst';
import { SearchBookShelfDetailResponseType } from '../model/SearchBookShelfDetailResponseType';
import { BookIdModel } from '../../internaldata/bookinfomaster/properties/BookIdModel';



export class SearchBookShelfDetailController extends RouteController {

    private searchBookShelfDetailService = new SearchBookShelfDetailService();

    protected getRouteSettingModel(): RouteSettingModel {

        return new RouteSettingModel(
            HttpMethodType.GET,
            this.doExecute,
            ApiEndopoint.BOOKSHELF_INFO_ID
        );
    }

    /**
     * 本棚情報詳細を取得する
     * @param req 
     * @param res 
     * @returns 
     */
    public doExecute(req: Request, res: Response) {

        const id = req.params.id;

        if (!id) {
            return ApiResponse.create(res, HTTP_STATUS_METHOD_NOT_ALLOWED, `書籍IDが指定されていません。`);
        }

        const bookIdModel = BookIdModel.reConstruct(id);

        // jwtの認証を実行する
        const jsonWebTokenVerifyModel = this.searchBookShelfDetailService.checkJwtVerify(req.cookies.jwt);
        const frontUserIdModel: FrontUserIdModel = jsonWebTokenVerifyModel.frontUserIdModel;

        // 本棚情報の取得
        const bookShelfnfo: ReadonlyArray<SearchBookShelfDetailResponseType> =
            this.searchBookShelfDetailService.getBookShelfDetail(frontUserIdModel, bookIdModel);

        if (bookShelfnfo.length === 0) {
            return ApiResponse.create(res, HTTP_STATUS_UNPROCESSABLE_ENTITY, `書籍情報が存在しません。`);
        }

        return ApiResponse.create(res, HTTP_STATUS_CREATED, SUCCESS_MESSAGE, bookShelfnfo);
    }
}