import { RepositoryType } from "../../util/const/CommonConst";
import { UpdateBookShelfRepositoryJson } from "./concrete/UpdateBookShelfRepositoryJson";
import { UpdateBookShelfRepositoryInterface } from "./interface/UpdateBookShelfRepositoryInterface";



/**
 * 永続ロジック用クラスの管理用
 * ロジックを追加する場合はコンストラクタ内でrepositoryに追加(push)する
 */
export class UpdateBookShelfRepositorys {


    private readonly repositorys: Record<RepositoryType, UpdateBookShelfRepositoryInterface>;

    constructor() {

        const repositorys: Record<RepositoryType, UpdateBookShelfRepositoryInterface> = {
            [RepositoryType.JSON]: (new UpdateBookShelfRepositoryJson())
        }

        this.repositorys = repositorys;
    }


    /**
     * 永続ロジックを取得
     * @param repositoryType 
     * @returns 
     */
    public get(repositoryType: RepositoryType): UpdateBookShelfRepositoryInterface {
        return this.repositorys[repositoryType];
    }
}