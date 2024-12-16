import { Router, Request, Response } from 'express';
import ENV from '../../env.json';
import { BookSearchService } from '../service/BookSearchService';
import { HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_INTERNAL_SERVER_ERROR } from '../../util/const/HttpStatusConst';


export class BookSearchController {

    public router: Router;
    private bookSearchService = new BookSearchService();

    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes() {
        this.router.get(`${ENV.BOOKSEARCH}`, (req: Request, res: Response) => {
            this.getBookInfo(req, res);
        });
    }

    /**
     * 書籍情報を取得する
     * @param req 
     * @param res 
     * @returns 
     */
    public async getBookInfo(req: Request, res: Response) {

        try {

            // クエリパラメータを取得
            let query = req.query;
            // キーワードを取得
            let keyword = typeof query[`q`] === "string" ? query[`q`] : "";

            // クエリがない場合
            if (!keyword) {
                return res.status(HTTP_STATUS_BAD_REQUEST).json({ errMessage: "キーワードを設定してください。" });
            }

            let googleBookInfoList = await this.bookSearchService.getBookInfoList(keyword);

            return res.status(200).json({
                message: "Data found",
                data: googleBookInfoList
            });

        } catch (err) {

            return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ errMessage: "予期しないエラーが発生しました。" });
        }
    }
}