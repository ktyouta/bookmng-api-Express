import { BookShelfInsertEntity } from "../../entity/BookShelfInsertEntity";
import { BookShelfUpdateEntity } from "../../entity/BookShelfUpdateEntity";


/**
 * 永続ロジック用インターフェース
 */
export interface BookShelfRepositoryInterface {

    /**
     * 本棚情報追加
     * @param bookShelfInsertEntity 
     */
    insert(bookShelfInsertEntity: BookShelfInsertEntity): void;

    /**
     * 本棚情報更新
     */
    update(brontUserInfoMasterUpdateEntity: BookShelfUpdateEntity): void;

    /**
     * コミット
     */
    commit(): void;
}