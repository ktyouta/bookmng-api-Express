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
     * 本棚情報の検索条件を取得する
     * @param frontUserIdModel 
     * @returns 
     */
    public getBookShelfDetailSelectEntity(frontUserIdModel: FrontUserIdModel,
        bookIdModel: BookIdModel
    ): SearchBookShelfDetailSelectEntity {

        return new SearchBookShelfDetailSelectEntity(
            frontUserIdModel,
            bookIdModel,
        );
    }


    /**
     * 本棚情報を取得する
     * @param searchBookShelfDetailSelectEntity 
     */
    public getBookShelfDetail(searchBookShelfDetailSelectEntity: SearchBookShelfDetailSelectEntity)
        : ReadonlyArray<SearchBookShelfDetailResponseType> {

        // 永続ロジックを取得
        const searchBookShelfDetailRepository: SearchBookShelfDetailRepositoryInterface =
            (new SearchBookShelfDetailRepositorys()).get(RepositoryType.JSON);

        // 本棚情報を取得
        const bookShelfList = searchBookShelfDetailRepository.selectBookShelfDetail(searchBookShelfDetailSelectEntity);

        // レスポンス用の本棚情報を作成
        const retBookShelfDetail: ReadonlyArray<SearchBookShelfDetailResponseType> = bookShelfList.map((e: SearchBookShelfDetailType) => {

            const bookId = e.bookId;
            // 著者リスト
            let authorList: string[] = [];
            // レビューリスト
            const thoughtList: SearchBookShelfDetailThoughtType[] = [];

            // 書籍著者検索条件
            const searchBookShelfDetailBookAuthorsSelectEntity = new SearchBookShelfDetailBookAuthorsSelectEntity(
                BookIdModel.reConstruct(bookId),
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

                const googleBooksApiIdModel = new GoogleBooksApiIdModel(e.bookId);
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

            return {
                ...e,
                authors: authorList,
                thoughtList: thoughtList
            }
        });

        return retBookShelfDetail;
    }
}