import { GoogleBooksApiAuthorsCacheInsertEntity } from "../../entity/GoogleBooksApiAuthorsCacheInsertEntity";
import { GoogleBooksApiAuthorsCacheUpdateEntity } from "../../entity/GoogleBooksApiAuthorsCacheUpdateEntity";

export interface GoogleBooksApiAuthorsCacheRepositoryInterface {

    /**
     * Google Books Api著者キャッシュ情報追加
     * @param authorsInfoMasterInsertEntity 
     */
    insert(googleBooksApiAuthorsCacheInsertEntity: GoogleBooksApiAuthorsCacheInsertEntity): void;

    /**
     * Google Books Api著者キャッシュ情報更新
     */
    update(googleBooksApiAuthorsCacheUpdateEntity: GoogleBooksApiAuthorsCacheUpdateEntity): void;

    /**
     * コミット
     */
    commit(): void;
}