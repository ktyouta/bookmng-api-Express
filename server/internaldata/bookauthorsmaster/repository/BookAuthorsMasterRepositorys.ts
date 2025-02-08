import { RepositoryType } from "../../../util/const/CommonConst";
import { BookAuthorsMasterRepositoryInterface } from "./interface/BookAuthorsMasterRepositoryInterface";
import { BookAuthorsMasterRepositoryJson } from "./concrete/BookAuthorsMasterRepositoryJson";



/**
 * 永続ロジック用クラスの管理用
 * ロジックを追加する場合はコンストラクタ内でrepositoryに追加(push)する
 */
export class BookAuthorsMasterRepositorys {


    private readonly repositorys: Record<RepositoryType, BookAuthorsMasterRepositoryInterface>;

    constructor() {

        const repositorys: Record<RepositoryType, BookAuthorsMasterRepositoryInterface> = {
            [RepositoryType.JSON]: (new BookAuthorsMasterRepositoryJson())
        }

        this.repositorys = repositorys;
    }


    /**
     * 永続ロジックを取得
     * @param repositoryType 
     * @returns 
     */
    public get(repositoryType: RepositoryType): BookAuthorsMasterRepositoryInterface {
        return this.repositorys[repositoryType];
    }
}