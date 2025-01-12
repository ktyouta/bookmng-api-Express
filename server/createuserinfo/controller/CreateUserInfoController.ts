import { Router, Request, Response } from 'express';
import ENV from '../../env.json';
import { RouteController } from '../../router/controller/RouteController';
import { CreateUserInfoService } from '../service/CreateUserInfoService';
import { AsyncErrorHandler } from '../../router/service/AsyncErrorHandler';
import { HTTP_STATUS_CREATED, HTTP_STATUS_UNPROCESSABLE_ENTITY } from '../../util/const/HttpStatusConst';
import { UserInfoCreateRequestModelSchema } from '../model/UserInfoCreateRequestModelSchema';
import { ZodIssue } from 'zod';
import { FrontUserIdModel } from '../../internaldata/frontuserinfomaster/model/FrontUserIdModel';
import { FrontUserInfoMasterCreateModel } from '../../internaldata/frontuserinfomaster/model/FrontUserInfoMasterCreateModel';
import { FrontUserInfoMasterModel } from '../../internaldata/frontuserinfomaster/model/FrontUserInfoMasterModel';
import { UserInfoCreateRequestModel } from '../model/UserInfoCreateRequestModel';
import { UserInfoCreateRequestType } from '../model/UserInfoCreateRequestType';
import { WritableFrontUserInfoMasterListModel } from '../../internaldata/frontuserinfomaster/model/WritableFrontUserInfoMasterListModel';
import { FrontUserInfoMasterListModel } from '../../internaldata/frontuserinfomaster/model/FrontUserInfoMasterListModel';
import { FrontUserInfoMasterJsonModelType } from '../../internaldata/frontuserinfomaster/model/FrontUserInfoMasterJsonModelType';


export class CreateUserInfoController extends RouteController {

    private createUserInfoService = new CreateUserInfoService();

    public routes() {
        this.router.post(`${ENV.CREATE_USER_INFO}`, AsyncErrorHandler.asyncHandler(this.doExecute.bind(this)));
    }

    /**
     * ユーザー情報を登録する
     * @param req 
     * @param res 
     * @returns 
     */
    public doExecute(req: Request, res: Response) {

        // リクエストボディ
        const requestBody: UserInfoCreateRequestType = req.body;

        // リクエストのバリデーションチェック
        const validateResult = UserInfoCreateRequestModelSchema.safeParse(requestBody);

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

        // リクエストボディの型を変換する
        const parsedRequestBody: UserInfoCreateRequestModel = this.createUserInfoService.parseRequestBody(requestBody);

        // ユーザー重複チェック
        if (this.createUserInfoService.checkUserNameExists(parsedRequestBody)) {

            return res.status(HTTP_STATUS_UNPROCESSABLE_ENTITY).json({
                status: HTTP_STATUS_UNPROCESSABLE_ENTITY,
                message: "既にユーザーが存在しています。",
            });
        }

        // ユーザーIDを採番する
        const userIdModel = FrontUserIdModel.createNewUserId();

        // ユーザーマスタ書き込み用データ
        const writableUserMasterListModel: WritableFrontUserInfoMasterListModel =
            this.createUserInfoService.getWritableUserMasterInfo();

        // ユーザーマスタ登録用データの作成
        const userInfoMasterCreateModel: FrontUserInfoMasterModel =
            this.createUserInfoService.createUserInfoMasterCreateBody(userIdModel, parsedRequestBody);

        // ユーザーマスタに対する書き込み用データの作成
        const userInfoMasterListWriteModel: WritableFrontUserInfoMasterListModel =
            this.createUserInfoService.createUserInfoMasterWriteData(writableUserMasterListModel, userInfoMasterCreateModel);

        // ユーザーマスタにデータを書き込む
        this.createUserInfoService.overWriteUserInfoMaster(userInfoMasterListWriteModel);

        return res.status(HTTP_STATUS_CREATED).json({
            status: HTTP_STATUS_CREATED,
            message: "ユーザー情報の登録が完了しました。",
        });
    }
}