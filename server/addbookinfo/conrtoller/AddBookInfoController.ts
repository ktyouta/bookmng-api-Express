import { Router, Request, Response } from 'express';
import ENV from '../../env.json';
import { AddBookInfoService } from '../service/AddBookInfoService';
import { HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_CREATED, HTTP_STATUS_INTERNAL_SERVER_ERROR, HTTP_STATUS_OK } from '../../util/const/HttpStatusConst';
import { GoogleBooksAPIsModelType } from '../../api/googlebookinfo/model/GoogleBooksAPIsModelType';
import { BookInfoAddRequestModelType } from '../model/BookInfoAddRequestModelType';
import { RouteController } from '../../router/controller/RouteController';
import { AsyncErrorHandler } from '../../router/service/AsyncErrorHandler';
import { BookInfoModelType } from '../../internaldata/bookinfomaster/model/BookInfoMasterModelType';
import { BookAuthorsModelType } from '../../internaldata/bookauthorsmaster/model/BookAuthorsMasterModelType';
import { BookIdModel } from '../../internaldata/bookinfomaster/model/BookIdModel';
import { BookAuthorsMasterCreateModel } from '../../internaldata/bookauthorsmaster/model/BookAuthorsMasterCreateModel';


export class AddBookInfoController extends RouteController {

    private addBookInfoService = new AddBookInfoService();

    public routes() {
        this.router.post(`${ENV.ADD_BOOK_INFO}`, AsyncErrorHandler.asyncHandler(this.doExecute.bind(this)));
    }

    /**
     * 書籍情報を登録する
     * @param req 
     * @param res 
     * @returns 
     */
    public async doExecute(req: Request, res: Response) {

        // リクエストボディ
        const requestBody: BookInfoAddRequestModelType = req.body;

        // 書籍IDを採番する
        const bookId: BookIdModel = new BookIdModel();

        // 書籍情報マスタからデータを取得
        let bookInfoMasterList: BookInfoModelType[] = this.addBookInfoService.getBookMasterInfo();

        // 書籍著者マスタからデータを取得
        let bookAuthorsMasterList: BookAuthorsModelType[] = this.addBookInfoService.getBookAuthorsMasterInfo();

        // 書籍情報マスタの登録用データを作成
        const bookInfoMasterCareteBody = this.addBookInfoService.createBookInfoMasterCreateBody(bookId, requestBody);

        // 書籍情報マスタ書き込み用データを作成
        bookInfoMasterList = this.addBookInfoService.createBookInfoMasterWriteData(bookInfoMasterList, bookInfoMasterCareteBody);

        // 書籍著者マスタの登録用データを作成
        const bookAuthorsMasterCreateBody: BookAuthorsMasterCreateModel[] = this.addBookInfoService.createBookAuthorsMasterCreateBodyList(bookId, requestBody);

        // 書籍著者マスタ書き込み用データを作成
        bookAuthorsMasterList = this.addBookInfoService.createBookAuthorsMasterWriteData(bookAuthorsMasterList, bookAuthorsMasterCreateBody);

        // 書籍情報マスタファイルに登録用データを書き込む
        let errMessge = this.addBookInfoService.overWriteBookInfoMaster(bookInfoMasterList);

        if (errMessge) {
            return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
                status: HTTP_STATUS_INTERNAL_SERVER_ERROR,
                message: errMessge,

            });
        }

        // 書籍著者情報マスタファイルに登録用データを書き込む
        errMessge = this.addBookInfoService.overWriteBookAuthorsMaster(bookAuthorsMasterList);

        if (errMessge) {
            return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
                status: HTTP_STATUS_INTERNAL_SERVER_ERROR,
                message: errMessge,

            });
        }

        return res.status(HTTP_STATUS_CREATED).json({
            status: HTTP_STATUS_CREATED,
            message: "書籍情報の登録が完了しました。",

        });
    }
}