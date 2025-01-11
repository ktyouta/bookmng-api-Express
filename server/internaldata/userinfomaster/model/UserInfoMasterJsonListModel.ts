import { JsonFileOperation } from "../../../util/service/JsonFileOperation";
import { USER_INFO_MASTER_FILE_PATH } from "../const/UserInfoMasterConst";
import { UserInfoMasterJsonModelType } from "./UserInfoMasterJsonModelType";
import { UserInfoMasterModel } from "./UserInfoMasterModel";
import { WritableUserInfoMasterListModel } from "./WritableUserInfoMasterListModel";

export class UserInfoMasterJsonListModel {

    private readonly _userInfoMasterJsonList: ReadonlyArray<UserInfoMasterJsonModelType>;


    constructor(userInfoMasterListModel: WritableUserInfoMasterListModel) {

        // jsonファイル登録用の型に変換する
        const jsonUserInfoMasterListModel = userInfoMasterListModel.userInfoMasterModelList.map((e: UserInfoMasterModel) => {
            return this.parseJsonUserInfoMaster(e);
        });

        this._userInfoMasterJsonList = jsonUserInfoMasterListModel;
    }


    /**
     * UserInfoMasterModelからjson形式に変換する
     * @param userInfoMaster 
     * @returns 
     */
    private parseJsonUserInfoMaster(userInfoMaster: UserInfoMasterModel): UserInfoMasterJsonModelType {

        // jsonファイル登録用の型に変換する
        const jsonUserInfoMaster: UserInfoMasterJsonModelType = {
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

            JsonFileOperation.overWriteJsonFileData(USER_INFO_MASTER_FILE_PATH, this._userInfoMasterJsonList);
        } catch (err) {

            throw Error(`ユーザーマスタファイルのデータ書き込み処理中にエラーが発生しました。ERROR:${err}`);
        }
    }

}