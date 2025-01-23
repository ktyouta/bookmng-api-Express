import { FrontUserInfoCreateRepositoryJson } from "./concrete/FrontUserInfoCreateRepositoryJson";
import { FrontUserInfoCreateRepositoryInterface } from "./interface/FrontUserInfoCreateRepositoryInterface";


/**
 * リポジトリ切り替え用
 */
export enum RepositoryType {
    JSON,
}


/**
 * 永続ロジック用クラスの管理用
 * ロジックを追加する場合はコンストラクタ内でrepositoryに追加(push)する
 */
export class FrontUserInfoCreateRepositorys {


    private readonly repositorys: ReadonlyArray<FrontUserInfoCreateRepositoryInterface>;

    constructor() {

        const repositorys: FrontUserInfoCreateRepositoryInterface[] = [];
        repositorys.push(new FrontUserInfoCreateRepositoryJson());

        this.repositorys = repositorys;
    }


    /**
     * 永続ロジックを取得
     * @param repositoryType 
     * @returns 
     */
    public select(repositoryType: RepositoryType): FrontUserInfoCreateRepositoryInterface {
        return this.repositorys[repositoryType];
    }
}