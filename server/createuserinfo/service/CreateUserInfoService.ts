import { FrontUserIdModel } from "../../internaldata/frontuserinfomaster/model/FrontUserIdModel";
import { FrontUserInfoMasterCreateModel } from "../../internaldata/frontuserinfomaster/model/FrontUserInfoMasterCreateModel";
import { FrontUserNameModel } from "../../internaldata/frontuserinfomaster/model/FrontUserNameModel";
import ENV from '../../env.json';
import { FrontUserInfoMasterModel } from "../../internaldata/frontuserinfomaster/model/FrontUserInfoMasterModel";
import { UserInfoCreateRequestModel } from "../model/UserInfoCreateRequestModel";
import { UserInfoCreateRequestType } from "../model/UserInfoCreateRequestType";
import { WritableFrontUserInfoMasterListModel } from "../../internaldata/frontuserinfomaster/model/WritableFrontUserInfoMasterListModel";
import { FrontUserInfoMasterJsonListModel } from "../../internaldata/frontuserinfomaster/model/FrontUserInfoMasterJsonListModel";
import { FrontUserInfoMasterListModel } from "../../internaldata/frontuserinfomaster/model/FrontUserInfoMasterListModel";
import { FrontUserInfoMasterJsonModelType } from "../../internaldata/frontuserinfomaster/model/FrontUserInfoMasterJsonModelType";
import { CreateDateModel } from "../../internaldata/frontuserinfomaster/model/CreateDateModel";
import { UpdateDateModel } from "../../internaldata/frontuserinfomaster/model/FrontUpdateDateModel";
import { DeleteFlgModel } from "../../internaldata/frontuserinfomaster/model/DeleteFlgModel";
import { FLG } from "../../util/const/CommonConst";


export class CreateUserInfoService {


    /**
     * UserInfoCreateRequestModelTypeからUserInfoCreateRequestModelに変換する
     * @param requestBody 
     */
    public parseRequestBody(requestBody: UserInfoCreateRequestType): UserInfoCreateRequestModel {

        return new UserInfoCreateRequestModel(requestBody);
    }


    /**
     * ユーザー重複チェック
     * @param userNameModel 
     */
    public checkUserNameExists(parsedRequestBody: UserInfoCreateRequestModel): boolean {

        const userInfoMasterListModel: FrontUserInfoMasterListModel = new FrontUserInfoMasterListModel();
        const userNameModel: FrontUserNameModel = parsedRequestBody.userNameModel;

        // 未削除のユーザー情報リスト
        const activeUserInfoMasterList: FrontUserInfoMasterJsonModelType[] =
            userInfoMasterListModel.getActiveInfo();

        const isExistDuplicateUser = activeUserInfoMasterList.some((e: FrontUserInfoMasterJsonModelType) => {
            return e.userName === userNameModel.userName;
        });

        return isExistDuplicateUser;
    }


    /**
     * ユーザーマスタ書き込み用データの取得
     * @returns 
     */
    public getWritableUserMasterInfo(): WritableFrontUserInfoMasterListModel {

        const writableUserMasterListModel: WritableFrontUserInfoMasterListModel =
            WritableFrontUserInfoMasterListModel.crerate();

        return writableUserMasterListModel;
    }


    /**
     * ユーザー登録用データの作成
     * @param title 
     * @param publishedDate 
     * @param description 
     * @returns 
     */
    public createUserInfoMasterCreateBody(userId: FrontUserIdModel,
        parsedRequestBody: UserInfoCreateRequestModel): FrontUserInfoMasterModel {

        const createDateModel: CreateDateModel = CreateDateModel.createNewCreateDate(`ユーザーマスタ`);
        const updateDateModel: UpdateDateModel = UpdateDateModel.createNewUpdateDate(`ユーザーマスタ`);
        const deleteFlgModel: DeleteFlgModel = new DeleteFlgModel(FLG.OFF);

        return new FrontUserInfoMasterModel(
            userId,
            parsedRequestBody.userNameModel,
            parsedRequestBody.userBirthdayModel,
            createDateModel,
            updateDateModel,
            deleteFlgModel,
        );
    }


    /**
     * ユーザーマスタに対する書き込み用データの作成
     * @param userInfoMasterCreateModel 
     */
    public createUserInfoMasterWriteData(
        userInfoMasterListModel: WritableFrontUserInfoMasterListModel,
        userInfoMasterCreateModel: FrontUserInfoMasterModel): WritableFrontUserInfoMasterListModel {

        // ユーザーを追加する
        const userInfoMasterListWriteModel: WritableFrontUserInfoMasterListModel =
            userInfoMasterListModel.add(userInfoMasterCreateModel);

        return userInfoMasterListWriteModel;
    }


    /**
     * ユーザーマスタファイルにデータを書き込む
     * @param userInfoMasterList 
     */
    public overWriteUserInfoMaster(userInfoMasterListWriteModel: WritableFrontUserInfoMasterListModel) {

        // json用のモデルに変換する
        const userInfoMasterJsonListModel: FrontUserInfoMasterJsonListModel = new FrontUserInfoMasterJsonListModel(userInfoMasterListWriteModel);

        try {

            // ユーザーマスタファイルにデータを書き込む
            userInfoMasterJsonListModel.overWriteUserInfoMaster();
        } catch (err) {

            throw Error(`${err} endpoint:${ENV.CREATE_USER_INFO}`);
        }
    }

}