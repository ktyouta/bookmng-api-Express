export class GoogleBooksApiTitleModel {

    private readonly _title: string;

    constructor(title: string) {

        this._title = title;
    }

    public get title() {
        return this._title;
    }
}