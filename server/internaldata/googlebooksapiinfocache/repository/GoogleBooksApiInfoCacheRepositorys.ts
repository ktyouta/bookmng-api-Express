import { RepositoryType } from "../../../util/const/CommonConst";
import { GoogleBooksApiInfoCacheRepositoryJson } from "./concrete/GoogleBooksApiInfoCacheRepositoryJson";
import { GoogleBooksApiInfoCacheRepositoryInterface } from "./interface/GoogleBooksApiInfoCacheRepositoryInterface";



/**
 * 永続ロジック用クラスの管理用
 * ロジックを追加する場合はコンストラクタ内でrepositorysに追加する
 */
export class GoogleBooksApiInfoCacheRepositorys {


    private readonly repositorys: Record<RepositoryType, GoogleBooksApiInfoCacheRepositoryInterface>;

    constructor() {

        const repositorys: Record<RepositoryType, GoogleBooksApiInfoCacheRepositoryInterface> = {
            [RepositoryType.JSON]: (new GoogleBooksApiInfoCacheRepositoryJson())
        }

        this.repositorys = repositorys;
    }


    /**
     * 永続ロジックを取得
     * @param repositoryType 
     * @returns 
     */
    public get(repositoryType: RepositoryType): GoogleBooksApiInfoCacheRepositoryInterface {
        return this.repositorys[repositoryType];
    }
}