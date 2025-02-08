import { RepositoryType } from "../../../util/const/CommonConst";
import { GoogleBooksApiAccessHistoryRepositoryJson } from "./concrete/GoogleBooksApiAccessHistoryRepositoryJson";
import { GoogleBooksApiAccessHistoryRepositoryInterface } from "./interface/GoogleBooksApiAccessHistoryRepositoryInterface";



/**
 * 永続ロジック用クラスの管理用
 * ロジックを追加する場合はコンストラクタ内でrepositorysに追加する
 */
export class GoogleBooksApiAccessHistoryRepositorys {


    private readonly repositorys: Record<RepositoryType, GoogleBooksApiAccessHistoryRepositoryInterface>;

    constructor() {

        const repositorys: Record<RepositoryType, GoogleBooksApiAccessHistoryRepositoryInterface> = {
            [RepositoryType.JSON]: (new GoogleBooksApiAccessHistoryRepositoryJson())
        }

        this.repositorys = repositorys;
    }


    /**
     * 永続ロジックを取得
     * @param repositoryType 
     * @returns 
     */
    public get(repositoryType: RepositoryType): GoogleBooksApiAccessHistoryRepositoryInterface {
        return this.repositorys[repositoryType];
    }
}