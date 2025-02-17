import { BookIdModel } from "../../internaldata/bookinfomaster/properties/BookIdModel";
import { BookShelfInsertEntity } from "../../internaldata/bookshelf/entity/BookShelfInsertEntity";
import { BookShelfRepositorys } from "../../internaldata/bookshelf/repository/BookShelfRepositorys";
import { BookShelfRepositoryInterface } from "../../internaldata/bookshelf/repository/interface/BookShelfRepositoryInterface";
import { FrontUserIdModel } from "../../internaldata/frontuserinfomaster/properties/FrontUserIdModel";
import { JsonWebTokenVerifyModel } from "../../jsonwebtoken/model/JsonWebTokenVerifyModel";
import { RepositoryType } from "../../util/const/CommonConst";
import { SearchBookShelfListRepositoryInterface } from "../repository/interface/SearchBookShelfListRepositoryInterface";
import ENV from '../../env.json';
import { BookShelfUpdateEntity } from "../../internaldata/bookshelf/entity/BookShelfUpdateEntity";
import { ThoughtsModel } from "../../internaldata/bookshelf/properties/ThoughtsModel";
import { SearchBookShelfListSelectEntity } from "../entity/SearchBookShelfListSelectEntity";
import { SearchBookShelfListRepositorys } from "../repository/SearchBookShelfListRepositorys";
import { BookShelfJsonModelType } from "../../internaldata/bookshelf/model/BookShelfJsonModelType";
import { SearchBookShelfListType } from "../model/SearchBookShelfListType";
import { SearchBookShelfQueryParamModel } from "../model/SearchBookShelfQueryParamModel";
import { SearchBookShelfRequestQueryType } from "../model/SearchBookShelfRequestQueryType";
import { ReadStatusModel } from "../../internaldata/bookshelf/properties/ReadStatusModel";
import { TitleModel } from "../../internaldata/bookinfomaster/properties/TitleModel";
import { SearchBookShelfListRequestType } from "../model/SearchBookShelfListRequestType";
import { SearchBookShelfListBookAuthorsSelectEntity } from "../entity/SearchBookShelfListBookAuthorsSelectEntity";
import { BookAuthorsMasterJsonType } from "../../internaldata/bookauthorsmaster/model/BookAuthorsMasterJsonType";
import { SearchBookShelfListAuthorsSelectEntity } from "../entity/SearchBookShelfListAuthorsSelectEntity";
import { AuthorIdModel } from "../../internaldata/authorsinfomaster/properties/AuthorIdMode";
import { AuthorsMasterJsonType } from "../../internaldata/authorsinfomaster/model/AuthorsMasterJsonType";
import { SearchBooksShelfListGoogleAuthorsCacheSelectEntity } from "../entity/SearchBooksShelfListGoogleAuthorsCacheSelectEntity";
import { GoogleBooksApiIdModel } from "../../internaldata/googlebooksapiinfocache/properties/GoogleBooksApiIdModel";
import { GoogleBooksApiAuthorsCacheJsonModelType } from "../../internaldata/googlebooksapiauthorscache/model/GoogleBooksApiAuthorsCacheJsonModelType";


export class SearchBookShelfListService {

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
     * クエリパラメータの型を変換する
     */
    public getQueryParamModel(queryParam: SearchBookShelfRequestQueryType) {

        const readStatudModel = new ReadStatusModel(queryParam.read_status ?? ``);
        const titleModel = new TitleModel(queryParam.title ?? ``);

        return new SearchBookShelfQueryParamModel(readStatudModel, titleModel);
    }


    /**
     * 本棚情報の検索条件を取得する
     * @param frontUserIdModel 
     * @returns 
     */
    public getBookShelfListSelectEntity(frontUserIdModel: FrontUserIdModel,
        queryParamModel: SearchBookShelfQueryParamModel
    ): SearchBookShelfListSelectEntity {

        const readStatudModel = queryParamModel.readStatusModel;
        const titleModel = queryParamModel.titleModel;

        return new SearchBookShelfListSelectEntity(
            frontUserIdModel,
            readStatudModel,
            titleModel,
        );
    }


    /**
     * 本棚情報を取得する
     * @param searchBookShelfListSelectEntity 
     */
    public getBookShelfList(searchBookShelfListSelectEntity: SearchBookShelfListSelectEntity)
        : ReadonlyArray<SearchBookShelfListRequestType> {

        // 永続ロジックを取得
        const searchBookShelfListRepository: SearchBookShelfListRepositoryInterface =
            (new SearchBookShelfListRepositorys()).get(RepositoryType.JSON);

        // 本棚情報を取得
        const bookShelfList = searchBookShelfListRepository.selectBookShelfList(searchBookShelfListSelectEntity);

        // レスポンス用の本棚情報を作成
        const retBookShelfList: ReadonlyArray<SearchBookShelfListRequestType> = bookShelfList.map((e: SearchBookShelfListType) => {

            const bookId = e.bookId;
            // 著者リスト
            let authorList: string[] = [];
            // 書籍著者検索条件
            const searchBookShelfListBookAuthorsSelectEntity = new SearchBookShelfListBookAuthorsSelectEntity(
                BookIdModel.reConstruct(bookId),
            );

            // 書籍著者マスタリスト取得
            const bookAuthorsList: ReadonlyArray<BookAuthorsMasterJsonType> =
                searchBookShelfListRepository.selectBookAuthorList(searchBookShelfListBookAuthorsSelectEntity);

            // 書籍著者マスタにデータが存在する場合は著者マスタから著者情報を取得する
            if (bookAuthorsList.length > 0) {

                authorList = bookAuthorsList.map((e1: BookAuthorsMasterJsonType) => {

                    const authorIdModel = AuthorIdModel.reConstruct(e1.authorId);
                    // 著者検索条件
                    const searchBookShelfListAuthorsSelectEntity = new SearchBookShelfListAuthorsSelectEntity(
                        authorIdModel
                    );

                    // 著者マスタリスト取得
                    const authorMasterList: ReadonlyArray<AuthorsMasterJsonType> =
                        searchBookShelfListRepository.selectAuthorList(searchBookShelfListAuthorsSelectEntity);

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
                    searchBookShelfListRepository.selectGoogleBooksApiAuthorsCacheList(searchBooksShelfListGoogleAuthorsCacheSelectEntity);

                authorList = googleBooksApiAuthorsCacheList.map((e1: GoogleBooksApiAuthorsCacheJsonModelType) => {
                    return e1.authorName;
                });
            }

            return {
                ...e,
                authors: authorList,
            }
        });

        return retBookShelfList;
    }
}