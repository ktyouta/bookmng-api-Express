import { GoogleBooksApiAccessHistoryInsertEntity } from "../../entity/GoogleBooksApiAccessHistoryInsertEntity";


/**
 * 永続ロジック用インターフェース
 */
export interface GoogleBooksApiAccessHistoryRepositoryInterface {

    /**
     * アクセス情報追加
     * @param googleBooksApiAccessHistoryInsertEntity 
     */
    insert(googleBooksApiAccessHistoryInsertEntity: GoogleBooksApiAccessHistoryInsertEntity): void;

    /**
     * コミット
     */
    commit(): void;
}