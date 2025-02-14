import { Router, Request, Response } from 'express';
import ENV from '../../env.json';
import { RouteController } from '../../router/controller/RouteController';
import { AsyncErrorHandler } from '../../router/service/AsyncErrorHandler';
import { HTTP_STATUS_CREATED, HTTP_STATUS_OK, HTTP_STATUS_UNPROCESSABLE_ENTITY } from '../../util/const/HttpStatusConst';
import { CreateBookShelfService } from '../service/CreateBookShelfService';
import { CreateBookShelfRequestType } from '../model/CreateBookShelfRequestType';
import { CreateBookShelfRequestModelSchema } from '../model/CreateBookShelfRequestModelSchema';
import { ApiResponse } from '../../util/service/ApiResponse';
import { ZodIssue } from 'zod';
import { JsonWebTokenVerifyModel } from '../../jsonwebtoken/model/JsonWebTokenVerifyModel';
import { FrontUserIdModel } from '../../internaldata/frontuserinfomaster/properties/FrontUserIdModel';
import { CreateBookShelfRequestModel } from '../model/CreateBookShelfRequestModel';
import { BookShelfRepositoryInterface } from '../../internaldata/bookshelf/repository/interface/BookShelfRepositoryInterface';
import { HttpMethodType, RouteSettingModel } from '../../router/model/RouteSettingModel';
import { ApiEndopoint } from '../../router/conf/ApiEndpoint';


export class CreateBookShelfController extends RouteController {

    private createBookShelfService = new CreateBookShelfService();

    protected getRouteSettingModel(): RouteSettingModel {

        return new RouteSettingModel(
            HttpMethodType.POST,
            this.doExecute,
            ApiEndopoint.BOOKSHELF_INFO
        );
    }

    /**
     * 本棚情報を登録する
     * @param req 
     * @param res 
     * @returns 
     */
    public doExecute(req: Request, res: Response) {

        // リクエストボディ
        const requestBody: CreateBookShelfRequestType = req.body;

        // リクエストのバリデーションチェック
        const validateResult = CreateBookShelfRequestModelSchema.safeParse(requestBody);

        // バリデーションエラー
        if (!validateResult.success) {

            // エラーメッセージを取得
            const validatErrMessage = validateResult.error.errors.map((e: ZodIssue) => {
                return e.message;
            }).join(`,`);

            return ApiResponse.create(res, HTTP_STATUS_UNPROCESSABLE_ENTITY, validatErrMessage);
        }

        // リクエストボディの型変換
        const createBookShelfRequestModel: CreateBookShelfRequestModel = new CreateBookShelfRequestModel(requestBody);

        // jwtの認証を実行する
        const jsonWebTokenVerifyModel = this.createBookShelfService.checkJwtVerify(req.cookies.jwt);
        const frontUserIdModel: FrontUserIdModel = jsonWebTokenVerifyModel.frontUserIdModel;

        // 本棚情報の重複チェック
        if (this.createBookShelfService.checkDupulicateBookShelf(createBookShelfRequestModel, frontUserIdModel)) {
            return ApiResponse.create(res, HTTP_STATUS_UNPROCESSABLE_ENTITY, `既に本棚に登録されています。`);
        }

        // 本棚情報の永続ロジックを取得
        const bookShelfRepository: BookShelfRepositoryInterface = this.createBookShelfService.getBookShelfRepository();

        // 本棚に書籍情報を追加
        this.createBookShelfService.insert(bookShelfRepository, createBookShelfRequestModel, frontUserIdModel);

        // コミット
        this.createBookShelfService.commit(bookShelfRepository);

        return ApiResponse.create(res, HTTP_STATUS_OK, `本棚に登録しました。`);
    }
}