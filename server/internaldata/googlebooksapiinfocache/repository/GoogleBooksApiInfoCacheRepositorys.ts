import { RepositoryType } from "../../../util/const/CommonConst";
import { GoogleBooksApiInfoCacheRepositoryJson } from "./concrete/GoogleBooksApiInfoCacheRepositoryJson";
import { GoogleBooksApiInfoCacheRepositoryInterface } from "./interface/GoogleBooksApiInfoCacheRepositoryInterface";



/**
 * 永続ロジック用クラスの管理用
 * ロジックを追加する場合はコンストラクタ内でrepositoryに追加(push)する
 */
export class GoogleBooksApiAuthorsCacheRepositorys {


    private readonly repositorys: ReadonlyArray<GoogleBooksApiInfoCacheRepositoryInterface>;

    constructor() {

        const repositorys: GoogleBooksApiInfoCacheRepositoryInterface[] = [];
        repositorys.push(new GoogleBooksApiInfoCacheRepositoryJson());

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