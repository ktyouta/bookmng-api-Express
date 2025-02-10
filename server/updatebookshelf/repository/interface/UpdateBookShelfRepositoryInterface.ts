import { BookShelfJsonModelType } from "../../../internaldata/bookshelf/model/BookShelfJsonModelType";
import { UpdateBookShelfSelectEntity } from "../../entity/UpdateBookShelfSelectEntity";


/**
 * 永続ロジック用インターフェース
 */
export interface UpdateBookShelfRepositoryInterface {

    /**
     * ユーザー追加
     * @param bookShelfInsertEntity 
     */
    select(UpdateBookShelfSelectEntity: UpdateBookShelfSelectEntity): ReadonlyArray<BookShelfJsonModelType>;
}