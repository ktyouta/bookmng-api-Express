import { GoogleBooksApiSmallThumbnailCacheInsertEntity } from "../../entity/GoogleBooksApiSmallThumbnailCacheInsertEntity";
import { GoogleBooksApiSmallThumbnailCacheUpdateEntity } from "../../entity/GoogleBooksApiSmallThumbnailCacheUpdateEntity";


export interface GoogleBooksApiSmallThumbnailCacheRepositoryInterface {

    /**
     * Google Books Apiのサムネイル(小)情報追加
     * @param authorsInfoMasterInsertEntity 
     */
    insert(googleBooksApiSmallThumbnailCacheInsertEntity: GoogleBooksApiSmallThumbnailCacheInsertEntity): void;

    /**
     * Google Books Apiのサムネイル(小)情報更新
     */
    update(googleBooksApiSmallThumbnailCacheUpdateEntity: GoogleBooksApiSmallThumbnailCacheUpdateEntity): void;

    /**
     * コミット
     */
    commit(): void;
}