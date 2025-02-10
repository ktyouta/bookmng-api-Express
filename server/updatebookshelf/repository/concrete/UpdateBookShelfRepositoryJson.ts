import { BookShelfJsonModelType } from "../../../internaldata/bookshelf/model/BookShelfJsonModelType";
import { BOOKSHELF_FILE_PATH } from "../../../internaldata/bookshelf/repository/concrete/BookShelfRepositoryJson";
import { BookShelfRepositoryInterface } from "../../../internaldata/bookshelf/repository/interface/BookShelfRepositoryInterface";
import { JsonFileData } from "../../../util/service/JsonFileData";
import { UpdateBookShelfSelectEntity } from "../../entity/UpdateBookShelfSelectEntity";
import { UpdateBookShelfRepositoryInterface } from "../interface/UpdateBookShelfRepositoryInterface";



/**
 * json形式の永続ロジック用クラス
 */
export class UpdateBookShelfRepositoryJson implements UpdateBookShelfRepositoryInterface {

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
    public select(UpdateBookShelfSelectEntity: UpdateBookShelfSelectEntity): ReadonlyArray<BookShelfJsonModelType> {

        const bookShelfList: ReadonlyArray<BookShelfJsonModelType> =
            this._bookShelfJsonList.filter((e: BookShelfJsonModelType) => {
                return e.bookId === UpdateBookShelfSelectEntity.bookId &&
                    e.userId === UpdateBookShelfSelectEntity.frontUserId;
            });

        return bookShelfList;
    }

}