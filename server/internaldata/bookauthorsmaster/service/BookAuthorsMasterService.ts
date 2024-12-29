import { JsonFileOperation } from "../../../util/service/JsonFileOperation";
import { BookIdModel } from "../../bookinfomaster/model/BookIdModel";
import { BOOK_AUTHROS_MASTER_FILE_PATH } from "../const/BookAuthrosMasterConst";
import { BookAuthorsMasterCreateModel } from "../model/BookAuthorsMasterCreateModel";
import { BookAuthorsModelType } from "../model/BookAuthorsMasterModelType";


export class BookAuthorsMasterService {


    /**
     * 書籍著者マスタファイルのデータを取得
     */
    public getBookAuthorsMaster() {

        // 書籍著者マスタファイルからデータを取得
        const bookAuthorsMasterList: BookAuthorsModelType[] = JsonFileOperation.getFileObj(BOOK_AUTHROS_MASTER_FILE_PATH);

        return bookAuthorsMasterList;
    }


    /**
     * 書籍著者登録用データの作成
     * @param bookId 
     * @param authorId 
     * @returns 
     */
    public createBookAuthorsMasterCreateBody(bookId: BookIdModel, authorId: string): BookAuthorsMasterCreateModel {

        return new BookAuthorsMasterCreateModel(bookId, authorId);
    }


    /**
     * 書籍著者情報マスタに対する書き込み用データの作成
     * @param bookAuthorsMasterList 
     * @param bookInfoMasterCreateModel 
     * @returns 
     */
    public createBookInfoMasterWriteData(
        bookAuthorsMasterList: BookAuthorsModelType[],
        bookAuthorsMasterCreateModel: BookAuthorsMasterCreateModel[]): BookAuthorsModelType[] {

        // jsonファイル登録用の型に変換する
        const createBookInfoMasterBodyList: BookAuthorsModelType[] = bookAuthorsMasterCreateModel.map((e) => {

            return {
                bookId: e.getBookId().getBookId(),
                authorId: e.getAuthorId(),
                createDate: e.getCreateDate().getCreateDate(),
                updateDate: e.getUpdateDate().getUpdateDate(),
                deleteFlg: e.getDeleteFlg().getDeleteFlg(),
            }
        });

        // 書籍著者情報を追加する
        bookAuthorsMasterList = [...bookAuthorsMasterList, ...createBookInfoMasterBodyList];

        return bookAuthorsMasterList;
    }
}