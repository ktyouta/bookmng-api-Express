import ENV from '../../env.json';
import { FrontUserLoginMasterJsonModelType } from '../../internaldata/frontuserloginmaster/model/FrontUserLoginMasterJsonModelType';
import { FrontUserLoginMasterRepositorys } from '../../internaldata/frontuserloginmaster/repository/FrontUserLoginMasterRepositorys';
import { FrontUserLoginMasterRepositoryInterface } from '../../internaldata/frontuserloginmaster/repository/interface/FrontUserLoginMasterRepositoryInterface';
import { RepositoryType } from '../../util/const/CommonConst';
import { FrontUserLoginSelectEntity } from '../entity/FrontUserLoginSelectEntity';
import { FrontUserLoginRequestModel } from '../model/FrontUserLoginRequestModel';
import { FrontUserLoginRequestType } from '../model/FrontUserLoginRequestType';
import { FrontUserLoginRepositorys } from '../repository/FrontUserLoginRepositorys';
import { FrontUserLoginRepositoryInterface } from '../repository/interface/FrontUserLoginRepositoryInterface';


export class FrontUserLoginService {


    /**
     * リクエストボディの型変換
     * @param requestBody 
     */
    public parseRequestBody(requestBody: FrontUserLoginRequestType): FrontUserLoginRequestModel {

        return new FrontUserLoginRequestModel(requestBody);
    }


    /**
     * 永続ロジック用オブジェクトを取得
     */
    public getFrontUserLoginMasterRepository(): FrontUserLoginRepositoryInterface {

        return (new FrontUserLoginRepositorys()).get(RepositoryType.JSON);
    }


    /**
     * ログインユーザーを取得
     * @param frontUserLoginRequestBody 
     */
    public getLoginUser(frontUserLoginMasterRepository: FrontUserLoginRepositoryInterface,
        frontUserLoginRequestBody: FrontUserLoginRequestModel): ReadonlyArray<FrontUserLoginMasterJsonModelType> {

        const frontUserLoginSelectEntity = new FrontUserLoginSelectEntity(
            frontUserLoginRequestBody.frontUserIdModel,
            frontUserLoginRequestBody.frontUserPasswordModel
        );

        const frontUserList: ReadonlyArray<FrontUserLoginMasterJsonModelType> =
            frontUserLoginMasterRepository.select(frontUserLoginSelectEntity);

        return frontUserList;
    }

}