import { BookIdModel } from "../../internaldata/bookinfomaster/properties/BookIdModel";
import { BookShelfInsertEntity } from "../../internaldata/bookshelf/entity/BookShelfInsertEntity";
import { BookShelfRepositorys } from "../../internaldata/bookshelf/repository/BookShelfRepositorys";
import { BookShelfRepositoryInterface } from "../../internaldata/bookshelf/repository/interface/BookShelfRepositoryInterface";
import { FrontUserIdModel } from "../../internaldata/frontuserinfomaster/properties/FrontUserIdModel";
import { JsonWebTokenVerifyModel } from "../../jsonwebtoken/model/JsonWebTokenVerifyModel";
import { RepositoryType } from "../../util/const/CommonConst";
import { UpdateBookShelfSelectEntity } from "../entity/UpdateBookShelfSelectEntity";
import { UpdateBookShelfRequestModel } from "../model/UpdateBookShelfRequestModel";
import { UpdateBookShelfRepositorys } from "../repository/UpdateBookShelfRepositorys";
import { UpdateBookShelfRepositoryInterface } from "../repository/interface/UpdateBookShelfRepositoryInterface";
import ENV from '../../env.json';
import { BookShelfUpdateEntity } from "../../internaldata/bookshelf/entity/BookShelfUpdateEntity";
import { ThoughtsModel } from "../../internaldata/bookshelf/properties/ThoughtsModel";
import { ApiEndopoint } from "../../router/conf/ApiEndpoint";
import { ReadStatusModel } from "../../internaldata/bookshelf/properties/ReadStatusModel";


export class UpdateBookShelfService {

    public checkJwtVerify(jwt: string) {

        try {
            const jsonWebTokenVerifyModel = new JsonWebTokenVerifyModel(jwt);

            return jsonWebTokenVerifyModel;
        } catch (err) {
            throw Error(`本棚情報更新時の認証エラー ERROR:${err}`);
        }
    }


    /**
     * 本棚情報の存在チェック
     * @param UpdateBookShelfRequestModel 
     * @param frontUserIdModel 
     * @returns 
     */
    public checkExistBookShelf(UpdateBookShelfRequestModel: UpdateBookShelfRequestModel,
        frontUserIdModel: FrontUserIdModel
    ) {

        // 永続ロジックを取得
        const UpdateBookShelfRepository: UpdateBookShelfRepositoryInterface =
            (new UpdateBookShelfRepositorys()).get(RepositoryType.JSON);

        // 本棚情報取得Entity
        const updateBookShelfSelectEntity = new UpdateBookShelfSelectEntity(
            frontUserIdModel, UpdateBookShelfRequestModel.bookIdModel);

        // 本棚情報を取得
        const bookShelfList = UpdateBookShelfRepository.select(updateBookShelfSelectEntity);

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
     * 本棚の書籍情報を更新する
     * @param bookShelfRepository 
     * @param UpdateBookShelfRequestModel 
     * @param frontUserIdModel 
     */
    public update(bookShelfRepository: BookShelfRepositoryInterface,
        UpdateBookShelfRequestModel: UpdateBookShelfRequestModel,
        frontUserIdModel: FrontUserIdModel) {

        const bookShelfUpdateEntity = new BookShelfUpdateEntity(
            frontUserIdModel,
            UpdateBookShelfRequestModel.bookIdModel,
            UpdateBookShelfRequestModel.thoughtsModel,
            UpdateBookShelfRequestModel.readStatusModel);

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