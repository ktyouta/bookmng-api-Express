import { BookInfoMergedModelType } from "../../bookinfomerge/model/BookInfoMergedModelType";
import { KeywordModel } from "../../googlebooksapiaccesshistory/model/KeywordModel";


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

            return e.title.includes(keyword) || e.description.includes(keyword) || e.authors.some((e1: string) => {
                return e1.includes(keyword);
            });
        });

        return filterdMergedBookInfoMasterList;
    }
}