import { Router, Request, Response } from 'express';
import ENV from '../../env.json';
import { HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_CREATED, HTTP_STATUS_INTERNAL_SERVER_ERROR, HTTP_STATUS_OK, HTTP_STATUS_UNPROCESSABLE_ENTITY } from '../../util/const/HttpStatusConst';
import { RouteController } from '../../router/controller/RouteController';
import { AsyncErrorHandler } from '../../router/service/AsyncErrorHandler';
import { BookInfoJsonModelType } from '../../internaldata/bookinfomaster/model/BookInfoMasterJsonModelType';
import { BookIdModel } from '../../internaldata/bookinfomaster/properties/BookIdModel';
import { BookInfoCreateRequestModelSchema } from '../model/BookInfoCreateRequestModelSchema';
import { ZodIssue } from 'zod';
import { CreateBookInfoService } from '../service/CreateBookInfoService';
import { BookInfoCreateRequestType } from '../model/BookInfoCreateRequestType';
import { BookInfoMasterModel } from '../../internaldata/bookinfomaster/model/BookInfoMasterModel';
import { BookInfoCreateRequestModel } from '../model/BookInfoCreateRequestModel';
import { BookAuthorsMasterModel } from '../../internaldata/bookauthorsmaster/model/BookAuthorsMasterModel';
import { AuthorsMasterModel } from '../../internaldata/authorsinfomaster/model/AuthorsMasterModel';
import { CreateBookInfoRepositoryInterface } from '../repository/interface/CreateBookInfoRepositoryInterface';
import { ApiResponse } from '../../util/service/ApiResponse';
import { BookInfoMasterInsertEntity } from '../../internaldata/bookinfomaster/entity/BookInfoMasterInsertEntity';
import { BookInfoMasterRepositoryInterface } from '../../internaldata/bookinfomaster/repository/interface/BookInfoMasterRepositoryInterface';
import { BookAuthorsMasterRepositoryInterface } from '../../internaldata/bookauthorsmaster/repository/interface/BookAuthorsMasterRepositoryInterface';
import { BookAuthorsMasterInsertEntity } from '../../internaldata/bookauthorsmaster/entity/BookAuthorsMasterInsertEntity';


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

        // 永続ロジックを取得
        const createBookInfoRepositorys: CreateBookInfoRepositoryInterface = this.addBookInfoService.getCreateBookInfoRepository();

        // 著者IDのマスタ存在チェック
        const isExistAuthor = this.addBookInfoService.checkExistAuthor(createBookInfoRepositorys, parsedRequestBody);

        // 著者マスタにIDが存在しない
        if (!isExistAuthor) {
            return ApiResponse.create(res, HTTP_STATUS_UNPROCESSABLE_ENTITY, `著者マスタに存在しない著者が選択されています。`);
        }

        // 書籍情報の存在チェック
        const isExistBookInfo = this.addBookInfoService.checkBookInfoExists(createBookInfoRepositorys, parsedRequestBody);

        // 登録する書籍情報が既に存在する
        if (isExistBookInfo) {
            return ApiResponse.create(res, HTTP_STATUS_UNPROCESSABLE_ENTITY, `登録する書籍情報が既に存在しています。`);
        }

        // 書籍情報の永続ロジックを取得
        const bookInfoMasterRepository: BookInfoMasterRepositoryInterface =
            this.addBookInfoService.getBookInfoMasterRepository();

        // 書籍IDを採番する
        const bookId: BookIdModel = BookIdModel.createNewBookId();

        // 書籍情報マスタの登録用データを作成
        const bookInfoMasterCareteBody: BookInfoMasterInsertEntity =
            this.addBookInfoService.createBookInfoMasterCreateBody(bookId, parsedRequestBody);

        // 書籍情報を追加
        bookInfoMasterRepository.insert(bookInfoMasterCareteBody);

        // 書籍著者情報の永続ロジックを取得
        const bookAuthorsMasterRepository: BookAuthorsMasterRepositoryInterface =
            this.addBookInfoService.getBookAuthorsMasterRepository();

        // 書籍著者情報マスタの登録用データを作成
        const bookAuthorsMasterCareteBody: BookAuthorsMasterInsertEntity[] =
            this.addBookInfoService.createBookAuthorsMasterCreateBody(bookId, parsedRequestBody);

        // 書籍著者情報を追加
        this.addBookInfoService.insert(bookAuthorsMasterRepository, bookAuthorsMasterCareteBody);

        // コミットする
        this.addBookInfoService.commit(bookInfoMasterRepository, bookAuthorsMasterRepository);

        return ApiResponse.create(res, HTTP_STATUS_CREATED, `書籍情報の登録が完了しました。`);
    }
}