import { JsonFileOperation } from "../../../util/service/JsonFileOperation";
import { BOOK_INFO_MASTER_FILE_PATH } from "../const/BookInfoMasterConst";
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
     * 書籍情報登録用データの作成
     * @param title 
     * @param publishedDate 
     * @param description 
     * @returns 
     */
    public createBookInfoMasterCreateBody(title: string, publishedDate: string, description: string) {

        return new BookInfoMasterCreateModel(title, publishedDate, description);
    }


    /**
     * 書籍情報マスタに対する書き込み用データの作成
     * @param bookInfoMasterCreateModel 
     */
    public createBookInfoMasterWriteData(
        bookInfoMasterList: BookInfoModelType[],
        bookInfoMasterCreateModel: BookInfoMasterCreateModel): BookInfoModelType[] {

        // 書籍情報を追加する
        bookInfoMasterList = [...bookInfoMasterList, {
            bookId: bookInfoMasterCreateModel.getBookId().getBookId(),
            title: bookInfoMasterCreateModel.getTitle().getTitle(),
            publishedDate: bookInfoMasterCreateModel.getPublishedDate().getPublishedDate(),
            description: bookInfoMasterCreateModel.getdDescription().getDescription(),
            createDate: bookInfoMasterCreateModel.getCreateDate().getCreateDate(),
            updateDate: bookInfoMasterCreateModel.getUpdateDate().getUpdateDate(),
            deleteFlg: bookInfoMasterCreateModel.getDeleteFlg().getDeleteFlg(),
        }]

        return bookInfoMasterList;
    }
}