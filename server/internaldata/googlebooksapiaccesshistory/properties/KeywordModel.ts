export class KeywordModel {

    private readonly _keyword: string;

    constructor(keyword: string) {

        if (!keyword) {
            throw Error("Google Books Apiのアクセス情報に必要なキーワードが存在しません。");
        }

        this._keyword = keyword;
    }

    public get keyword() {
        return this._keyword;
    }
}