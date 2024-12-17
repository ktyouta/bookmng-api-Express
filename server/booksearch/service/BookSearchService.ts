import { GoogleBookInfoApis } from "../../api/googlebookinfo/service/GoogleBookInfoApis";

export class BookSearchService {

    private googleBookInfoApis: GoogleBookInfoApis = new GoogleBookInfoApis();


    /**
     * Google Books Apiを呼び出す
     * @param keyword 
     */
    public async callGoogleBookApi(keyword: string) {

        try {
            // Google Books Apiを呼び出す
            let googleBookInfoList = await this.googleBookInfoApis.getGoogleBookInfo(keyword);

            return googleBookInfoList;

        } catch (err) {
            throw Error(`err:${err}`);
        }
    }
}