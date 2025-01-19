import { FrontUserInfoMasterInsertEntity } from "../../entity/FrontUserInfoMasterInsertEntity";
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
    update(frontUserInfoMasterModel: FrontUserInfoMasterModel): void;


    /**
     * コミット
     */
    commit(): void;
}