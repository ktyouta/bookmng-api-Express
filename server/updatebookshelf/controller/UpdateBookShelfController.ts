import { Router, Request, Response } from 'express';
import ENV from '../../env.json';
import { RouteController } from '../../router/controller/RouteController';
import { AsyncErrorHandler } from '../../router/service/AsyncErrorHandler';
import { HTTP_STATUS_CREATED, HTTP_STATUS_METHOD_NOT_ALLOWED, HTTP_STATUS_OK, HTTP_STATUS_UNPROCESSABLE_ENTITY } from '../../util/const/HttpStatusConst';
import { ApiResponse } from '../../util/service/ApiResponse';
import { ZodIssue } from 'zod';
import { JsonWebTokenVerifyModel } from '../../jsonwebtoken/model/JsonWebTokenVerifyModel';
import { FrontUserIdModel } from '../../internaldata/frontuserinfomaster/properties/FrontUserIdModel';
import { BookShelfRepositoryInterface } from '../../internaldata/bookshelf/repository/interface/BookShelfRepositoryInterface';
import { UpdateBookShelfService } from '../service/UpdateBookShelfService';
import { UpdateBookShelfRequestType } from '../model/UpdateBookShelfRequestType';
import { UpdateBookShelfRequestModelSchema } from '../model/UpdateBookShelfRequestModelSchema';
import { UpdateBookShelfRequestModel } from '../model/UpdateBookShelfRequestModel';
import { HttpMethodType, RouteSettingModel } from '../../router/model/RouteSettingModel';
import { ApiEndopoint } from '../../router/conf/ApiEndpoint';
import { BookIdModel } from '../../internaldata/bookinfomaster/properties/BookIdModel';


export class UpdateBookShelfController extends RouteController {

    private updateBookShelfService = new UpdateBookShelfService();

    protected getRouteSettingModel(): RouteSettingModel {

        return new RouteSettingModel(
            HttpMethodType.PUT,
            this.doExecute,
            ApiEndopoint.BOOKSHELF_INFO_ID
        );
    }


    /**
     * 本棚情報を更新する
     * @param req 
     * @param res 
     * @returns 
     */
    public doExecute(req: Request, res: Response, id: string) {

        if (!id) {
            return ApiResponse.create(res, HTTP_STATUS_METHOD_NOT_ALLOWED, `書籍IDが指定されていません。`);
        }

        const bookIdModel = BookIdModel.reConstruct(id);

        // リクエストボディ
        const requestBody: UpdateBookShelfRequestType = req.body;

        // リクエストのバリデーションチェック
        const validateResult = UpdateBookShelfRequestModelSchema.safeParse(requestBody);

        // バリデーションエラー
        if (!validateResult.success) {

            // エラーメッセージを取得
            const validatErrMessage = validateResult.error.errors.map((e: ZodIssue) => {
                return e.message;
            }).join(`,`);

            return ApiResponse.create(res, HTTP_STATUS_UNPROCESSABLE_ENTITY, validatErrMessage);
        }

        // リクエストボディの型変換
        const updateBookShelfRequestModel: UpdateBookShelfRequestModel =
            new UpdateBookShelfRequestModel(bookIdModel, requestBody);

        // jwtの認証を実行する
        const jsonWebTokenVerifyModel = this.updateBookShelfService.checkJwtVerify(req.cookies.jwt);
        const frontUserIdModel: FrontUserIdModel = jsonWebTokenVerifyModel.frontUserIdModel;

        // 本棚情報の重複チェック
        if (!this.updateBookShelfService.checkExistBookShelf(updateBookShelfRequestModel, frontUserIdModel)) {
            return ApiResponse.create(res, HTTP_STATUS_UNPROCESSABLE_ENTITY, `更新対象の本が存在しません。`);
        }

        // 本棚情報の永続ロジックを取得
        const bookShelfRepository: BookShelfRepositoryInterface = this.updateBookShelfService.getBookShelfRepository();

        // 本棚の書籍情報を更新
        this.updateBookShelfService.update(bookShelfRepository, updateBookShelfRequestModel, frontUserIdModel);

        // コミット
        this.updateBookShelfService.commit(bookShelfRepository);

        return ApiResponse.create(res, HTTP_STATUS_OK, `本棚の更新が完了しました。`);
    }
}