import { BookIdModel } from "../../internaldata/bookinfomaster/properties/BookIdModel";
import { BookShelfInsertEntity } from "../../internaldata/bookshelf/entity/BookShelfInsertEntity";
import { BookShelfRepositorys } from "../../internaldata/bookshelf/repository/BookShelfRepositorys";
import { BookShelfRepositoryInterface } from "../../internaldata/bookshelf/repository/interface/BookShelfRepositoryInterface";
import { FrontUserIdModel } from "../../internaldata/frontuserinfomaster/properties/FrontUserIdModel";
import { JsonWebTokenVerifyModel } from "../../jsonwebtoken/model/JsonWebTokenVerifyModel";
import { RepositoryType } from "../../util/const/CommonConst";
import { CreateBookShelfSelectEntity } from "../entity/CreateBookShelfSelectEntity";
import { CreateBookShelfRequestModel } from "../model/CreateBookShelfRequestModel";
import { CreateBookShelfRepositorys } from "../repository/CreateBookShelfRepositorys";
import { CreateBookShelfRepositoryInterface } from "../repository/interface/CreateBookShelfRepositoryInterface";
import ENV from '../../env.json';
import { ThoughtsModel } from "../../internaldata/bookshelf/properties/ThoughtsModel";
import { ApiEndopoint } from "../../router/conf/ApiEndpoint";
import { ReadStatusModel } from "../../internaldata/bookshelf/properties/ReadStatusModel";


export class CreateBookShelfService {

    public checkJwtVerify(jwt: string) {

        try {
            const jsonWebTokenVerifyModel = new JsonWebTokenVerifyModel(jwt);

            return jsonWebTokenVerifyModel;
        } catch (err) {
            throw Error(`本棚情報登録時の認証エラー ERROR:${err}`);
        }
    }


    /**
     * 本棚情報の重複チェック
     * @param createBookShelfRequestModel 
     * @param frontUserIdModel 
     * @returns 
     */
    public checkDupulicateBookShelf(createBookShelfRequestModel: CreateBookShelfRequestModel,
        frontUserIdModel: FrontUserIdModel
    ) {

        // 永続ロジックを取得
        const createBookShelfRepository: CreateBookShelfRepositoryInterface =
            (new CreateBookShelfRepositorys()).get(RepositoryType.JSON);

        // 本棚情報取得Entity
        const createBookShelfSelectEntity = new CreateBookShelfSelectEntity(
            frontUserIdModel, createBookShelfRequestModel.bookIdModel);

        // 本棚情報を取得
        const bookShelfList = createBookShelfRepository.select(createBookShelfSelectEntity);

        return bookShelfList.length > 0
    }


    /**
     * 本棚情報の永続ロジックを取得
     * @returns 
     */
    public getBookShelfRepository(): BookShelfRepositoryInterface {

        return (new BookShelfRepositorys()).get(RepositoryType.JSON);
    }


    /**
     * 本棚に書籍情報を追加する
     * @param bookShelfRepository 
     * @param createBookShelfRequestModel 
     * @param frontUserIdModel 
     */
    public insert(bookShelfRepository: BookShelfRepositoryInterface,
        createBookShelfRequestModel: CreateBookShelfRequestModel,
        frontUserIdModel: FrontUserIdModel) {

        const thoughtsModel = new ThoughtsModel(``);
        const readStatus = new ReadStatusModel(``);

        const bookShelfInsertEntity = new BookShelfInsertEntity(
            frontUserIdModel,
            createBookShelfRequestModel.bookIdModel,
            thoughtsModel,
            readStatus);

        bookShelfRepository.insert(bookShelfInsertEntity);
    }


    /**
     * 本棚情報のコミット
     * @param bookShelfRepository 
     */
    public commit(bookShelfRepository: BookShelfRepositoryInterface) {

        try {
            bookShelfRepository.commit();
        } catch (err) {
            throw Error(`${err} endpoint:${ApiEndopoint.BOOKSHELF_INFO}`);
        }
    }
}