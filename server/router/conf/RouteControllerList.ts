import { CreateBookInfoController } from "../../createbookinfo/conrtoller/CreateBookInfoController";
import { BookSearchController } from "../../booksearch/controller/BookSearchController";
import { CreateFrontUserInfoController } from "../../createfrontuserinfo/controller/CreateFrontUserInfoController";
import { RouteController } from "../controller/RouteController";
import { CreateBookShelfController } from "../../createbookshelf/controller/CreateBookShelfController";


export const ROUTE_CONTROLLER_LIST: RouteController[] = [
    // 書籍検索
    new BookSearchController(),
    // 書籍情報登録
    new CreateBookInfoController(),
    // フロントユーザー情報登録
    new CreateFrontUserInfoController(),
    // 本棚登録処理
    new CreateBookShelfController(),
]