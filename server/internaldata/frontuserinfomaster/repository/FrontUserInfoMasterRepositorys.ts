import { FrontUserInfoMasterRepositoryJson } from "./concrete/FrontUserInfoMasterRepositoryJson";
import { FrontUserInfoMasterRepositoryInterface } from "./interface/FrontUserInfoMasterRepositoryInterface";


export enum RepositoryType {
    JSON,
}


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
    public select(repositoryType: RepositoryType): FrontUserInfoMasterRepositoryInterface {
        return this.repositorys[repositoryType];
    }
}