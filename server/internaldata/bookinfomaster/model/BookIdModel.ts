import { PRE_BOOK_ID } from "../const/BookInfoMasterConst";
import { BookInfoMasterService } from "../service/BookInfoMasterService";
import { BookInfoModelType } from "./BookInfoMasterModelType";

export class BookIdModel {

    private bookId: string;
    private bookInfoMasterService: BookInfoMasterService = new BookInfoMasterService();


    constructor() {

        // 書籍ID採番用に書籍情報マスタからデータを取得する
        const bookInfoMasterList = this.bookInfoMasterService.getBookInfoMaster();

        if (!bookInfoMasterList) {
            throw Error("書籍IDの採番に必要な書籍情報マスタが取得できませんでした。");
        }

        // 書籍IDを採番する
        const latestBookId = this.createLatestBookId(bookInfoMasterList);

        if (!latestBookId) {
            throw Error("書籍IDの採番に失敗しました。");
        }

        this.bookId = latestBookId;
    }


    /**
     * 書籍IDを取得する
     * @returns 
     */
    public getBookId() {

        return this.bookId;
    }


    /**
     * 書籍IDを採番する
     */
    private createLatestBookId(bookInfoList: BookInfoModelType[]): string {

        //IDが最大のNOを取得
        let maxNo = bookInfoList.reduce<number>((prev: number, current: BookInfoModelType) => {

            let currentNm = parseInt(current.bookId.replace(`${PRE_BOOK_ID}`, ""));
            return Math.max(prev, currentNm);
        }, 0);

        return `${PRE_BOOK_ID}${maxNo + 1}`;
    }
}