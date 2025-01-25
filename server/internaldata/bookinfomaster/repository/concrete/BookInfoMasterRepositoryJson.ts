import { BOOK_AUTHORS_MASTER_FILE, BOOK_INFO_MASTER_FILE, MASTER_FILE_PATH } from "../../../../util/const/FileInfoConst";
import { JsonFileData } from "../../../../util/service/JsonFileData";
import { BookInfoMasterInsertEntity } from "../../entity/BookInfoMasterInsertEntity";
import { BookInfoMasterUpdateEntity } from "../../entity/BookInfoMasterUpdateEntity";
import { BookInfoJsonModelType } from "../../model/BookInfoMasterJsonModelType";
import { BookInfoMasterRepositoryInterface } from "../interface/BookInfoMasterRepositoryInterface";

// 書籍情報マスタファイルのパス
export const BOOK_INFO_MASTER_FILE_PATH = `${MASTER_FILE_PATH}${BOOK_INFO_MASTER_FILE}`;


export class BookInfoMasterRepositoryJson implements BookInfoMasterRepositoryInterface {

    private _bookInfoMasterJsonList: ReadonlyArray<BookInfoJsonModelType>;

    constructor() {

        // 書籍情報マスタファイルからデータを取得
        const jsonBookInfoMasterList: BookInfoJsonModelType[] = JsonFileData.getFileObj(BOOK_INFO_MASTER_FILE_PATH);

        this._bookInfoMasterJsonList = jsonBookInfoMasterList;
    }


    /**
     * 書籍情報追加
     * @param bookInfoMasterInsertEntity 
     */
    insert(bookInfoMasterInsertEntity: BookInfoMasterInsertEntity) {

        // IDの重複チェック
        const duplicateBook = this._bookInfoMasterJsonList.find((e: BookInfoJsonModelType) => {
            return e.bookId === bookInfoMasterInsertEntity.bookId;
        });

        if (duplicateBook) {
            throw Error(`書籍情報が重複してるため登録できません。`);
        }

        // jsonに変換する
        const bookMasterJsonList = this.parseInsertToJson(bookInfoMasterInsertEntity);

        // データを追加する
        this._bookInfoMasterJsonList = [...this._bookInfoMasterJsonList, bookMasterJsonList];
    };


    /**
     * 書籍著者情報更新
     */
    update(authorsInfoMasterUpdateEntity: BookInfoMasterUpdateEntity) {

    };


    /**
     * コミット
     */
    commit() {

        try {
            JsonFileData.overWrite(BOOK_INFO_MASTER_FILE_PATH, this._bookInfoMasterJsonList);
        } catch (err) {
            throw Error(`書籍情報マスタファイルのデータ書き込み中にエラーが発生しました。ERROR:${err}`);
        }
    };


    /**
     * json形式に変換する
     * @param bookInfoMasterInsertEntity 
     * @returns 
     */
    private parseInsertToJson(bookInfoMasterInsertEntity: BookInfoMasterInsertEntity): BookInfoJsonModelType {

        // jsonファイル登録用の型に変換する
        const bookInfoJson: BookInfoJsonModelType = {
            bookId: bookInfoMasterInsertEntity.bookId,
            createDate: bookInfoMasterInsertEntity.createDate,
            updateDate: bookInfoMasterInsertEntity.updateDate,
            deleteFlg: bookInfoMasterInsertEntity.deleteFlg,
            title: bookInfoMasterInsertEntity.title,
            publishedDate: bookInfoMasterInsertEntity.publishedDate,
            description: bookInfoMasterInsertEntity.description,
        };

        return bookInfoJson;
    }
}