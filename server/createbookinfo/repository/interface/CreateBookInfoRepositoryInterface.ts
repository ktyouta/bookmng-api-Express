import { AuthorsMasterJsonType } from "../../../internaldata/authorsinfomaster/model/AuthorsMasterJsonType";
import { BookInfoJsonModelType } from "../../../internaldata/bookinfomaster/model/BookInfoMasterJsonModelType";
import { CreateBookInfoAuthrosSelectEntity } from "../../entity/CreateBookInfoAuthrosSelectEntity";
import { CreateBookInfoBookAuthrosSelectEntity } from "../../entity/CreateBookInfoBookAuthrosSelectEntity";

export interface CreateBookInfoRepositoryInterface {

    /**
     * 著者情報取得
     */
    selectAuthors(createBookInfoAuthrosSelectEntity: CreateBookInfoAuthrosSelectEntity): ReadonlyArray<AuthorsMasterJsonType>;

    /**
     * 書籍情報取得
     * @param createBookInfoAuthrosSelectEntity 
     */
    selectBookInfo(createBookInfoBookAuthrosSelectEntity: CreateBookInfoBookAuthrosSelectEntity): ReadonlyArray<BookInfoJsonModelType>;

}