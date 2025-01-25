import { JsonFileData } from "../../../util/service/JsonFileData";
import { BookInfoJsonModelType } from "../model/BookInfoMasterJsonModelType";
import { BOOK_INFO_MASTER_FILE_PATH } from "../repository/concrete/BookInfoMasterRepositoryJson";

// 書籍IDの接頭辞
const PRE_BOOK_ID = `bookId-`;

export class BookIdModel {

    private readonly _bookId: string;


    private constructor(bookId: string) {

        if (!bookId) {
            throw Error(`書籍IDが空です。`);
        }

        // 書籍IDのバリデーションチェック
        if (!BookIdModel.checkBookIdValidate(bookId)) {
            throw Error(`書籍IDのフォーマットが不正です。bookId:${bookId}`);
        }

        this._bookId = bookId;
    }


    public static createNewBookId() {

        // 書籍ID採番用に書籍情報マスタからデータを取得する
        const jsonBookInfoMasterList: BookInfoJsonModelType[] = JsonFileData.getFileObj(BOOK_INFO_MASTER_FILE_PATH);

        if (!jsonBookInfoMasterList) {
            throw Error("書籍IDの採番に必要な書籍情報マスタが取得できませんでした。");
        }

        // 書籍IDを採番する
        const latestBookId = BookIdModel.createLatestBookId(jsonBookInfoMasterList);

        if (!latestBookId) {
            throw Error("書籍IDの採番に失敗しました。");
        }

        return new BookIdModel(latestBookId);
    }


    /**
     * bookIdをセット
     * @param bookId 
     * @returns 
     */
    public static reConstruct(bookId: string) {

        return new BookIdModel(bookId);
    }


    /**
     * 書籍IDを取得する
     * @returns 
     */
    public get bookId() {
        return this._bookId;
    }

    /**
     * 書籍IDを採番する
     */
    private static createLatestBookId(jsonBookInfoMasterList: BookInfoJsonModelType[]): string {

        //IDが最大のNOを取得
        let maxNo = jsonBookInfoMasterList.reduce<number>((prev: number, current: BookInfoJsonModelType) => {

            let currentNm = parseInt(current.bookId.replace(`${PRE_BOOK_ID}`, ""));
            return Math.max(prev, currentNm);
        }, 0);

        return `${PRE_BOOK_ID}${maxNo + 1}`;
    }


    /**
     * bookIdのバリデーションチェック
     * @param bookId 
     * @returns 
     */
    private static checkBookIdValidate(bookId: string) {

        return bookId.includes(PRE_BOOK_ID);
    }


    /**
     * 書籍IDの同一チェック
     * @param userNameModel 
     * @returns 
     */
    public checkBookIdDuplicate(bookIdModel: BookIdModel) {

        return this._bookId === bookIdModel.bookId;
    }
}