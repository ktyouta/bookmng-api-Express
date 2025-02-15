import { RepositoryType } from "../../../util/const/CommonConst";
import { BookShelfSearchConditionRepositoryJson } from "./concrete/BookShelfSearchConditionRepositoryJson";
import { BookShelfSearchConditionRepositoryInterface } from "./interface/BookShelfSearchConditionRepositoryInterface";



/**
 * 永続ロジック用クラスの管理用
 * ロジックを追加する場合はコンストラクタ内でrepositorysに追加する
 */
export class BookShelfSearchConditionRepositorys {


    private readonly repositorys: Record<RepositoryType, BookShelfSearchConditionRepositoryInterface>;

    constructor() {

        const repositorys: Record<RepositoryType, BookShelfSearchConditionRepositoryInterface> = {
            [RepositoryType.JSON]: (new BookShelfSearchConditionRepositoryJson())
        }

        this.repositorys = repositorys;
    }


    /**
     * 永続ロジックを取得
     * @param repositoryType 
     * @returns 
     */
    public get(repositoryType: RepositoryType): BookShelfSearchConditionRepositoryInterface {
        return this.repositorys[repositoryType];
    }
}