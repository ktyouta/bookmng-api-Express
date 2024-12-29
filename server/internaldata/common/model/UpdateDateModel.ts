import { DateUtil } from "../../../util/service/DateUtil";

export class UpdateDateModel {

    private readonly _updateDate: string;

    constructor(target: string) {

        // 現在日付を取得する
        const updateDate = DateUtil.getNowDateYYYYMMDD();

        // 正規表現チェック
        if (!this.checkFormat(updateDate)) {
            throw Error(`${target}データ更新日のフォーマットが不正です。`);
        }

        // 日付の妥当性チェック
        if (!this.chechDateValid(updateDate)) {
            throw Error(`${target}データ更新日が正しくありません。`);
        }

        this._updateDate = updateDate;
    }


    /**
     * 更新日を取得する
     * @returns 
     */
    public get updateDate() {
        return this._updateDate;
    }


    /**
     * 引数の日付に対する正規表現チェック(yyyyMMDD)
     * @param updateDate 
     * @returns 
     */
    private checkFormat(updateDate: string) {

        // yyyyMMDD形式チェック
        const regex = /^[0-9]{4}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/;

        return regex.test(updateDate);
    }


    /**
     * 引数の日付の妥当性チェック
     * @param updateDate 
     */
    private chechDateValid(updateDate: string) {

        const year = parseInt(updateDate.substring(0, 4), 10);
        const month = parseInt(updateDate.substring(4, 6)) - 1;
        const day = parseInt(updateDate.substring(6, 8), 10);

        const date = new Date(year, month, day);

        return year === date.getFullYear() && month === date.getMonth() && day === date.getDate();
    }
}