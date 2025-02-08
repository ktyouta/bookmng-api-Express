import { RepositoryType } from "../../../util/const/CommonConst";
import { GoogleBooksApiSmallThumbnailCacheRepositoryInterface } from "../../googlebooksapismallthumbnailcache/repository/interface/GoogleBooksApiSmallThumbnailCacheRepositoryInterface";
import { GoogleBooksApiThumbnailCacheRepositoryJson } from "./concrete/GoogleBooksApiThumbnailCacheRepositoryJson";
import { GoogleBooksApiThumbnailCacheRepositoryInterface } from "./interface/GoogleBooksApiThumbnailCacheRepositoryInterface";



/**
 * 永続ロジック用クラスの管理用
 * ロジックを追加する場合はコンストラクタ内でrepositorysに追加する
 */
export class GoogleBooksApiThumbnailCacheRepositorys {


    private readonly repositorys: Record<RepositoryType, GoogleBooksApiThumbnailCacheRepositoryInterface>;

    constructor() {

        const repositorys: Record<RepositoryType, GoogleBooksApiThumbnailCacheRepositoryInterface> = {
            [RepositoryType.JSON]: (new GoogleBooksApiThumbnailCacheRepositoryJson())
        }

        this.repositorys = repositorys;
    }


    /**
     * 永続ロジックを取得
     * @param repositoryType 
     * @returns 
     */
    public get(repositoryType: RepositoryType): GoogleBooksApiThumbnailCacheRepositoryInterface {
        return this.repositorys[repositoryType];
    }
}