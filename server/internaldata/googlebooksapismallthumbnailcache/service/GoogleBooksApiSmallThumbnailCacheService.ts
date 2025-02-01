import { JsonFileData } from "../../../util/service/JsonFileData";
import { GoogleBooksApiIdModel } from "../../googlebooksapiinfocache/properties/GoogleBooksApiIdModel";
import { GoogleBooksApiSmallThumbnailCacheCreateModel } from "../model/GoogleBooksApiSmallThumbnailCacheCreateModel";
import { GoogleBooksApiSmallThumbnailCacheJsonModelType } from "../model/GoogleBooksApiSmallThumbnailCacheJsonModelType";
import { GoogleBooksApiSmallThumbnailCacheUpdateModel } from "../model/GoogleBooksApiSmallThumbnailCacheUpdateModel";
import { SmallThumbnailModel } from "../properties/SmallThumbnailModel";
import { GOOGLE_BOOKS_API_SMALLTHUMBNAIL_CACHE_FILE_PATH } from "../repository/concrete/GoogleBooksApiSmallThumbnailCacheRepositoryJson";


export class GoogleBooksApiSmallThumbnailCacheService {


    /**
     * Google Books Apiサムネイル(小)キャッシュ情報ファイルからデータを取得
     * @returns 
     */
    public getGoogleBooksApiSmallThumbnailCache() {

        // Google Books Apiサムネイル(小)キャッシュ情報ファイルからデータを取得
        const googleBooksApiSmallThumbnailCacheList: GoogleBooksApiSmallThumbnailCacheJsonModelType[]
            = JsonFileData.getFileObj(GOOGLE_BOOKS_API_SMALLTHUMBNAIL_CACHE_FILE_PATH);

        return googleBooksApiSmallThumbnailCacheList;
    }


    /**
     * Google Books Apiサムネイル(小)キャッシュ情報登録用データの作成
     * @param bookId 
     * @param authorNo 
     * @param authorName 
     * @returns 
     */
    public GoogleBooksApiSmallThumbnailCacheCreateModel(bookId: GoogleBooksApiIdModel,
        smallThumbnail: SmallThumbnailModel): GoogleBooksApiSmallThumbnailCacheCreateModel {

        return new GoogleBooksApiSmallThumbnailCacheCreateModel(bookId, smallThumbnail);
    }


    /**
     * Google Books Apiサムネイル(小)キャッシュ情報に対する書き込み用データ(登録)の作成
     * @param bookInfoMasterCreateModel 
     */
    public createGoogleBooksApiSmallThumbnailCacheCreateWriteData(
        googleBooksApiSmallThumbnailCacheList: GoogleBooksApiSmallThumbnailCacheJsonModelType[],
        googleBooksApiSmallThumbnailCacheCreateModel: GoogleBooksApiSmallThumbnailCacheCreateModel): GoogleBooksApiSmallThumbnailCacheJsonModelType[] {

        // jsonファイル登録用の型に変換する
        const createGoogleBooksApiSmallThumbnailCacheBody: GoogleBooksApiSmallThumbnailCacheJsonModelType = {
            bookId: googleBooksApiSmallThumbnailCacheCreateModel.bookId.bookId,
            smallThumbnail: googleBooksApiSmallThumbnailCacheCreateModel.smallThumbnail.smallThumbnail,
            createDate: googleBooksApiSmallThumbnailCacheCreateModel.createDate.createDate,
            updateDate: googleBooksApiSmallThumbnailCacheCreateModel.updateDate.updateDate,
        };

        // Google Books Apiサムネイル(小)キャッシュ情報を追加する
        googleBooksApiSmallThumbnailCacheList = [...googleBooksApiSmallThumbnailCacheList, createGoogleBooksApiSmallThumbnailCacheBody];

        return googleBooksApiSmallThumbnailCacheList;
    }


    /**
     * Google Books Apiサムネイル(小)キャッシュ情報ファイルにデータを書き込む
     * @param googleBooksApiAuthorsCacheList 
     */
    public overWriteGoogleBooksApiSmallThumbnailCache(googleBooksApiSmallThumbnailCacheList: GoogleBooksApiSmallThumbnailCacheJsonModelType[]) {

        try {

            JsonFileData.overWrite(GOOGLE_BOOKS_API_SMALLTHUMBNAIL_CACHE_FILE_PATH,
                googleBooksApiSmallThumbnailCacheList);
        } catch (err) {

            throw Error(`Google Books Apiサムネイル(小)キャッシュ情報ファイルのデータ書き込み中にエラーが発生しました。ERROR:${err}`);
        }
    }


    /**
     * Google Books Apiサムネイル(小)キャッシュ情報更新用データの作成
     * @param bookId 
     * @param smallThumbnail 
     * @returns 
     */
    public GoogleBooksApiSmallThumbnailCacheUpdateModel(bookId: GoogleBooksApiIdModel,
        smallThumbnail: SmallThumbnailModel): GoogleBooksApiSmallThumbnailCacheUpdateModel {

        return new GoogleBooksApiSmallThumbnailCacheUpdateModel(bookId, smallThumbnail);
    }


    /**
     * Google Books Apiサムネイル(小)キャッシュ情報に対する書き込み用データ(更新)の作成
     * @param googleBooksApiSmallThumbnailCacheList 
     * @param googleBooksApiSmallThumbnailCacheCreateModel 
     * @returns 
     */
    public createGoogleBooksApiSmallThumbnailCacheUpdateWriteData(
        googleBooksApiSmallThumbnailCache: GoogleBooksApiSmallThumbnailCacheJsonModelType,
        googleBooksApiSmallThumbnailCacheUpdateModel: GoogleBooksApiSmallThumbnailCacheUpdateModel): GoogleBooksApiSmallThumbnailCacheJsonModelType {

        googleBooksApiSmallThumbnailCache.smallThumbnail = googleBooksApiSmallThumbnailCacheUpdateModel.smallThumbnail.smallThumbnail;
        googleBooksApiSmallThumbnailCache.updateDate = googleBooksApiSmallThumbnailCacheUpdateModel.updateDate.updateDate;

        return googleBooksApiSmallThumbnailCache;
    }
}