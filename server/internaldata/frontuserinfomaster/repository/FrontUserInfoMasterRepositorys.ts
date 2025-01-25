import { RepositoryType } from "../../../util/const/CommonConst";
import { FrontUserInfoMasterRepositoryJson } from "./concrete/FrontUserInfoMasterRepositoryJson";
import { FrontUserInfoMasterRepositoryInterface } from "./interface/FrontUserInfoMasterRepositoryInterface";



/**
 * 永続ロジック用クラスの管理用
 * ロジックを追加する場合はコンストラクタ内でrepositoryに追加(push)する
 */
export class FrontUserInfoMasterRepositorys {


    private readonly repositorys: ReadonlyArray<FrontUserInfoMasterRepositoryInterface>;

    constructor() {

        const repositorys: FrontUserInfoMasterRepositoryInterface[] = [];
        repositorys.push(new FrontUserInfoMasterRepositoryJson());

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