import { RepositoryType } from "../../util/const/CommonConst";
import { BookSearchRepositoryJson } from "./concrete/BookSearchRepositoryJson";
import { BookSearchRepositoryInterface } from "./interface/BookSearchRepositoryInterface";



/**
 * 永続ロジック用クラスの管理用
 * ロジックを追加する場合はコンストラクタ内でrepositorysに追加する
 */
export class BookSearchRepositorys {


    private readonly repositorys: Record<RepositoryType, BookSearchRepositoryInterface>;

    constructor() {

        const repositorys: Record<RepositoryType, BookSearchRepositoryInterface> = {
            [RepositoryType.JSON]: (new BookSearchRepositoryJson())
        }

        this.repositorys = repositorys;
    }


    /**
     * 永続ロジックを取得
     * @param repositoryType 
     * @returns 
     */
    public get(repositoryType: RepositoryType): BookSearchRepositoryInterface {
        return this.repositorys[repositoryType];
    }
}