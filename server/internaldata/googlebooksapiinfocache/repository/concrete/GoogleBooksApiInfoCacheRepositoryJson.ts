import { BOOK_AUTHORS_MASTER_FILE, BOOK_INFO_MASTER_FILE, GOOGLE_BOOKS_API_AUTHORS_CACHE_FILE, GOOGLE_BOOKS_API_INFO_CACHE_FILE, MASTER_FILE_PATH, TRANSACTION_FILE_PATH } from "../../../../util/const/FileInfoConst";
import { JsonFileData } from "../../../../util/service/JsonFileData";
import { GoogleBooksApiInfoCacheUpdateEntity } from "../../entity/GoogleBooksApiAuthorsCacheUpdateEntity";
import { GoogleBooksApiInfoCacheInsertEntity } from "../../entity/GoogleBooksApiInfoCacheInsertEntity";
import { GoogleBooksApiInfoCacheJsonModelType } from "../../model/GoogleBooksApiInfoCacheJsonModelType";
import { GoogleBooksApiInfoCacheRepositoryInterface } from "../interface/GoogleBooksApiInfoCacheRepositoryInterface";


// Google Books Api書籍情報キャッシュファイルパス
export const GOOGLE_BOOKS_API_INFO_CACHE_FILE_PATH = `${TRANSACTION_FILE_PATH}${GOOGLE_BOOKS_API_INFO_CACHE_FILE}`;


export class GoogleBooksApiInfoCacheRepositoryJson implements GoogleBooksApiInfoCacheRepositoryInterface {

    private _googleBooksApiInfoCacheList: ReadonlyArray<GoogleBooksApiInfoCacheJsonModelType>;

    constructor() {

        // Google Books Api情報キャッシュファイルからデータを取得
        const googleBooksApiAuthorsCacheList: GoogleBooksApiInfoCacheJsonModelType[] =
            JsonFileData.getFileObj(GOOGLE_BOOKS_API_INFO_CACHE_FILE_PATH);

        this._googleBooksApiInfoCacheList = googleBooksApiAuthorsCacheList;
    }


    /**
     * Google Books Apiキャッシュ情報追加
     * @param bookInfoMasterInsertEntity 
     */
    insert(googleBooksApiAuthorsCacheInsertEntity: GoogleBooksApiInfoCacheInsertEntity) {

        // IDの重複チェック
        const duplicategoogleBooksApiAuthorsCache = this._googleBooksApiInfoCacheList.find((e: GoogleBooksApiInfoCacheJsonModelType) => {
            return e.bookId === googleBooksApiAuthorsCacheInsertEntity.bookId;
        });

        if (duplicategoogleBooksApiAuthorsCache) {
            throw Error(`Google Books Api著者キャッシュ情報が重複してるため登録できません。`);
        }

        // jsonに変換する
        const googleBooksApiinfoCacheLJsonList = this.parseInsertToJson(googleBooksApiAuthorsCacheInsertEntity);

        // データを追加する
        this._googleBooksApiInfoCacheList = [...this._googleBooksApiInfoCacheList, googleBooksApiinfoCacheLJsonList];
    };


    /**
     * Google Books Api著者キャッシュ情報更新
     */
    update(googleBooksApiAuthorsCacheUpdateEntity: GoogleBooksApiInfoCacheUpdateEntity) {

    };


    /**
     * コミット
     */
    commit() {

        try {
            JsonFileData.overWrite(GOOGLE_BOOKS_API_INFO_CACHE_FILE_PATH, this._googleBooksApiInfoCacheList);
        } catch (err) {
            throw Error(`Google Books Apiキャッシュ情報ファイルのデータ書き込み中にエラーが発生しました。ERROR:${err}`);
        }
    };


    /**
     * json形式に変換する
     * @param bookInfoMasterInsertEntity 
     * @returns 
     */
    private parseInsertToJson(googleBooksApiInfoCacheInsertEntity: GoogleBooksApiInfoCacheInsertEntity)
        : GoogleBooksApiInfoCacheJsonModelType {

        // jsonファイル登録用の型に変換する
        const googleBooksApiInfoCacheJson: GoogleBooksApiInfoCacheJsonModelType = {
            bookId: googleBooksApiInfoCacheInsertEntity.bookId,
            title: googleBooksApiInfoCacheInsertEntity.title,
            publishedDate: googleBooksApiInfoCacheInsertEntity.publishedDate,
            description: googleBooksApiInfoCacheInsertEntity.descriptionModel,
            createDate: googleBooksApiInfoCacheInsertEntity.createDate,
            updateDate: googleBooksApiInfoCacheInsertEntity.updateDate,
        };

        return googleBooksApiInfoCacheJson;
    }
}