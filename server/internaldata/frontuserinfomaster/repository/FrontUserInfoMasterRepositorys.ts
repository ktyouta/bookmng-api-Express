import { RepositoryType } from "../../../util/const/CommonConst";
import { FrontUserInfoMasterRepositoryJson } from "./concrete/FrontUserInfoMasterRepositoryJson";
import { FrontUserInfoMasterRepositoryInterface } from "./interface/FrontUserInfoMasterRepositoryInterface";



/**
 * 永続ロジック用クラスの管理用
 * ロジックを追加する場合はコンストラクタ内でrepositorysに追加する
 */
export class FrontUserInfoMasterRepositorys {


    private readonly repositorys: Record<RepositoryType, FrontUserInfoMasterRepositoryInterface>;

    constructor() {

        const repositorys: Record<RepositoryType, FrontUserInfoMasterRepositoryInterface> = {
            [RepositoryType.JSON]: (new FrontUserInfoMasterRepositoryJson())
        }

        this.repositorys = repositorys;
    }


    /**
     * 永続ロジックを取得
     * @param repositoryType 
     * @returns 
     */
    public get(repositoryType: RepositoryType): FrontUserInfoMasterRepositoryInterface {
        return this.repositorys[repositoryType];
    }
}