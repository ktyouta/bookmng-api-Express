import { FrontUserInfoMasterJsonModelType } from "../../../internaldata/frontuserinfomaster/model/FrontUserInfoMasterJsonModelType";
import { GoogleBooksApiAccessHistoryJsonModelType } from "../../../internaldata/googlebooksapiaccesshistory/model/GoogleBooksApiAccessHistoryJsonModelType";
import { BookSearchGoogleBooksApiAccessHistorySelectEntity, } from "../../entity/BookSearchGoogleBooksApiAccessHistorySelectEntity";


/**
 * 永続ロジック用インターフェース
 */
export interface BookSearchRepositoryInterface {

    /**
     * Google Books Apiのアクセス履歴取得
     */
    selectGoogleBooksApiAccessHistory(bookSearchGoogleBooksApiAccessHistorySelectEntity: BookSearchGoogleBooksApiAccessHistorySelectEntity)
        : ReadonlyArray<GoogleBooksApiAccessHistoryJsonModelType>;

}