import { DateUtil } from "../../../util/service/DateUtil";

export class CreateDateModel {

    private createDate: string;

    constructor(target: string) {

        // 現在日付を取得する
        const createDate = DateUtil.getNowDateYYYYMMDD();

        // 正規表現チェック
        if (!this.checkFormat(createDate)) {
            throw Error(`${target}データ作成日のフォーマットが不正です。`);
        }

        // 日付の妥当性チェック
        if (!this.chechDateValid(createDate)) {
            throw Error(`${target}データ作成日が正しくありません。`);
        }

        this.createDate = createDate;
    }


    /**
     * 作成日を取得する
     * @returns 
     */
    public getCreateDate() {
        return this.createDate;
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