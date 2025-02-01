import { GoogleBooksAPIsModelItemsType } from "../../../externalapi/googlebookinfo/model/GoogleBooksAPIsModelItemsType";
import { GoogleBooksApiAuthorNameModel } from "../../googlebooksapiauthorscache/properties/GoogleBooksApiAuthorNameModel";
import { GoogleBooksApiAuthorNoModel } from "../../googlebooksapiauthorscache/properties/GoogleBooksApiAuthorNoModel";
import { GoogleBooksApiInfoAuthorCreateModel } from "../../googlebooksapiauthorscache/model/GoogleBooksApiInfoAuthorCreateModel";
import { GoogleBooksApiInfoAuthorUpdateModel } from "../../googlebooksapiauthorscache/model/GoogleBooksApiInfoAuthorUpdateModel";
import { GoogleBooksApiAuthorsCacheService } from "../../googlebooksapiauthorscache/service/GoogleBooksApiAuthorsCacheService";
import { GoogleBooksApiIdModel } from "../../googlebooksapiinfocache/properties/GoogleBooksApiIdModel";


export class GoogleBooksApiAuthorsCacheParseService {


    // Google Books Api著者情報キャッシュ
    private googleBooksApiAuthorsCacheService = new GoogleBooksApiAuthorsCacheService();


    /**
     * Google Books Apiの型(GoogleBooksAPIsModelItemsType)から書籍キャッシュの型(createGoogleBooksApiAuthorsCacheCreateBody)に変換する
     * @param googleBooksAPIsModelItems 
     * @returns 
     */
    public parseGoogleBooksApiAuthorsCacheCreate(googleBooksAPIsModelItems: GoogleBooksAPIsModelItemsType): GoogleBooksApiInfoAuthorCreateModel[] {

        // Google Books Apiの著者リスト
        const authrosList = googleBooksAPIsModelItems.volumeInfo.authors;
        const bookIdModel = new GoogleBooksApiIdModel(googleBooksAPIsModelItems.id);

        if (!authrosList) {
            return [];
        }

        // 登録用著者リストを作成
        const createAuthorsList: GoogleBooksApiInfoAuthorCreateModel[] = authrosList?.map((e: string, index) => {

            const authorNo = new GoogleBooksApiAuthorNoModel(index);
            const authorName = new GoogleBooksApiAuthorNameModel(e);

            return this.googleBooksApiAuthorsCacheService.createGoogleBooksApiAuthorsCacheCreateBody(bookIdModel,
                authorNo, authorName
            );
        });

        return createAuthorsList;
    }


    /**
     * Google Books Apiの型(GoogleBooksAPIsModelItemsType)から書籍キャッシュの型(createGoogleBooksApiAuthorsCacheUpdateBody)に変換する
     * @param googleBooksAPIsModelItems 
     * @returns 
     */
    public parseGoogleBooksApiAuthorsCacheUpdate(googleBooksAPIsModelItems: GoogleBooksAPIsModelItemsType): GoogleBooksApiInfoAuthorUpdateModel[] {

        // Google Books Apiの著者リスト
        const authrosList = googleBooksAPIsModelItems.volumeInfo.authors;
        const bookIdModel = new GoogleBooksApiIdModel(googleBooksAPIsModelItems.id);

        if (!authrosList) {
            return [];
        }

        // 更新用著者リストを作成
        const createAuthorsList: GoogleBooksApiInfoAuthorUpdateModel[] = authrosList?.map((e: string, index) => {

            const authorNo = new GoogleBooksApiAuthorNoModel(index);
            const authorName = new GoogleBooksApiAuthorNameModel(e);

            return this.googleBooksApiAuthorsCacheService.createGoogleBooksApiAuthorsCacheUpdateBody(bookIdModel,
                authorNo, authorName
            );
        });

        return createAuthorsList;
    }

}