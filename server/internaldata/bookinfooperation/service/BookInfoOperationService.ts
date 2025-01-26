import { BookInfoMergedModelType } from "../../bookinfomerge/model/BookInfoMergedModelType";
import { KeywordModel } from "../../googlebooksapiaccesshistory/properties/KeywordModel";


export class BookInfoOperationService {


    /**
     * マージした書籍マスタ情報をキーワードでフィルターする
     * @param mergedBookInfoList 
     * @param keywordModel 
     */
    public filterdMergedBookInfoMasterByKeyword(mergedBookInfoList: BookInfoMergedModelType[],
        keywordModel: KeywordModel) {

        const keyword = keywordModel.keyword;

        // タイトル、説明、著者に対してキーワードでフィルターする
        const filterdMergedBookInfoMasterList = mergedBookInfoList.filter((e: BookInfoMergedModelType) => {

            const titleRegex = new RegExp(e.title ?? ``, "i");
            const descriptionRegex = new RegExp(e.description ?? ``, "i");

            return titleRegex.test(keyword) || descriptionRegex.test(keyword) || e.authors.some((e1: string) => {

                const authorNameRegex = new RegExp(e1, "i");
                return authorNameRegex.test(keyword);
            });
        });

        return filterdMergedBookInfoMasterList;
    }
}