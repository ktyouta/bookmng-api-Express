export class GoogleBooksApiDescriptionModel {

    private readonly _description: string;

    constructor(description: string) {

        this._description = description;
    }

    public get description() {
        return this._description;
    }
}