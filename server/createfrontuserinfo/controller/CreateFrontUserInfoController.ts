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
import { NewJsonWebTokenModel } from '../../jsonwebtoken/model/NewJsonWebTokenModel';
import { FrontUserInfoCreateResponseModel } from '../model/FrontUserInfoCreateResponseModel';
import { FrontUserLoginMasterRepositoryInterface } from '../../internaldata/frontuserloginmaster/repository/interface/FrontUserLoginMasterRepositoryInterface';


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

        // リクエストボディの型を変換する
        const frontUserInfoCreateRequestBody: FrontUserInfoCreateRequestModel =
            this.createFrontUserInfoService.parseRequestBody(requestBody);

        // ユーザー重複チェック
        if (this.createFrontUserInfoService.checkUserNameExists(frontUserInfoCreateRequestBody)) {

            return ApiResponse.create(res, HTTP_STATUS_UNPROCESSABLE_ENTITY, `既にユーザーが存在しています。`);
        }

        // ユーザーマスタの永続ロジック用オブジェクトを取得
        const frontUserInfoMasterRepository: FrontUserInfoMasterRepositoryInterface =
            this.createFrontUserInfoService.getFrontUserInfoMasterRepository();

        // ユーザーログインマスタの永続ロジック用オブジェクトを取得
        const frontUserLoginMasterRepository: FrontUserLoginMasterRepositoryInterface =
            this.createFrontUserInfoService.getFrontUserLoginMasterRepository();

        // ユーザーIDを採番する
        const userIdModel: FrontUserIdModel = FrontUserIdModel.create();

        // ユーザーマスタ登録用データの作成
        const frontUserInfoMasterInsertEntity: FrontUserInfoMasterInsertEntity =
            this.createFrontUserInfoService.createUserInfoMasterCreateBody(userIdModel, frontUserInfoCreateRequestBody);

        // ユーザー情報を追加する
        frontUserInfoMasterRepository.insert(frontUserInfoMasterInsertEntity);

        // ユーザーマスタログインマスタ登録用データの作成
        const frontUserLoginMasterInsertEntity =
            this.createFrontUserInfoService.createUserLoginMasterCreateBody(userIdModel, frontUserInfoCreateRequestBody);

        // ユーザーログイン情報を追加する
        frontUserLoginMasterRepository.insert(frontUserLoginMasterInsertEntity);

        // jwtを作成
        const newJsonWebTokenModel: NewJsonWebTokenModel =
            this.createFrontUserInfoService.createJsonWebToken(userIdModel, frontUserInfoCreateRequestBody);

        // レスポンスを作成
        const frontUserInfoCreateResponse: FrontUserInfoCreateResponseModel =
            this.createFrontUserInfoService.createResponse(frontUserInfoCreateRequestBody, newJsonWebTokenModel);

        // コミット
        this.createFrontUserInfoService.commit(frontUserInfoMasterRepository, frontUserLoginMasterRepository);

        return ApiResponse.create(res, HTTP_STATUS_CREATED, `ユーザー情報の登録が完了しました。`, frontUserInfoCreateResponse);
    }
}