import { FrontUserLoginMasterInsertEntity } from "../../entity/FrontUserLoginMasterInsertEntity";
import { FrontUserLoginMasterUpdateEntity } from "../../entity/FrontUserLoginMasterUpdateEntity";


/**
 * 永続ロジック用インターフェース
 */
export interface FrontUserLoginMasterRepositoryInterface {

    /**
     * ユーザーログイン情報追加
     * @param frontUserLoginMasterInsertEntity 
     */
    insert(frontUserLoginMasterInsertEntity: FrontUserLoginMasterInsertEntity): void;

    /**
     * ユーザーログイン情報更新
     */
    update(frontUserLoginMasterUpdateEntity: FrontUserLoginMasterUpdateEntity): void;

    /**
     * コミット
     */
    commit(): void;
}