import { RepositoryType } from "../../../util/const/CommonConst";
import { GoogleBooksApiAuthorsCacheRepositoryJson } from "./concrete/GoogleBooksApiAuthorsCacheRepositoryJson";
import { GoogleBooksApiAuthorsCacheRepositoryInterface } from "./interface/GoogleBooksApiAuthorsCacheRepositoryInterface";



/**
 * 永続ロジック用クラスの管理用
 * ロジックを追加する場合はコンストラクタ内でrepositoryに追加(push)する
 */
export class GoogleBooksApiAuthorsCacheRepositorys {


    private readonly repositorys: ReadonlyArray<GoogleBooksApiAuthorsCacheRepositoryInterface>;

    constructor() {

        const repositorys: GoogleBooksApiAuthorsCacheRepositoryInterface[] = [];
        repositorys.push(new GoogleBooksApiAuthorsCacheRepositoryJson());

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