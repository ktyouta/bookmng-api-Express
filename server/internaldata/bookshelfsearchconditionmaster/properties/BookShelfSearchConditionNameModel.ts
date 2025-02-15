export class BookShelfSearchConditionNameModel {

    private readonly _bookShelfSearchConditionName: string;

    constructor(bookShelfSearchConditionName: string) {

        this._bookShelfSearchConditionName = bookShelfSearchConditionName;
    }


    get bookShelfSearchConditionName() {
        return this._bookShelfSearchConditionName
    }

}