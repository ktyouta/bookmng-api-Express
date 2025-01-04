import { AuthorsMasterModel } from "../../authorsinfomaster/model/AuthorsMasterModel";
import { BookAuthorsMasterModel } from "../../bookauthorsmaster/model/BookAuthorsMasterModel";
import { BookInfoMasterModel } from "../../bookinfomaster/model/BookInfoMasterModel";
import { BookInfoMergedModelType } from "../model/BookInfoMergedModelType";


export class BookInfoMergeService {


    /**
     * 書籍情報をマージする
     * @param bookInfoMasterList 
     * @param activeBookAuthorsMasterList 
     * @param activeAuthorsMasterList 
     */
    public megrgeBookInfoMaster(bookInfoMasterList: BookInfoMasterModel[],
        activeBookAuthorsMasterList: BookAuthorsMasterModel[],
        activeAuthorsMasterList: AuthorsMasterModel[]): BookInfoMergedModelType[] {

        const mergedBookInfoList: BookInfoMergedModelType[] = bookInfoMasterList.map((e: BookInfoMasterModel) => {

            // 書籍IDに一致する著者IDリストを取得する
            const authorsIdList: string[] =
                activeBookAuthorsMasterList.filter((e1: BookAuthorsMasterModel) => {
                    return e1.bookId === e.bookId;
                }).map((e1: BookAuthorsMasterModel) => {
                    return e1.authorId;
                });

            // 著者マスタから著者を取得
            const authorsNameList: string[] = activeAuthorsMasterList.filter((e1: AuthorsMasterModel) => {
                return authorsIdList.includes(e1.authorId);
            }).map((e1: AuthorsMasterModel) => {
                return e1.authorName;
            });

            return {
                bookId: e.bookId,
                title: e.title,
                publishedDate: e.publishedDate,
                description: e.description,
                authors: authorsNameList,
            }
        });

        return mergedBookInfoList;
    }
}