import { RepositoryType } from "../../../util/const/CommonConst";
import { GoogleBooksApiSmallThumbnailCacheRepositoryInterface } from "../../googlebooksapismallthumbnailcache/repository/interface/GoogleBooksApiSmallThumbnailCacheRepositoryInterface";
import { GoogleBooksApiThumbnailCacheRepositoryJson } from "./concrete/GoogleBooksApiThumbnailCacheRepositoryJson";



/**
 * 永続ロジック用クラスの管理用
 * ロジックを追加する場合はコンストラクタ内でrepositoryに追加(push)する
 */
export class GoogleBooksApiThumbnailCacheRepositorys {


    private readonly repositorys: ReadonlyArray<GoogleBooksApiThumbnailCacheRepositoryJson>;

    constructor() {

        const repositorys: GoogleBooksApiThumbnailCacheRepositoryJson[] = [];
        repositorys.push(new GoogleBooksApiThumbnailCacheRepositoryJson());

        this.repositorys = repositorys;
    }


    /**
     * 永続ロジックを取得
     * @param repositoryType 
     * @returns 
     */
    public get(repositoryType: RepositoryType): GoogleBooksApiThumbnailCacheRepositoryJson {
        return this.repositorys[repositoryType];
    }
}