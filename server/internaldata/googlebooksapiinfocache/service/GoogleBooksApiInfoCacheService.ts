import { JsonFileData } from "../../../util/service/JsonFileData";
import { KeywordModel } from "../../googlebooksapiaccesshistory/properties/KeywordModel";
import { GoogleBooksApiDescriptionModel } from "../properties/GoogleBooksApiDescriptionModel";
import { GoogleBooksApiIdModel } from "../properties/GoogleBooksApiIdModel";
import { GoogleBooksApiInfoCacheCreateModel } from "../model/GoogleBooksApiInfoCacheCreateModel";
import { GoogleBooksApiInfoCacheJsonModelType } from "../model/GoogleBooksApiInfoCacheJsonModelType";
import { GoogleBooksApiInfoCacheUpdateModel } from "../model/GoogleBooksApiInfoCacheUpdateModel";
import { GoogleBooksApiPublishedDateModel } from "../properties/GoogleBooksApiPublishedDateModel";
import { GoogleBooksApiTitleModel } from "../properties/GoogleBooksApiTitleModel";
import { GOOGLE_BOOKS_API_INFO_CACHE_FILE_PATH } from "../repository/concrete/GoogleBooksApiInfoCacheRepositoryJson";



export class GoogleBooksApiInfoCacheService {


    /**
     * Google Books Api書籍キャッシュ情報ファイルからデータを取得
     * @returns 
     */
    public getGoogleBooksApiInfoCache() {

        // Google Books Api著者キャッシュ情報ファイルからデータを取得
        const googleBooksApiInfoCacheList: GoogleBooksApiInfoCacheJsonModelType[] = JsonFileData.getFileObj(GOOGLE_BOOKS_API_INFO_CACHE_FILE_PATH);

        return googleBooksApiInfoCacheList;
    }


    /**
     * Google Books Api著者キャッシュ情報ファイルをキーワードでフィルターする
     * @returns 
     */
    public getGoogleBooksApiInfoCacheByKeyword(googleBooksApiAuthorsCacheList: GoogleBooksApiInfoCacheJsonModelType[],
        keywordModel: KeywordModel) {

        // タイトルと説明に対してキーワードでフィルターする
        googleBooksApiAuthorsCacheList = googleBooksApiAuthorsCacheList.filter((e: GoogleBooksApiInfoCacheJsonModelType) => {

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
    public createGoogleBooksApiInfoCacheCreateModel(bookId: GoogleBooksApiIdModel, title: GoogleBooksApiTitleModel,
        publishedDate: GoogleBooksApiPublishedDateModel, description: GoogleBooksApiDescriptionModel): GoogleBooksApiInfoCacheCreateModel {

        return new GoogleBooksApiInfoCacheCreateModel(bookId, title, publishedDate, description);
    }


    /**
     * Google Books Api書籍キャッシュ情報に対する書き込み用データ(登録)の作成
     * @param bookInfoMasterCreateModel 
     */
    public createGoogleBooksApiInfoCacheCreateWriteData(
        googleBooksApiInfoCacheList: GoogleBooksApiInfoCacheJsonModelType[],
        googleBooksApiInfoCacheCreateModel: GoogleBooksApiInfoCacheCreateModel): GoogleBooksApiInfoCacheJsonModelType[] {

        // jsonファイル登録用の型に変換する
        const createGoogleBooksApiInfoCacheBody: GoogleBooksApiInfoCacheJsonModelType = {
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
    public overWriteGoogleBooksApiInfoCache(googleBooksApiInfoCacheList: GoogleBooksApiInfoCacheJsonModelType[]) {

        try {

            JsonFileData.overWrite(GOOGLE_BOOKS_API_INFO_CACHE_FILE_PATH, googleBooksApiInfoCacheList);
        } catch (err) {

            throw Error(`Google Books Api書籍キャッシュ情報ファイルのデータ書き込み中にエラーが発生しました。ERROR:${err}`);
        }
    }


    /**
     * Google Books Api書籍キャッシュ情報更新用データの作成
     * @param bookId 
     * @param title 
     * @param publishedDate 
     * @param description 
     * @returns 
     */
    public createGoogleBooksApiInfoCacheUpdateModel(bookId: GoogleBooksApiIdModel, title: GoogleBooksApiTitleModel,
        publishedDate: GoogleBooksApiPublishedDateModel, description: GoogleBooksApiDescriptionModel): GoogleBooksApiInfoCacheUpdateModel {

        return new GoogleBooksApiInfoCacheUpdateModel(bookId, title, publishedDate, description);
    }


    /**
     * Google Books Api書籍キャッシュ情報に対する書き込み用データ(更新)の作成
     * @param googleBooksApiInfoCacheList 
     * @param googleBooksApiInfoCacheCreateModel 
     * @returns 
     */
    public createGoogleBooksApiInfoCacheUpdateWriteData(
        updateGoogleBooksApiInfoCache: GoogleBooksApiInfoCacheJsonModelType,
        googleBooksApiInfoCacheCreateModel: GoogleBooksApiInfoCacheUpdateModel): GoogleBooksApiInfoCacheJsonModelType {

        updateGoogleBooksApiInfoCache.title = googleBooksApiInfoCacheCreateModel.title.title;
        updateGoogleBooksApiInfoCache.publishedDate = googleBooksApiInfoCacheCreateModel.publishedDate.publishedDate;
        updateGoogleBooksApiInfoCache.description = googleBooksApiInfoCacheCreateModel.description.description;
        updateGoogleBooksApiInfoCache.updateDate = googleBooksApiInfoCacheCreateModel.updateDate.updateDate;

        return updateGoogleBooksApiInfoCache;
    }
}