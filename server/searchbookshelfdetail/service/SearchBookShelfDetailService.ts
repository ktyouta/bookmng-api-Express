import { BookIdModel } from "../../internaldata/bookinfomaster/properties/BookIdModel";
import { BookShelfInsertEntity } from "../../internaldata/bookshelf/entity/BookShelfInsertEntity";
import { BookShelfRepositorys } from "../../internaldata/bookshelf/repository/BookShelfRepositorys";
import { BookShelfRepositoryInterface } from "../../internaldata/bookshelf/repository/interface/BookShelfRepositoryInterface";
import { FrontUserIdModel } from "../../internaldata/frontuserinfomaster/properties/FrontUserIdModel";
import { JsonWebTokenVerifyModel } from "../../jsonwebtoken/model/JsonWebTokenVerifyModel";
import { RepositoryType } from "../../util/const/CommonConst";
import { SearchBookShelfDetailRepositoryInterface } from "../repository/interface/SearchBookShelfDetailRepositoryInterface";
import ENV from '../../env.json';
import { BookShelfUpdateEntity } from "../../internaldata/bookshelf/entity/BookShelfUpdateEntity";
import { ThoughtsModel } from "../../internaldata/bookshelf/properties/ThoughtsModel";
import { SearchBookShelfDetailSelectEntity } from "../entity/SearchBookShelfDetailSelectEntity";
import { SearchBookShelfDetailRepositorys } from "../repository/SearchBookShelfDetailRepositorys";
import { BookShelfJsonModelType } from "../../internaldata/bookshelf/model/BookShelfJsonModelType";
import { SearchBookShelfDetailType } from "../model/SearchBookShelfDetailType";
import { ReadStatusModel } from "../../internaldata/bookshelf/properties/ReadStatusModel";
import { TitleModel } from "../../internaldata/bookinfomaster/properties/TitleModel";
import { SearchBookShelfDetailResponseType } from "../model/SearchBookShelfDetailResponseType";
import { SearchBookShelfDetailBookAuthorsSelectEntity } from "../entity/SearchBookShelfDetailBookAuthorsSelectEntity";
import { BookAuthorsMasterJsonType } from "../../internaldata/bookauthorsmaster/model/BookAuthorsMasterJsonType";
import { SearchBookShelfDetailAuthorsSelectEntity } from "../entity/SearchBookShelfDetailAuthorsSelectEntity";
import { AuthorIdModel } from "../../internaldata/authorsinfomaster/properties/AuthorIdMode";
import { AuthorsMasterJsonType } from "../../internaldata/authorsinfomaster/model/AuthorsMasterJsonType";
import { SearchBooksShelfListGoogleAuthorsCacheSelectEntity } from "../entity/SearchBooksShelfDetailGoogleAuthorsCacheSelectEntity";
import { GoogleBooksApiIdModel } from "../../internaldata/googlebooksapiinfocache/properties/GoogleBooksApiIdModel";
import { GoogleBooksApiAuthorsCacheJsonModelType } from "../../internaldata/googlebooksapiauthorscache/model/GoogleBooksApiAuthorsCacheJsonModelType";
import { SearchBookShelfDetailThoughtType } from "../model/SearchBookShelfDetailThoughtType";
import { SearchBookShelfDetailThoughtSelectEntity } from "../entity/SearchBookShelfDetailThoughtSelectEntity";


export class SearchBookShelfDetailService {

    /**
     * jwtの認証を実行する
     * @param jwt 
     * @returns 
     */
    public checkJwtVerify(jwt: string) {

        try {
            const jsonWebTokenVerifyModel = new JsonWebTokenVerifyModel(jwt);

            return jsonWebTokenVerifyModel;
        } catch (err) {
            throw Error(`本棚情報取得時の認証エラー ERROR:${err}`);
        }
    }


    /**
     * 本棚情報を取得する
     * @param searchBookShelfDetailSelectEntity 
     */
    public getBookShelfDetail(frontUserIdModel: FrontUserIdModel,
        bookIdModel: BookIdModel): ReadonlyArray<SearchBookShelfDetailResponseType> {

        // 永続ロジックを取得
        const searchBookShelfDetailRepository: SearchBookShelfDetailRepositoryInterface =
            (new SearchBookShelfDetailRepositorys()).get(RepositoryType.JSON);

        // 本棚詳細取得条件
        const searchBookShelfDetailSelectEntity: SearchBookShelfDetailSelectEntity = new SearchBookShelfDetailSelectEntity(
            frontUserIdModel,
            bookIdModel,
        );

        // 本棚情報を取得
        const bookShelfList: ReadonlyArray<SearchBookShelfDetailType> =
            searchBookShelfDetailRepository.selectBookShelfDetail(searchBookShelfDetailSelectEntity);

        // レスポンス用の本棚情報を作成
        const retBookShelfDetail: ReadonlyArray<SearchBookShelfDetailResponseType> = bookShelfList.map((e: SearchBookShelfDetailType) => {

            // 書籍ID
            const bookId = e.bookId;
            const bookIdModel = BookIdModel.reConstruct(bookId);
            // 著者リスト
            let authorList: string[] = [];

            // 書籍著者検索条件
            const searchBookShelfDetailBookAuthorsSelectEntity = new SearchBookShelfDetailBookAuthorsSelectEntity(
                bookIdModel,
            );

            // 書籍著者マスタリスト取得
            const bookAuthorsList: ReadonlyArray<BookAuthorsMasterJsonType> =
                searchBookShelfDetailRepository.selectBookAuthorList(searchBookShelfDetailBookAuthorsSelectEntity);

            // 書籍著者マスタにデータが存在する場合は著者マスタから著者情報を取得する
            if (bookAuthorsList.length > 0) {

                authorList = bookAuthorsList.map((e1: BookAuthorsMasterJsonType) => {

                    const authorIdModel = AuthorIdModel.reConstruct(e1.authorId);
                    // 著者検索条件
                    const searchBookShelfDetailAuthorsSelectEntity = new SearchBookShelfDetailAuthorsSelectEntity(
                        authorIdModel
                    );

                    // 著者マスタリスト取得
                    const authorMasterList: ReadonlyArray<AuthorsMasterJsonType> =
                        searchBookShelfDetailRepository.selectAuthorList(searchBookShelfDetailAuthorsSelectEntity);

                    if (authorMasterList.length === 0) {
                        return;
                    }

                    return authorMasterList[0].authorName;
                }).flatMap((e1) => {
                    return e1 ? [e1] : []
                });
            }
            // 書籍マスタにデータが存在しない場合はGoogle Books Apiのキャッシュから著者情報を取得する
            else {

                const googleBooksApiIdModel = new GoogleBooksApiIdModel(bookId);
                // Google Books Api著者キャッシュ検索条件
                const searchBooksShelfListGoogleAuthorsCacheSelectEntity = new SearchBooksShelfListGoogleAuthorsCacheSelectEntity(
                    googleBooksApiIdModel
                );

                // Google Books Api著者キャッシュ情報を取得
                const googleBooksApiAuthorsCacheList: ReadonlyArray<GoogleBooksApiAuthorsCacheJsonModelType> =
                    searchBookShelfDetailRepository.selectGoogleBooksApiAuthorsCacheList(searchBooksShelfListGoogleAuthorsCacheSelectEntity);

                authorList = googleBooksApiAuthorsCacheList.map((e1: GoogleBooksApiAuthorsCacheJsonModelType) => {
                    return e1.authorName;
                });
            }

            // レビューリスト検索条件
            const searchBookShelfDetailThoughtSelectEntity = new SearchBookShelfDetailThoughtSelectEntity(
                bookIdModel
            );

            // レビューリスト
            const thoughtList: ReadonlyArray<SearchBookShelfDetailThoughtType> =
                searchBookShelfDetailRepository.selectThoughtList(searchBookShelfDetailThoughtSelectEntity);

            return {
                ...e,
                authors: authorList,
                thoughtList: thoughtList
            }
        });

        return retBookShelfDetail;
    }
}