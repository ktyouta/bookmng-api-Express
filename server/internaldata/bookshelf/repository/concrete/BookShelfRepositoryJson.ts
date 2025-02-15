import { BOOKSHELF_FILE, TRANSACTION_FILE_PATH } from "../../../../util/const/FileInfoConst";
import { JsonFileData } from "../../../../util/service/JsonFileData";
import { CreateDateModel } from "../../../common/model/CreateDateModel";
import { DeleteFlgModel } from "../../../common/model/DeleteFlgModel";
import { UpdateDateModel } from "../../../common/model/UpdateDateModel";
import { BookShelfInsertEntity } from "../../entity/BookShelfInsertEntity";
import { BookShelfUpdateEntity } from "../../entity/BookShelfUpdateEntity";
import { BookShelfJsonModelType } from "../../model/BookShelfJsonModelType";
import { BookShelfRepositoryInterface } from "../interface/BookShelfRepositoryInterface";


// 本棚情報ファイルパス
export const BOOKSHELF_FILE_PATH = `${TRANSACTION_FILE_PATH}${BOOKSHELF_FILE}`;


/**
 * json形式の永続ロジック用クラス
 */
export class BookShelfRepositoryJson implements BookShelfRepositoryInterface {

    private _bookShelfJsonList: ReadonlyArray<BookShelfJsonModelType>;

    constructor() {

        // 本棚情報ファイルからデータを取得
        const bookShelfJsonModelType: BookShelfJsonModelType[] = JsonFileData.getFileObj(BOOKSHELF_FILE_PATH);

        this._bookShelfJsonList = bookShelfJsonModelType;
    }


    /**
     * 本棚情報追加
     * @param frontBookShelfInfoMasterModel 
     * @returns 
     */
    public insert(bookShelfInsertEntity: BookShelfInsertEntity) {

        // IDの重複チェック
        const duplicateBookShelf = this._bookShelfJsonList.find((e: BookShelfJsonModelType) => {
            return e.userId === bookShelfInsertEntity.frontUserId && e.bookId === bookShelfInsertEntity.bookId;
        });

        if (duplicateBookShelf) {
            throw Error(`本棚情報が重複してるため登録できません。`);
        }

        // jsonに変換する
        const frontBookShelfInfoJsonList = this.parseInsertToJson(bookShelfInsertEntity);

        // 本棚情報を追加する
        this._bookShelfJsonList = [...this._bookShelfJsonList, frontBookShelfInfoJsonList];
    }


    /**
     * 本棚情報更新
     */
    public update(bookShelfUpdateEntity: BookShelfUpdateEntity) {

        // 本棚情報の存在チェック
        const updateBookShelf = this._bookShelfJsonList.find((e: BookShelfJsonModelType) => {
            return e.userId === bookShelfUpdateEntity.frontUserId && e.bookId === bookShelfUpdateEntity.bookId;
        });

        if (!updateBookShelf) {
            throw Error(`更新対象の本棚情報が存在しません。`);
        }

        updateBookShelf.thoughts = bookShelfUpdateEntity.thoughts;
    }


    /**
     * 本棚情報ファイルにデータを書き込む
     */
    public commit() {

        try {
            JsonFileData.overWrite(BOOKSHELF_FILE_PATH, this._bookShelfJsonList);
        } catch (err) {
            throw Error(`本棚情報ファイルのデータ書き込み処理中にエラーが発生しました。ERROR:${err}`);
        }
    }


    /**
     * json形式に変換する
     * @param BookShelfInfoMaster 
     * @returns 
     */
    private parseInsertToJson(bookShelfInsertEntity: BookShelfInsertEntity): BookShelfJsonModelType {

        // jsonファイル登録用の型に変換する
        const jsonBookShelfInfoMaster: BookShelfJsonModelType = {
            createDate: bookShelfInsertEntity.createDate,
            updateDate: bookShelfInsertEntity.updateDate,
            deleteFlg: bookShelfInsertEntity.deleteFlg,
            userId: bookShelfInsertEntity.frontUserId,
            bookId: bookShelfInsertEntity.bookId,
            thoughts: bookShelfInsertEntity.thoughts,
            readStatus: bookShelfInsertEntity.readStatus,
        };

        return jsonBookShelfInfoMaster;
    }
}