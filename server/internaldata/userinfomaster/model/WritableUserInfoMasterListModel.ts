import { FLG } from "../../../util/const/CommonConst";
import { JsonFileOperation } from "../../../util/service/JsonFileOperation";
import { USER_INFO_MASTER_FILE_PATH } from "../const/UserInfoMasterConst";
import { CreateDateModel } from "./CreateDateModel";
import { DeleteFlgModel } from "./DeleteFlgModel";
import { UpdateDateModel } from "./UpdateDateModel";
import { UserBirthdayModel } from "./UserBirthDayModel";
import { UserIdModel } from "./UserIdModel";
import { UserInfoMasterCreateModel } from "./UserInfoMasterCreateModel";
import { UserInfoMasterJsonListModel } from "./UserInfoMasterJsonListModel";
import { UserInfoMasterJsonModelType } from "./UserInfoMasterJsonModelType";
import { UserInfoMasterModel } from "./UserInfoMasterModel";
import { UserNameModel } from "./UserNameModel";


export class WritableUserInfoMasterListModel {

    private readonly _userInfoMasterModelList: ReadonlyArray<UserInfoMasterModel>;

    private constructor(UserInfoMasterModelList: UserInfoMasterModel[]) {

        this._userInfoMasterModelList = UserInfoMasterModelList;
    }


    /**
     * getter
     */
    public get userInfoMasterModelList() {
        return this._userInfoMasterModelList;
    }


    /**
     * ユーザーマスターファイルからデータを取得する
     * @returns 
     */
    public static getUserInfoMasterList() {

        // ユーザーマスタファイルからデータを取得
        const jsonUserInfoMasterList: UserInfoMasterJsonModelType[] = JsonFileOperation.getFileObj(USER_INFO_MASTER_FILE_PATH);

        // json形式からUserInfoMasterModelに変換する
        const parsedUserInfoMasterList = jsonUserInfoMasterList.map((e: UserInfoMasterJsonModelType) => {
            return this.parseUserInfoMaster(e);
        });

        return new WritableUserInfoMasterListModel(parsedUserInfoMasterList);
    }


    /**
     * json形式からUserInfoMasterModelに変換する
     * @param jsonUserInfoMaster 
     * @returns 
     */
    private static parseUserInfoMaster(jsonUserInfoMaster: UserInfoMasterJsonModelType): UserInfoMasterModel {

        const userIdModel = UserIdModel.reConstruct(jsonUserInfoMaster.userId);
        const userNameModel = new UserNameModel(jsonUserInfoMaster.userName);
        const userBirthdayModel = new UserBirthdayModel(jsonUserInfoMaster.userBirthDay);
        const createDate = CreateDateModel.reConstruct(jsonUserInfoMaster.createDate, `ユーザーマスタ`);
        const updateDate = UpdateDateModel.reConstruct(jsonUserInfoMaster.updateDate, `ユーザーマスタ`);
        const deleteFlgModel = new DeleteFlgModel(jsonUserInfoMaster.deleteFlg);

        return new UserInfoMasterModel(
            userIdModel,
            userNameModel,
            userBirthdayModel,
            createDate,
            updateDate,
            deleteFlgModel
        );
    }


    /**
     * 未削除のユーザーデータを取得
     * @param userInfoMasterList 
     * @returns 
     */
    public getActiveUserInfoMaster(): UserInfoMasterModel[] {

        // 未削除のユーザーを取得
        const activeUserInfoMasterList = this._userInfoMasterModelList.filter((e: UserInfoMasterModel) => {

            return e.deleteFlg !== FLG.ON;
        });

        return activeUserInfoMasterList;
    }


    /**
     * ユーザーマスタに登録用の書籍情報を追加する
     * @param userInfoMasterList 
     * @param userInfoMasterCreateModel 
     * @returns 
     */
    public createUserInfoMasterWriteData(
        userInfoMasterCreateModel: UserInfoMasterCreateModel): WritableUserInfoMasterListModel {

        // UserInfoMasterCreateModel→UserInfoMasterModelに変換する
        const createUserInfoMaster: UserInfoMasterModel = this.parseCreateUserInfoMaster(userInfoMasterCreateModel);

        // ユーザーを追加する
        const createUserInfoMasterList = [...this._userInfoMasterModelList, createUserInfoMaster];

        return new WritableUserInfoMasterListModel(createUserInfoMasterList);
    }


    /**
     * UserInfoMasterCreateModelからUserInfoMasterModelに変換する
     * @param userInfoMasterCreateModel 
     * @returns 
     */
    private parseCreateUserInfoMaster(userInfoMasterCreateModel: UserInfoMasterCreateModel): UserInfoMasterModel {

        const userIdModel = userInfoMasterCreateModel.userIdModel;
        const userNameModel = userInfoMasterCreateModel.userNameModel;
        const userBirthdayModel = userInfoMasterCreateModel.userBirthDayModel;
        const createDate = userInfoMasterCreateModel.createDateModel;
        const updateDate = userInfoMasterCreateModel.updateDateModel;
        const deleteFlgModel = userInfoMasterCreateModel.deleteFlgModel;

        return new UserInfoMasterModel(
            userIdModel,
            userNameModel,
            userBirthdayModel,
            createDate,
            updateDate,
            deleteFlgModel
        );
    }

}