import { JsonFileData } from "../../../util/service/JsonFileData";
import { FRONT_USER_INFO_MASTER_FILE_PATH } from "../const/UserInfoMasterConst";
import { FrontUserInfoMasterJsonModelType } from "./FrontUserInfoMasterJsonModelType";
import { FrontUserInfoMasterModel } from "./FrontUserInfoMasterModel";
import { WritableFrontUserInfoMasterListModel } from "./WritableFrontUserInfoMasterListModel";

export class FrontUserInfoMasterJsonListModel {

    private readonly _userInfoMasterJsonList: ReadonlyArray<FrontUserInfoMasterJsonModelType>;


    constructor(userInfoMasterListModel: WritableFrontUserInfoMasterListModel) {

        // jsonファイル登録用の型に変換する
        const jsonUserInfoMasterListModel = userInfoMasterListModel.userInfoMasterModelList.map((e: FrontUserInfoMasterModel) => {
            return this.parseJsonUserInfoMaster(e);
        });

        this._userInfoMasterJsonList = jsonUserInfoMasterListModel;
    }


    /**
     * UserInfoMasterModelからjson形式に変換する
     * @param userInfoMaster 
     * @returns 
     */
    private parseJsonUserInfoMaster(userInfoMaster: FrontUserInfoMasterModel): FrontUserInfoMasterJsonModelType {

        // jsonファイル登録用の型に変換する
        const jsonUserInfoMaster: FrontUserInfoMasterJsonModelType = {
            userId: userInfoMaster.userId,
            userName: userInfoMaster.userName,
            userBirthDay: userInfoMaster.userBirthDay,
            createDate: userInfoMaster.createDate,
            updateDate: userInfoMaster.updateDate,
            deleteFlg: userInfoMaster.deleteFlg,
        };

        return jsonUserInfoMaster;
    }


    /**
     * ユーザーマスタファイルにデータを書き込む
     */
    public overWriteUserInfoMaster() {

        try {

            JsonFileData.overWrite(FRONT_USER_INFO_MASTER_FILE_PATH, this._userInfoMasterJsonList);
        } catch (err) {

            throw Error(`ユーザーマスタファイルのデータ書き込み処理中にエラーが発生しました。ERROR:${err}`);
        }
    }

}