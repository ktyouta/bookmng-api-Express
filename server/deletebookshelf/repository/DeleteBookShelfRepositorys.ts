import { RepositoryType } from "../../util/const/CommonConst";
import { DeleteBookShelfRepositoryJson } from "./concrete/DeleteBookShelfRepositoryJson";
import { DeleteBookShelfRepositoryInterface } from "./interface/DeleteBookShelfRepositoryInterface";



/**
 * 永続ロジック用クラスの管理用
 * ロジックを追加する場合はコンストラクタ内でrepositoryに追加(push)する
 */
export class DeleteBookShelfRepositorys {


    private readonly repositorys: Record<RepositoryType, DeleteBookShelfRepositoryInterface>;

    constructor() {

        const repositorys: Record<RepositoryType, DeleteBookShelfRepositoryInterface> = {
            [RepositoryType.JSON]: (new DeleteBookShelfRepositoryJson())
        }

        this.repositorys = repositorys;
    }


    /**
     * 永続ロジックを取得
     * @param repositoryType 
     * @returns 
     */
    public get(repositoryType: RepositoryType): DeleteBookShelfRepositoryInterface {
        return this.repositorys[repositoryType];
    }
}