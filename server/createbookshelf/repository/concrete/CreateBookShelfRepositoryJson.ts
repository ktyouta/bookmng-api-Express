import { BookShelfJsonModelType } from "../../../internaldata/bookshelf/model/BookShelfJsonModelType";
import { BOOKSHELF_FILE_PATH } from "../../../internaldata/bookshelf/repository/concrete/BookShelfRepositoryJson";
import { BookShelfRepositoryInterface } from "../../../internaldata/bookshelf/repository/interface/BookShelfRepositoryInterface";
import { JsonFileData } from "../../../util/service/JsonFileData";
import { CreateBookShelfSelectEntity } from "../../entity/CreateBookShelfSelectEntity";
import { CreateBookShelfRepositoryInterface } from "../interface/CreateBookShelfRepositoryInterface";



/**
 * json形式の永続ロジック用クラス
 */
export class CreateBookShelfRepositoryJson implements CreateBookShelfRepositoryInterface {

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
    public select(createBookShelfSelectEntity: CreateBookShelfSelectEntity): ReadonlyArray<BookShelfJsonModelType> {

        const bookShelfList: ReadonlyArray<BookShelfJsonModelType> =
            this._bookShelfJsonList.filter((e: BookShelfJsonModelType) => {
                return e.bookId === createBookShelfSelectEntity.bookId &&
                    e.userId === createBookShelfSelectEntity.frontUserId;
            });

        return bookShelfList;
    }

}