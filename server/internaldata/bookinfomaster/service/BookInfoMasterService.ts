import { FLG } from "../../../util/const/CommonConst";
import { JsonFileOperation } from "../../../util/service/JsonFileOperation";
import { BOOK_INFO_MASTER_FILE_PATH } from "../const/BookInfoMasterConst";
import { BookIdModel } from "../model/BookIdModel";
import { BookInfoMasterCreateModel } from "../model/BookInfoMasterCreateModel";
import { BookInfoModelType } from "../model/BookInfoMasterModelType";

export class BookInfoMasterService {


    /**
     * 書籍情報マスタファイルのデータを取得
     */
    public getBookInfoMaster() {

        // 書籍情報マスタファイルからデータを取得
        const bookInfoMasterList: BookInfoModelType[] = JsonFileOperation.getFileObj(BOOK_INFO_MASTER_FILE_PATH);

        return bookInfoMasterList;
    }


    /**
     * 未削除の書籍情報データを取得
     * @returns 
     */
    public getActiveBookInfoMaster(bookInfoMasterList: BookInfoModelType[]) {

        // 未削除の書籍情報を取得
        const activeBookInfoMasterList = bookInfoMasterList.filter((e: BookInfoModelType) => {

            return e.deleteFlg !== FLG.ON;
        });

        return activeBookInfoMasterList;
    }


    /**
     * 書籍情報登録用データの作成
     * @param title 
     * @param publishedDate 
     * @param description 
     * @returns 
     */
    public createBookInfoMasterCreateBody(bookId: BookIdModel, title: string, publishedDate: string, description: string) {

        return new BookInfoMasterCreateModel(bookId, title, publishedDate, description);
    }


    /**
     * 書籍情報マスタに対する書き込み用データの作成
     * @param bookInfoMasterCreateModel 
     */
    public createBookInfoMasterWriteData(
        bookInfoMasterList: BookInfoModelType[],
        bookInfoMasterCreateModel: BookInfoMasterCreateModel): BookInfoModelType[] {

        // jsonファイル登録用の型に変換する
        const createBookInfoMasterBody: BookInfoModelType = {
            bookId: bookInfoMasterCreateModel.bookId.bookId,
            title: bookInfoMasterCreateModel.title.title,
            publishedDate: bookInfoMasterCreateModel.publishedDate.publishedDate,
            description: bookInfoMasterCreateModel.description.description,
            createDate: bookInfoMasterCreateModel.createDate.createDate,
            updateDate: bookInfoMasterCreateModel.updateDate.updateDate,
            deleteFlg: bookInfoMasterCreateModel.deleteFlg.deleteFlg,
        };

        // 書籍情報を追加する
        bookInfoMasterList = [...bookInfoMasterList, createBookInfoMasterBody];

        return bookInfoMasterList;
    }
}