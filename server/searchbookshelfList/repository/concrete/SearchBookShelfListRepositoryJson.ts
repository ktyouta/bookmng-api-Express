import { BookShelfJsonModelType } from "../../../internaldata/bookshelf/model/BookShelfJsonModelType";
import { BOOKSHELF_FILE_PATH } from "../../../internaldata/bookshelf/repository/concrete/BookShelfRepositoryJson";
import { BookShelfRepositoryInterface } from "../../../internaldata/bookshelf/repository/interface/BookShelfRepositoryInterface";
import { JsonFileData } from "../../../util/service/JsonFileData";
import { SearchBookShelfListSelectEntity } from "../../entity/SearchBookShelfListSelectEntity";
import { SearchBookShelfListRepositoryInterface } from "../interface/SearchBookShelfListRepositoryInterface";



/**
 * json形式の永続ロジック用クラス
 */
export class SearchBookShelfListRepositoryJson implements SearchBookShelfListRepositoryInterface {

    private _bookShelfJsonList: ReadonlyArray<BookShelfJsonModelType>;

    constructor() {

        // 本棚情報ファイルからデータを取得
        const bookShelfJsonModelType: BookShelfJsonModelType[] = JsonFileData.getFileObj(BOOKSHELF_FILE_PATH);

        this._bookShelfJsonList = bookShelfJsonModelType;
    }


    /**
     * 本棚情報取得
     * @param frontBookShelfInfoMasterModel 
     * @returns 
     */
    public select(SearchBookShelfListSelectEntity: SearchBookShelfListSelectEntity): ReadonlyArray<BookShelfJsonModelType> {

        const bookShelfList: ReadonlyArray<BookShelfJsonModelType> =
            this._bookShelfJsonList.filter((e: BookShelfJsonModelType) => {
                return e.userId === SearchBookShelfListSelectEntity.frontUserId;
            });

        return bookShelfList;
    }

}