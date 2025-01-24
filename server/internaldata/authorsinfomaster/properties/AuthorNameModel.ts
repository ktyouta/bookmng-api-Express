import { AuthorsMasterService } from "../service/AuthorsMasterService";


export class AuthorNameModel {

    private readonly _authorName: string;


    constructor(authorName: string) {

        if (!authorName) {
            throw Error(`著者名が空です。`);
        }

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