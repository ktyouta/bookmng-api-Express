import { GoogleBooksApiThumbnailCacheInsertEntity } from "../../entity/GoogleBooksApiThumbnailCacheInsertEntity";
import { GoogleBooksApiThumbnailCacheUpdateEntity } from "../../entity/GoogleBooksApiThumbnailCacheUpdateEntity";


export interface GoogleBooksApiThumbnailCacheRepositoryInterface {

    /**
     * Google Books Apiのサムネイル情報追加
     * @param authorsInfoMasterInsertEntity 
     */
    insert(googleBooksApiThumbnailCacheInsertEntity: GoogleBooksApiThumbnailCacheInsertEntity): void;

    /**
     * Google Books Apiのサムネイル情報更新
     */
    update(googleBooksApiThumbnailCacheUpdateEntity: GoogleBooksApiThumbnailCacheUpdateEntity): void;

    /**
     * コミット
     */
    commit(): void;
}