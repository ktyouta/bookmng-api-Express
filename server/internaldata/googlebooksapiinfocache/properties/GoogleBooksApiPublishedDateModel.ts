export class GoogleBooksApiPublishedDateModel {

    private readonly _publishedDate: string;

    constructor(publishedDate: string) {

        this._publishedDate = publishedDate;
    }

    public get publishedDate() {
        return this._publishedDate;
    }
}