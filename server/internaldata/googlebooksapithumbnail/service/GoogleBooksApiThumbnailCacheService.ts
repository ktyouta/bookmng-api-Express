import { GOOGLE_BOOKS_API_THUMBNAIL_CACHE_FILE } from "../../../util/const/FileInfoConst";
import { JsonFileOperation } from "../../../util/service/JsonFileOperation";
import { GoogleBooksApiIdModel } from "../../googlebooksapiinfocache/model/GoogleBooksApiIdModel";
import { GoogleBooksApiThumbnailCacheCreateModel } from "../model/GoogleBooksApiThumbnailCacheCreateModel";
import { GoogleBooksApiThumbnailCacheModelType } from "../model/GoogleBooksApiThumbnailCacheModelType";
import { ThumbnailModel } from "../model/ThumbnailModel";

export class GoogleBooksApiThumbnailCacheService {


    /**
     * Google Books Apiサムネイルキャッシュ情報ファイルからデータを取得
     * @returns 
     */
    public getGoogleBooksApiInfoCache() {

        // Google Books Apiサムネイルキャッシュ情報ファイルからデータを取得
        const googleBooksApiThumbnailCacheList: GoogleBooksApiThumbnailCacheModelType[]
            = JsonFileOperation.getFileObj(GOOGLE_BOOKS_API_THUMBNAIL_CACHE_FILE);

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
        smallThumbnail: ThumbnailModel): GoogleBooksApiThumbnailCacheCreateModel {

        return new GoogleBooksApiThumbnailCacheCreateModel(bookId, smallThumbnail);
    }


    /**
     * Google Books Apiサムネイルキャッシュ情報に対する書き込み用データの作成
     * @param bookInfoMasterCreateModel 
     */
    public createGoogleBooksApiInfoCacheWriteData(
        googleBooksApiThumbnailCacheList: GoogleBooksApiThumbnailCacheModelType[],
        googleBooksApiSmallThumbnailCacheCreateModel: GoogleBooksApiThumbnailCacheCreateModel): GoogleBooksApiThumbnailCacheModelType[] {

        // jsonファイル登録用の型に変換する
        const createGoogleBooksApiSmallThumbnailCacheBody: GoogleBooksApiThumbnailCacheModelType = {
            bookId: googleBooksApiSmallThumbnailCacheCreateModel.bookId.bookId,
            thumbnail: googleBooksApiSmallThumbnailCacheCreateModel.thumbnail.thumbnail,
            createDate: googleBooksApiSmallThumbnailCacheCreateModel.createDate.createDate,
            updateDate: googleBooksApiSmallThumbnailCacheCreateModel.updateDate.updateDate,
        };

        // Google Books Api書籍キャッシュ情報を追加する
        googleBooksApiThumbnailCacheList = [...googleBooksApiThumbnailCacheList, createGoogleBooksApiSmallThumbnailCacheBody];

        return googleBooksApiThumbnailCacheList;
    }
}