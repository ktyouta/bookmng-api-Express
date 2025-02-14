import { RepositoryType } from "../../util/const/CommonConst";
import { SearchBookShelfListRepositoryJson } from "./concrete/SearchBookShelfListRepositoryJson";
import { SearchBookShelfListRepositoryInterface } from "./interface/SearchBookShelfListRepositoryInterface";



/**
 * 永続ロジック用クラスの管理用
 * ロジックを追加する場合はコンストラクタ内でrepositoryに追加する
 */
export class SearchBookShelfListRepositorys {


    private readonly repositorys: Record<RepositoryType, SearchBookShelfListRepositoryInterface>;

    constructor() {

        const repositorys: Record<RepositoryType, SearchBookShelfListRepositoryInterface> = {
            [RepositoryType.JSON]: (new SearchBookShelfListRepositoryJson())
        }

        this.repositorys = repositorys;
    }


    /**
     * 永続ロジックを取得
     * @param repositoryType 
     * @returns 
     */
    public get(repositoryType: RepositoryType): SearchBookShelfListRepositoryInterface {
        return this.repositorys[repositoryType];
    }
}