import { BookInfoMasterInsertEntity } from "../../entity/BookInfoMasterInsertEntity";
import { BookInfoMasterUpdateEntity } from "../../entity/BookInfoMasterUpdateEntity";

export interface BookInfoMasterRepositoryInterface {

    /**
     * 書籍情報追加
     * @param authorsInfoMasterInsertEntity 
     */
    insert(authorsInfoMasterInsertEntity: BookInfoMasterInsertEntity): void;

    /**
     * 書籍情報更新
     */
    update(authorsInfoMasterUpdateEntity: BookInfoMasterUpdateEntity): void;

    /**
     * コミット
     */
    commit(): void;
}