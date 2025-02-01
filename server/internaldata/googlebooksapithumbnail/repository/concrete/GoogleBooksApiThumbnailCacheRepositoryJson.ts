import { GOOGLE_BOOKS_API_THUMBNAIL_CACHE_FILE, TRANSACTION_FILE_PATH } from "../../../../util/const/FileInfoConst";
import { JsonFileData } from "../../../../util/service/JsonFileData";
import { GoogleBooksApiThumbnailCacheInsertEntity } from "../../entity/GoogleBooksApiThumbnailCacheInsertEntity";
import { GoogleBooksApiThumbnailCacheUpdateEntity } from "../../entity/GoogleBooksApiThumbnailCacheUpdateEntity";
import { GoogleBooksApiThumbnailCacheJsonModelType } from "../../model/GoogleBooksApiThumbnailCacheJsonModelType";
import { GoogleBooksApiThumbnailCacheRepositoryInterface } from "../interface/GoogleBooksApiThumbnailCacheRepositoryInterface";



// Google Books Apiサムネイルキャッシュファイルパス
export const GOOGLE_BOOKS_API_THUMBNAIL_CACHE_FILE_PATH = `${TRANSACTION_FILE_PATH}${GOOGLE_BOOKS_API_THUMBNAIL_CACHE_FILE}`;


export class GoogleBooksApiThumbnailCacheRepositoryJson implements GoogleBooksApiThumbnailCacheRepositoryInterface {

    private _googleBooksApiThumbnailCacheList: ReadonlyArray<GoogleBooksApiThumbnailCacheJsonModelType>;

    constructor() {

        // Google Books Apiサムネイルキャッシュ情報ファイルからデータを取得
        const googleBooksApiThumbnailCacheList: GoogleBooksApiThumbnailCacheJsonModelType[]
            = JsonFileData.getFileObj(GOOGLE_BOOKS_API_THUMBNAIL_CACHE_FILE_PATH);

        this._googleBooksApiThumbnailCacheList = googleBooksApiThumbnailCacheList;
    }


    /**
     * Google Books Apiのサムネイル情報追加
     * @param bookInfoMasterInsertEntity 
     */
    insert(googleBooksApiThumbnailCacheInsertEntity: GoogleBooksApiThumbnailCacheInsertEntity) {

        // IDの重複チェック
        const duplicategoogleBooksApiAuthorsCache = this._googleBooksApiThumbnailCacheList.find((e: GoogleBooksApiThumbnailCacheJsonModelType) => {
            return e.bookId === googleBooksApiThumbnailCacheInsertEntity.bookId;
        });

        if (duplicategoogleBooksApiAuthorsCache) {
            throw Error(`Google Books Apiのサムネイル情報が重複してるため登録できません。`);
        }

        // jsonに変換する
        const googleBooksApiThumbnailJsonList = this.parseInsertToJson(googleBooksApiThumbnailCacheInsertEntity);

        // データを追加する
        this._googleBooksApiThumbnailCacheList =
            [...this._googleBooksApiThumbnailCacheList, googleBooksApiThumbnailJsonList];
    };


    /**
     * Google Books Apiのサムネイル情報更新
     */
    update(googleBooksApiThumbnailCacheUpdateEntity: GoogleBooksApiThumbnailCacheUpdateEntity) {

    };


    /**
     * コミット
     */
    commit() {

        try {
            JsonFileData.overWrite(GOOGLE_BOOKS_API_THUMBNAIL_CACHE_FILE_PATH, this._googleBooksApiThumbnailCacheList);
        } catch (err) {
            throw Error(`Google Books Apiサムネイルキャッシュ情報ファイルのデータ書き込み中にエラーが発生しました。ERROR:${err}`);
        }
    };


    /**
     * json形式に変換する
     * @param bookInfoMasterInsertEntity 
     * @returns 
     */
    private parseInsertToJson(googleBooksApiThumbnailCacheInsertEntity: GoogleBooksApiThumbnailCacheInsertEntity)
        : GoogleBooksApiThumbnailCacheJsonModelType {

        // jsonファイル登録用の型に変換する
        const googleBooksApiThumbnailCacheJson: GoogleBooksApiThumbnailCacheJsonModelType = {
            bookId: googleBooksApiThumbnailCacheInsertEntity.bookId,
            thumbnail: googleBooksApiThumbnailCacheInsertEntity.thumbnail,
            createDate: googleBooksApiThumbnailCacheInsertEntity.createDate,
            updateDate: googleBooksApiThumbnailCacheInsertEntity.updateDate,
        };

        return googleBooksApiThumbnailCacheJson;
    }
}