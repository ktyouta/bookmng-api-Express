import { BookShelfJsonModelType } from "../../../internaldata/bookshelf/model/BookShelfJsonModelType";
import { SearchBookShelfListSelectEntity } from "../../entity/SearchBookShelfListSelectEntity";
import { SearchBookShelfListType } from "../../model/SearchBookShelfListType";


/**
 * 永続ロジック用インターフェース
 */
export interface SearchBookShelfListRepositoryInterface {

    /**
     * 書籍情報取得
     * @param bookShelfInsertEntity 
     */
    select(SearchBookShelfListSelectEntity: SearchBookShelfListSelectEntity): ReadonlyArray<SearchBookShelfListType>;
}