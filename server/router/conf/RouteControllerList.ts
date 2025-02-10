import { CreateBookInfoController } from "../../createbookinfo/conrtoller/CreateBookInfoController";
import { BookSearchController } from "../../booksearch/controller/BookSearchController";
import { CreateFrontUserInfoController } from "../../createfrontuserinfo/controller/CreateFrontUserInfoController";
import { RouteController } from "../controller/RouteController";
import { CreateBookShelfController } from "../../createbookshelf/controller/CreateBookShelfController";
import { FrontUserLoginController } from "../../frontuserlogin/controller/FrontUserLoginController";
import { UpdateBookShelfController } from "../../updatebookshelf/controller/UpdateBookShelfController";


export const ROUTE_CONTROLLER_LIST: ReadonlyArray<RouteController> = [
    // 書籍検索
    new BookSearchController(),
    // 書籍情報登録
    new CreateBookInfoController(),
    // フロントユーザー情報登録
    new CreateFrontUserInfoController(),
    // 本棚登録処理
    new CreateBookShelfController(),
    // ログイン
    new FrontUserLoginController(),
    // 本棚更新処理
    new UpdateBookShelfController(),
]