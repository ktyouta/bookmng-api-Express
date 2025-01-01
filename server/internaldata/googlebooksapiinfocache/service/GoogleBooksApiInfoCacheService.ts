import { JsonFileOperation } from "../../../util/service/JsonFileOperation";
import { KeywordModel } from "../../googlebooksapiaccesshistory/model/KeywordModel";
import { GOOGLE_BOOKS_API_INFO_CACHE_FILE_PATH } from "../const/GoogleBooksApiInfoCacheConst";
import { GoogleBooksApiDescriptionModel } from "../model/GoogleBooksApiDescriptionModel";
import { GoogleBooksApiIdModel } from "../model/GoogleBooksApiIdModel";
import { GoogleBooksApiInfoCacheCreateModel } from "../model/GoogleBooksApiInfoCacheCreateModel";
import { GoogleBooksApiInfoCacheModelType } from "../model/GoogleBooksApiInfoCacheModelType";
import { GoogleBooksApiPublishedDateModel } from "../model/GoogleBooksApiPublishedDateModel";
import { GoogleBooksApiTitleModel } from "../model/GoogleBooksApiTitleModel";

export class GoogleBooksApiInfoCacheService {


    /**
     * Google Books Api書籍キャッシュ情報ファイルからデータを取得
     * @returns 
     */
    public getGoogleBooksApiInfoCache() {

        // Google Books Api著者キャッシュ情報ファイルからデータを取得
        const googleBooksApiInfoCacheList: GoogleBooksApiInfoCacheModelType[] = JsonFileOperation.getFileObj(GOOGLE_BOOKS_API_INFO_CACHE_FILE_PATH);

        return googleBooksApiInfoCacheList;
    }


    /**
     * Google Books Api著者キャッシュ情報ファイルをキーワードでフィルターする
     * @returns 
     */
    public getGoogleBooksApiInfoCacheByKeyword(googleBooksApiAuthorsCacheList: GoogleBooksApiInfoCacheModelType[],
        keywordModel: KeywordModel) {

        // タイトルと説明に対してキーワードでフィルターする
        googleBooksApiAuthorsCacheList = googleBooksApiAuthorsCacheList.filter((e: GoogleBooksApiInfoCacheModelType) => {

            return e.title?.includes(keywordModel.keyword) || e.description?.includes(keywordModel.keyword);
        });

        return googleBooksApiAuthorsCacheList;
    }


    /**
     * Google Books Api書籍キャッシュ情報登録用データの作成
     * @param bookId 
     * @param authorNo 
     * @param authorName 
     * @returns 
     */
    public GoogleBooksApiInfoCacheCreateModel(bookId: GoogleBooksApiIdModel, title: GoogleBooksApiTitleModel,
        publishedDate: GoogleBooksApiPublishedDateModel, description: GoogleBooksApiDescriptionModel): GoogleBooksApiInfoCacheCreateModel {

        return new GoogleBooksApiInfoCacheCreateModel(bookId, title, publishedDate, description);
    }


    /**
     * Google Books Api書籍キャッシュ情報に対する書き込み用データの作成
     * @param bookInfoMasterCreateModel 
     */
    public createGoogleBooksApiInfoCacheWriteData(
        googleBooksApiInfoCacheList: GoogleBooksApiInfoCacheModelType[],
        googleBooksApiInfoCacheCreateModel: GoogleBooksApiInfoCacheCreateModel): GoogleBooksApiInfoCacheModelType[] {

        // jsonファイル登録用の型に変換する
        const createGoogleBooksApiInfoCacheBody: GoogleBooksApiInfoCacheModelType = {
            bookId: googleBooksApiInfoCacheCreateModel.bookId.bookId,
            title: googleBooksApiInfoCacheCreateModel.title.title,
            publishedDate: googleBooksApiInfoCacheCreateModel.publishedDate.publishedDate,
            description: googleBooksApiInfoCacheCreateModel.description.description,
            createDate: googleBooksApiInfoCacheCreateModel.createDate.createDate,
            updateDate: googleBooksApiInfoCacheCreateModel.updateDate.updateDate,
        };

        // Google Books Api書籍キャッシュ情報を追加する
        googleBooksApiInfoCacheList = [...googleBooksApiInfoCacheList, createGoogleBooksApiInfoCacheBody];

        return googleBooksApiInfoCacheList;
    }


    /**
     * Google Books Api書籍キャッシュ情報ファイルにデータを書き込む
     * @param googleBooksApiAuthorsCacheList 
     */
    public overWriteGoogleBooksApiInfoCache(googleBooksApiInfoCacheList: GoogleBooksApiInfoCacheModelType[]) {

        try {

            JsonFileOperation.overWriteJsonFileData(GOOGLE_BOOKS_API_INFO_CACHE_FILE_PATH, googleBooksApiInfoCacheList);
        } catch (err) {

            throw Error(`Google Books Api書籍キャッシュ情報ファイルのデータ書き込み中にエラーが発生しました。ERROR:${err}`);
        }
    }
}