import { FLG } from "../../../util/const/CommonConst";
import { JsonFileOperation } from "../../../util/service/JsonFileOperation";
import { FRONT_USER_INFO_MASTER_FILE_PATH } from "../const/UserInfoMasterConst";
import { CreateDateModel } from "./CreateDateModel";
import { DeleteFlgModel } from "./DeleteFlgModel";
import { UpdateDateModel } from "./FrontUpdateDateModel";
import { FrontUserBirthdayModel } from "./UserBirthdayModel";
import { FrontUserIdModel } from "./FrontUserIdModel";
import { FrontUserInfoMasterCreateModel } from "./FrontUserInfoMasterCreateModel";
import { FrontUserInfoMasterJsonModelType } from "./FrontUserInfoMasterJsonModelType";
import { FrontUserInfoMasterModel } from "./FrontUserInfoMasterModel";
import { FrontUserNameModel } from "./FrontUserNameModel";


export class WritableFrontUserInfoMasterListModel {

    private readonly _userInfoMasterModelList: ReadonlyArray<FrontUserInfoMasterModel>;

    private constructor(UserInfoMasterModelList: FrontUserInfoMasterModel[]) {

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
        const jsonUserInfoMasterList: FrontUserInfoMasterJsonModelType[] = JsonFileOperation.getFileObj(FRONT_USER_INFO_MASTER_FILE_PATH);

        // json形式からUserInfoMasterModelに変換する
        const parsedUserInfoMasterList = jsonUserInfoMasterList.map((e: FrontUserInfoMasterJsonModelType) => {
            return this.parseUserInfoMaster(e);
        });

        return new WritableFrontUserInfoMasterListModel(parsedUserInfoMasterList);
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
     * 未削除のユーザーデータを取得
     * @param userInfoMasterList 
     * @returns 
     */
    public getActiveUserInfoMaster(): FrontUserInfoMasterModel[] {

        // 未削除のユーザーを取得
        const activeUserInfoMasterList = this._userInfoMasterModelList.filter((e: FrontUserInfoMasterModel) => {

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
        userInfoMasterCreateModel: FrontUserInfoMasterCreateModel): WritableFrontUserInfoMasterListModel {

        // UserInfoMasterCreateModel→UserInfoMasterModelに変換する
        const createUserInfoMaster: FrontUserInfoMasterModel = this.parseCreateUserInfoMaster(userInfoMasterCreateModel);

        // ユーザーを追加する
        const createUserInfoMasterList = [...this._userInfoMasterModelList, createUserInfoMaster];

        return new WritableFrontUserInfoMasterListModel(createUserInfoMasterList);
    }


    /**
     * UserInfoMasterCreateModelからUserInfoMasterModelに変換する
     * @param userInfoMasterCreateModel 
     * @returns 
     */
    private parseCreateUserInfoMaster(userInfoMasterCreateModel: FrontUserInfoMasterCreateModel): FrontUserInfoMasterModel {

        const userIdModel = userInfoMasterCreateModel.userIdModel;
        const userNameModel = userInfoMasterCreateModel.userNameModel;
        const userBirthdayModel = userInfoMasterCreateModel.userBirthDayModel;
        const createDate = userInfoMasterCreateModel.createDateModel;
        const updateDate = userInfoMasterCreateModel.updateDateModel;
        const deleteFlgModel = userInfoMasterCreateModel.deleteFlgModel;

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