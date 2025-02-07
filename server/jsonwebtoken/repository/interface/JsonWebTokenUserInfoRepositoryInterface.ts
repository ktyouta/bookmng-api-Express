import { FrontUserInfoMasterJsonModelType } from "../../../internaldata/frontuserinfomaster/model/FrontUserInfoMasterJsonModelType";
import { JsonWebTokenUserInfoSelectEntity } from "../../entity/JsonWebTokenUserInfoSelectEntity";


/**
 * 永続ロジック用インターフェース
 */
export interface JsonWebTokenUserInfoRepositoryInterface {

    /**
     * ユーザー取得
     */
    select(JsonWebTokenUserInfoSelectEntity: JsonWebTokenUserInfoSelectEntity):
        ReadonlyArray<FrontUserInfoMasterJsonModelType>;

}