import { JsonFileOperation } from "../../../util/service/JsonFileOperation";
import { BOOK_INFO_MASTER_FILE_PATH } from "../const/BookInfoMasterConst";
import { BookInfoJsonModelType } from "./BookInfoMasterJsonModelType";
import { BookInfoMasterListModel } from "./BookInfoMasterListModel";
import { BookInfoMasterModel } from "./BookInfoMasterModel";

export class BookInfoMasterJsonListModel {

    private readonly _bookInfoJsonListModel: ReadonlyArray<BookInfoJsonModelType>;


    constructor(bookInfoMasterListModel: BookInfoMasterListModel) {

        // jsonファイル登録用の型に変換する
        const jsonBookInfoMasterListModel = bookInfoMasterListModel.bookInfoMasterModelList.map((e: BookInfoMasterModel) => {
            return this.parseJsonBookInfoMaster(e);
        });

        this._bookInfoJsonListModel = jsonBookInfoMasterListModel;
    }


    /**
     * BookInfoMasterModelからjson形式に変換する
     * @param bookInfoMaster 
     * @returns 
     */
    private parseJsonBookInfoMaster(bookInfoMaster: BookInfoMasterModel): BookInfoJsonModelType {

        // jsonファイル登録用の型に変換する
        const jsonBookInfoMaster: BookInfoJsonModelType = {
            bookId: bookInfoMaster.bookId,
            title: bookInfoMaster.title,
            publishedDate: bookInfoMaster.publishedDate,
            description: bookInfoMaster.description,
            createDate: bookInfoMaster.createDate,
            updateDate: bookInfoMaster.updateDate,
            deleteFlg: bookInfoMaster.deleteFlg,
        };

        return jsonBookInfoMaster;
    }


    /**
     * 書籍情報マスタファイルにデータを書き込む
     * @param bookInfoMasterList 
     */
    public overWriteBookInfoMaster() {

        try {

            JsonFileOperation.overWriteJsonFileData(BOOK_INFO_MASTER_FILE_PATH, this._bookInfoJsonListModel);
        } catch (err) {

            throw Error(`書籍情報マスタファイルのデータ書き込み処理中にエラーが発生しました。ERROR:${err}`);
        }
    }
}