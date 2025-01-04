export class TitleModel {

    private _title: string;


    constructor(title: string) {

        if (!title) {
            throw Error(`書籍タイトルが空です。`);
        }

        this._title = title;
    }


    /**
     * 書籍タイトルを取得する
     * @returns 
     */
    public get title() {

        return this._title;
    }

    /**
     * 書籍タイトルの同一チェック
     * @param bookTitleModel 
     * @returns 
     */
    public checkTitleDuplicate(bookTitleModel: TitleModel) {

        return this._title === bookTitleModel.title;
    }
}