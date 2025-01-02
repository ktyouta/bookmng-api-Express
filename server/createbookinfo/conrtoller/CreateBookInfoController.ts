import { Router, Request, Response } from 'express';
import ENV from '../../env.json';
import { HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_CREATED, HTTP_STATUS_INTERNAL_SERVER_ERROR, HTTP_STATUS_OK, HTTP_STATUS_UNPROCESSABLE_ENTITY } from '../../util/const/HttpStatusConst';
import { RouteController } from '../../router/controller/RouteController';
import { AsyncErrorHandler } from '../../router/service/AsyncErrorHandler';
import { BookInfoModelType } from '../../internaldata/bookinfomaster/model/BookInfoMasterModelType';
import { BookAuthorsModelType } from '../../internaldata/bookauthorsmaster/model/BookAuthorsMasterModelType';
import { BookIdModel } from '../../internaldata/bookinfomaster/model/BookIdModel';
import { BookAuthorsMasterCreateModel } from '../../internaldata/bookauthorsmaster/model/BookAuthorsMasterCreateModel';
import { AuthorsMasterModeType } from '../../internaldata/authorsinfomaster/model/AuthorsMasterModeType';
import { BookInfoCreateRequestModelSchema } from '../model/BookInfoCreateRequestModelSchema';
import { ZodIssue } from 'zod';
import { CreateBookInfoService } from '../service/CreateBookInfoService';
import { BookInfoCreateRequestModelType } from '../model/BookInfoCreateRequestModelType';


export class CreateBookInfoController extends RouteController {

    private addBookInfoService = new CreateBookInfoService();

    public routes() {
        this.router.post(`${ENV.ADD_BOOK_INFO}`, AsyncErrorHandler.asyncHandler(this.doExecute.bind(this)));
    }

    /**
     * 書籍情報を登録する
     * @param req 
     * @param res 
     * @returns 
     */
    public doExecute(req: Request, res: Response) {

        // リクエストボディ
        const requestBody: BookInfoCreateRequestModelType = req.body;
        // 著者IDリスト
        const authorIdList: string[] = requestBody.authorIdList;

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

        // 著者情報マスタからデータを取得
        const authorsMasterList: AuthorsMasterModeType[] = this.addBookInfoService.getAuthorsMasterInfo();

        // 未削除の著者情報マスタを取得
        const activeAuthorsMasterList: AuthorsMasterModeType[] = this.addBookInfoService.getActiveAuthorsMaster(authorsMasterList);

        // 著者IDのマスタ存在チェック
        let errMessge = this.addBookInfoService.checkAuthorIdExists(activeAuthorsMasterList, authorIdList);

        // 著者マスタにIDが存在しない
        if (errMessge) {
            return res.status(HTTP_STATUS_UNPROCESSABLE_ENTITY).json({
                status: HTTP_STATUS_UNPROCESSABLE_ENTITY,
                message: errMessge,
            });
        }

        // 書籍情報マスタからデータを取得
        let bookInfoMasterList: BookInfoModelType[] = this.addBookInfoService.getBookMasterInfo();

        // 未削除の書籍情報データを取得
        const activeBookInfoMasterList: BookInfoModelType[] = this.addBookInfoService.getActiveBookMasterInfo(bookInfoMasterList);

        // 書籍著者マスタからデータを取得
        let bookAuthorsMasterList: BookAuthorsModelType[] = this.addBookInfoService.getBookAuthorsMasterInfo();

        // 未削除の書籍著者情報データを取得
        const acticeBookAuthorsMasterList = this.addBookInfoService.getActiveBookAuthorsMasterInfo(bookAuthorsMasterList);

        // 書籍情報の重複チェック
        errMessge = this.addBookInfoService.checkBookInfoExists(activeBookInfoMasterList, acticeBookAuthorsMasterList, requestBody);

        // 登録しようとしている書籍情報が既に存在する
        if (errMessge) {
            return res.status(HTTP_STATUS_UNPROCESSABLE_ENTITY).json({
                status: HTTP_STATUS_UNPROCESSABLE_ENTITY,
                message: errMessge,
            });
        }

        // 書籍IDを採番する
        const bookId: BookIdModel = new BookIdModel();

        // 書籍情報マスタの登録用データを作成
        const bookInfoMasterCareteBody = this.addBookInfoService.createBookInfoMasterCreateBody(bookId, requestBody);

        // 書籍情報マスタ書き込み用データを作成
        bookInfoMasterList = this.addBookInfoService.createBookInfoMasterWriteData(bookInfoMasterList, bookInfoMasterCareteBody);

        // 書籍著者マスタの登録用データを作成
        const bookAuthorsMasterCreateBody: BookAuthorsMasterCreateModel[] = this.addBookInfoService.createBookAuthorsMasterCreateBodyList(bookId, requestBody);

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