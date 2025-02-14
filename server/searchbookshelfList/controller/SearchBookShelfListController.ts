import { Router, Request, Response } from 'express';
import ENV from '../../env.json';
import { RouteController } from '../../router/controller/RouteController';
import { AsyncErrorHandler } from '../../router/service/AsyncErrorHandler';
import { HTTP_STATUS_CREATED, HTTP_STATUS_UNPROCESSABLE_ENTITY } from '../../util/const/HttpStatusConst';
import { ApiResponse } from '../../util/service/ApiResponse';
import { ZodIssue } from 'zod';
import { JsonWebTokenVerifyModel } from '../../jsonwebtoken/model/JsonWebTokenVerifyModel';
import { FrontUserIdModel } from '../../internaldata/frontuserinfomaster/properties/FrontUserIdModel';
import { BookShelfRepositoryInterface } from '../../internaldata/bookshelf/repository/interface/BookShelfRepositoryInterface';
import { SearchBookShelfListService } from '../service/SearchBookShelfListService';
import { HttpMethodType, RouteSettingModel } from '../../router/model/RouteSettingModel';
import { ApiEndopoint } from '../../router/conf/ApiEndpoint';



export class SearchBookShelfListController extends RouteController {

    private searchBookShelfListService = new SearchBookShelfListService();

    protected getRouteSettingModel(): RouteSettingModel {

        return new RouteSettingModel(
            HttpMethodType.GET,
            this.doExecute,
            ApiEndopoint.BOOKSHELF_INFO
        );
    }

    /**
     * 本棚情報一覧を取得する
     * @param req 
     * @param res 
     * @returns 
     */
    public doExecute(req: Request, res: Response) {

        // jwtの認証を実行する
        const jsonWebTokenVerifyModel = this.searchBookShelfListService.checkJwtVerify(req.cookies.jwt);
        const frontUserIdModel: FrontUserIdModel = jsonWebTokenVerifyModel.frontUserIdModel;

        return ApiResponse.create(res, HTTP_STATUS_CREATED, ``);
    }
}