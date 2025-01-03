export class UserNameModel {

    private _userName: string;

    constructor(userName: string) {

        this._userName = userName;
    }

    public get userName() {
        return this._userName;
    }
}