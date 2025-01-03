import { CreateBookInfoController } from "../../createbookinfo/conrtoller/CreateBookInfoController";
import { BookSearchController } from "../../booksearch/controller/BookSearchController";
import { CreateUserInfoController } from "../../createuserinfo/controller/CreateUserInfoController";
import { RouteController } from "../controller/RouteController";


export const ROUTE_CONTROLLER_LIST: RouteController[] = [
    // 書籍検索
    new BookSearchController(),
    // 書籍情報登録
    new CreateBookInfoController(),
    // ユーザー情報登録
    new CreateUserInfoController(),
]