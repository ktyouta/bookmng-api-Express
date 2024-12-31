export class SmallThumbnailModel {

    private readonly _smallThumbnail: string;

    constructor(smallThumbnail: string,) {
        this._smallThumbnail = smallThumbnail;
    }

    public get thumbnail() {
        return this._smallThumbnail;
    }
}