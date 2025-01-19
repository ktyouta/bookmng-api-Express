import { JsonFileData } from "../../../../util/service/JsonFileData";
import { CreateDateModel } from "../../../common/model/CreateDateModel";
import { DeleteFlgModel } from "../../../common/model/DeleteFlgModel";
import { UpdateDateModel } from "../../../common/model/UpdateDateModel";
import { FrontUserInfoMasterInsertEntity } from "../../entity/FrontUserInfoMasterInsertEntity";
import { FrontUserInfoMasterJsonModelType } from "../../model/FrontUserInfoMasterJsonModelType";
import { FRONT_USER_INFO_MASTER_FILE_PATH, FrontUserInfoMasterListModel } from "../../model/FrontUserInfoMasterListModel";
import { FrontUserInfoMasterModel } from "../../model/FrontUserInfoMasterModel";
import { FrontUserBirthdayModel } from "../../properties/FrontUserBirthdayModel";
import { FrontUserIdModel } from "../../properties/FrontUserIdModel";
import { FrontUserNameModel } from "../../properties/FrontUserNameModel";
import { FrontUserInfoMasterRepositoryInterface } from "../interface/FrontUserInfoMasterRepositoryInterface";


/**
 * json形式の永続ロジック用クラス
 */
export class FrontUserInfoMasterRepositoryJson implements FrontUserInfoMasterRepositoryInterface {

    private _userInfoMasterModelList: ReadonlyArray<FrontUserInfoMasterModel>;


    constructor() {

        // ユーザーマスタからデータを取得する
        const frontUserInfoMasterListModel = new FrontUserInfoMasterListModel();

        const frontUserInfoMasterModel: ReadonlyArray<FrontUserInfoMasterJsonModelType> =
            frontUserInfoMasterListModel.latestUserInfoMasterJsonList;

        // json形式からUserInfoMasterModelに変換する
        const parsedUserInfoMasterList: ReadonlyArray<FrontUserInfoMasterModel> =
            frontUserInfoMasterModel.map((e: FrontUserInfoMasterJsonModelType) => {

                return this.parseToUserInfo(e);
            });

        this._userInfoMasterModelList = parsedUserInfoMasterList;
    }


    /**
     * ユーザー追加
     * @param frontUserInfoMasterModel 
     * @returns 
     */
    public insert(frontUserInfoMasterModel: FrontUserInfoMasterModel) {

        // IDの重複チェック
        const duplicateUser = this._userInfoMasterModelList.find((e: FrontUserInfoMasterModel) => {
            return e.frontUserId === frontUserInfoMasterModel.frontUserId;
        });

        if (duplicateUser) {
            throw Error(`ユーザー情報が重複してるため登録できません。`);
        }

        // ユーザーを追加する
        this._userInfoMasterModelList = [...this._userInfoMasterModelList, frontUserInfoMasterModel];
    }


    /**
     * ユーザー更新
     */
    public update(frontUserInfoMasterModel: FrontUserInfoMasterModel) {

        // ユーザーの存在チェック
        const updateUser = this._userInfoMasterModelList.find((e: FrontUserInfoMasterModel) => {
            return e.frontUserId === frontUserInfoMasterModel.frontUserId;
        });

        if (!updateUser) {
            throw Error(`更新対象のユーザーが存在しません。`);
        }
    }


    /**
     * ユーザーマスタファイルにデータを書き込む
     */
    public commit() {

        // jsonファイル登録用の型に変換する
        const jsonUserInfoMasterListModel = this._userInfoMasterModelList.map((e: FrontUserInfoMasterModel) => {
            return this.parseToJson(e);
        });

        try {
            JsonFileData.overWrite(FRONT_USER_INFO_MASTER_FILE_PATH, jsonUserInfoMasterListModel);
        } catch (err) {
            throw Error(`ユーザーマスタファイルのデータ書き込み処理中にエラーが発生しました。ERROR:${err}`);
        }
    }

    /**
     * json形式に変換する
     * @param userInfoMaster 
     * @returns 
     */
    private parseToJson(userInfoMaster: FrontUserInfoMasterModel): FrontUserInfoMasterJsonModelType {

        // jsonファイル登録用の型に変換する
        const jsonUserInfoMaster: FrontUserInfoMasterJsonModelType = {
            userId: userInfoMaster.frontUserId,
            userName: userInfoMaster.frontUserName,
            userBirthDay: userInfoMaster.frontUserBirthDay,
            createDate: userInfoMaster.createDate,
            updateDate: userInfoMaster.updateDate,
            deleteFlg: userInfoMaster.deleteFlg,
        };

        return jsonUserInfoMaster;
    }


    /**
     * json形式からUserInfoMasterModelに変換する
     * @param jsonUserInfoMaster 
     * @returns 
     */
    private parseToUserInfo(jsonUserInfoMaster: FrontUserInfoMasterJsonModelType): FrontUserInfoMasterModel {

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

}