export class TitleModel {

    private _title: string;


    constructor(title: string) {

        this._title = title;
    }


    /**
     * 書籍タイトルを取得する
     * @returns 
     */
    public get title() {

        return this._title;
    }
}