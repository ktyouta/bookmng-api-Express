import { AuthorsMasterService } from "../service/AuthorsMasterService";
import { AuthorsMasterModeType } from "./AuthorsMasterModeType";
import { PRE_AUTHOR_ID } from "../const/AuthorsMasterConst";


export class AuthorNameModel {

    private readonly _authorName: string;


    constructor(authorName: string) {

        this._authorName = authorName;
    }


    /**
     * 著者名を取得する
     * @returns 
     */
    public get authorName() {
        return this._authorName;
    }

}