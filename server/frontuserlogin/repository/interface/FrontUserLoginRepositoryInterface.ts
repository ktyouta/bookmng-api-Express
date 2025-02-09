import { FrontUserLoginMasterJsonModelType } from "../../../internaldata/frontuserloginmaster/model/FrontUserLoginMasterJsonModelType";
import { FrontUserLoginSelectEntity } from "../../entity/FrontUserLoginSelectEntity";


/**
 * 永続ロジック用インターフェース
 */
export interface FrontUserLoginRepositoryInterface {

    /**
     * ユーザー取得
     */
    select(frontUserLoginSelectEntity: FrontUserLoginSelectEntity): ReadonlyArray<FrontUserLoginMasterJsonModelType>;

}