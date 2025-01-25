import { BookAuthorsMasterInsertEntity } from "../../entity/BookAuthorsMasterInsertEntity";
import { BookAuthorsMasterUpdateEntity } from "../../entity/BookAuthorsMasterUpdateEntity";

export interface BookAuthorsMasterRepositoryInterface {

    /**
     * 書籍著者情報追加
     * @param authorsInfoMasterInsertEntity 
     */
    insert(authorsInfoMasterInsertEntity: BookAuthorsMasterInsertEntity): void;

    /**
     * 書籍著者情報更新
     */
    update(authorsInfoMasterUpdateEntity: BookAuthorsMasterUpdateEntity): void;

    /**
     * コミット
     */
    commit(): void;
}