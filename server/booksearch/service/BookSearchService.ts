import { GoogleBookInfoApis } from "../../api/googlebookinfo/service/GoogleBookInfoApis";

export class BookSearchService {

    private googleBookInfoApis: GoogleBookInfoApis = new GoogleBookInfoApis();


    /**
     * 書籍情報を取得する
     * @param keyword 
     */
    public getBookInfoList(keyword: string) {

        try {
            let googleBookInfoList = this.googleBookInfoApis.getGoogleBookInfo(keyword);

            return googleBookInfoList;

        } catch (err) {

        }
    }
}