export class TitleModel {

    private title: string;


    constructor(title: string) {

        this.title = title;
    }


    /**
     * 書籍タイトルを取得する
     * @returns 
     */
    public getTitle() {

        return this.title;
    }
}