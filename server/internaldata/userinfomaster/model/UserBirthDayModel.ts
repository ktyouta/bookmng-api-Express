export class UserBirthDayModel {

    private _userBirthDay: string;

    constructor(userBirthDay: string) {

        // 正規表現チェック
        if (!this.checkFormat(userBirthDay)) {
            throw Error("ユーザーの誕生日のフォーマットが不正です。");
        }

        // 日付の妥当性チェック
        if (!this.chechDateValid(userBirthDay)) {
            throw Error("ユーザーの誕生日が正しくありません。");
        }

        this._userBirthDay = userBirthDay;
    }

    public get userBirthDay() {
        return this._userBirthDay;
    }


    /**
     * 引数の日付に対する正規表現チェック(yyyyMMDD)
     * @param publishedDate 
     * @returns 
     */
    private checkFormat(publishedDate: string) {

        // yyyyMMDD形式チェック
        const regex = /^[0-9]{4}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/;

        return regex.test(publishedDate);
    }


    /**
     * 引数の日付の妥当性チェック
     * @param publishedDate 
     */
    private chechDateValid(publishedDate: string) {

        const year = parseInt(publishedDate.substring(0, 4), 10);
        const month = parseInt(publishedDate.substring(4, 6)) - 1;
        const day = parseInt(publishedDate.substring(6, 8), 10);

        const date = new Date(year, month, day);

        return year === date.getFullYear() && month === date.getMonth() && day === date.getDate();
    }
}