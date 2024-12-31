export class GoogleBooksApiAuthorNoModel {

    private readonly _authorNo: string;

    constructor(authorNo: string) {

        if (isNaN(Number(authorNo))) {
            throw Error("Google Books Apiの著者Noが数値ではありません。");
        }

        this._authorNo = authorNo;
    }

    public get authorNo() {
        return this._authorNo;
    }
}