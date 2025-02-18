import { BookShelfJsonModelType } from "../../../internaldata/bookshelf/model/BookShelfJsonModelType";
import { DeleteBookShelfSelectEntity } from "../../entity/DeleteBookShelfSelectEntity";


/**
 * 永続ロジック用インターフェース
 */
export interface DeleteBookShelfRepositoryInterface {

    /**
     * 本棚情報取得
     * @param bookShelfInsertEntity 
     */
    select(DeleteBookShelfSelectEntity: DeleteBookShelfSelectEntity): ReadonlyArray<BookShelfJsonModelType>;
}