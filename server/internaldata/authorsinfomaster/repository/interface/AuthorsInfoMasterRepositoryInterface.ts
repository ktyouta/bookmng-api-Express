import { AuthorsInfoMasterInsertEntity } from "../../entity/AuthorsInfoMasterInsertEntity";
import { AuthorsInfoMasterUpdateEntity } from "../../entity/AuthorsInfoMasterUpdateEntity";

export interface AuthorsInfoMasterRepositoryInterface {

    /**
     * 著者追加
     */
    insert(authorsInfoMasterInsertEntity: AuthorsInfoMasterInsertEntity): void;

    /**
     * 著者更新
     */
    update(authorsInfoMasterUpdateEntity: AuthorsInfoMasterUpdateEntity): void;

    /**
     * コミット
     */
    commit(): void;
}