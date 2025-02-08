import { BookShelfJsonModelType } from "../../../internaldata/bookshelf/model/BookShelfJsonModelType";
import { CreateBookShelfSelectEntity } from "../../entity/CreateBookShelfSelectEntity";


/**
 * 永続ロジック用インターフェース
 */
export interface CreateBookShelfRepositoryInterface {

    /**
     * ユーザー追加
     * @param bookShelfInsertEntity 
     */
    select(createBookShelfSelectEntity: CreateBookShelfSelectEntity): ReadonlyArray<BookShelfJsonModelType>;
}