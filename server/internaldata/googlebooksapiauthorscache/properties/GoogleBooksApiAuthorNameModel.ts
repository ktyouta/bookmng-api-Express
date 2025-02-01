export class GoogleBooksApiAuthorNameModel {

    private readonly _authorName: string;

    constructor(authorName: string) {

        this._authorName = authorName;
    }

    public get authorName() {
        return this._authorName;
    }
}