export class GoogleBooksApiAuthorNoModel {

    private readonly _authorNo: number;

    constructor(authorNo: number) {

        this._authorNo = authorNo;
    }

    public get authorNo() {
        return this._authorNo;
    }
}