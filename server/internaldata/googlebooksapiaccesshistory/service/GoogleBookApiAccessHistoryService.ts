import { JsonFileOperation } from "../../../util/service/JsonFileOperation";
import { GOOGLE_BOOKS_API_ACCESS_HISTORY_TRANSACTION_FILE_PATH } from "../const/GoogleBooksApiAccessHistoryConst";
import { AccessDateModel } from "../model/AccessDateModel";
import { GoogleBooksApiAccessHistoryCreateModel } from "../model/GoogleBooksApiAccessHistoryCreateModel";
import { GoogleBooksApiAccessHistoryModelType } from "../model/GoogleBooksApiAccessHistoryModelType";
import { KeywordModel } from "../model/KeywordModel";

export class GoogleBookApiAccessHistoryService {


    /**
     * Google Books Apiアクセス情報ファイルのデータを取得
     * @returns 
     */
    public GoogleBookApiAccessHistoryService() {

        // GoogleBookApiアクセス情報ファイルからデータを取得
        const googleBookApiAccessHistoryList: GoogleBooksApiAccessHistoryModelType[] = JsonFileOperation.getFileObj(GOOGLE_BOOKS_API_ACCESS_HISTORY_TRANSACTION_FILE_PATH);

        return googleBookApiAccessHistoryList;
    }


    /**
     * 日付とキーワードに一致するアクセス情報を取得する
     * @returns 
     */
    public getAccessHistoryByKeywordAndDate(googleBookApiAccessHistoryList: GoogleBooksApiAccessHistoryModelType[],
        keyword: string, accessDate: string,) {

        // 日付とキーワードでフィルターする
        const filterdAccessHistoryList: GoogleBooksApiAccessHistoryModelType[] = googleBookApiAccessHistoryList.filter((e: GoogleBooksApiAccessHistoryModelType) => {

            return e.keyword === keyword && e.accessDate === accessDate;
        });

        return filterdAccessHistoryList;
    }


    /**
     * Google Books Apiアクセス情報登録用データの作成
     * @param title 
     * @param publishedDate 
     * @param description 
     * @returns 
     */
    public createGoogleBookApiAccessHistoryCreateBody(keyword: KeywordModel, accessDate: AccessDateModel) {

        return new GoogleBooksApiAccessHistoryCreateModel(keyword, accessDate);
    }


    /**
     * Google Books Apiアクセス情報に対する書き込み用データの作成
     * @param bookInfoMasterCreateModel 
     */
    public createGoogleBookApiAccessHistoryWriteData(
        googleBookApiAccessHistoryList: GoogleBooksApiAccessHistoryModelType[],
        googleBooksApiAccessHistoryCreateModel: GoogleBooksApiAccessHistoryCreateModel): GoogleBooksApiAccessHistoryModelType[] {

        // jsonファイル登録用の型に変換する
        const creategoogleBooksApiAccessHistoryBody: GoogleBooksApiAccessHistoryModelType = {
            keyword: googleBooksApiAccessHistoryCreateModel.keyword.keyword,
            accessDate: googleBooksApiAccessHistoryCreateModel.accessDate.accessDate,
            createDate: googleBooksApiAccessHistoryCreateModel.createDate.createDate,
            updateDate: googleBooksApiAccessHistoryCreateModel.updateDate.updateDate,
        };

        // Google Books Apiアクセス情報を追加する
        googleBookApiAccessHistoryList = [...googleBookApiAccessHistoryList, creategoogleBooksApiAccessHistoryBody];

        return googleBookApiAccessHistoryList;
    }
}