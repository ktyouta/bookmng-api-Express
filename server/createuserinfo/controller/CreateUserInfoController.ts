import { Router, Request, Response } from 'express';
import ENV from '../../env.json';
import { RouteController } from '../../router/controller/RouteController';
import { CreateUserInfoService } from '../service/CreateUserInfoService';
import { AsyncErrorHandler } from '../../router/service/AsyncErrorHandler';
import { HTTP_STATUS_CREATED, HTTP_STATUS_UNPROCESSABLE_ENTITY } from '../../util/const/HttpStatusConst';
import { UserInfoCreateRequestModelType } from '../model/UserInfoCreateRequestModelType';
import { UserInfoCreateRequestModelSchema } from '../model/UserInfoCreateRequestModelSchema';
import { ZodIssue } from 'zod';
import { UserInfoModelType } from '../../internaldata/userinfomaster/model/UserInfoModelType';
import { UserNameModel } from '../../internaldata/userinfomaster/model/UserNameModel';


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
        const requestBody: UserInfoCreateRequestModelType = req.body;

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

        const userNameModel = new UserNameModel(requestBody.userName);

        // ユーザー情報リスト
        let userMasterList: UserInfoModelType[] = this.createUserInfoService.getUserMasterInfo();

        // 未削除のユーザー情報リスト
        const activeUserMasterList: UserInfoModelType[] = this.createUserInfoService.getActiveUserMasterInfo(userMasterList);

        // ユーザー重複チェック
        if (this.createUserInfoService.checkUserNameExists(activeUserMasterList, userNameModel)) {

            return res.status(HTTP_STATUS_UNPROCESSABLE_ENTITY).json({
                status: HTTP_STATUS_UNPROCESSABLE_ENTITY,
                message: "既にユーザーが存在します。",
            });
        }


        return res.status(HTTP_STATUS_CREATED).json({
            status: HTTP_STATUS_CREATED,
            message: "ユーザー情報の登録が完了しました。",
        });
    }
}