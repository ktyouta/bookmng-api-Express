import { RepositoryType } from "../../../util/const/CommonConst";
import { GoogleBooksApiAccessHistoryRepositoryJson } from "./concrete/GoogleBooksApiAccessHistoryRepositoryJson";
import { GoogleBooksApiAccessHistoryRepositoryInterface } from "./interface/GoogleBooksApiAccessHistoryRepositoryInterface";



/**
 * 永続ロジック用クラスの管理用
 * ロジックを追加する場合はコンストラクタ内でrepositoryに追加(push)する
 */
export class GoogleBooksApiAccessHistoryRepositorys {


    private readonly repositorys: ReadonlyArray<GoogleBooksApiAccessHistoryRepositoryInterface>;

    constructor() {

        const repositorys: GoogleBooksApiAccessHistoryRepositoryInterface[] = [];
        repositorys.push(new GoogleBooksApiAccessHistoryRepositoryJson());

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