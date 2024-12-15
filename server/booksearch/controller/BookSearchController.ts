import { Router, Request, Response } from 'express';
import ENV from '../../env.json';
import { BookSearchService } from '../service/BookSearchService';


export class BookSearchController {

    public router: Router;
    private bookSearchService = new BookSearchService();

    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes() {
        this.router.get(`${ENV.BOOKSEARCH}`, this.getBookInfo);
    }


    private getBookInfo(req: Request, res: Response) {

        // キーワードを取得
        let keyword = req.query;

        try {

            // キーワードがない場合
            if (!keyword) {

            }

            res.send('Call book search');
        } catch (err) {

        }
    }
}