import { FLG } from "../../../util/const/CommonConst";
import { JsonFileData } from "../../../util/service/JsonFileData";
import { FRONT_USER_INFO_MASTER_FILE_PATH } from "../const/UserInfoMasterConst";
import { FrontUserInfoMasterJsonModelType } from "./FrontUserInfoMasterJsonModelType";
import { FrontUserInfoMasterModel } from "./FrontUserInfoMasterModel";


export class FrontUserInfoMasterListModel {

    private readonly _latestUserInfoMasterJsonList: ReadonlyArray<FrontUserInfoMasterJsonModelType>;


    constructor() {

        // ユーザーマスタファイルからデータを取得
        const jsonUserInfoMasterList: FrontUserInfoMasterJsonModelType[] = JsonFileData.getFileObj(FRONT_USER_INFO_MASTER_FILE_PATH);

        this._latestUserInfoMasterJsonList = jsonUserInfoMasterList;
    }


    /**
     * getter
     */
    public get latestUserInfoMasterJsonList() {
        return this._latestUserInfoMasterJsonList;
    }


    /**
     * 未削除のユーザーデータを取得
     * @returns 
     */
    public getActiveInfo(): FrontUserInfoMasterJsonModelType[] {

        // 未削除のユーザーを取得
        const activeUserInfoMasterList = this._latestUserInfoMasterJsonList.filter((e: FrontUserInfoMasterJsonModelType) => {

            return e.deleteFlg !== FLG.ON;
        });

        return activeUserInfoMasterList;
    }

}