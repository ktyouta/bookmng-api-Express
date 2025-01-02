import { GoogleBooksAPIsModelItemsType } from "../../../externalapi/googlebookinfo/model/GoogleBooksAPIsModelItemsType";
import { GoogleBooksAPIsVolumeInfoModelType } from "../../../externalapi/googlebookinfo/model/GoogleBooksAPIsVolumeInfoModelType";
import { BookInfoMergedModelType } from "../../bookinfomerge/model/BookInfoMergedModelType";


export class GoogleBooksApiBookInfoMasterParseService {


    /**
     * 書籍マスタ情報をGoogle Books Apiの型に変換する
     * @param mergedBookInfoMasterList 
     * @returns 
     */
    public parseGoogleBooksApiBookInfoMaster(
        mergedBookInfoMasterList: BookInfoMergedModelType[]): GoogleBooksAPIsModelItemsType[] {

        const googleBooksAPIsModelItems: GoogleBooksAPIsModelItemsType[] =
            mergedBookInfoMasterList.map((e: BookInfoMergedModelType) => {

                const googleBooksAPIsVolumeInfo: GoogleBooksAPIsVolumeInfoModelType = {
                    title: e.title,
                    authors: e.authors,
                    publishedDate: e.publishedDate,
                    imageLinks: {},
                    description: e.description,
                }

                return {
                    id: e.bookId,
                    googleBooksAPIsVolumeInfoModel: googleBooksAPIsVolumeInfo
                }
            });

        return googleBooksAPIsModelItems;
    }
}