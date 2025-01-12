import { FrontUserIdModel } from "../../internaldata/frontuserinfomaster/model/FrontUserIdModel";
import { FrontUserInfoMasterCreateModel } from "../../internaldata/frontuserinfomaster/model/FrontUserInfoMasterCreateModel";
import { FrontUserNameModel } from "../../internaldata/frontuserinfomaster/model/FrontUserNameModel";
import ENV from '../../env.json';
import { FrontUserInfoMasterModel } from "../../internaldata/frontuserinfomaster/model/FrontUserInfoMasterModel";
import { UserInfoCreateRequestModel } from "../model/UserInfoCreateRequestModel";
import { UserInfoCreateRequestType } from "../model/UserInfoCreateRequestType";
import { WritableFrontUserInfoMasterListModel } from "../../internaldata/frontuserinfomaster/model/WritableFrontUserInfoMasterListModel";
import { FrontUserInfoMasterJsonListModel } from "../../internaldata/frontuserinfomaster/model/FrontUserInfoMasterJsonListModel";


export class CreateUserInfoService {



    /**
     * マスタからユーザー情報を取得する
     * @returns 
     */
    public getUserMasterInfo(): WritableFrontUserInfoMasterListModel {

        const userInfoMasterListModel: WritableFrontUserInfoMasterListModel = WritableFrontUserInfoMasterListModel.getUserInfoMasterList();

        return userInfoMasterListModel;
    }


    /**
     * 未削除のユーザー情報データを取得
     * @returns 
     */
    public getActiveUserMasterInfo(userInfoMasterListModel: WritableFrontUserInfoMasterListModel): FrontUserInfoMasterModel[] {

        const activeUserInfoMasterList: FrontUserInfoMasterModel[] = userInfoMasterListModel.getActiveUserInfoMaster();

        return activeUserInfoMasterList;
    }


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
    public checkUserNameExists(activeUserInfoMasterList: FrontUserInfoMasterModel[],
        parsedRequestBody: UserInfoCreateRequestModel): boolean {

        const userNameModel: FrontUserNameModel = parsedRequestBody.userNameModel;

        const isExistDuplicateUser = activeUserInfoMasterList.some((e: FrontUserInfoMasterModel) => {
            return e.userNameModel.checkUsernameDuplicate(userNameModel);
        });

        return isExistDuplicateUser;
    }


    /**
     * ユーザー登録用データの作成
     * @param title 
     * @param publishedDate 
     * @param description 
     * @returns 
     */
    public createUserInfoMasterCreateBody(userId: FrontUserIdModel, parsedRequestBody: UserInfoCreateRequestModel): FrontUserInfoMasterCreateModel {

        return new FrontUserInfoMasterCreateModel(
            userId, parsedRequestBody.userNameModel, parsedRequestBody.userBirthdayModel);
    }


    /**
     * ユーザーマスタに対する書き込み用データの作成
     * @param userInfoMasterCreateModel 
     */
    public createUserInfoMasterWriteData(
        userInfoMasterListModel: WritableFrontUserInfoMasterListModel,
        userInfoMasterCreateModel: FrontUserInfoMasterCreateModel): WritableFrontUserInfoMasterListModel {

        // ユーザーを追加する
        const userInfoMasterListWriteModel: WritableFrontUserInfoMasterListModel =
            userInfoMasterListModel.createUserInfoMasterWriteData(userInfoMasterCreateModel);

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