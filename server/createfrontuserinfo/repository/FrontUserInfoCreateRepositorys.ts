import { RepositoryType } from "../../util/const/CommonConst";
import { FrontUserInfoCreateRepositoryJson } from "./concrete/FrontUserInfoCreateRepositoryJson";
import { FrontUserInfoCreateRepositoryInterface } from "./interface/FrontUserInfoCreateRepositoryInterface";



/**
 * 永続ロジック用クラスの管理用
 * ロジックを追加する場合はコンストラクタ内でrepositorysに追加する
 */
export class FrontUserInfoCreateRepositorys {


    private readonly repositorys: Record<RepositoryType, FrontUserInfoCreateRepositoryInterface>;

    constructor() {

        const repositorys: Record<RepositoryType, FrontUserInfoCreateRepositoryInterface> = {
            [RepositoryType.JSON]: (new FrontUserInfoCreateRepositoryJson())
        }

        this.repositorys = repositorys;
    }


    /**
     * 永続ロジックを取得
     * @param repositoryType 
     * @returns 
     */
    public get(repositoryType: RepositoryType): FrontUserInfoCreateRepositoryInterface {
        return this.repositorys[repositoryType];
    }
}