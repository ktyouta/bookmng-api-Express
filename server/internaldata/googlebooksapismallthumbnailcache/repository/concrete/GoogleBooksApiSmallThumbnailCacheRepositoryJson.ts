import { BOOK_AUTHORS_MASTER_FILE, BOOK_INFO_MASTER_FILE, GOOGLE_BOOKS_API_AUTHORS_CACHE_FILE, GOOGLE_BOOKS_API_SMALLTHUMBNAIL_CACHE_FILE, MASTER_FILE_PATH, TRANSACTION_FILE_PATH } from "../../../../util/const/FileInfoConst";
import { JsonFileData } from "../../../../util/service/JsonFileData";
import { GoogleBooksApiSmallThumbnailCacheInsertEntity } from "../../entity/GoogleBooksApiSmallThumbnailCacheInsertEntity";
import { GoogleBooksApiSmallThumbnailCacheUpdateEntity } from "../../entity/GoogleBooksApiSmallThumbnailCacheUpdateEntity";
import { GoogleBooksApiSmallThumbnailCacheJsonModelType } from "../../model/GoogleBooksApiSmallThumbnailCacheJsonModelType";
import { GoogleBooksApiSmallThumbnailCacheRepositoryInterface } from "../interface/GoogleBooksApiSmallThumbnailCacheRepositoryInterface";



// Google Books Apiサムネイル(小)キャッシュファイルパス
export const GOOGLE_BOOKS_API_SMALLTHUMBNAIL_CACHE_FILE_PATH = `${TRANSACTION_FILE_PATH}${GOOGLE_BOOKS_API_SMALLTHUMBNAIL_CACHE_FILE}`;


export class GoogleBooksApiSmallThumbnailCacheRepositoryJson implements GoogleBooksApiSmallThumbnailCacheRepositoryInterface {

    private _googleBooksApiSmallThumbnailCacheList: ReadonlyArray<GoogleBooksApiSmallThumbnailCacheJsonModelType>;

    constructor() {

        // Google Books Apiサムネイル(小)キャッシュ情報ファイルからデータを取得
        const googleBooksApiSmallThumbnailCacheList: GoogleBooksApiSmallThumbnailCacheJsonModelType[]
            = JsonFileData.getFileObj(GOOGLE_BOOKS_API_SMALLTHUMBNAIL_CACHE_FILE_PATH);

        this._googleBooksApiSmallThumbnailCacheList = googleBooksApiSmallThumbnailCacheList;
    }


    /**
     * Google Books Apiのサムネイル(小)情報追加
     * @param bookInfoMasterInsertEntity 
     */
    insert(googleBooksApiSmallThumbnailCacheInsertEntity: GoogleBooksApiSmallThumbnailCacheInsertEntity) {

        // IDの重複チェック
        const duplicategoogleBooksApiAuthorsCache = this._googleBooksApiSmallThumbnailCacheList.find((e: GoogleBooksApiSmallThumbnailCacheJsonModelType) => {
            return e.bookId === googleBooksApiSmallThumbnailCacheInsertEntity.bookId;
        });

        if (duplicategoogleBooksApiAuthorsCache) {
            throw Error(`Google Books Apiのサムネイル(小)情報が重複してるため登録できません。`);
        }

        // jsonに変換する
        const googleBooksApiSmallThumbnailJsonList = this.parseInsertToJson(googleBooksApiSmallThumbnailCacheInsertEntity);

        // データを追加する
        this._googleBooksApiSmallThumbnailCacheList =
            [...this._googleBooksApiSmallThumbnailCacheList, googleBooksApiSmallThumbnailJsonList];
    };


    /**
     * Google Books Apiのサムネイル(小)情報更新
     */
    update(googleBooksApiSmallThumbnailCacheUpdateEntity: GoogleBooksApiSmallThumbnailCacheUpdateEntity) {

    };


    /**
     * コミット
     */
    commit() {

        try {
            JsonFileData.overWrite(GOOGLE_BOOKS_API_SMALLTHUMBNAIL_CACHE_FILE_PATH, this._googleBooksApiSmallThumbnailCacheList);
        } catch (err) {
            throw Error(`Google Books Api著者キャッシュ情報ファイルのデータ書き込み中にエラーが発生しました。ERROR:${err}`);
        }
    };


    /**
     * json形式に変換する
     * @param bookInfoMasterInsertEntity 
     * @returns 
     */
    private parseInsertToJson(googleBooksApiSmallThumbnailCacheInsertEntity: GoogleBooksApiSmallThumbnailCacheInsertEntity)
        : GoogleBooksApiSmallThumbnailCacheJsonModelType {

        // jsonファイル登録用の型に変換する
        const googleBooksApiSmallThumbnailCacheJson: GoogleBooksApiSmallThumbnailCacheJsonModelType = {
            bookId: googleBooksApiSmallThumbnailCacheInsertEntity.bookId,
            smallThumbnail: googleBooksApiSmallThumbnailCacheInsertEntity.smallThumbnail,
            createDate: googleBooksApiSmallThumbnailCacheInsertEntity.createDate,
            updateDate: googleBooksApiSmallThumbnailCacheInsertEntity.updateDate,
        };

        return googleBooksApiSmallThumbnailCacheJson;
    }
}