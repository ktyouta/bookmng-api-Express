import { BOOK_AUTHORS_MASTER_FILE, BOOK_INFO_MASTER_FILE, GOOGLE_BOOKS_API_AUTHORS_CACHE_FILE, MASTER_FILE_PATH, TRANSACTION_FILE_PATH } from "../../../../util/const/FileInfoConst";
import { JsonFileData } from "../../../../util/service/JsonFileData";
import { GoogleBooksApiAuthorsCacheDeleteEntity } from "../../entity/GoogleBooksApiAuthorsCacheDeleteEntity";
import { GoogleBooksApiAuthorsCacheInsertEntity } from "../../entity/GoogleBooksApiAuthorsCacheInsertEntity";
import { GoogleBooksApiAuthorsCacheUpdateEntity } from "../../entity/GoogleBooksApiAuthorsCacheUpdateEntity";
import { GoogleBooksApiAuthorsCacheJsonModelType } from "../../model/GoogleBooksApiAuthorsCacheJsonModelType";
import { GoogleBooksApiAuthorsCacheRepositoryInterface } from "../interface/GoogleBooksApiAuthorsCacheRepositoryInterface";

// Google Books Api著者情報キャッシュファイルパス
export const GOOGLE_BOOKS_API_AUTHORS_CACHE_FILE_PATH = `${TRANSACTION_FILE_PATH}${GOOGLE_BOOKS_API_AUTHORS_CACHE_FILE}`;


export class GoogleBooksApiAuthorsCacheRepositoryJson implements GoogleBooksApiAuthorsCacheRepositoryInterface {

    private _googleBooksApiAuthorsCacheList: ReadonlyArray<GoogleBooksApiAuthorsCacheJsonModelType>;

    constructor() {

        // Google Books Api著者情報キャッシュファイルからデータを取得
        const googleBooksApiAuthorsCacheList: GoogleBooksApiAuthorsCacheJsonModelType[] =
            JsonFileData.getFileObj(GOOGLE_BOOKS_API_AUTHORS_CACHE_FILE_PATH);

        this._googleBooksApiAuthorsCacheList = googleBooksApiAuthorsCacheList;
    }


    /**
     * Google Books Api著者キャッシュ情報追加
     * @param bookInfoMasterInsertEntity 
     */
    insert(googleBooksApiAuthorsCacheInsertEntity: GoogleBooksApiAuthorsCacheInsertEntity) {

        // IDの重複チェック
        const duplicategoogleBooksApiAuthorsCache = this._googleBooksApiAuthorsCacheList.find((e: GoogleBooksApiAuthorsCacheJsonModelType) => {
            return e.bookId === googleBooksApiAuthorsCacheInsertEntity.bookId &&
                e.authorNo === googleBooksApiAuthorsCacheInsertEntity.authorNo;
        });

        if (duplicategoogleBooksApiAuthorsCache) {
            throw Error(`Google Books Api著者キャッシュ情報が重複してるため登録できません。`);
        }

        // jsonに変換する
        const googleBooksApiAuthorsCacheLJsonList = this.parseInsertToJson(googleBooksApiAuthorsCacheInsertEntity);

        // データを追加する
        this._googleBooksApiAuthorsCacheList = [...this._googleBooksApiAuthorsCacheList, googleBooksApiAuthorsCacheLJsonList];
    };


    /**
     * Google Books Api著者キャッシュ情報更新
     */
    update(googleBooksApiAuthorsCacheUpdateEntity: GoogleBooksApiAuthorsCacheUpdateEntity) {

    };


    /**
     * Google Books Api著者キャッシュ情報削除
     */
    delete(googleBooksApiAuthorsCacheDeleteEntity: GoogleBooksApiAuthorsCacheDeleteEntity) {

        this._googleBooksApiAuthorsCacheList = this._googleBooksApiAuthorsCacheList.filter((e: GoogleBooksApiAuthorsCacheJsonModelType) => {

            return e.bookId !== googleBooksApiAuthorsCacheDeleteEntity.bookId;
        });
    };


    /**
     * コミット
     */
    commit() {

        try {
            JsonFileData.overWrite(GOOGLE_BOOKS_API_AUTHORS_CACHE_FILE_PATH, this._googleBooksApiAuthorsCacheList);
        } catch (err) {
            throw Error(`Google Books Api著者キャッシュ情報ファイルのデータ書き込み中にエラーが発生しました。ERROR:${err}`);
        }
    };


    /**
     * json形式に変換する
     * @param bookInfoMasterInsertEntity 
     * @returns 
     */
    private parseInsertToJson(googleBooksApiAuthorsCacheInsertEntity: GoogleBooksApiAuthorsCacheInsertEntity)
        : GoogleBooksApiAuthorsCacheJsonModelType {

        // jsonファイル登録用の型に変換する
        const googleBooksApiAuthorsCacheJson: GoogleBooksApiAuthorsCacheJsonModelType = {
            bookId: googleBooksApiAuthorsCacheInsertEntity.bookId,
            authorNo: googleBooksApiAuthorsCacheInsertEntity.authorNo,
            authorName: googleBooksApiAuthorsCacheInsertEntity.authorName,
            createDate: googleBooksApiAuthorsCacheInsertEntity.createDate,
            updateDate: googleBooksApiAuthorsCacheInsertEntity.updateDate,
        };

        return googleBooksApiAuthorsCacheJson;
    }
}