import { RepositoryType } from "../../util/const/CommonConst";
import { FrontUserLoginRepositoryJson } from "./concrete/FrontUserLoginRepositoryJson";
import { FrontUserLoginRepositoryInterface } from "./interface/FrontUserLoginRepositoryInterface";



/**
 * 永続ロジック用クラスの管理用
 * ロジックを追加する場合はコンストラクタ内でrepositorysに追加する
 */
export class FrontUserLoginRepositorys {


    private readonly repositorys: Record<RepositoryType, FrontUserLoginRepositoryInterface>;

    constructor() {

        const repositorys: Record<RepositoryType, FrontUserLoginRepositoryInterface> = {
            [RepositoryType.JSON]: (new FrontUserLoginRepositoryJson())
        }

        this.repositorys = repositorys;
    }


    /**
     * 永続ロジックを取得
     * @param repositoryType 
     * @returns 
     */
    public get(repositoryType: RepositoryType): FrontUserLoginRepositoryInterface {
        return this.repositorys[repositoryType];
    }
}