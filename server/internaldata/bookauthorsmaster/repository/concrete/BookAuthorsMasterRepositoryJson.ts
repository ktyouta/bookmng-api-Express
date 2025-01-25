import { BOOK_AUTHORS_MASTER_FILE, MASTER_FILE_PATH } from "../../../../util/const/FileInfoConst";
import { JsonFileData } from "../../../../util/service/JsonFileData";
import { BookAuthorsMasterInsertEntity } from "../../entity/BookAuthorsMasterInsertEntity";
import { BookAuthorsMasterUpdateEntity } from "../../entity/BookAuthorsMasterUpdateEntity";
import { BookAuthorsMasterJsonType } from "../../model/BookAuthorsMasterJsonType";
import { BookAuthorsMasterRepositoryInterface } from "../interface/BookAuthorsMasterRepositoryInterface";

// 書籍著者マスタファイルのパス
export const BOOK_AUTHROS_MASTER_FILE_PATH = `${MASTER_FILE_PATH}${BOOK_AUTHORS_MASTER_FILE}`;


export class BookAuthorsMasterRepositoryJson implements BookAuthorsMasterRepositoryInterface {

    private _bookAuthorsMasterJsonList: ReadonlyArray<BookAuthorsMasterJsonType>;

    constructor() {

        // 書籍著者マスタファイルからデータを取得
        const bookAuthorsMasterList: BookAuthorsMasterJsonType[] = JsonFileData.getFileObj(BOOK_AUTHROS_MASTER_FILE_PATH);

        this._bookAuthorsMasterJsonList = bookAuthorsMasterList;
    }


    /**
     * 書籍著者情報追加
     * @param authorsInfoMasterInsertEntity 
     */
    insert(authorsInfoMasterInsertEntity: BookAuthorsMasterInsertEntity) {

        // IDの重複チェック
        const duplicateBookAuthor = this._bookAuthorsMasterJsonList.find((e: BookAuthorsMasterJsonType) => {
            return e.authorId === authorsInfoMasterInsertEntity.authorId && e.bookId === authorsInfoMasterInsertEntity.bookId;
        });

        if (duplicateBookAuthor) {
            throw Error(`書籍著者情報が重複してるため登録できません。`);
        }

        // jsonに変換する
        const bookAuthorsMasterJsonList = this.parseInsertToJson(authorsInfoMasterInsertEntity);

        // データを追加する
        this._bookAuthorsMasterJsonList = [...this._bookAuthorsMasterJsonList, bookAuthorsMasterJsonList];
    };


    /**
     * 書籍著者情報更新
     */
    update(authorsInfoMasterUpdateEntity: BookAuthorsMasterUpdateEntity) {

    };


    /**
     * コミット
     */
    commit() {

        try {

            JsonFileData.overWrite(BOOK_AUTHROS_MASTER_FILE_PATH, this._bookAuthorsMasterJsonList);
        } catch (err) {

            throw Error(`書籍著者情報マスタファイルのデータ書き込み中にエラーが発生しました。ERROR:${err}`);
        }
    };


    /**
     * json形式に変換する
     * @param authorsInfoMasterInsertEntity 
     * @returns 
     */
    private parseInsertToJson(authorsInfoMasterInsertEntity: BookAuthorsMasterInsertEntity): BookAuthorsMasterJsonType {

        // jsonファイル登録用の型に変換する
        const bookAuthorsMasterJson: BookAuthorsMasterJsonType = {
            bookId: authorsInfoMasterInsertEntity.bookId,
            authorId: authorsInfoMasterInsertEntity.authorId,
            createDate: authorsInfoMasterInsertEntity.createDate,
            updateDate: authorsInfoMasterInsertEntity.updateDate,
            deleteFlg: authorsInfoMasterInsertEntity.deleteFlg,
        };

        return bookAuthorsMasterJson;
    }
}