import { BookShelfInsertEntity } from "../../entity/BookShelfInsertEntity";
import { BookShelfUpdateEntity } from "../../entity/BookShelfUpdateEntity";


/**
 * 永続ロジック用インターフェース
 */
export interface BookShelfRepositoryInterface {

    /**
     * ユーザー追加
     * @param bookShelfInsertEntity 
     */
    insert(bookShelfInsertEntity: BookShelfInsertEntity): void;

    /**
     * ユーザー更新
     */
    update(brontUserInfoMasterUpdateEntity: BookShelfUpdateEntity): void;

    /**
     * コミット
     */
    commit(): void;
}