import { AuthorsMasterModeType } from "../../authorsinfomaster/model/AuthorsMasterModeType";
import { BookAuthorsModelType } from "../../bookauthorsmaster/model/BookAuthorsMasterModelType";
import { BookInfoModelType } from "../../bookinfomaster/model/BookInfoMasterModelType";
import { BookInfoMergedModelType } from "../model/BookInfoMergedModelType";


export class BookInfoMergeService {


    /**
     * 書籍情報をマージする
     * @param bookInfoMasterList 
     * @param activeBookAuthorsMasterList 
     * @param activeAuthorsMasterList 
     */
    public megrgeBookInfoMaster(bookInfoMasterList: BookInfoModelType[],
        activeBookAuthorsMasterList: BookAuthorsModelType[],
        activeAuthorsMasterList: AuthorsMasterModeType[]): BookInfoMergedModelType[] {

        const mergedBookInfoList: BookInfoMergedModelType[] = bookInfoMasterList.map((e: BookInfoModelType) => {

            // 書籍IDに一致する著者IDリストを取得する
            const authorsIdList: string[] =
                activeBookAuthorsMasterList.filter((e1: BookAuthorsModelType) => {
                    return e1.bookId === e.bookId;
                }).map((e1: BookAuthorsModelType) => {
                    return e1.authorId;
                });

            // 著者マスタから著者を取得
            const authorsNameList: string[] = activeAuthorsMasterList.filter((e1: AuthorsMasterModeType) => {
                return authorsIdList.includes(e1.authorId);
            }).map((e1: AuthorsMasterModeType) => {
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