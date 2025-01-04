export class AuthorBirthDayModel {

    private readonly _authorBirthDay: string;


    constructor(authorBirthDay: string) {

        // 正規表現チェック
        if (!this.checkFormat(authorBirthDay)) {
            throw Error(`著者の生年月日のフォーマットが不正です。`);
        }

        // 日付の妥当性チェック
        if (!this.chechDateValid(authorBirthDay)) {
            throw Error(`著者の生年月日が正しくありません。`);
        }

        this._authorBirthDay = authorBirthDay;
    }


    /**
     * 著者の生年月日を取得する
     * @returns 
     */
    public get authorBirthDay() {
        return this._authorBirthDay;
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