import { Router, Request, Response } from 'express';
import ENV from '../../env.json';
import { RouteController } from '../../router/controller/RouteController';
import { CreateUserInfoService } from '../service/CreateUserInfoService';
import { AsyncErrorHandler } from '../../router/service/AsyncErrorHandler';
import { HTTP_STATUS_CREATED, HTTP_STATUS_UNPROCESSABLE_ENTITY } from '../../util/const/HttpStatusConst';
import { UserInfoCreateRequestModelSchema } from '../model/UserInfoCreateRequestModelSchema';
import { ZodIssue } from 'zod';
import { UserInfoMasterJsonModelType } from '../../internaldata/userinfomaster/model/UserInfoMasterJsonModelType';
import { UserNameModel } from '../../internaldata/userinfomaster/model/UserNameModel';
import { UserIdModel } from '../../internaldata/userinfomaster/model/UserIdModel';
import { UserInfoMasterCreateModel } from '../../internaldata/userinfomaster/model/UserInfoMasterCreateModel';
import { UserInfoMasterModel } from '../../internaldata/userinfomaster/model/UserInfoMasterModel';
import { UserInfoCreateRequestModel } from '../model/UserInfoCreateRequestModel';
import { UserInfoCreateRequestType } from '../model/UserInfoCreateRequestType';
import { WritableUserInfoMasterListModel } from '../../internaldata/userinfomaster/model/WritableUserInfoMasterListModel';


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

        // 書き込み用ユーザー情報リスト
        const writableUserMasterListModel: WritableUserInfoMasterListModel = this.createUserInfoService.getUserMasterInfo();

        // 未削除のユーザー情報リスト
        const activeUserInfoMasterList: UserInfoMasterModel[] =
            this.createUserInfoService.getActiveUserMasterInfo(writableUserMasterListModel);

        // リクエストボディの型を変換する
        const parsedRequestBody: UserInfoCreateRequestModel = this.createUserInfoService.parseRequestBody(requestBody);

        // ユーザー重複チェック
        if (this.createUserInfoService.checkUserNameExists(activeUserInfoMasterList, parsedRequestBody)) {

            return res.status(HTTP_STATUS_UNPROCESSABLE_ENTITY).json({
                status: HTTP_STATUS_UNPROCESSABLE_ENTITY,
                message: "既にユーザーが存在しています。",
            });
        }

        // ユーザーIDを採番する
        const userIdModel = UserIdModel.createNewUserId();

        // ユーザーマスタ登録用データの作成
        const userInfoMasterCreateModel: UserInfoMasterCreateModel =
            this.createUserInfoService.createUserInfoMasterCreateBody(userIdModel, parsedRequestBody);

        // ユーザーマスタに対する書き込み用データの作成
        const userInfoMasterListWriteModel: WritableUserInfoMasterListModel =
            this.createUserInfoService.createUserInfoMasterWriteData(writableUserMasterListModel, userInfoMasterCreateModel);

        // ユーザーマスタにデータを書き込む
        this.createUserInfoService.overWriteUserInfoMaster(userInfoMasterListWriteModel);

        return res.status(HTTP_STATUS_CREATED).json({
            status: HTTP_STATUS_CREATED,
            message: "ユーザー情報の登録が完了しました。",
        });
    }
}