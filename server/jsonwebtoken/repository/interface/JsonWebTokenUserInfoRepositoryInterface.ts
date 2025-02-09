import { FrontUserLoginMasterJsonModelType } from "../../../internaldata/frontuserloginmaster/model/FrontUserLoginMasterJsonModelType";
import { JsonWebTokenUserInfoSelectEntity } from "../../entity/JsonWebTokenUserInfoSelectEntity";


/**
 * 永続ロジック用インターフェース
 */
export interface JsonWebTokenUserInfoRepositoryInterface {

    /**
     * ユーザー取得
     */
    select(JsonWebTokenUserInfoSelectEntity: JsonWebTokenUserInfoSelectEntity):
        ReadonlyArray<FrontUserLoginMasterJsonModelType>;

}