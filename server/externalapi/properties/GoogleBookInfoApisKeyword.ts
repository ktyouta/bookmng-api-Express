export class GoogleBookInfoApisKeyword {

    private readonly _keyword: string;

    constructor(keyword: string) {

        if (!keyword) {
            throw Error(`Google Books Apiの呼び出しにはキーワードが必須です。`);
        }

        this._keyword = keyword;
    }

    get keywrod() {
        return this._keyword;
    }
}