import { AuthorsMasterService } from "../service/AuthorsMasterService";
import { AuthorsMasterModeType } from "./AuthorsMasterModeType";
import { PRE_AUTHOR_ID } from "../const/AuthorsMasterConst";


export class AuthorIdMode {

    private readonly _authorId: string;
    private authorsMasterService = new AuthorsMasterService();


    constructor() {

        // 著者ID採番用に著者情報マスタからデータを取得する
        const authorsMasterModel: AuthorsMasterModeType[] = this.authorsMasterService.getAuthorsMaster();

        if (!authorsMasterModel) {
            throw Error("著者IDの採番に必要な著者情報マスタが取得できませんでした。");
        }

        // 著者IDを採番する
        const latestAuthorsId = this.createLatestAuthorsId(authorsMasterModel);

        if (!latestAuthorsId) {
            throw Error("著者IDの採番に失敗しました。");
        }

        this._authorId = latestAuthorsId;
    }


    /**
     * 著者IDを取得する
     * @returns 
     */
    public getAuthorId() {
        return this._authorId;
    }


    /**
     * 著者IDを採番する
     */
    private createLatestAuthorsId(authorsMasterModel: AuthorsMasterModeType[]): string {

        //IDが最大のNOを取得
        let maxNo = authorsMasterModel.reduce<number>((prev: number, current: AuthorsMasterModeType) => {

            let currentNm = parseInt(current.authorId.replace(`${PRE_AUTHOR_ID}`, ""));
            return Math.max(prev, currentNm);
        }, 0);

        return `${PRE_AUTHOR_ID}${maxNo + 1}`;
    }
}