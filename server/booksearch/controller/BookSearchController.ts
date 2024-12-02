import { Router, Request, Response } from 'express';
import ENV from '../../env.json';
import { BookSearchService } from '../service/BookSearchService';


export class BookSearchController {

    public router: Router;
    public bookSearchService = new BookSearchService();

    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes() {
        this.router.get(`${ENV.BOOKSEARCH}`, this.getUsers);
    }

    private getUsers(req: Request, res: Response) {
        res.send('Call book search');
    }

}