import { FLG } from "../../../util/const/CommonConst";
import { FRONT_USER_INFO_MASTER_FILE, MASTER_FILE_PATH } from "../../../util/const/FileInfoConst";
import { JsonFileData } from "../../../util/service/JsonFileData";
import { FrontUserInfoMasterJsonModelType } from "./FrontUserInfoMasterJsonModelType";
import { FrontUserInfoMasterModel } from "./FrontUserInfoMasterModel";

// ユーザーマスタファイルパス
export const FRONT_USER_INFO_MASTER_FILE_PATH = `${MASTER_FILE_PATH}${FRONT_USER_INFO_MASTER_FILE}`;


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

}