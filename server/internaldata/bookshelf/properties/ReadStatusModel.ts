export class ReadStatusModel {

    private readonly _readStatus: string;

    constructor(readStatus: string) {

        if (readStatus && Number.isNaN(readStatus)) {
            throw Error(`読書状況に不正値が入っています。readStatus:${readStatus}`);
        }

        this._readStatus = readStatus;
    }


    get readStatus() {
        return this._readStatus
    }

}