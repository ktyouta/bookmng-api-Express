export class ThumbnailModel {

    private readonly _thumbnail: string;

    constructor(thumbnail: string,) {
        this._thumbnail = thumbnail;
    }

    public get thumbnail() {
        return this._thumbnail;
    }
}