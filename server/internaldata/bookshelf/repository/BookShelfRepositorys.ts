import { RepositoryType } from "../../../util/const/CommonConst";
import { BookShelfRepositoryJson } from "./concrete/BookShelfRepositoryJson";
import { BookShelfRepositoryInterface } from "./interface/BookShelfRepositoryInterface";



/**
 * 永続ロジック用クラスの管理用
 * ロジックを追加する場合はコンストラクタ内でrepositoryに追加(push)する
 */
export class BookShelfRepositorys {


    private readonly repositorys: ReadonlyArray<BookShelfRepositoryInterface>;

    constructor() {

        const repositorys: BookShelfRepositoryInterface[] = [];
        repositorys.push(new BookShelfRepositoryJson());

        this.repositorys = repositorys;
    }


    /**
     * 永続ロジックを取得
     * @param repositoryType 
     * @returns 
     */
    public get(repositoryType: RepositoryType): BookShelfRepositoryInterface {
        return this.repositorys[repositoryType];
    }
}