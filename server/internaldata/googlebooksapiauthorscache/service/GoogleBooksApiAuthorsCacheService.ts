import { GOOGLE_BOOKS_API_AUTHORS_CACHE_FILE } from "../../../util/const/FileInfoConst";
import { JsonFileOperation } from "../../../util/service/JsonFileOperation";
import { GoogleBooksApiIdModel } from "../../googlebooksapiinfocache/model/GoogleBooksApiIdModel";
import { GoogleBooksApiAuthorNameModel } from "../model/GoogleBooksApiAuthorNameModel";
import { GoogleBooksApiAuthorNoModel } from "../model/GoogleBooksApiAuthorNoModel";
import { GoogleBooksApiAuthorsCacheModelType } from "../model/GoogleBooksApiAuthorsCacheModelType";
import { GoogleBooksApiInfoAuthorCreateModel } from "../model/GoogleBooksApiInfoAuthorCreateModel";

export class GoogleBooksApiAuthorsCacheService {


    /**
     * Google Books Api著者キャッシュ情報ファイルからデータを取得
     * @returns 
     */
    public getGoogleBooksApiAuthorsCache() {

        // Google Books Api著者キャッシュ情報ファイルからデータを取得
        const googleBooksApiAuthorsCacheList: GoogleBooksApiAuthorsCacheModelType[] = JsonFileOperation.getFileObj(GOOGLE_BOOKS_API_AUTHORS_CACHE_FILE);

        return googleBooksApiAuthorsCacheList;
    }


    /**
     * Google Books Api著者キャッシュ情報登録用データの作成
     * @param bookId 
     * @param authorNo 
     * @param authorName 
     * @returns 
     */
    public createGoogleBooksApiAuthorsCacheCreateBody(bookId: GoogleBooksApiIdModel,
        authorNo: GoogleBooksApiAuthorNoModel, authorName: GoogleBooksApiAuthorNameModel) {

        return new GoogleBooksApiInfoAuthorCreateModel(bookId, authorNo, authorName);
    }


    /**
     * Google Books Api著者キャッシュ情報に対する書き込み用データの作成
     * @param bookInfoMasterCreateModel 
     */
    public createGoogleBooksApiAuthorsCacheWriteData(
        googleBooksApiAuthorsCacheList: GoogleBooksApiAuthorsCacheModelType[],
        googleBooksApiAuthorsCacheCreateModel: GoogleBooksApiInfoAuthorCreateModel): GoogleBooksApiAuthorsCacheModelType[] {

        // jsonファイル登録用の型に変換する
        const createGoogleBooksApiAuthorsCacheBody: GoogleBooksApiAuthorsCacheModelType = {
            bookId: googleBooksApiAuthorsCacheCreateModel.bookId.bookId,
            authorNo: googleBooksApiAuthorsCacheCreateModel.authorNo.authorNo,
            authorName: googleBooksApiAuthorsCacheCreateModel.authorName.authorName,
            createDate: googleBooksApiAuthorsCacheCreateModel.createDate.createDate,
            updateDate: googleBooksApiAuthorsCacheCreateModel.updateDate.updateDate,
        };

        // Google Books Apiアクセス情報を追加する
        googleBooksApiAuthorsCacheList = [...googleBooksApiAuthorsCacheList, createGoogleBooksApiAuthorsCacheBody];

        return googleBooksApiAuthorsCacheList;
    }
}