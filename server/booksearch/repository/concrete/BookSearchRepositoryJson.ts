import { FrontUserInfoMasterInsertEntity } from "../../../internaldata/frontuserinfomaster/entity/FrontUserInfoMasterInsertEntity";
import { FrontUserInfoMasterJsonModelType } from "../../../internaldata/frontuserinfomaster/model/FrontUserInfoMasterJsonModelType";
import { FRONT_USER_INFO_MASTER_FILE_PATH } from "../../../internaldata/frontuserinfomaster/repository/concrete/FrontUserInfoMasterRepositoryJson";
import { GoogleBooksApiAccessHistoryJsonModelType } from "../../../internaldata/googlebooksapiaccesshistory/model/GoogleBooksApiAccessHistoryJsonModelType";
import { GOOGLE_BOOKS_API_ACCESS_HISTORY_TRANSACTION_FILE_PATH } from "../../../internaldata/googlebooksapiaccesshistory/repository/concrete/GoogleBooksApiAccessHistoryRepositoryJson";
import { JsonFileData } from "../../../util/service/JsonFileData";
import { BookSearchGoogleBooksApiAccessHistorySelectEntity, } from "../../entity/BookSearchGoogleBooksApiAccessHistorySelectEntity";
import { BookSearchRepositoryInterface, } from "../interface/BookSearchRepositoryInterface";



/**
 * json形式の永続ロジック用クラス
 */
export class BookSearchRepositoryJson implements BookSearchRepositoryInterface {

    private _googleBooksApiAccessHistoryJsonList: ReadonlyArray<GoogleBooksApiAccessHistoryJsonModelType>;

    constructor() {

        // Google Books Apiアクセス情報ファイルのデータを取得
        const googleBooksApiAccessHistoryJsonList: GoogleBooksApiAccessHistoryJsonModelType[] =
            JsonFileData.getFileObj(GOOGLE_BOOKS_API_ACCESS_HISTORY_TRANSACTION_FILE_PATH);

        this._googleBooksApiAccessHistoryJsonList = googleBooksApiAccessHistoryJsonList;
    }


    /**
     * Google Books Apiのアクセス履歴取得
     * @returns 
     */
    public selectGoogleBooksApiAccessHistory(bookSearchGoogleBooksApiAccessHistorySelectEntity: BookSearchGoogleBooksApiAccessHistorySelectEntity)
        : ReadonlyArray<GoogleBooksApiAccessHistoryJsonModelType> {

        // FrontUserInfoCreateSelectEntityでselectする
        const selectedFrontUserInfoMasterJsonList = this._googleBooksApiAccessHistoryJsonList.filter((e: GoogleBooksApiAccessHistoryJsonModelType) => {
            return e.keyword === bookSearchGoogleBooksApiAccessHistorySelectEntity.keyword &&
                e.accessDate === bookSearchGoogleBooksApiAccessHistorySelectEntity.accessDate;
        });

        return selectedFrontUserInfoMasterJsonList;
    }

}