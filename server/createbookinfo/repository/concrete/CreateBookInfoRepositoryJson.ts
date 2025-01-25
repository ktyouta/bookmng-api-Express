import { AuthorsMasterJsonType } from "../../../internaldata/authorsinfomaster/model/AuthorsMasterJsonType";
import { AuthorsMasterModel } from "../../../internaldata/authorsinfomaster/model/AuthorsMasterModel";
import { AuthorIdModel } from "../../../internaldata/authorsinfomaster/properties/AuthorIdMode";
import { AUTHROS_MASTER_FILE_PATH } from "../../../internaldata/authorsinfomaster/repository/concrete/AuthorsInfoMasterRepositoryJson";
import { BookAuthorsMasterJsonType } from "../../../internaldata/bookauthorsmaster/model/BookAuthorsMasterJsonType";
import { BOOK_AUTHROS_MASTER_FILE_PATH } from "../../../internaldata/bookauthorsmaster/repository/concrete/BookAuthorsMasterRepositoryJson";
import { JsonFileData } from "../../../util/service/JsonFileData";
import { CreateBookInfoAuthrosSelectEntity } from "../../entity/CreateBookInfoAuthrosSelectEntity";
import { CreateBookInfoBookAuthrosSelectEntity } from "../../entity/CreateBookInfoBookAuthrosSelectEntity";
import { CreateBookInfoRepositoryInterface } from "../interface/CreateBookInfoRepositoryInterface";

export class CreateBookInfoRepositoryJson implements CreateBookInfoRepositoryInterface {

    // 著者マスタ情報
    private _authorsMasterJsonList: ReadonlyArray<AuthorsMasterJsonType>;
    // 書籍著者情報
    private _bookAuthorsMasterJsonType: ReadonlyArray<BookAuthorsMasterJsonType>;

    constructor() {

        // 著者マスタファイルからデータを取得
        const authorsMasterList: AuthorsMasterJsonType[] = JsonFileData.getFileObj(AUTHROS_MASTER_FILE_PATH);

        // 書籍著者マスタファイルからデータを取得
        const bookAuthorsMasterList: BookAuthorsMasterJsonType[] = JsonFileData.getFileObj(BOOK_AUTHROS_MASTER_FILE_PATH);

        this._authorsMasterJsonList = authorsMasterList;
        this._bookAuthorsMasterJsonType = bookAuthorsMasterList;
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

            return createBookInfoAuthrosJsonList.includes(e.authorId);
        });

        return selectedAuthorsList;
    }


    /**
     * 書籍情報取得
     * @param createBookInfoBookAuthrosSelectEntity 
     * @returns 
     */
    selectBookInfo(createBookInfoBookAuthrosSelectEntity: CreateBookInfoBookAuthrosSelectEntity): ReadonlyArray<AuthorsMasterJsonType> {

        return [];
    }

}