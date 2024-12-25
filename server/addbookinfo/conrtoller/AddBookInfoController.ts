import { Router, Request, Response } from 'express';
import ENV from '../../env.json';
import { AddBookInfoService } from '../service/AddBookInfoService';
import { HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_CREATED, HTTP_STATUS_INTERNAL_SERVER_ERROR, HTTP_STATUS_OK } from '../../util/const/HttpStatusConst';
import { GoogleBooksAPIsModelType } from '../../api/googlebookinfo/model/GoogleBooksAPIsModelType';
import { BookInfoAddRequestModelType } from '../model/BookInfoAddRequestModelType';
import { RouteController } from '../../router/controller/RouteController';
import { AsyncErrorHandler } from '../../router/service/AsyncErrorHandler';


export class AddBookInfoController extends RouteController {

    private addBookInfoService = new AddBookInfoService();

    public routes() {
        this.router.post(`${ENV.ADD_BOOK_INFO}`, AsyncErrorHandler.asyncHandler(this.doExecute));
    }

    /**
     * 書籍情報を登録する
     * @param req 
     * @param res 
     * @returns 
     */
    public async doExecute(req: Request, res: Response) {

        // リクエストボディ
        let body: BookInfoAddRequestModelType = req.body;

        // 書籍情報マスタに登録用データを作成


        return res.status(HTTP_STATUS_CREATED).json({
            status: HTTP_STATUS_CREATED,
            message: "書籍情報の登録が完了しました。",

        });
    }
}