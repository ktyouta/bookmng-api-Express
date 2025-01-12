import { JsonFileOperation } from "../../../util/service/JsonFileOperation";
import { FRONT_USER_INFO_MASTER_FILE_PATH } from "../const/UserInfoMasterConst";
import { FrontUserInfoMasterJsonModelType } from "./FrontUserInfoMasterJsonModelType";

// ユーザーIDの接頭辞
const PRE_USER_ID = `userId-`;

export class FrontUserIdModel {

    private _userId: string;

    private constructor(userId: string) {

        if (!FrontUserIdModel.checkUserIdValidate(userId)) {
            throw Error(`ユーザーIDのフォーマットが不正です。userId:${userId}`);
        }

        this._userId = userId;
    }


    /**
     * userId作成
     * @returns 
     */
    public static createNewUserId() {

        // ユーザーID採番用にユーザー情報マスタからデータを取得する
        const jsonUserInfoMasterList: FrontUserInfoMasterJsonModelType[] = JsonFileOperation.getFileObj(FRONT_USER_INFO_MASTER_FILE_PATH);

        if (!jsonUserInfoMasterList) {
            throw Error("ユーザーIDの採番に必要なユーザー情報マスタが取得できませんでした。");
        }

        // ユーザーIDを採番する
        const latestUserId: string = FrontUserIdModel.createLatestUserId(jsonUserInfoMasterList);

        if (!latestUserId) {
            throw Error("ユーザーIDの採番に失敗しました。");
        }

        return new FrontUserIdModel(latestUserId);
    }


    /**
     * userIdをセット
     * @param userId 
     * @returns 
     */
    public static reConstruct(userId: string) {

        return new FrontUserIdModel(userId);
    }


    public get userId() {
        return this._userId;
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