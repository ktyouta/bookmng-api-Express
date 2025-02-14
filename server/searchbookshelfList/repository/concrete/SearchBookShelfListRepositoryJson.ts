import { AuthorsMasterJsonType } from "../../../internaldata/authorsinfomaster/model/AuthorsMasterJsonType";
import { AUTHROS_MASTER_FILE_PATH } from "../../../internaldata/authorsinfomaster/repository/concrete/AuthorsInfoMasterRepositoryJson";
import { BookAuthorsMasterJsonType } from "../../../internaldata/bookauthorsmaster/model/BookAuthorsMasterJsonType";
import { BOOK_AUTHROS_MASTER_FILE_PATH } from "../../../internaldata/bookauthorsmaster/repository/concrete/BookAuthorsMasterRepositoryJson";
import { BookInfoJsonModelType } from "../../../internaldata/bookinfomaster/model/BookInfoMasterJsonModelType";
import { BOOK_INFO_MASTER_FILE_PATH } from "../../../internaldata/bookinfomaster/repository/concrete/BookInfoMasterRepositoryJson";
import { BookShelfJsonModelType } from "../../../internaldata/bookshelf/model/BookShelfJsonModelType";
import { BOOKSHELF_FILE_PATH } from "../../../internaldata/bookshelf/repository/concrete/BookShelfRepositoryJson";
import { BookShelfRepositoryInterface } from "../../../internaldata/bookshelf/repository/interface/BookShelfRepositoryInterface";
import { JsonFileData } from "../../../util/service/JsonFileData";
import { SearchBookShelfListSelectEntity } from "../../entity/SearchBookShelfListSelectEntity";
import { SearchBookShelfListType } from "../../model/SearchBookShelfListType";
import { SearchBookShelfListRepositoryInterface } from "../interface/SearchBookShelfListRepositoryInterface";



/**
 * json形式の永続ロジック用クラス
 */
export class SearchBookShelfListRepositoryJson implements SearchBookShelfListRepositoryInterface {

    // 本棚情報
    private _bookShelfJsonList: ReadonlyArray<BookShelfJsonModelType>;
    // 著者マスタ情報
    private _authorsMasterJsonList: ReadonlyArray<AuthorsMasterJsonType>;
    // 書籍著者情報
    private _bookAuthorsMasterJsonList: ReadonlyArray<BookAuthorsMasterJsonType>;
    // 書籍情報
    private _bookInfoMasterJsonList: ReadonlyArray<BookInfoJsonModelType>;


    constructor() {

        // 本棚情報ファイルからデータを取得
        const bookShelfJsonModelType: BookShelfJsonModelType[] = JsonFileData.getFileObj(BOOKSHELF_FILE_PATH);
        // 著者マスタファイルからデータを取得
        const authorsMasterList: AuthorsMasterJsonType[] = JsonFileData.getFileObj(AUTHROS_MASTER_FILE_PATH);
        // 書籍著者マスタファイルからデータを取得
        const bookAuthorsMasterList: BookAuthorsMasterJsonType[] = JsonFileData.getFileObj(BOOK_AUTHROS_MASTER_FILE_PATH);
        // 書籍情報マスタファイルからデータを取得
        const jsonBookInfoMasterList: BookInfoJsonModelType[] = JsonFileData.getFileObj(BOOK_INFO_MASTER_FILE_PATH);

        this._bookShelfJsonList = bookShelfJsonModelType;
        this._authorsMasterJsonList = authorsMasterList;
        this._bookAuthorsMasterJsonList = bookAuthorsMasterList;
        this._bookInfoMasterJsonList = jsonBookInfoMasterList;
    }


    /**
     * 本棚情報取得
     * @param frontBookShelfInfoMasterModel 
     * @returns 
     */
    public select(searchBookShelfListSelectEntity: SearchBookShelfListSelectEntity): ReadonlyArray<SearchBookShelfListType> {

        const frontUserId = searchBookShelfListSelectEntity.frontUserId;

        const bookShelfList: ReadonlyArray<BookShelfJsonModelType> =
            this._bookShelfJsonList.filter((e: BookShelfJsonModelType) => {
                return e.userId === frontUserId;
            });

        const retBookShelf: SearchBookShelfListType[] = bookShelfList.map((e: BookShelfJsonModelType) => {

            const bookId = e.bookId;

            const bookInfoMaster = this._bookInfoMasterJsonList.find((e1: BookInfoJsonModelType) => {
                return e1.bookId === bookId;
            });

            // 書籍マスタにデータがない場合
            if (!bookInfoMaster) {
                return;
            }

            const title = bookInfoMaster.title;

            // 書籍著者情報を取得
            const bookAuhtorList = this._bookAuthorsMasterJsonList.filter((e1: BookAuthorsMasterJsonType) => {
                return e1.bookId === bookId;
            });

            const authorsList: string[] = bookAuhtorList.map((e1: BookAuthorsMasterJsonType) => {

                const authorId = e1.authorId;

                const authorInfo = this._authorsMasterJsonList.find((e2: AuthorsMasterJsonType) => {
                    return e2.authorId === authorId;
                });

                if (!authorInfo) {
                    return;
                }

                return authorInfo.authorName;
            }).flatMap(e => e ? [e] : []);

            return {
                userId: frontUserId,
                bookId: bookId,
                title: title,
                authors: authorsList,
            }
        }).flatMap(e => e ? [e] : []);

        return retBookShelf;
    }

}