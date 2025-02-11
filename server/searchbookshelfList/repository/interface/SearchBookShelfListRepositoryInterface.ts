import { BookShelfJsonModelType } from "../../../internaldata/bookshelf/model/BookShelfJsonModelType";
import { SearchBookShelfListSelectEntity } from "../../entity/SearchBookShelfListSelectEntity";


/**
 * 永続ロジック用インターフェース
 */
export interface SearchBookShelfListRepositoryInterface {

    /**
     * 書籍情報取得
     * @param bookShelfInsertEntity 
     */
    select(SearchBookShelfListSelectEntity: SearchBookShelfListSelectEntity): ReadonlyArray<BookShelfJsonModelType>;
}