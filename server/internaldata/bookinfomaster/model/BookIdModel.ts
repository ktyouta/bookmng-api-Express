export class BookIdModel {

    private bookId: string;


    constructor(bookId: string) {

        this.bookId = bookId;
    }


    /**
     * 書籍IDを取得する
     * @returns 
     */
    public getBookId() {

        return this.bookId;
    }
}