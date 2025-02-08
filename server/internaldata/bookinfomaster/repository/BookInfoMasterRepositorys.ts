import { RepositoryType } from "../../../util/const/CommonConst";
import { BookInfoMasterRepositoryJson } from "./concrete/BookInfoMasterRepositoryJson";
import { BookInfoMasterRepositoryInterface } from "./interface/BookInfoMasterRepositoryInterface";



/**
 * 永続ロジック用クラスの管理用
 * ロジックを追加する場合はコンストラクタ内でrepositorysに追加する
 */
export class BookInfoMasterRepositorys {


    private readonly repositorys: Record<RepositoryType, BookInfoMasterRepositoryInterface>;

    constructor() {

        const repositorys: Record<RepositoryType, BookInfoMasterRepositoryInterface> = {
            [RepositoryType.JSON]: (new BookInfoMasterRepositoryJson())
        }

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