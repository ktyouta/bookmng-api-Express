import { RepositoryType } from "../../../util/const/CommonConst";
import { AuthorsInfoMasterRepositoryJson } from "./concrete/AuthorsInfoMasterRepositoryJson";
import { AuthorsInfoMasterRepositoryInterface } from "./interface/AuthorsInfoMasterRepositoryInterface";

export class AuthorsInfoMasterRepositorys {


    private readonly repositorys: ReadonlyArray<AuthorsInfoMasterRepositoryInterface>;

    constructor() {

        const repositorys: AuthorsInfoMasterRepositoryInterface[] = [];
        repositorys.push(new AuthorsInfoMasterRepositoryJson());

        this.repositorys = repositorys;
    }


    /**
     * 永続ロジックを取得
     * @param repositoryType 
     * @returns 
     */
    public get(repositoryType: RepositoryType): AuthorsInfoMasterRepositoryInterface {
        return this.repositorys[repositoryType];
    }
}