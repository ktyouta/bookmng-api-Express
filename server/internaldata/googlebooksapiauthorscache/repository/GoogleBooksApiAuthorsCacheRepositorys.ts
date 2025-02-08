import { RepositoryType } from "../../../util/const/CommonConst";
import { GoogleBooksApiAuthorsCacheRepositoryJson } from "./concrete/GoogleBooksApiAuthorsCacheRepositoryJson";
import { GoogleBooksApiAuthorsCacheRepositoryInterface } from "./interface/GoogleBooksApiAuthorsCacheRepositoryInterface";



/**
 * 永続ロジック用クラスの管理用
 * ロジックを追加する場合はコンストラクタ内でrepositorysに追加する
 */
export class GoogleBooksApiAuthorsCacheRepositorys {


    private readonly repositorys: Record<RepositoryType, GoogleBooksApiAuthorsCacheRepositoryInterface>;

    constructor() {

        const repositorys: Record<RepositoryType, GoogleBooksApiAuthorsCacheRepositoryInterface> = {
            [RepositoryType.JSON]: (new GoogleBooksApiAuthorsCacheRepositoryJson())
        }

        this.repositorys = repositorys;
    }


    /**
     * 永続ロジックを取得
     * @param repositoryType 
     * @returns 
     */
    public get(repositoryType: RepositoryType): GoogleBooksApiAuthorsCacheRepositoryInterface {
        return this.repositorys[repositoryType];
    }
}