import { RepositoryType } from "../../util/const/CommonConst";
import { BookSearchRepositoryJson } from "./concrete/BookSearchRepositoryJson";
import { BookSearchRepositoryInterface } from "./interface/BookSearchRepositoryInterface";



/**
 * 永続ロジック用クラスの管理用
 * ロジックを追加する場合はコンストラクタ内でrepositoryに追加(push)する
 */
export class BookSearchRepositorys {


    private readonly repositorys: ReadonlyArray<BookSearchRepositoryInterface>;

    constructor() {

        const repositorys: BookSearchRepositoryInterface[] = [];
        repositorys.push(new BookSearchRepositoryJson());

        this.repositorys = repositorys;
    }


    /**
     * 永続ロジックを取得
     * @param repositoryType 
     * @returns 
     */
    public get(repositoryType: RepositoryType): BookSearchRepositoryInterface {
        return this.repositorys[repositoryType];
    }
}