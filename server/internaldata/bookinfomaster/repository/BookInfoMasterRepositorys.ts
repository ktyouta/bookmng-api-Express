import { RepositoryType } from "../../../util/const/CommonConst";
import { BookInfoMasterRepositoryJson } from "./concrete/BookInfoMasterRepositoryJson";
import { BookInfoMasterRepositoryInterface } from "./interface/BookInfoMasterRepositoryInterface";



/**
 * 永続ロジック用クラスの管理用
 * ロジックを追加する場合はコンストラクタ内でrepositoryに追加(push)する
 */
export class BookInfoMasterRepositorys {


    private readonly repositorys: ReadonlyArray<BookInfoMasterRepositoryInterface>;

    constructor() {

        const repositorys: BookInfoMasterRepositoryInterface[] = [];
        repositorys.push(new BookInfoMasterRepositoryJson());

        this.repositorys = repositorys;
    }


    /**
     * 永続ロジックを取得
     * @param repositoryType 
     * @returns 
     */
    public get(repositoryType: RepositoryType): BookInfoMasterRepositoryInterface {
        return this.repositorys[repositoryType];
    }
}