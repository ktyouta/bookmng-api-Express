import { RepositoryType } from "../../util/const/CommonConst";
import { CreateBookInfoRepositoryJson } from "./concrete/CreateBookInfoRepositoryJson";
import { CreateBookInfoRepositoryInterface } from "./interface/CreateBookInfoRepositoryInterface";

export class CreateBookInfoRepositorys {

    private readonly repositorys: ReadonlyArray<CreateBookInfoRepositoryInterface>;

    constructor() {

        const repositorys: CreateBookInfoRepositoryInterface[] = [];
        repositorys.push(new CreateBookInfoRepositoryJson());

        this.repositorys = repositorys;
    }


    /**
     * 永続ロジックを取得
     * @param repositoryType 
     * @returns 
     */
    public get(repositoryType: RepositoryType): CreateBookInfoRepositoryInterface {
        return this.repositorys[repositoryType];
    }
}