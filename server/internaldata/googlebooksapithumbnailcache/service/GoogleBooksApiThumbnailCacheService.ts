import { GOOGLE_BOOKS_API_THUMBNAIL_CACHE_FILE } from "../../../util/const/FileInfoConst";
import { JsonFileData } from "../../../util/service/JsonFileData";
import { GoogleBooksApiIdModel } from "../../googlebooksapiinfocache/properties/GoogleBooksApiIdModel";
import { GoogleBooksApiThumbnailCacheCreateModel } from "../model/GoogleBooksApiThumbnailCacheCreateModel";
import { GoogleBooksApiThumbnailCacheJsonModelType } from "../model/GoogleBooksApiThumbnailCacheJsonModelType";
import { GoogleBooksApiThumbnailCacheUpdateModel } from "../model/GoogleBooksApiThumbnailCacheUpdateModel";
import { ThumbnailModel } from "../properties/ThumbnailModel";
import { GOOGLE_BOOKS_API_THUMBNAIL_CACHE_FILE_PATH } from "../repository/concrete/GoogleBooksApiThumbnailCacheRepositoryJson";

export class GoogleBooksApiThumbnailCacheService {


    /**
     * Google Books Apiサムネイルキャッシュ情報ファイルからデータを取得
     * @returns 
     */
    public getGoogleBooksApiThumbnailCache() {

        // Google Books Apiサムネイルキャッシュ情報ファイルからデータを取得
        const googleBooksApiThumbnailCacheList: GoogleBooksApiThumbnailCacheJsonModelType[]
            = JsonFileData.getFileObj(GOOGLE_BOOKS_API_THUMBNAIL_CACHE_FILE_PATH);

        return googleBooksApiThumbnailCacheList;
    }


    /**
     * Google Books Apiサムネイルキャッシュ情報登録用データの作成
     * @param bookId 
     * @param authorNo 
     * @param authorName 
     * @returns 
     */
    public GoogleBooksApiThumbnailCacheCreateModel(bookId: GoogleBooksApiIdModel,
        thumbnail: ThumbnailModel): GoogleBooksApiThumbnailCacheCreateModel {

        return new GoogleBooksApiThumbnailCacheCreateModel(bookId, thumbnail);
    }


    /**
     * Google Books Apiサムネイルキャッシュ情報に対する書き込み用データの作成
     * @param bookInfoMasterCreateModel 
     */
    public createGoogleBooksApiThumbnailCacheWriteData(
        googleBooksApiThumbnailCacheList: GoogleBooksApiThumbnailCacheJsonModelType[],
        googleBooksApiThumbnailCacheCreateModel: GoogleBooksApiThumbnailCacheCreateModel): GoogleBooksApiThumbnailCacheJsonModelType[] {

        // jsonファイル登録用の型に変換する
        const createGoogleBooksApiThumbnailCacheBody: GoogleBooksApiThumbnailCacheJsonModelType = {
            bookId: googleBooksApiThumbnailCacheCreateModel.bookId.bookId,
            thumbnail: googleBooksApiThumbnailCacheCreateModel.thumbnail.thumbnail,
            createDate: googleBooksApiThumbnailCacheCreateModel.createDate.createDate,
            updateDate: googleBooksApiThumbnailCacheCreateModel.updateDate.updateDate,
        };

        // Google Books Api書籍キャッシュ情報を追加する
        googleBooksApiThumbnailCacheList = [...googleBooksApiThumbnailCacheList, createGoogleBooksApiThumbnailCacheBody];

        return googleBooksApiThumbnailCacheList;
    }


    /**
     * Google Books Apiサムネイルキャッシュ情報ファイルにデータを書き込む
     * @param googleBooksApiAuthorsCacheList 
     */
    public overWriteGoogleBooksApiThumbnailCache(googleBooksApiThumbnailCacheList: GoogleBooksApiThumbnailCacheJsonModelType[]) {

        try {

            JsonFileData.overWrite(GOOGLE_BOOKS_API_THUMBNAIL_CACHE_FILE_PATH,
                googleBooksApiThumbnailCacheList);
        } catch (err) {

            throw Error(`Google Books Apiサムネイルキャッシュ情報ファイルのデータ書き込み中にエラーが発生しました。ERROR:${err}`);
        }
    }


    /**
     * Google Books Apiサムネイルキャッシュ情報更新用データの作成
     * @param bookId 
     * @param smallThumbnail 
     * @returns 
     */
    public GoogleBooksApiThumbnailCacheUpdateModel(bookId: GoogleBooksApiIdModel,
        thumbnail: ThumbnailModel): GoogleBooksApiThumbnailCacheUpdateModel {

        return new GoogleBooksApiThumbnailCacheUpdateModel(bookId, thumbnail);
    }


    /**
     * Google Books Apiサムネイルキャッシュ情報に対する書き込み用データ(更新)の作成
     * @param googleBooksApiThumbnailCacheList 
     * @param googleBooksApiThumbnailCacheCreateModel 
     * @returns 
     */
    public createGoogleBooksApiThumbnailCacheUpdateWriteData(
        googleBooksApiThumbnailCache: GoogleBooksApiThumbnailCacheJsonModelType,
        googleBooksApiThumbnailCacheUpdateModel: GoogleBooksApiThumbnailCacheUpdateModel): GoogleBooksApiThumbnailCacheJsonModelType {

        googleBooksApiThumbnailCache.thumbnail = googleBooksApiThumbnailCacheUpdateModel.thumbnail.thumbnail;
        googleBooksApiThumbnailCache.updateDate = googleBooksApiThumbnailCacheUpdateModel.updateDate.updateDate;

        return googleBooksApiThumbnailCache;
    }
}