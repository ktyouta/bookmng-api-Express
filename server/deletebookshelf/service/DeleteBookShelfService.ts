import { BookIdModel } from "../../internaldata/bookinfomaster/properties/BookIdModel";
import { BookShelfInsertEntity } from "../../internaldata/bookshelf/entity/BookShelfInsertEntity";
import { BookShelfRepositorys } from "../../internaldata/bookshelf/repository/BookShelfRepositorys";
import { BookShelfRepositoryInterface } from "../../internaldata/bookshelf/repository/interface/BookShelfRepositoryInterface";
import { FrontUserIdModel } from "../../internaldata/frontuserinfomaster/properties/FrontUserIdModel";
import { JsonWebTokenVerifyModel } from "../../jsonwebtoken/model/JsonWebTokenVerifyModel";
import { FLG, RepositoryType } from "../../util/const/CommonConst";
import { DeleteBookShelfSelectEntity } from "../entity/DeleteBookShelfSelectEntity";
import { DeleteBookShelfRepositorys } from "../repository/DeleteBookShelfRepositorys";
import { DeleteBookShelfRepositoryInterface } from "../repository/interface/DeleteBookShelfRepositoryInterface";
import ENV from '../../env.json';
import { BookShelfUpdateEntity } from "../../internaldata/bookshelf/entity/BookShelfUpdateEntity";
import { ThoughtsModel } from "../../internaldata/bookshelf/properties/ThoughtsModel";
import { ApiEndopoint } from "../../router/conf/ApiEndpoint";
import { ReadStatusModel } from "../../internaldata/bookshelf/properties/ReadStatusModel";
import { BookShelfJsonModelType } from "../../internaldata/bookshelf/model/BookShelfJsonModelType";
import { DeleteFlgModel } from "../../internaldata/common/model/DeleteFlgModel";


export class DeleteBookShelfService {

    public checkJwtVerify(jwt: string) {

        try {
            const jsonWebTokenVerifyModel = new JsonWebTokenVerifyModel(jwt);

            return jsonWebTokenVerifyModel;
        } catch (err) {
            throw Error(`本棚情報更新時の認証エラー ERROR:${err}`);
        }
    }


    /**
     * 削除対象の本棚情報を取得
     * @param DeleteBookShelfRequestModel 
     * @param frontUserIdModel 
     * @returns 
     */
    public getBookShelf(bookIdModel: BookIdModel,
        frontUserIdModel: FrontUserIdModel
    ): ReadonlyArray<BookShelfJsonModelType> {

        // 永続ロジックを取得
        const DeleteBookShelfRepository: DeleteBookShelfRepositoryInterface =
            (new DeleteBookShelfRepositorys()).get(RepositoryType.JSON);

        // 本棚情報取得Entity
        const deleteBookShelfSelectEntity = new DeleteBookShelfSelectEntity(frontUserIdModel, bookIdModel);

        // 本棚情報を取得
        const bookShelfList = DeleteBookShelfRepository.select(deleteBookShelfSelectEntity);

        return bookShelfList;
    }


    /**
     * 本棚情報の永続ロジックを取得
     * @returns 
     */
    public getBookShelfRepository(): BookShelfRepositoryInterface {

        return (new BookShelfRepositorys()).get(RepositoryType.JSON);
    }


    /**
     * 本棚の書籍情報を更新する
     * @param bookShelfRepository 
     * @param DeleteBookShelfRequestModel 
     * @param frontUserIdModel 
     */
    public delete(bookShelfRepository: BookShelfRepositoryInterface,
        bookIdModel: BookIdModel,
        frontUserIdModel: FrontUserIdModel,
        bookShelfInfo: BookShelfJsonModelType) {

        const bookShelfUpdateEntity = new BookShelfUpdateEntity(
            frontUserIdModel,
            bookIdModel,
            new ThoughtsModel(bookShelfInfo.thoughts),
            new ReadStatusModel(bookShelfInfo.readStatus),
            new DeleteFlgModel(FLG.ON));

        bookShelfRepository.update(bookShelfUpdateEntity);
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