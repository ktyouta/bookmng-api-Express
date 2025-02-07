import { JsonFileData } from "../../../util/service/JsonFileData";
import { FrontUserInfoMasterJsonModelType } from "../model/FrontUserInfoMasterJsonModelType";
import { FRONT_USER_INFO_MASTER_FILE_PATH } from "../repository/concrete/FrontUserInfoMasterRepositoryJson";

// ユーザーIDの接頭辞
const PRE_USER_ID = `userId-`;

export class FrontUserIdModel {

    private _frontUserId: string;

    constructor() {

        // ユーザーID採番用にユーザー情報マスタからデータを取得する
        const jsonUserInfoMasterList: FrontUserInfoMasterJsonModelType[] = JsonFileData.getFileObj(FRONT_USER_INFO_MASTER_FILE_PATH);

        if (!jsonUserInfoMasterList) {
            throw Error("ユーザーIDの採番に必要なユーザー情報マスタが取得できませんでした。");
        }

        // ユーザーIDを採番する
        const latestUserId: string = this.createLatestUserId(jsonUserInfoMasterList);

        if (!latestUserId) {
            throw Error("ユーザーIDの採番に失敗しました。");
        }

        if (!latestUserId.includes(PRE_USER_ID)) {
            throw Error(`ユーザーIDのフォーマットが不正です。userId:${latestUserId}`);
        }

        this._frontUserId = latestUserId;
    }


    public get frontUserId() {
        return this._frontUserId;
    }


    /**
     * ユーザーIDを採番する
     * @param userInfoList 
     * @returns 
     */
    private createLatestUserId(jsonUserInfoMasterList: FrontUserInfoMasterJsonModelType[]): string {

        //IDが最大のNOを取得
        const maxNo = jsonUserInfoMasterList.reduce<number>((prev: number, current: FrontUserInfoMasterJsonModelType) => {

            const currentNm = parseInt(current.userId.replace(`${PRE_USER_ID}`, ""));
            return Math.max(prev, currentNm);
        }, 0);

        return `${PRE_USER_ID}${maxNo + 1}`;
    }

}