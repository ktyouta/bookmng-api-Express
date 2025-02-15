import { BookShelfSearchConditionInsertEntity } from "../../entity/BookShelfSearchConditionInsertEntity";
import { BookShelfSearchConditionUpdateEntity } from "../../entity/BookShelfSearchConditionUpdateEntity";


/**
 * 永続ロジック用インターフェース
 */
export interface BookShelfSearchConditionRepositoryInterface {

    /**
     * 本棚情報追加
     * @param bookShelfSearchConditionInsertEntity 
     */
    insert(bookShelfSearchConditionInsertEntity: BookShelfSearchConditionInsertEntity): void;

    /**
     * 本棚情報更新
     */
    update(brontUserInfoMasterUpdateEntity: BookShelfSearchConditionUpdateEntity): void;

    /**
     * コミット
     */
    commit(): void;
}