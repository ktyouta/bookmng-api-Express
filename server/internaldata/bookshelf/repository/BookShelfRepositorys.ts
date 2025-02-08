import { RepositoryType } from "../../../util/const/CommonConst";
import { BookShelfRepositoryJson } from "./concrete/BookShelfRepositoryJson";
import { BookShelfRepositoryInterface } from "./interface/BookShelfRepositoryInterface";



/**
 * 永続ロジック用クラスの管理用
 * ロジックを追加する場合はコンストラクタ内でrepositorysに追加する
 */
export class BookShelfRepositorys {


    private readonly repositorys: Record<RepositoryType, BookShelfRepositoryInterface>;

    constructor() {

        const repositorys: Record<RepositoryType, BookShelfRepositoryInterface> = {
            [RepositoryType.JSON]: (new BookShelfRepositoryJson())
        }

        this.repositorys = repositorys;
    }


    /**
     * 永続ロジックを取得
     * @param repositoryType 
     * @returns 
     */
    public get(repositoryType: RepositoryType): BookShelfRepositoryInterface {
        return this.repositorys[repositoryType];
    }
}