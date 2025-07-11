import { JsonFileData } from "../../../util/service/JsonFileData";
import { FrontUserInfoMasterJsonModelType } from "../model/FrontUserInfoMasterJsonModelType";
import { FRONT_USER_INFO_MASTER_FILE_PATH } from "../repository/concrete/FrontUserInfoMasterRepositoryJson";

// ユーザーIDの接頭辞
const PRE_USER_ID = `userId-`;

export class FrontUserIdModel {

    private _frontUserId: string;

    private constructor(userId: string) {

        if (!FrontUserIdModel.checkUserIdValidate(userId)) {
            throw Error(`ユーザーIDのフォーマットが不正です。userId:${userId}`);
        }

        this._frontUserId = userId;
    }


    public static create() {

        // ユーザーID採番用にユーザー情報マスタからデータを取得する
        const jsonUserInfoMasterList: FrontUserInfoMasterJsonModelType[] = JsonFileData.getFileObj(FRONT_USER_INFO_MASTER_FILE_PATH);

        if (!jsonUserInfoMasterList) {
            throw Error("ユーザーIDの採番に必要なユーザー情報マスタが取得できませんでした。");
        }

        // ユーザーIDを採番する
        const latestUserId: string = FrontUserIdModel.createLatestUserId(jsonUserInfoMasterList);

        if (!latestUserId) {
            throw Error("ユーザーIDの採番に失敗しました。");
        }

        if (!FrontUserIdModel.checkUserIdValidate(latestUserId)) {
            throw Error(`ユーザーIDのフォーマットが不正です。userId:${latestUserId}`);
        }

        return new FrontUserIdModel(latestUserId);
    }


    public get frontUserId() {
        return this._frontUserId;
    }


    /**
     * userIdをセット
     * @param userId 
     * @returns 
     */
    public static reConstruct(userId: string) {
        return new FrontUserIdModel(userId);
    }


    /**
     * ユーザーIDを採番する
     * @param userInfoList 
     * @returns 
     */
    private static createLatestUserId(jsonUserInfoMasterList: FrontUserInfoMasterJsonModelType[]): string {

        //IDが最大のNOを取得
        const maxNo = jsonUserInfoMasterList.reduce<number>((prev: number, current: FrontUserInfoMasterJsonModelType) => {

            const currentNm = parseInt(current.userId.replace(`${PRE_USER_ID}`, ""));
            return Math.max(prev, currentNm);
        }, 0);

        return `${PRE_USER_ID}${maxNo + 1}`;
    }


    /**
     * userIdのバリデーションチェック
     * @param userId 
     * @returns 
     */
    private static checkUserIdValidate(userId: string) {
        return userId.includes(PRE_USER_ID);
    }

}