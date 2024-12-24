import { AddBookInfoController } from "../../addbookinfo/conrtoller/AddBookInfoController";
import { BookSearchController } from "../../booksearch/controller/BookSearchController";

export const ROUTE_CONTROLLER_LIST = [
    // 書籍検索
    new BookSearchController(),
    // 書籍情報登録
    new AddBookInfoController(),
]