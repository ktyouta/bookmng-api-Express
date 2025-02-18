import { RepositoryType } from "../../util/const/CommonConst";
import { SearchBookShelfDetailRepositoryJson } from "./concrete/SearchBookShelfDetailRepositoryJson";
import { SearchBookShelfDetailRepositoryInterface } from "./interface/SearchBookShelfDetailRepositoryInterface";



/**
 * 永続ロジック用クラスの管理用
 * ロジックを追加する場合はコンストラクタ内でrepositoryに追加する
 */
export class SearchBookShelfDetailRepositorys {


    private readonly repositorys: Record<RepositoryType, SearchBookShelfDetailRepositoryInterface>;

    constructor() {

        const repositorys: Record<RepositoryType, SearchBookShelfDetailRepositoryInterface> = {
            [RepositoryType.JSON]: (new SearchBookShelfDetailRepositoryJson())
        }

        this.repositorys = repositorys;
    }


    /**
     * 永続ロジックを取得
     * @param repositoryType 
     * @returns 
     */
    public get(repositoryType: RepositoryType): SearchBookShelfDetailRepositoryInterface {
        return this.repositorys[repositoryType];
    }
}