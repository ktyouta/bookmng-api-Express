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
    public getBookShelfList(searchBookShelfListSelectEntity: SearchBookShelfListSelectEntity): ReadonlyArray<SearchBookShelfListType> {

        // 永続ロジックを取得
        const searchBookShelfListRepositoryInterface: SearchBookShelfListRepositoryInterface =
            (new SearchBookShelfListRepositorys()).get(RepositoryType.JSON);

        const bookShelfList = searchBookShelfListRepositoryInterface.selectBookShelfList(searchBookShelfListSelectEntity);

        return bookShelfList;
    }
}