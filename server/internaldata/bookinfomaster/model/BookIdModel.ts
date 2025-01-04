import { BookInfoMasterService } from "../service/BookInfoMasterService";
import { BookInfoMasterModel } from "./BookInfoMasterModel";

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

        const bookInfoMasterService: BookInfoMasterService = new BookInfoMasterService();

        // 書籍ID採番用に書籍情報マスタからデータを取得する
        const bookInfoMasterList: BookInfoMasterModel[] = bookInfoMasterService.getBookInfoMaster();

        if (!bookInfoMasterList) {
            throw Error("書籍IDの採番に必要な書籍情報マスタが取得できませんでした。");
        }

        // 書籍IDを採番する
        const latestBookId = BookIdModel.createLatestBookId(bookInfoMasterList);

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
    private static createLatestBookId(bookInfoList: BookInfoMasterModel[]): string {

        //IDが最大のNOを取得
        let maxNo = bookInfoList.reduce<number>((prev: number, current: BookInfoMasterModel) => {

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

}