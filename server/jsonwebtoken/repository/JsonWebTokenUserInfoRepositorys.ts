import { RepositoryType } from "../../util/const/CommonConst";
import { JsonWebTokenUserInfoRepositoryJson } from "./concrete/JsonWebTokenUserInfoRepositoryJson";
import { JsonWebTokenUserInfoRepositoryInterface } from "./interface/JsonWebTokenUserInfoRepositoryInterface";



/**
 * 永続ロジック用クラスの管理用
 * ロジックを追加する場合はコンストラクタ内でrepositoryに追加(push)する
 */
export class JsonWebTokenUserInfoRepositorys {


    private readonly repositorys: ReadonlyArray<JsonWebTokenUserInfoRepositoryInterface>;

    constructor() {

        const repositorys: JsonWebTokenUserInfoRepositoryInterface[] = [];
        repositorys.push(new JsonWebTokenUserInfoRepositoryJson());

        this.repositorys = repositorys;
    }


    /**
     * 永続ロジックを取得
     * @param repositoryType 
     * @returns 
     */
    public get(repositoryType: RepositoryType): JsonWebTokenUserInfoRepositoryInterface {
        return this.repositorys[repositoryType];
    }
}