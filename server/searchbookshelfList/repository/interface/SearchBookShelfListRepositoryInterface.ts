import { AuthorsMasterJsonType } from "../../../internaldata/authorsinfomaster/model/AuthorsMasterJsonType";
import { BookAuthorsMasterJsonType } from "../../../internaldata/bookauthorsmaster/model/BookAuthorsMasterJsonType";
import { BookShelfJsonModelType } from "../../../internaldata/bookshelf/model/BookShelfJsonModelType";
import { SearchBookShelfListAuthorsSelectEntity } from "../../entity/SearchBookShelfListAuthorsSelectEntity";
import { SearchBookShelfListBookAuthorsSelectEntity } from "../../entity/SearchBookShelfListBookAuthorsSelectEntity";
import { SearchBookShelfListSelectEntity } from "../../entity/SearchBookShelfListSelectEntity";
import { SearchBookShelfListType } from "../../model/SearchBookShelfListType";


/**
 * 永続ロジック用インターフェース
 */
export interface SearchBookShelfListRepositoryInterface {

    /**
     * 書籍情報取得
     * @param searchBookShelfListSelectEntity 
     */
    selectBookShelfList(searchBookShelfListSelectEntity: SearchBookShelfListSelectEntity): ReadonlyArray<SearchBookShelfListType>;

    /**
     * 書籍著者情報を取得
     * @param searchBookShelfListBookAuthorsSelectEntity 
     */
    selectBookAuthorList(searchBookShelfListBookAuthorsSelectEntity: SearchBookShelfListBookAuthorsSelectEntity): ReadonlyArray<BookAuthorsMasterJsonType>;

    /**
     * 著者情報を取得
     * @param searchBookShelfListAuthorsSelectEntity 
     */
    selectAuthorList(searchBookShelfListAuthorsSelectEntity: SearchBookShelfListAuthorsSelectEntity): ReadonlyArray<AuthorsMasterJsonType>;
}