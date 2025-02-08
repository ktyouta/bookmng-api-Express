import { RepositoryType } from "../../../util/const/CommonConst";
import { GoogleBooksApiSmallThumbnailCacheRepositoryJson } from "./concrete/GoogleBooksApiSmallThumbnailCacheRepositoryJson";
import { GoogleBooksApiSmallThumbnailCacheRepositoryInterface } from "./interface/GoogleBooksApiSmallThumbnailCacheRepositoryInterface";



/**
 * 永続ロジック用クラスの管理用
 * ロジックを追加する場合はコンストラクタ内でrepositorysに追加する
 */
export class GoogleBooksApiSmallThumbnailCacheRepositorys {


    private readonly repositorys: Record<RepositoryType, GoogleBooksApiSmallThumbnailCacheRepositoryInterface>;

    constructor() {

        const repositorys: Record<RepositoryType, GoogleBooksApiSmallThumbnailCacheRepositoryInterface> = {
            [RepositoryType.JSON]: (new GoogleBooksApiSmallThumbnailCacheRepositoryJson())
        }

        this.repositorys = repositorys;
    }


    /**
     * 永続ロジックを取得
     * @param repositoryType 
     * @returns 
     */
    public get(repositoryType: RepositoryType): GoogleBooksApiSmallThumbnailCacheRepositoryInterface {
        return this.repositorys[repositoryType];
    }
}