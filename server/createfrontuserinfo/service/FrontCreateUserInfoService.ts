import { FrontUserIdModel } from "../../internaldata/frontuserinfomaster/properties/FrontUserIdModel";
import { FrontUserNameModel } from "../../internaldata/frontuserinfomaster/properties/FrontUserNameModel";
import ENV from '../../env.json';
import { FrontUserInfoMasterModel } from "../../internaldata/frontuserinfomaster/model/FrontUserInfoMasterModel";
import { FrontUserInfoCreateRequestModel } from "../model/FrontUserInfoCreateRequestModel";
import { FrontUserInfoCreateRequestType } from "../model/FrontUserInfoCreateRequestType";
import { FrontUserInfoMasterListModel } from "../../internaldata/frontuserinfomaster/model/FrontUserInfoMasterListModel";
import { FrontUserInfoMasterJsonModelType } from "../../internaldata/frontuserinfomaster/model/FrontUserInfoMasterJsonModelType";
import { FLG } from "../../util/const/CommonConst";
import { CreateDateModel } from "../../internaldata/common/model/CreateDateModel";
import { UpdateDateModel } from "../../internaldata/common/model/UpdateDateModel";
import { DeleteFlgModel } from "../../internaldata/common/model/DeleteFlgModel";
import { FrontUserInfoMasterRepositorys, RepositoryType } from "../../internaldata/frontuserinfomaster/repository/FrontUserInfoMasterRepositorys";
import { FrontUserInfoMasterRepositoryInterface } from "../../internaldata/frontuserinfomaster/repository/interface/FrontUserInfoMasterRepositoryInterface";
import { FrontUserInfoMasterInsertEntity } from "../../internaldata/frontuserinfomaster/entity/FrontUserInfoMasterInsertEntity";


export class CreateFrontUserInfoService {


    /**
     * リクエストボディの型変換
     * @param requestBody 
     */
    public parseRequestBody(requestBody: FrontUserInfoCreateRequestType): FrontUserInfoCreateRequestModel {

        return new FrontUserInfoCreateRequestModel(requestBody);
    }


    /**
     * 永続ロジック用オブジェクトを取得
     */
    public getRepository(): FrontUserInfoMasterRepositoryInterface {

        const frontUserInfoMasterRepositorys = new FrontUserInfoMasterRepositorys();

        return frontUserInfoMasterRepositorys.select(RepositoryType.JSON);
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
        parsedRequestBody: FrontUserInfoCreateRequestModel): FrontUserInfoMasterInsertEntity {

        return new FrontUserInfoMasterInsertEntity(
            userId,
            parsedRequestBody.frontUserNameModel,
            parsedRequestBody.frontUserBirthdayModel,
        );
    }


    /**
     * ユーザーマスタファイルにデータを書き込む
     * @param userInfoMasterList 
     */
    public commit(frontUserInfoMasterRepository: FrontUserInfoMasterRepositoryInterface) {

        try {
            // ユーザーマスタファイルにデータを書き込む
            frontUserInfoMasterRepository.commit();
        } catch (err) {
            throw Error(`${err} endpoint:${ENV.CREATE_FRONT_USER_INFO}`);
        }
    }

}