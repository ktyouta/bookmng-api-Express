import { GoogleBooksApiInfoCacheUpdateEntity } from "../../entity/GoogleBooksApiAuthorsCacheUpdateEntity";
import { GoogleBooksApiInfoCacheInsertEntity } from "../../entity/GoogleBooksApiInfoCacheInsertEntity";

export interface GoogleBooksApiInfoCacheRepositoryInterface {

    /**
     * Google Books Apiキャッシュ情報追加
     * @param authorsInfoMasterInsertEntity 
     */
    insert(googleBooksApiAuthorsCacheInsertEntity: GoogleBooksApiInfoCacheInsertEntity): void;

    /**
     * Google Books Apiキャッシュ情報更新
     */
    update(googleBooksApiAuthorsCacheUpdateEntity: GoogleBooksApiInfoCacheUpdateEntity): void;

    /**
     * コミット
     */
    commit(): void;
}