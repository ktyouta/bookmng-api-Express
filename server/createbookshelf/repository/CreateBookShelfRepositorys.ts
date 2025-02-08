import { RepositoryType } from "../../util/const/CommonConst";
import { CreateBookShelfRepositoryJson } from "./concrete/CreateBookShelfRepositoryJson";
import { CreateBookShelfRepositoryInterface } from "./interface/CreateBookShelfRepositoryInterface";



/**
 * 永続ロジック用クラスの管理用
 * ロジックを追加する場合はコンストラクタ内でrepositoryに追加(push)する
 */
export class CreateBookShelfRepositorys {


    private readonly repositorys: Record<RepositoryType, CreateBookShelfRepositoryInterface>;

    constructor() {

        const repositorys: Record<RepositoryType, CreateBookShelfRepositoryInterface> = {
            [RepositoryType.JSON]: (new CreateBookShelfRepositoryJson())
        }

        this.repositorys = repositorys;
    }


    /**
     * 永続ロジックを取得
     * @param repositoryType 
     * @returns 
     */
    public get(repositoryType: RepositoryType): CreateBookShelfRepositoryInterface {
        return this.repositorys[repositoryType];
    }
}