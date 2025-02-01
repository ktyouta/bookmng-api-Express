export class GoogleBooksApiIdModel {

    private readonly _bookId: string;

    constructor(bookId: string) {

        this._bookId = bookId;
    }

    public get bookId() {
        return this._bookId;
    }
}