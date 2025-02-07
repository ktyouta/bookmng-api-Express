

export class FrontUserPasswordModel {

    private _frontUserPassword: string;

    constructor(userPassword: string) {

        if (!userPassword) {
            throw Error(`ユーザーのパスワードが設定されていません。`);
        }

        this._frontUserPassword = userPassword;
    }

    public get frontUserPassword() {
        return this._frontUserPassword;
    }

}