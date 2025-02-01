import { GoogleBooksAPIsModelItemsType } from "../../../externalapi/googlebookinfo/model/GoogleBooksAPIsModelItemsType";
import { GoogleBooksAPIsVolumeInfoModelType } from "../../../externalapi/googlebookinfo/model/GoogleBooksAPIsVolumeInfoModelType";
import { GoogleBooksApiCacheModelType } from "../../googlebooksapicacheoperation/model/GoogleBooksApiCacheModelType";


export class GoogleBooksApiMergedCacheService {


    /**
     * マージされたキャッシュ情報をGoogle Books Api用の型(GoogleBooksAPIsModelItemsType)に変換する
     * @param googleBooksApiCacheMergedList 
     * @returns 
     */
    public parseGoogleBooksAPIsModelItems(googleBooksApiCacheMergedList: ReadonlyArray<GoogleBooksApiCacheModelType>): GoogleBooksAPIsModelItemsType[] {

        const googleBooksAPIsModelItemsTypeList: GoogleBooksAPIsModelItemsType[] = googleBooksApiCacheMergedList.map((e: GoogleBooksApiCacheModelType) => {

            const googleBooksAPIsVolumeInfoModelType: GoogleBooksAPIsVolumeInfoModelType = {
                title: e.title,
                authors: e.authors,
                publishedDate: e.publishedDate,
                imageLinks: {
                    smallThumbnail: e.imageLinks?.smallThumbnail,
                    thumbnail: e.imageLinks?.thumbnail,
                },
                description: e.description,
            };

            return {
                id: e.bookId,
                volumeInfo: googleBooksAPIsVolumeInfoModelType
            }
        });

        return googleBooksAPIsModelItemsTypeList;
    }

}