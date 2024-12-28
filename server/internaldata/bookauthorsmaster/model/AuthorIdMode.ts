import { PRE_AUTHORS_ID } from "../const/BookAuthrosMasterConst";
import { BookAuthorsMasterService } from "../service/BookAuthorsMasterService";
import { BookAuthorsModelType } from "./BookAuthorsMasterModelType";

export class AuthorIdMode {

    private authorId: string;
    private authorAuthorsMasterService = new BookAuthorsMasterService();


    constructor() {

        // 著者ID採番用に著者著者情報マスタからデータを取得する
        const authorInfoMasterList: BookAuthorsModelType[] = this.authorAuthorsMasterService.getBookAuthorsMaster();

        if (!authorInfoMasterList) {
            throw Error("著者IDの採番に必要な著者著者情報マスタが取得できませんでした。");
        }

        // 著者IDを採番する
        const latestAuthorsId = this.createLatestBookId(authorInfoMasterList);

        if (!latestAuthorsId) {
            throw Error("著者IDの採番に失敗しました。");
        }

        this.authorId = latestAuthorsId;
    }


    /**
     * 著者IDを取得する
     * @returns 
     */
    public getBookId() {

        return this.authorId;
    }


    /**
     * 著者IDを採番する
     */
    private createLatestBookId(authorInfoList: BookAuthorsModelType[]): string {

        //IDが最大のNOを取得
        let maxNo = authorInfoList.reduce<number>((prev: number, current: BookAuthorsModelType) => {

            let currentNm = parseInt(current.authorId.replace(`${PRE_AUTHORS_ID}`, ""));
            return Math.max(prev, currentNm);
        }, 0);

        return `${PRE_AUTHORS_ID}${maxNo + 1}`;
    }
}