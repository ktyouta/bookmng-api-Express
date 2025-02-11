import { BookIdModel } from "../../internaldata/bookinfomaster/properties/BookIdModel";
import { BookInfoJsonModelType } from "../../internaldata/bookinfomaster/model/BookInfoMasterJsonModelType";
import { ArrayUtil } from "../../util/service/ArrayUtil";
import ENV from '../../env.json';
import { BookInfoMasterModel } from "../../internaldata/bookinfomaster/model/BookInfoMasterModel";
import { BookInfoCreateRequestType } from "../model/BookInfoCreateRequestType";
import { BookInfoCreateRequestModel } from "../model/BookInfoCreateRequestModel";
import { TitleModel } from "../../internaldata/bookinfomaster/properties/TitleModel";
import { PublishedDateModel } from "../../internaldata/bookinfomaster/properties/PublishedDateModel";
import { AuthorIdModel } from "../../internaldata/authorsinfomaster/properties/AuthorIdMode";
import { BookAuthorsMasterModel } from "../../internaldata/bookauthorsmaster/model/BookAuthorsMasterModel";
import { AuthorsMasterModel } from "../../internaldata/authorsinfomaster/model/AuthorsMasterModel";
import { FLG, RepositoryType } from "../../util/const/CommonConst";
import { CreateBookInfoRepositorys } from "../repository/CreateBookInfoRepositorys";
import { CreateBookInfoRepositoryInterface } from "../repository/interface/CreateBookInfoRepositoryInterface";
import { CreateBookInfoAuthrosSelectEntity } from "../entity/CreateBookInfoAuthrosSelectEntity";
import { AuthorsMasterJsonType } from "../../internaldata/authorsinfomaster/model/AuthorsMasterJsonType";
import { CreateBookInfoBookAuthrosSelectEntity } from "../entity/CreateBookInfoBookAuthrosSelectEntity";
import { BookInfoMasterInsertEntity } from "../../internaldata/bookinfomaster/entity/BookInfoMasterInsertEntity";
import { BookInfoMasterRepositoryInterface } from "../../internaldata/bookinfomaster/repository/interface/BookInfoMasterRepositoryInterface";
import { BookInfoMasterRepositorys } from "../../internaldata/bookinfomaster/repository/BookInfoMasterRepositorys";
import { BookAuthorsMasterRepositorys } from "../../internaldata/bookauthorsmaster/repository/BookAuthorsMasterRepositorys";
import { BookAuthorsMasterRepositoryInterface } from "../../internaldata/bookauthorsmaster/repository/interface/BookAuthorsMasterRepositoryInterface";
import { BookAuthorsMasterInsertEntity } from "../../internaldata/bookauthorsmaster/entity/BookAuthorsMasterInsertEntity";
import { DeleteFlgModel } from "../../internaldata/common/model/DeleteFlgModel";


export class CreateBookInfoService {


    /**
     * リクエストボディを型変換
     * @param requestBody 
     */
    public parseRequestBody(requestBody: BookInfoCreateRequestType): BookInfoCreateRequestModel {

        return new BookInfoCreateRequestModel(requestBody);
    }


    /**
     * リクエストボディから書籍情報登録用のデータを作成する
     * @param title 
     * @param publishedDate 
     * @param description 
     */
    public createBookInfoMasterCreateBody(bookId: BookIdModel, requestBody: BookInfoCreateRequestModel): BookInfoMasterInsertEntity {

        return new BookInfoMasterInsertEntity(
            bookId,
            requestBody.titleModel,
            requestBody.publishedDateModel,
            requestBody.descriptionModel
        );
    }


    /**
     * リクエストボディから書籍著者情報登録用のデータを作成する
     * @param bookId 
     * @param authorId 
     * @returns 
     */
    public createBookAuthorsMasterCreateBody(bookIdModel: BookIdModel, requestBody: BookInfoCreateRequestModel)
        : BookAuthorsMasterInsertEntity[] {

        return requestBody.authorIdListModel.map((e: AuthorIdModel) => {
            return new BookAuthorsMasterInsertEntity(bookIdModel, e);
        })
    }


    /**
     * 著者マスタからデータを取得
     */
    public checkExistAuthor(createBookInfoRepositorys: CreateBookInfoRepositoryInterface,
        parsedRequestBody: BookInfoCreateRequestModel): boolean {

        // select用のentityを作成
        const createBookInfoAuthrosSelectEntity: CreateBookInfoAuthrosSelectEntity =
            new CreateBookInfoAuthrosSelectEntity(
                parsedRequestBody.authorIdListModel,
                new DeleteFlgModel(FLG.OFF),
            );

        // データを取得
        const selectedAuthorsList = createBookInfoRepositorys.selectAuthors(createBookInfoAuthrosSelectEntity);

        return selectedAuthorsList.length > 0;
    }


    /**
     * 書籍情報の重複チェック
     * @param acticeBookInfoMasterList 
     * @param activeBookAuthorsMasterList 
     * @param requestBody 
     */
    public checkBookInfoExists(createBookInfoRepositorys: CreateBookInfoRepositoryInterface,
        parsedRequestBody: BookInfoCreateRequestModel): boolean {

        // select用のentityを作成
        const createBookInfoBookAuthrosSelectEntity: CreateBookInfoBookAuthrosSelectEntity =
            new CreateBookInfoBookAuthrosSelectEntity(
                parsedRequestBody.titleModel,
                parsedRequestBody.publishedDateModel,
                parsedRequestBody.authorIdListModel,
                new DeleteFlgModel(FLG.OFF),
                new DeleteFlgModel(FLG.OFF),
            );

        // データを取得
        const selectedAuthorsList = createBookInfoRepositorys.selectBookInfo(createBookInfoBookAuthrosSelectEntity);

        return selectedAuthorsList.length > 0;
    }


    /**
     * 永続ロジック用オブジェクトを取得
     * @returns 
     */
    public getCreateBookInfoRepository(): CreateBookInfoRepositoryInterface {

        const createBookInfoRepositorys = new CreateBookInfoRepositorys();

        return createBookInfoRepositorys.get(RepositoryType.JSON);
    }


    /**
     * 書籍情報の永続ロジック用オブジェクトを取得
     * @returns 
     */
    public getBookInfoMasterRepository(): BookInfoMasterRepositoryInterface {

        const bookInfoMasterRepositorys = new BookInfoMasterRepositorys();

        return bookInfoMasterRepositorys.get(RepositoryType.JSON);
    }

    /**
     * 書籍情報の永続ロジック用オブジェクトを取得
     * @returns 
     */
    public getBookAuthorsMasterRepository(): BookAuthorsMasterRepositoryInterface {

        const bookAuthorsMasterRepositorys = new BookAuthorsMasterRepositorys();

        return bookAuthorsMasterRepositorys.get(RepositoryType.JSON);
    }


    // 書籍著者情報にデータを追加する
    public insert(bookAuthorsMasterRepository: BookAuthorsMasterRepositoryInterface,
        bookAuthorsMasterCareteBody: BookAuthorsMasterInsertEntity[]) {

        bookAuthorsMasterCareteBody.forEach((e: BookAuthorsMasterInsertEntity) => {
            bookAuthorsMasterRepository.insert(e);
        });
    }


    /**
     * コミットする
     * @param bookInfoMasterList 
     */
    public commit(bookInfoMasterRepository: BookInfoMasterRepositoryInterface,
        bookAuthorsMasterRepository: BookAuthorsMasterRepositoryInterface
    ) {

        try {
            bookInfoMasterRepository.commit();
            bookAuthorsMasterRepository.commit();
        } catch (err) {
            throw Error(`${err} endpoint:${ENV.BOOK_INFO}`);
        }
    }
}