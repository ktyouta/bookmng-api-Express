import { Router, Request, Response } from 'express';
import ENV from '../../env.json';
import { HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_CREATED, HTTP_STATUS_INTERNAL_SERVER_ERROR, HTTP_STATUS_OK, HTTP_STATUS_UNPROCESSABLE_ENTITY } from '../../util/const/HttpStatusConst';
import { RouteController } from '../../router/controller/RouteController';
import { AsyncErrorHandler } from '../../router/service/AsyncErrorHandler';
import { BookInfoJsonModelType } from '../../internaldata/bookinfomaster/model/BookInfoMasterJsonModelType';
import { BookIdModel } from '../../internaldata/bookinfomaster/model/BookIdModel';
import { BookAuthorsMasterCreateModel } from '../../internaldata/bookauthorsmaster/model/BookAuthorsMasterCreateModel';
import { BookInfoCreateRequestModelSchema } from '../model/BookInfoCreateRequestModelSchema';
import { ZodIssue } from 'zod';
import { CreateBookInfoService } from '../service/CreateBookInfoService';
import { BookInfoCreateRequestType } from '../model/BookInfoCreateRequestType';
import { BookInfoMasterModel } from '../../internaldata/bookinfomaster/model/BookInfoMasterModel';
import { BookInfoCreateRequestModel } from '../model/BookInfoCreateRequestModel';
import { BookAuthorsMasterModel } from '../../internaldata/bookauthorsmaster/model/BookAuthorsMasterModel';
import { AuthorsMasterModel } from '../../internaldata/authorsinfomaster/model/AuthorsMasterModel';
import { BookInfoMasterCreateModel } from '../../internaldata/bookinfomaster/model/BookInfoMasterCreateModel';


export class CreateBookInfoController extends RouteController {

    private addBookInfoService = new CreateBookInfoService();

    public routes() {
        this.router.post(`${ENV.CREATE_BOOK_INFO}`, AsyncErrorHandler.asyncHandler(this.doExecute.bind(this)));
    }

    /**
     * 書籍情報を登録する
     * @param req 
     * @param res 
     * @returns 
     */
    public doExecute(req: Request, res: Response) {

        // リクエストボディ
        const requestBody: BookInfoCreateRequestType = req.body;

        // リクエストのバリデーションチェック
        const validateResult = BookInfoCreateRequestModelSchema.safeParse(requestBody);

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
        const parsedRequestBody: BookInfoCreateRequestModel = this.addBookInfoService.parseRequestBody(requestBody);

        // 未削除の著者情報マスタを取得
        const activeAuthorsMasterList: AuthorsMasterModel[] = this.addBookInfoService.getActiveAuthorsMaster();

        // 著者IDのマスタ存在チェック
        let errMessge = this.addBookInfoService.checkAuthorIdExists(activeAuthorsMasterList, parsedRequestBody);

        // 著者マスタにIDが存在しない
        if (errMessge) {
            return res.status(HTTP_STATUS_UNPROCESSABLE_ENTITY).json({
                status: HTTP_STATUS_UNPROCESSABLE_ENTITY,
                message: errMessge,
            });
        }

        // 書籍情報マスタからデータを取得
        let bookInfoMasterList: BookInfoMasterModel[] = this.addBookInfoService.getBookMasterInfo();

        // 未削除の書籍情報データを取得
        const activeBookInfoMasterList: BookInfoMasterModel[] = this.addBookInfoService.getActiveBookMasterInfo(bookInfoMasterList);

        // 書籍著者マスタからデータを取得
        let bookAuthorsMasterList: BookAuthorsMasterModel[] = this.addBookInfoService.getBookAuthorsMasterInfo();

        // 未削除の書籍著者情報データを取得
        const acticeBookAuthorsMasterList = this.addBookInfoService.getActiveBookAuthorsMasterInfo(bookAuthorsMasterList);

        // 書籍情報の重複チェック
        errMessge = this.addBookInfoService.checkBookInfoExists(activeBookInfoMasterList, acticeBookAuthorsMasterList, parsedRequestBody);

        // 登録しようとしている書籍情報が既に存在する
        if (errMessge) {
            return res.status(HTTP_STATUS_UNPROCESSABLE_ENTITY).json({
                status: HTTP_STATUS_UNPROCESSABLE_ENTITY,
                message: errMessge,
            });
        }

        // 書籍IDを採番する
        const bookId: BookIdModel = BookIdModel.createNewBookId();

        // 書籍情報マスタの登録用データを作成
        const bookInfoMasterCareteBody: BookInfoMasterCreateModel =
            this.addBookInfoService.createBookInfoMasterCreateBody(bookId, parsedRequestBody);

        // 書籍情報マスタ書き込み用データを作成
        bookInfoMasterList = this.addBookInfoService.createBookInfoMasterWriteData(bookInfoMasterList, bookInfoMasterCareteBody);

        // 書籍著者マスタの登録用データを作成
        const bookAuthorsMasterCreateBody: BookAuthorsMasterCreateModel[] =
            this.addBookInfoService.createBookAuthorsMasterCreateBodyList(bookId, parsedRequestBody);

        // 書籍著者マスタ書き込み用データを作成
        bookAuthorsMasterList = this.addBookInfoService.createBookAuthorsMasterWriteData(bookAuthorsMasterList, bookAuthorsMasterCreateBody);

        // 書籍情報マスタファイルに登録用データを書き込む
        this.addBookInfoService.overWriteBookInfoMaster(bookInfoMasterList);

        // 書籍著者情報マスタファイルに登録用データを書き込む
        this.addBookInfoService.overWriteBookAuthorsMaster(bookAuthorsMasterList);

        return res.status(HTTP_STATUS_CREATED).json({
            status: HTTP_STATUS_CREATED,
            message: "書籍情報の登録が完了しました。",
        });
    }
}