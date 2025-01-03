export class UserNameModel {

    private _userName: string;

    constructor(userName: string) {

        this._userName = userName;
    }

    public get userName() {
        return this._userName;
    }

    /**
     * ユーザー名の同一チェック
     * @param userNameModel 
     * @returns 
     */
    public checkUsernameDuplicate(userNameModel: UserNameModel) {

        return this._userName === userNameModel._userName;
    }
}