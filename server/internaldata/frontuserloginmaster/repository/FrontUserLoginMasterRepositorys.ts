import { RepositoryType } from "../../../util/const/CommonConst";
import { FrontUserLoginMasterRepositoryJson } from "./concrete/FrontUserLoginMasterRepositoryJson";
import { FrontUserLoginMasterRepositoryInterface } from "./interface/FrontUserLoginMasterRepositoryInterface";



/**
 * 永続ロジック用クラスの管理用
 * ロジックを追加する場合はコンストラクタ内でrepositorysに追加する
 */
export class FrontUserLoginMasterRepositorys {


    private readonly repositorys: Record<RepositoryType, FrontUserLoginMasterRepositoryInterface>;

    constructor() {

        const repositorys: Record<RepositoryType, FrontUserLoginMasterRepositoryInterface> = {
            [RepositoryType.JSON]: (new FrontUserLoginMasterRepositoryJson())
        }

        this.repositorys = repositorys;
    }


    /**
     * 永続ロジックを取得
     * @param repositoryType 
     * @returns 
     */
    public get(repositoryType: RepositoryType): FrontUserLoginMasterRepositoryInterface {
        return this.repositorys[repositoryType];
    }
}