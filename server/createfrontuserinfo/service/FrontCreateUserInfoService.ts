import { FrontUserIdModel } from "../../internaldata/frontuserinfomaster/properties/FrontUserIdModel";
import { FrontUserNameModel } from "../../internaldata/frontuserinfomaster/properties/FrontUserNameModel";
import ENV from '../../env.json';
import { FrontUserInfoCreateRequestModel } from "../model/FrontUserInfoCreateRequestModel";
import { FrontUserInfoCreateRequestType } from "../model/FrontUserInfoCreateRequestType";
import { FrontUserInfoMasterJsonModelType } from "../../internaldata/frontuserinfomaster/model/FrontUserInfoMasterJsonModelType";
import { FLG, RepositoryType } from "../../util/const/CommonConst";
import { CreateDateModel } from "../../internaldata/common/model/CreateDateModel";
import { UpdateDateModel } from "../../internaldata/common/model/UpdateDateModel";
import { DeleteFlgModel } from "../../internaldata/common/model/DeleteFlgModel";
import { FrontUserInfoMasterRepositorys } from "../../internaldata/frontuserinfomaster/repository/FrontUserInfoMasterRepositorys";
import { FrontUserInfoMasterRepositoryInterface } from "../../internaldata/frontuserinfomaster/repository/interface/FrontUserInfoMasterRepositoryInterface";
import { FrontUserInfoMasterInsertEntity } from "../../internaldata/frontuserinfomaster/entity/FrontUserInfoMasterInsertEntity";
import { FrontUserInfoCreateRepositorys } from "../repository/FrontUserInfoCreateRepositorys";
import { FrontUserInfoCreateSelectEntity } from "../entity/FrontUserInfoCreateSelectEntity";
import { NewJsonWebTokenModel } from "../../jsonwebtoken/model/NewJsonWebTokenModel";
import { FrontUserInfoCreateResponseModel } from "../model/FrontUserInfoCreateResponseModel";
import { FrontUserLoginMasterInsertEntity } from "../../internaldata/frontuserloginmaster/entity/FrontUserLoginMasterInsertEntity";
import { FrontUserLoginMasterRepositoryInterface } from "../../internaldata/frontuserloginmaster/repository/interface/FrontUserLoginMasterRepositoryInterface";
import { FrontUserLoginMasterRepositorys } from "../../internaldata/frontuserloginmaster/repository/FrontUserLoginMasterRepositorys";
import { ApiEndopoint } from "../../router/conf/ApiEndpoint";


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
    public getFrontUserInfoMasterRepository(): FrontUserInfoMasterRepositoryInterface {

        return (new FrontUserInfoMasterRepositorys()).get(RepositoryType.JSON);
    }


    /**
     * ユーザー重複チェック
     * @param userNameModel 
     */
    public checkUserNameExists(frontUserInfoCreateRequestBody: FrontUserInfoCreateRequestModel): boolean {

        const userNameModel: FrontUserNameModel = frontUserInfoCreateRequestBody.frontUserNameModel;

        // 永続ロジック用オブジェクトを取得
        const frontUserInfoCreateRepositorys = new FrontUserInfoCreateRepositorys();
        const frontUserInfoCreateRepository = frontUserInfoCreateRepositorys.get(RepositoryType.JSON);

        // ユーザー情報取得用Entity
        const frontUserInfoCreateSelectEntity = new FrontUserInfoCreateSelectEntity(userNameModel);

        // 未削除のユーザー情報を取得
        const activeUserInfoMasterList: ReadonlyArray<FrontUserInfoMasterJsonModelType> =
            frontUserInfoCreateRepository.select(frontUserInfoCreateSelectEntity);

        return activeUserInfoMasterList.length > 0;
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
     * コミット
     * @param userInfoMasterList 
     */
    public commit(frontUserInfoMasterRepository: FrontUserInfoMasterRepositoryInterface,
        frontUserLoginMasterRepository: FrontUserLoginMasterRepositoryInterface
    ) {

        try {
            frontUserInfoMasterRepository.commit();
            frontUserLoginMasterRepository.commit();
        } catch (err) {
            throw Error(`${err} endpoint:${ApiEndopoint.FRONT_USER_INFO}`);
        }
    }


    /**
     * jwtを作成する
     * @param userIdModel 
     * @param frontUserInfoCreateRequestBody 
     */
    public createJsonWebToken(userIdModel: FrontUserIdModel,
        frontUserInfoCreateRequestBody: FrontUserInfoCreateRequestModel
    ) {

        const frontUserPassword = frontUserInfoCreateRequestBody.frontUserPasswordModel;

        try {
            const newJsonWebTokenModel = new NewJsonWebTokenModel(userIdModel, frontUserPassword);

            return newJsonWebTokenModel;
        } catch (err) {
            throw Error(`${err} endpoint:${ApiEndopoint.FRONT_USER_INFO}`);
        }
    }


    /**
     * レスポンスを作成
     * @param frontUserInfoCreateRequestBody 
     * @param newJsonWebTokenModel 
     */
    public createResponse(frontUserInfoCreateRequestBody: FrontUserInfoCreateRequestModel,
        newJsonWebTokenModel: NewJsonWebTokenModel
    ): FrontUserInfoCreateResponseModel {

        const userNameModel = frontUserInfoCreateRequestBody.frontUserNameModel;

        return new FrontUserInfoCreateResponseModel(userNameModel, newJsonWebTokenModel);
    }


    /**
     * ユーザーログインマスタ永続ロジック用オブジェクトを取得
     * @returns 
     */
    public getFrontUserLoginMasterRepository(): FrontUserLoginMasterRepositoryInterface {

        return (new FrontUserLoginMasterRepositorys()).get(RepositoryType.JSON);
    }


    /**
     * ユーザーログイン情報登録用データの作成
     * @param title 
     * @param publishedDate 
     * @param description 
     * @returns 
     */
    public createUserLoginMasterCreateBody(userId: FrontUserIdModel,
        parsedRequestBody: FrontUserInfoCreateRequestModel): FrontUserLoginMasterInsertEntity {

        return new FrontUserLoginMasterInsertEntity(
            userId,
            parsedRequestBody.frontUserPasswordModel,
        );
    }
}