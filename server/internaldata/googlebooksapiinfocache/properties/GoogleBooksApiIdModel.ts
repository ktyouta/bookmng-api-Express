export class GoogleBooksApiIdModel {

    private readonly _bookId: string;

    constructor(bookId: string) {

        if (!bookId) {
            throw Error(`Google Books ApiのIDが設定されていません。`);
        }

        this._bookId = bookId;
    }

    public get bookId() {
        return this._bookId;
    }
}