export class DeleteFlgModel {

    private _deleteFlgModel: string;

    private FLG = {
        OFF: "0",
        ON: "1"
    }

    constructor(deleteFlg: string) {

        if (!this.checkFlgValid(deleteFlg)) {
            throw Error("削除フラグが不正です。");
        }

        this._deleteFlgModel = deleteFlg;
    }


    /**
     * 削除フラグの形式チェック
     * @param deleteFlg 
     * @returns 
     */
    private checkFlgValid(deleteFlg: string) {

        // 0または1のみ許容する
        return deleteFlg === this.FLG.OFF || deleteFlg === this.FLG.ON;
    }

    /**
     * 削除フラグを取得する
     */
    public get deleteFlg() {

        return this._deleteFlgModel;
    }


    /**
     * 削除フラグをオフにする
     */
    public switchOff() {
        this._deleteFlgModel = this.FLG.OFF;
    }


    /**
     * 削除フラグをオンにする
     */
    public switchOn() {
        this._deleteFlgModel = this.FLG.ON;
    }
}