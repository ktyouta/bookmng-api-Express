import { UserInfoMasterJsonModelType } from "./UserInfoMasterJsonModelType";
import { UserInfoMasterListModel } from "./UserInfoMasterListModel";
import { UserInfoMasterModel } from "./UserInfoMasterModel";

// ユーザーIDの接頭辞
const PRE_USER_ID = `userId-`;

export class UserIdModel {

    private _userId: string;

    private constructor(userId: string) {

        if (!UserIdModel.checkUserIdValidate(userId)) {
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
        const userInfoMasterListModel = UserInfoMasterListModel.getUserInfoMasterList();

        if (!userInfoMasterListModel) {
            throw Error("ユーザーIDの採番に必要なユーザー情報マスタが取得できませんでした。");
        }

        // ユーザーIDを採番する
        const latestUserId: string = UserIdModel.createLatestUserId(userInfoMasterListModel);

        if (!latestUserId) {
            throw Error("ユーザーIDの採番に失敗しました。");
        }

        return new UserIdModel(latestUserId);
    }


    /**
     * userIdをセット
     * @param userId 
     * @returns 
     */
    public static reConstruct(userId: string) {

        return new UserIdModel(userId);
    }


    public get userId() {
        return this._userId;
    }


    /**
     * ユーザーIDを採番する
     * @param userInfoList 
     * @returns 
     */
    private static createLatestUserId(userInfoMasterListModel: UserInfoMasterListModel): string {

        const userInfoMasterList = userInfoMasterListModel.userInfoMasterModelList;

        //IDが最大のNOを取得
        const maxNo = userInfoMasterList.reduce<number>((prev: number, current: UserInfoMasterModel) => {

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