import { PRE_USER_ID } from "../const/UserInfoMasterConst";
import { UserInfoMasterSerivce } from "../service/UserInfoMasterSerivce";
import { UserInfoModelType } from "./UserInfoModelType";

export class UserIdModel {

    private _userId: string;
    private userInfoMasterSerivce = new UserInfoMasterSerivce();

    constructor() {

        // ユーザーID採番用にユーザー情報マスタからデータを取得する
        const userInfoMasterList = this.userInfoMasterSerivce.getUserInfoMaster();

        if (!userInfoMasterList) {
            throw Error("ユーザーIDの採番に必要なユーザー情報マスタが取得できませんでした。");
        }

        // ユーザーIDを採番する
        const latestUserId = this.createLatestUserId(userInfoMasterList);

        if (!latestUserId) {
            throw Error("ユーザーIDの採番に失敗しました。");
        }

        this._userId = "";
    }

    public get userId() {
        return this._userId;
    }


    /**
     * ユーザーIDを採番する
     * @param userInfoList 
     * @returns 
     */
    private createLatestUserId(userInfoList: UserInfoModelType[]): string {

        //IDが最大のNOを取得
        let maxNo = userInfoList.reduce<number>((prev: number, current: UserInfoModelType) => {

            let currentNm = parseInt(current.userId.replace(`${PRE_USER_ID}`, ""));
            return Math.max(prev, currentNm);
        }, 0);

        return `${PRE_USER_ID}${maxNo + 1}`;
    }
}