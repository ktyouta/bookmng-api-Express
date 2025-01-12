import { GOOGLE_BOOKS_API_AUTHORS_CACHE_FILE } from "../../../util/const/FileInfoConst";
import { JsonFileData } from "../../../util/service/JsonFileData";
import { GoogleBooksApiIdModel } from "../../googlebooksapiinfocache/model/GoogleBooksApiIdModel";
import { GOOGLE_BOOKS_API_AUTHORS_CACHE_FILE_PATH } from "../const/GoogleBooksApiAuthorCacheConst";
import { GoogleBooksApiAuthorNameModel } from "../model/GoogleBooksApiAuthorNameModel";
import { GoogleBooksApiAuthorNoModel } from "../model/GoogleBooksApiAuthorNoModel";
import { GoogleBooksApiAuthorsCacheModelType } from "../model/GoogleBooksApiAuthorsCacheModelType";
import { GoogleBooksApiInfoAuthorCreateModel } from "../model/GoogleBooksApiInfoAuthorCreateModel";
import { GoogleBooksApiInfoAuthorUpdateModel } from "../model/GoogleBooksApiInfoAuthorUpdateModel";

export class GoogleBooksApiAuthorsCacheService {


    /**
     * Google Books Api著者キャッシュ情報ファイルからデータを取得
     * @returns 
     */
    public getGoogleBooksApiAuthorsCache() {

        // Google Books Api著者キャッシュ情報ファイルからデータを取得
        const googleBooksApiAuthorsCacheList: GoogleBooksApiAuthorsCacheModelType[] = JsonFileData.getFileObj(GOOGLE_BOOKS_API_AUTHORS_CACHE_FILE_PATH);

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
     * Google Books Api著者キャッシュ情報に対する書き込み用データ(登録)の作成
     * @param bookInfoMasterCreateModel 
     */
    public createGoogleBooksApiAuthorsCacheCreateWriteData(
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


    /**
     * Google Books Api著者キャッシュ情報ファイルにデータを書き込む
     * @param googleBooksApiAuthorsCacheList 
     */
    public overWriteGoogleBooksApiAuthorsCache(googleBooksApiAuthorsCacheList: GoogleBooksApiAuthorsCacheModelType[]) {

        try {

            JsonFileData.overWrite(GOOGLE_BOOKS_API_AUTHORS_CACHE_FILE_PATH, googleBooksApiAuthorsCacheList);
        } catch (err) {

            throw Error(`Google Books Api著者キャッシュ情報ファイルのデータ書き込み中にエラーが発生しました。ERROR:${err}`);
        }
    }


    /**
     * Google Books Api著者キャッシュ情報に対する書き込み用データ(更新)の作成
     * @param googleBooksApiAuthorsCacheList 
     * @param googleBooksApiAuthorsCacheCreateModel 
     * @returns 
     */
    public createGoogleBooksApiAuthorsCacheUpdateWriteData(
        googleBooksApiAuthorsCacheList: GoogleBooksApiAuthorsCacheModelType[],
        googleBooksApiAuthorsCacheUpdateModelList: GoogleBooksApiInfoAuthorUpdateModel[]): GoogleBooksApiAuthorsCacheModelType[] {

        // フィルター対象の書籍IDリスト
        const filterTargetBookIdList = Array.from(new Set(googleBooksApiAuthorsCacheUpdateModelList.map((e: GoogleBooksApiInfoAuthorUpdateModel) => {
            return e.bookId.bookId;
        })));

        // 更新対象の著者を一度削除する
        googleBooksApiAuthorsCacheList = googleBooksApiAuthorsCacheList.filter((e: GoogleBooksApiAuthorsCacheModelType) => {
            return !filterTargetBookIdList.includes(e.bookId);
        });

        // jsonファイル更新用の型に変換する
        const jsonGoogleBooksApiAuthorsCacheUpdateModelList: GoogleBooksApiAuthorsCacheModelType[] =
            googleBooksApiAuthorsCacheUpdateModelList.map((e: GoogleBooksApiInfoAuthorUpdateModel) => {

                return {
                    bookId: e.bookId.bookId,
                    authorNo: e.authorNo.authorNo,
                    authorName: e.authorName.authorName,
                    createDate: e.createDate.createDate,
                    updateDate: e.updateDate.updateDate,
                }
            });

        // 削除後に著者情報を追加する
        googleBooksApiAuthorsCacheList = [...googleBooksApiAuthorsCacheList, ...jsonGoogleBooksApiAuthorsCacheUpdateModelList];

        return googleBooksApiAuthorsCacheList;
    }


    /**
     * Google Books Api著者キャッシュ情報更新用データの作成
     * @param bookId 
     * @param authorNo 
     * @param authorName 
     * @returns 
     */
    public createGoogleBooksApiAuthorsCacheUpdateBody(bookId: GoogleBooksApiIdModel,
        authorNo: GoogleBooksApiAuthorNoModel, authorName: GoogleBooksApiAuthorNameModel) {

        return new GoogleBooksApiInfoAuthorUpdateModel(bookId, authorNo, authorName);
    }
}