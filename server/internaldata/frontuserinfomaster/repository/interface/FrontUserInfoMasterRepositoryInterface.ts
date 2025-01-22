import { FrontUserInfoMasterInsertEntity } from "../../entity/FrontUserInfoMasterInsertEntity";
import { FrontUserInfoMasterUpdateEntity } from "../../entity/FrontUserInfoMasterUpdateEntity";
import { FrontUserInfoMasterJsonModelType } from "../../model/FrontUserInfoMasterJsonModelType";
import { FrontUserInfoMasterModel } from "../../model/FrontUserInfoMasterModel";


/**
 * 永続ロジック用インターフェース
 */
export interface FrontUserInfoMasterRepositoryInterface {

    /**
     * ユーザー追加
     * @param frontUserInfoMasterInsertEntity 
     */
    insert(frontUserInfoMasterModel: FrontUserInfoMasterInsertEntity): void;

    /**
     * ユーザー更新
     */
    update(frontUserInfoMasterUpdateEntity: FrontUserInfoMasterUpdateEntity): void;

    /**
     * コミット
     */
    commit(): void;
}