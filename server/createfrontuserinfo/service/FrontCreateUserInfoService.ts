import { FrontUserIdModel } from "../../internaldata/frontuserinfomaster/model/FrontUserIdModel";
import { FrontUserNameModel } from "../../internaldata/frontuserinfomaster/model/FrontUserNameModel";
import ENV from '../../env.json';
import { FrontUserInfoMasterModel } from "../../internaldata/frontuserinfomaster/model/FrontUserInfoMasterModel";
import { FrontUserInfoCreateRequestModel } from "../model/FrontUserInfoCreateRequestModel";
import { FrontUserInfoCreateRequestType } from "../model/FrontUserInfoCreateRequestType";
import { FrontUserInfoMasterWritableListModel } from "../../internaldata/frontuserinfomaster/model/FrontUserInfoMasterWritableListModel";
import { FrontUserInfoMasterListModel } from "../../internaldata/frontuserinfomaster/model/FrontUserInfoMasterListModel";
import { FrontUserInfoMasterJsonModelType } from "../../internaldata/frontuserinfomaster/model/FrontUserInfoMasterJsonModelType";
import { CreateDateModel } from "../../internaldata/frontuserinfomaster/model/CreateDateModel";
import { UpdateDateModel } from "../../internaldata/frontuserinfomaster/model/UpdateDateModel";
import { DeleteFlgModel } from "../../internaldata/frontuserinfomaster/model/DeleteFlgModel";
import { FLG } from "../../util/const/CommonConst";


export class CreateFrontUserInfoService {


    /**
     * リクエストボディの型変換
     * @param requestBody 
     */
    public parseRequestBody(requestBody: FrontUserInfoCreateRequestType): FrontUserInfoCreateRequestModel {

        return new FrontUserInfoCreateRequestModel(requestBody);
    }


    /**
     * ユーザー重複チェック
     * @param userNameModel 
     */
    public checkUserNameExists(parsedRequestBody: FrontUserInfoCreateRequestModel): boolean {

        const userInfoMasterListModel: FrontUserInfoMasterListModel = new FrontUserInfoMasterListModel();
        const userNameModel: FrontUserNameModel = parsedRequestBody.frontUserNameModel;

        // 未削除のユーザー情報リスト
        const activeUserInfoMasterList: FrontUserInfoMasterJsonModelType[] =
            userInfoMasterListModel.getActiveInfo();

        const isExistDuplicateUser = activeUserInfoMasterList.some((e: FrontUserInfoMasterJsonModelType) => {
            return e.userName === userNameModel.frontUserName;
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
    public createUserInfoMasterCreateBody(userId: FrontUserIdModel,
        parsedRequestBody: FrontUserInfoCreateRequestModel): FrontUserInfoMasterModel {

        const createDateModel: CreateDateModel = CreateDateModel.createNewCreateDate(`ユーザーマスタ`);
        const updateDateModel: UpdateDateModel = UpdateDateModel.createNewUpdateDate(`ユーザーマスタ`);
        const deleteFlgModel: DeleteFlgModel = new DeleteFlgModel(FLG.OFF);

        return new FrontUserInfoMasterModel(
            userId,
            parsedRequestBody.frontUserNameModel,
            parsedRequestBody.frontUserBirthdayModel,
            createDateModel,
            updateDateModel,
            deleteFlgModel,
        );
    }


    /**
     * ユーザーマスタファイルにデータを書き込む
     * @param userInfoMasterList 
     */
    public overWriteUserInfoMaster(userInfoMasterListWriteModel: FrontUserInfoMasterWritableListModel) {

        try {
            // ユーザーマスタファイルにデータを書き込む
            userInfoMasterListWriteModel.commit();
        } catch (err) {
            throw Error(`${err} endpoint:${ENV.CREATE_FRONT_USER_INFO}`);
        }
    }

}