import { Router, Request, Response } from 'express';
import ENV from '../../env.json';
import { RouteController } from '../../router/controller/RouteController';
import { CreateFrontUserInfoService } from '../service/FrontCreateUserInfoService';
import { AsyncErrorHandler } from '../../router/service/AsyncErrorHandler';
import { HTTP_STATUS_CREATED, HTTP_STATUS_UNPROCESSABLE_ENTITY } from '../../util/const/HttpStatusConst';
import { FrontUserInfoCreateRequestModelSchema } from '../model/FrontUserInfoCreateRequestModelSchema';
import { ZodIssue } from 'zod';
import { FrontUserIdModel } from '../../internaldata/frontuserinfomaster/properties/FrontUserIdModel';
import { FrontUserInfoCreateRequestModel } from '../model/FrontUserInfoCreateRequestModel';
import { FrontUserInfoCreateRequestType } from '../model/FrontUserInfoCreateRequestType';
import { FrontUserInfoMasterRepositoryInterface } from '../../internaldata/frontuserinfomaster/repository/interface/FrontUserInfoMasterRepositoryInterface';
import { FrontUserInfoMasterInsertEntity } from '../../internaldata/frontuserinfomaster/entity/FrontUserInfoMasterInsertEntity';
import { ApiResponse } from '../../util/service/ApiResponse';


export class CreateFrontUserInfoController extends RouteController {

    private createFrontUserInfoService = new CreateFrontUserInfoService();

    public routes() {
        this.router.post(`${ENV.CREATE_FRONT_USER_INFO}`, AsyncErrorHandler.asyncHandler(this.doExecute.bind(this)));
    }

    /**
     * ユーザー情報を登録する
     * @param req 
     * @param res 
     * @returns 
     */
    public doExecute(req: Request, res: Response) {

        // リクエストボディ
        const requestBody: FrontUserInfoCreateRequestType = req.body;

        // リクエストのバリデーションチェック
        const validateResult = FrontUserInfoCreateRequestModelSchema.safeParse(requestBody);

        // バリデーションエラー
        if (!validateResult.success) {

            // エラーメッセージを取得
            const validatErrMessage = validateResult.error.errors.map((e: ZodIssue) => {
                return e.message;
            }).join(`,`);

            return ApiResponse.create(res, HTTP_STATUS_UNPROCESSABLE_ENTITY, validatErrMessage);
        }

        // 永続ロジック用オブジェクトを取得
        const frontUserInfoMasterRepository: FrontUserInfoMasterRepositoryInterface =
            this.createFrontUserInfoService.getRepository();

        // リクエストボディの型を変換する
        const parsedRequestBody: FrontUserInfoCreateRequestModel = this.createFrontUserInfoService.parseRequestBody(requestBody);

        // ユーザー重複チェック
        if (this.createFrontUserInfoService.checkUserNameExists(parsedRequestBody)) {

            return ApiResponse.create(res, HTTP_STATUS_UNPROCESSABLE_ENTITY, `既にユーザーが存在しています。`);
        }

        // ユーザーIDを採番する
        const userIdModel = new FrontUserIdModel();

        // ユーザーマスタ登録用データの作成
        const frontUserInfoMasterInsertEntity: FrontUserInfoMasterInsertEntity =
            this.createFrontUserInfoService.createUserInfoMasterCreateBody(userIdModel, parsedRequestBody);

        // ユーザー情報を追加する
        frontUserInfoMasterRepository.insert(frontUserInfoMasterInsertEntity);

        // コミット
        this.createFrontUserInfoService.commit(frontUserInfoMasterRepository);

        return ApiResponse.create(res, HTTP_STATUS_CREATED, `ユーザー情報の登録が完了しました。`);
    }
}