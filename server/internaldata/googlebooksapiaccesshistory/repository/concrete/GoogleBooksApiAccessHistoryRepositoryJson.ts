import { FRONT_USER_INFO_MASTER_FILE, GOOGLE_BOOKS_API_ACCESS_HISTORY_TRANSACTION_FILE, MASTER_FILE_PATH, TRANSACTION_FILE_PATH } from "../../../../util/const/FileInfoConst";
import { JsonFileData } from "../../../../util/service/JsonFileData";
import { CreateDateModel } from "../../../common/model/CreateDateModel";
import { DeleteFlgModel } from "../../../common/model/DeleteFlgModel";
import { UpdateDateModel } from "../../../common/model/UpdateDateModel";
import { GoogleBooksApiAccessHistoryInsertEntity } from "../../entity/GoogleBooksApiAccessHistoryInsertEntity";
import { GoogleBooksApiAccessHistoryUpdateEntity } from "../../entity/GoogleBooksApiAccessHistoryUpdateEntity";
import { GoogleBooksApiAccessHistoryJsonModelType } from "../../model/GoogleBooksApiAccessHistoryJsonModelType";
import { GoogleBooksApiAccessHistoryRepositoryInterface } from "../interface/GoogleBooksApiAccessHistoryRepositoryInterface";


// Google Books Apiアクセストランザクションファイルパス
export const GOOGLE_BOOKS_API_ACCESS_HISTORY_TRANSACTION_FILE_PATH = `${TRANSACTION_FILE_PATH}${GOOGLE_BOOKS_API_ACCESS_HISTORY_TRANSACTION_FILE}`;


/**
 * json形式の永続ロジック用クラス
 */
export class GoogleBooksApiAccessHistoryRepositoryJson implements GoogleBooksApiAccessHistoryRepositoryInterface {

    private _googleBooksApiAccessHistoryJson: ReadonlyArray<GoogleBooksApiAccessHistoryJsonModelType>;

    constructor() {

        // Google Books Apiアクセス情報ファイルのデータを取得
        const googleBooksApiAccessHistoryJsonList: GoogleBooksApiAccessHistoryJsonModelType[] =
            JsonFileData.getFileObj(GOOGLE_BOOKS_API_ACCESS_HISTORY_TRANSACTION_FILE_PATH);

        this._googleBooksApiAccessHistoryJson = googleBooksApiAccessHistoryJsonList;
    }


    /**
     * ユーザー追加
     * @param googleBooksApiAccessHistoryInsertEntity 
     * @returns 
     */
    public insert(googleBooksApiAccessHistoryInsertEntity: GoogleBooksApiAccessHistoryInsertEntity) {

        // 重複チェック
        const duplicateAccess = this._googleBooksApiAccessHistoryJson.find((e: GoogleBooksApiAccessHistoryJsonModelType) => {
            return e.keyword === googleBooksApiAccessHistoryInsertEntity.keyword &&
                e.accessDate === googleBooksApiAccessHistoryInsertEntity.accessDate;
        });

        if (duplicateAccess) {
            throw Error(`Google Books Apiのアクセス履歴情報が重複してるため登録できません。`);
        }

        // jsonに変換する
        const googleBooksApiAccessHistoryJson = this.parseInsertToJson(googleBooksApiAccessHistoryInsertEntity);

        // データを追加する
        this._googleBooksApiAccessHistoryJson = [...this._googleBooksApiAccessHistoryJson, googleBooksApiAccessHistoryJson];
    }


    /**
     * Google Books Apiのアクセス履歴情報ファイルにデータを書き込む
     */
    public commit() {

        try {
            JsonFileData.overWrite(GOOGLE_BOOKS_API_ACCESS_HISTORY_TRANSACTION_FILE_PATH, this._googleBooksApiAccessHistoryJson);
        } catch (err) {
            throw Error(`Google Books Apiアクセス情報ファイルのデータ書き込み中にエラーが発生しました。ERROR:${err}`);
        }
    }


    /**
     * json形式に変換する
     * @param userInfoMaster 
     * @returns 
     */
    private parseInsertToJson(googleBooksApiAccessHistoryInsertEntity: GoogleBooksApiAccessHistoryInsertEntity)
        : GoogleBooksApiAccessHistoryJsonModelType {

        // jsonファイル登録用の型に変換する
        const json: GoogleBooksApiAccessHistoryJsonModelType = {
            keyword: googleBooksApiAccessHistoryInsertEntity.keyword,
            accessDate: googleBooksApiAccessHistoryInsertEntity.accessDate,
            createDate: googleBooksApiAccessHistoryInsertEntity.createDate,
            updateDate: googleBooksApiAccessHistoryInsertEntity.updateDate,
        };

        return json;
    }
}