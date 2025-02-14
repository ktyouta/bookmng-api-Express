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


export class SearchBookShelfListService {

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
    public getBookShelfListSelectEntity(frontUserIdModel: FrontUserIdModel): SearchBookShelfListSelectEntity {

        return new SearchBookShelfListSelectEntity(
            frontUserIdModel,
        );
    }


    /**
     * 本棚情報を取得する
     * @param searchBookShelfListSelectEntity 
     */
    public getBookShelfList(searchBookShelfListSelectEntity: SearchBookShelfListSelectEntity): ReadonlyArray<SearchBookShelfListType> {

        const searchBookShelfListRepositoryInterface: SearchBookShelfListRepositoryInterface =
            (new SearchBookShelfListRepositorys()).get(RepositoryType.JSON);

        return searchBookShelfListRepositoryInterface.select(searchBookShelfListSelectEntity);
    }
}