import { RepositoryType } from "../../util/const/CommonConst";
import { SearchBookInfoRepositoryJson } from "./concrete/SearchBookInfoRepositoryJson";
import { SearchBookInfoRepositoryInterface } from "./interface/SearchBookInfoRepositoryInterface";



/**
 * 永続ロジック用クラスの管理用
 * ロジックを追加する場合はコンストラクタ内でrepositorysに追加する
 */
export class SearchBookInfoRepositorys {


    private readonly repositorys: Record<RepositoryType, SearchBookInfoRepositoryInterface>;

    constructor() {

        const repositorys: Record<RepositoryType, SearchBookInfoRepositoryInterface> = {
            [RepositoryType.JSON]: (new SearchBookInfoRepositoryJson())
        }

        this.repositorys = repositorys;
    }


    /**
     * 永続ロジックを取得
     * @param repositoryType 
     * @returns 
     */
    public get(repositoryType: RepositoryType): SearchBookInfoRepositoryInterface {
        return this.repositorys[repositoryType];
    }
}