import { Router, Request, Response } from 'express';
import ENV from '../../env.json';
import { BookSearchService } from '../service/BookSearchService';
import { HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_INTERNAL_SERVER_ERROR, HTTP_STATUS_OK } from '../../util/const/HttpStatusConst';
import { GoogleBooksAPIsModelType } from '../../api/googlebookinfo/model/GoogleBooksAPIsModelType';
import { RouteController } from '../../router/controller/RouteController';


export class BookSearchController extends RouteController {

    private bookSearchService = new BookSearchService();

    public routes() {
        this.router.get(`${ENV.BOOK_SEARCH}`, (req: Request, res: Response) => {
            this.doExecute(req, res);
        });
    }

    /**
     * 書籍情報を取得する
     * @param req 
     * @param res 
     * @returns 
     */
    public async doExecute(req: Request, res: Response) {

        try {

            // クエリパラメータを取得
            let query = req.query;
            // キーワードを取得
            let keyword = typeof query[`q`] === "string" ? query[`q`] : "";

            // クエリがない場合
            if (!keyword) {
                return res.status(HTTP_STATUS_BAD_REQUEST).json({
                    status: HTTP_STATUS_BAD_REQUEST,
                    errMessage: "キーワードを設定してください。"
                });
            }

            // Google Books Apiから書籍情報を取得する
            let googleBookInfoList: GoogleBooksAPIsModelType = await this.bookSearchService.callGoogleBookApi(keyword);

            // Google Books Apiからの書籍情報が存在しない
            if (!googleBookInfoList || googleBookInfoList.totalItems === 0) {

                return res.status(HTTP_STATUS_OK).json({
                    status: HTTP_STATUS_OK,
                    message: "検索結果が存在しません。",
                    data: googleBookInfoList
                });
            }

            return res.status(HTTP_STATUS_OK).json({
                status: HTTP_STATUS_OK,
                message: "Data found",
                data: googleBookInfoList
            });

        } catch (err) {

            return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
                status: HTTP_STATUS_INTERNAL_SERVER_ERROR,
                errMessage: `予期しないエラーが発生しました。(${err})`
            });
        }
    }
}