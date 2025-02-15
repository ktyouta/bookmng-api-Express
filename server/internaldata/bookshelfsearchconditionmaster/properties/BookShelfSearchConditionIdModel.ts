export class BookShelfSearchConditionIdModel {

    private readonly _bookShelfSearchConditionId: string;

    constructor(bookShelfSearchConditionId: string) {

        this._bookShelfSearchConditionId = bookShelfSearchConditionId;
    }


    get bookShelfSearchConditionId() {
        return this._bookShelfSearchConditionId
    }

}