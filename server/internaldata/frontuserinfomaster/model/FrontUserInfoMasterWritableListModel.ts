import { CreateDateModel } from "./CreateDateModel";
import { DeleteFlgModel } from "./DeleteFlgModel";
import { UpdateDateModel } from "./FrontUpdateDateModel";
import { FrontUserBirthdayModel } from "./UserBirthdayModel";
import { FrontUserIdModel } from "./FrontUserIdModel";
import { FrontUserInfoMasterJsonModelType } from "./FrontUserInfoMasterJsonModelType";
import { FrontUserInfoMasterModel } from "./FrontUserInfoMasterModel";
import { FrontUserNameModel } from "./FrontUserNameModel";
import { FRONT_USER_INFO_MASTER_FILE_PATH, FrontUserInfoMasterListModel } from "./FrontUserInfoMasterListModel";
import { JsonFileData } from "../../../util/service/JsonFileData";


/**
 * 書き込み用のユーザーリスト管理クラス
 */
export class FrontUserInfoMasterWritableListModel {

    private readonly _userInfoMasterModelList: ReadonlyArray<FrontUserInfoMasterModel>;


    private constructor(FrontUserInfoMasterList: ReadonlyArray<FrontUserInfoMasterModel>) {

        this._userInfoMasterModelList = FrontUserInfoMasterList;
    }


    /**
     * getter
     */
    public get userInfoMasterModelList() {
        return this._userInfoMasterModelList;
    }


    /**
     * 書き込み用ユーザーリストの作成
     * @param latestFrontUserInfoMasterListModel 
     * @returns 
     */
    public static crerate() {

        // ユーザーマスタからデータを取得する
        const frontUserInfoMasterListModel = new FrontUserInfoMasterListModel();

        const frontUserInfoMasterModel: ReadonlyArray<FrontUserInfoMasterJsonModelType> =
            frontUserInfoMasterListModel.latestUserInfoMasterJsonList;

        // json形式からUserInfoMasterModelに変換する
        const parsedUserInfoMasterList: ReadonlyArray<FrontUserInfoMasterModel> =
            frontUserInfoMasterModel.map((e: FrontUserInfoMasterJsonModelType) => {

                return FrontUserInfoMasterWritableListModel.parseUserInfoMaster(e);
            });

        return new FrontUserInfoMasterWritableListModel(parsedUserInfoMasterList);
    }


    /**
     * json形式からUserInfoMasterModelに変換する
     * @param jsonUserInfoMaster 
     * @returns 
     */
    private static parseUserInfoMaster(jsonUserInfoMaster: FrontUserInfoMasterJsonModelType): FrontUserInfoMasterModel {

        const userIdModel = FrontUserIdModel.reConstruct(jsonUserInfoMaster.userId);
        const userNameModel = new FrontUserNameModel(jsonUserInfoMaster.userName);
        const userBirthdayModel = new FrontUserBirthdayModel(jsonUserInfoMaster.userBirthDay);
        const createDate = CreateDateModel.reConstruct(jsonUserInfoMaster.createDate, `ユーザーマスタ`);
        const updateDate = UpdateDateModel.reConstruct(jsonUserInfoMaster.updateDate, `ユーザーマスタ`);
        const deleteFlgModel = new DeleteFlgModel(jsonUserInfoMaster.deleteFlg);

        return new FrontUserInfoMasterModel(
            userIdModel,
            userNameModel,
            userBirthdayModel,
            createDate,
            updateDate,
            deleteFlgModel
        );
    }


    /**
     * ユーザーマスタに登録用の書籍情報を追加する
     * @param userInfoMasterList 
     * @param userInfoMasterCreateModel 
     * @returns 
     */
    public add(userInfoMasterCreateModel: FrontUserInfoMasterModel): FrontUserInfoMasterWritableListModel {

        // ユーザーを追加する
        const createUserInfoMasterList: FrontUserInfoMasterModel[] = [...this._userInfoMasterModelList, userInfoMasterCreateModel];

        return new FrontUserInfoMasterWritableListModel(createUserInfoMasterList);
    }


    /**
     * json形式に変換する
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
    public commit() {

        // jsonファイル登録用の型に変換する
        const jsonUserInfoMasterListModel = this._userInfoMasterModelList.map((e: FrontUserInfoMasterModel) => {
            return this.parseJsonUserInfoMaster(e);
        });

        try {
            JsonFileData.overWrite(FRONT_USER_INFO_MASTER_FILE_PATH, jsonUserInfoMasterListModel);
        } catch (err) {
            throw Error(`ユーザーマスタファイルのデータ書き込み処理中にエラーが発生しました。ERROR:${err}`);
        }
    }
}