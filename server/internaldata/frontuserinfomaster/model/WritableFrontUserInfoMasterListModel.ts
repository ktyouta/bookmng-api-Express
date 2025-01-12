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
import { FrontUserInfoMasterListModel } from "./FrontUserInfoMasterListModel";


export class WritableFrontUserInfoMasterListModel {

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

                return WritableFrontUserInfoMasterListModel.parseUserInfoMaster(e);
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
     * ユーザーマスタに登録用の書籍情報を追加する
     * @param userInfoMasterList 
     * @param userInfoMasterCreateModel 
     * @returns 
     */
    public add(userInfoMasterCreateModel: FrontUserInfoMasterModel): WritableFrontUserInfoMasterListModel {

        // ユーザーを追加する
        const createUserInfoMasterList: FrontUserInfoMasterModel[] = [...this._userInfoMasterModelList, userInfoMasterCreateModel];

        return new WritableFrontUserInfoMasterListModel(createUserInfoMasterList);
    }


}