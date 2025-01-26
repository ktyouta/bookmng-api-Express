import { AuthorsMasterJsonType } from "../../../internaldata/authorsinfomaster/model/AuthorsMasterJsonType";
import { AuthorsMasterModel } from "../../../internaldata/authorsinfomaster/model/AuthorsMasterModel";
import { AuthorIdModel } from "../../../internaldata/authorsinfomaster/properties/AuthorIdMode";
import { AUTHROS_MASTER_FILE_PATH } from "../../../internaldata/authorsinfomaster/repository/concrete/AuthorsInfoMasterRepositoryJson";
import { BookAuthorsMasterJsonType } from "../../../internaldata/bookauthorsmaster/model/BookAuthorsMasterJsonType";
import { BOOK_AUTHROS_MASTER_FILE_PATH } from "../../../internaldata/bookauthorsmaster/repository/concrete/BookAuthorsMasterRepositoryJson";
import { BookInfoJsonModelType } from "../../../internaldata/bookinfomaster/model/BookInfoMasterJsonModelType";
import { BOOK_INFO_MASTER_FILE_PATH } from "../../../internaldata/bookinfomaster/repository/concrete/BookInfoMasterRepositoryJson";
import { ArrayUtil } from "../../../util/service/ArrayUtil";
import { JsonFileData } from "../../../util/service/JsonFileData";
import { CreateBookInfoAuthrosSelectEntity } from "../../entity/CreateBookInfoAuthrosSelectEntity";
import { CreateBookInfoBookAuthrosSelectEntity } from "../../entity/CreateBookInfoBookAuthrosSelectEntity";
import { CreateBookInfoRepositoryInterface } from "../interface/CreateBookInfoRepositoryInterface";

export class CreateBookInfoRepositoryJson implements CreateBookInfoRepositoryInterface {

    // 著者マスタ情報
    private _authorsMasterJsonList: ReadonlyArray<AuthorsMasterJsonType>;
    // 書籍著者情報
    private _bookAuthorsMasterJsonList: ReadonlyArray<BookAuthorsMasterJsonType>;
    // 書籍情報
    private _bookInfoMasterJsonList: ReadonlyArray<BookInfoJsonModelType>;


    constructor() {

        // 著者マスタファイルからデータを取得
        const authorsMasterList: AuthorsMasterJsonType[] = JsonFileData.getFileObj(AUTHROS_MASTER_FILE_PATH);
        // 書籍著者マスタファイルからデータを取得
        const bookAuthorsMasterList: BookAuthorsMasterJsonType[] = JsonFileData.getFileObj(BOOK_AUTHROS_MASTER_FILE_PATH);
        // 書籍情報マスタファイルからデータを取得
        const jsonBookInfoMasterList: BookInfoJsonModelType[] = JsonFileData.getFileObj(BOOK_INFO_MASTER_FILE_PATH);

        this._authorsMasterJsonList = authorsMasterList;
        this._bookAuthorsMasterJsonList = bookAuthorsMasterList;
        this._bookInfoMasterJsonList = jsonBookInfoMasterList;
    }


    /**
     * 著者情報取得
     */
    selectAuthors(createBookInfoAuthrosSelectEntity: CreateBookInfoAuthrosSelectEntity): ReadonlyArray<AuthorsMasterJsonType> {

        // 著者IDのリストを取得
        const createBookInfoAuthrosJsonList: string[] =
            createBookInfoAuthrosSelectEntity.authorIdModelList.map((e: AuthorIdModel) => {

                return e.authorId;
            });

        const selectedAuthorsList = this._authorsMasterJsonList.filter((e: AuthorsMasterJsonType) => {

            return createBookInfoAuthrosJsonList.includes(e.authorId) && e.deleteFlg === createBookInfoAuthrosSelectEntity.deleteFlg;
        });

        return selectedAuthorsList;
    }


    /**
     * 書籍情報取得
     * @param createBookInfoBookAuthrosSelectEntity 
     * @returns 
     */
    selectBookInfo(createBookInfoBookAuthrosSelectEntity: CreateBookInfoBookAuthrosSelectEntity): ReadonlyArray<BookInfoJsonModelType> {

        // 書籍情報をフィルター
        const filterdBookInfoList = this._bookInfoMasterJsonList.filter((e: BookInfoJsonModelType) => {

            return e.title === createBookInfoBookAuthrosSelectEntity.title &&
                e.publishedDate === createBookInfoBookAuthrosSelectEntity.publishedDate &&
                e.deleteFlg === createBookInfoBookAuthrosSelectEntity.bookAuthordeleteFlg;
        });

        // 書籍著者情報のデータをもとにフィルターする
        const retBookInfoList = filterdBookInfoList.filter((e: BookInfoJsonModelType) => {

            // 書籍IDに一致するデータを取得
            const filterdBookAuthorsList = this._bookAuthorsMasterJsonList.filter((e1: BookAuthorsMasterJsonType) => {
                return e1.bookId === e.bookId && e.deleteFlg === createBookInfoBookAuthrosSelectEntity.bookAuthordeleteFlg;
            });

            if (filterdBookAuthorsList.length === 0) {
                return false;
            }

            // 著者IDのリストを取得する
            const bookAuthorsMasterAuthorIdList = filterdBookAuthorsList.map((e1: BookAuthorsMasterJsonType) => {
                return e1.authorId;
            });

            // リクエストの著者IDリスト
            const reqBookAuthorsMasterAuthorIdList = createBookInfoBookAuthrosSelectEntity.authorIdModelList.map((e1) => {
                return e1.authorId;
            });

            // マスタの著者IDリストとリクエストの著者IDリストが完全に一致するデータを取得する
            return ArrayUtil.checkArrayEqual(bookAuthorsMasterAuthorIdList, reqBookAuthorsMasterAuthorIdList);
        });

        return retBookInfoList;
    }

}