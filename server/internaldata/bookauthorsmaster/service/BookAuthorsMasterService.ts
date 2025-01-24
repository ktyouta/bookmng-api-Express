import { FLG } from "../../../util/const/CommonConst";
import { JsonFileData } from "../../../util/service/JsonFileData";
import { AuthorIdModel } from "../../authorsinfomaster/properties/AuthorIdMode";
import { BookIdModel } from "../../bookinfomaster/model/BookIdModel";
import { BookInfoMasterCreateModel } from "../../bookinfomaster/model/BookInfoMasterCreateModel";
import { BookInfoMasterModel } from "../../bookinfomaster/model/BookInfoMasterModel";
import { CreateDateModel } from "../../common/model/CreateDateModel";
import { DeleteFlgModel } from "../../common/model/DeleteFlgModel";
import { UpdateDateModel } from "../../common/model/UpdateDateModel";
import { BOOK_AUTHROS_MASTER_FILE_PATH } from "../const/BookAuthrosMasterConst";
import { BookAuthorsMasterCreateModel } from "../model/BookAuthorsMasterCreateModel";
import { BookAuthorsMasterJsonType } from "../model/BookAuthorsMasterJsonType";
import { BookAuthorsMasterModel } from "../model/BookAuthorsMasterModel";


export class BookAuthorsMasterService {


    /**
     * 書籍著者マスタファイルのデータを取得
     */
    public getBookAuthorsMaster(): BookAuthorsMasterModel[] {

        // 書籍著者マスタファイルからデータを取得
        const bookAuthorsMasterList: BookAuthorsMasterJsonType[] = JsonFileData.getFileObj(BOOK_AUTHROS_MASTER_FILE_PATH);

        // json形式からBookInfoMasterModelに変換する
        const parsedBookAuthorsMasterList: BookAuthorsMasterModel[] = bookAuthorsMasterList.map((e: BookAuthorsMasterJsonType) => {
            return this.parseBookAuthorsMaster(e);
        });

        return parsedBookAuthorsMasterList;
    }


    /**
     * json形式からBookAuthorsMasterModelに変換する
     * @param jsonBookAuthorsMaster 
     * @returns 
     */
    private parseBookAuthorsMaster(jsonBookAuthorsMaster: BookAuthorsMasterJsonType): BookAuthorsMasterModel {

        const bookIdModel = BookIdModel.reConstruct(jsonBookAuthorsMaster.bookId);
        const authorIdModel = AuthorIdModel.reConstruct(jsonBookAuthorsMaster.authorId);
        const createDate = CreateDateModel.reConstruct(jsonBookAuthorsMaster.createDate, `書籍著者マスタ`);
        const updateDate = UpdateDateModel.reConstruct(jsonBookAuthorsMaster.updateDate, `書籍著者マスタ`);
        const deleteFlgModel = new DeleteFlgModel(jsonBookAuthorsMaster.deleteFlg);

        return new BookAuthorsMasterModel(
            bookIdModel,
            authorIdModel,
            createDate,
            updateDate,
            deleteFlgModel
        );
    }


    /**
     * BookAuthorsMasterModelからjson形式に変換する
     * @param bookAuthorsMaster 
     * @returns 
     */
    private parseJsonBookAuthorsMaster(bookAuthorsMaster: BookAuthorsMasterModel): BookAuthorsMasterJsonType {

        // jsonファイル登録用の型に変換する
        const jsonBookAuthorsMaster: BookAuthorsMasterJsonType = {
            bookId: bookAuthorsMaster.bookId,
            authorId: bookAuthorsMaster.authorId,
            createDate: bookAuthorsMaster.createDate,
            updateDate: bookAuthorsMaster.updateDate,
            deleteFlg: bookAuthorsMaster.deleteFlg,
        };

        return jsonBookAuthorsMaster;
    }


    /**
     * BookAuthorsMasterCreateModelからBookAuthorsMasterModel形式に変換する
     * @param bookAuthorsMaster 
     * @returns 
     */
    private parseCreateBookInfoMaster(bookAuthorsMasterCreateModel: BookAuthorsMasterCreateModel): BookAuthorsMasterModel {

        return new BookAuthorsMasterModel(
            bookAuthorsMasterCreateModel.bookIdModel,
            bookAuthorsMasterCreateModel.authorIdModel,
            bookAuthorsMasterCreateModel.createDateModel,
            bookAuthorsMasterCreateModel.updateDateModel,
            bookAuthorsMasterCreateModel.deleteFlgModel,
        );
    }


    /**
     * 未削除の書籍著者マスタデータを取得
     * @returns 
     */
    public getActiveBookAuthorsMaster(bookAuthorsMasterList: BookAuthorsMasterModel[]) {

        // 書籍著者マスタファイルからデータを取得
        const activeBookAuthorsMasterList: BookAuthorsMasterModel[] = bookAuthorsMasterList.filter((e: BookAuthorsMasterModel) => {

            return e.deleteFlg !== FLG.ON;
        });

        return activeBookAuthorsMasterList;
    }


    /**
     * 書籍著者登録用データの作成
     * @param bookId 
     * @param authorId 
     * @returns 
     */
    public createBookAuthorsMasterCreateBody(bookId: BookIdModel, authorId: AuthorIdModel): BookAuthorsMasterCreateModel {

        return new BookAuthorsMasterCreateModel(bookId, authorId);
    }


    /**
     * 書籍著者情報マスタに対する書き込み用データの作成
     * @param bookAuthorsMasterList 
     * @param bookInfoMasterCreateModel 
     * @returns 
     */
    public createBookInfoMasterWriteData(
        bookAuthorsMasterList: BookAuthorsMasterModel[],
        bookAuthorsMasterCreateModelList: BookAuthorsMasterCreateModel[]): BookAuthorsMasterModel[] {

        // BookAuthorsMasterModelに変換する
        const createBookInfoMasterBodyList: BookAuthorsMasterModel[] =
            bookAuthorsMasterCreateModelList.map((e: BookAuthorsMasterCreateModel) => {
                return this.parseCreateBookInfoMaster(e);
            });

        // 書籍著者情報を追加する
        bookAuthorsMasterList = [...bookAuthorsMasterList, ...createBookInfoMasterBodyList];

        return bookAuthorsMasterList;
    }


    /**
     * 書籍著者情報マスタファイルにデータを書き込む
     * @param bookAuthorsMasterList 
     */
    public overWriteBookAuthorsMaster(bookAuthorsMasterList: BookAuthorsMasterModel[]) {

        // json形式に変換する
        const jsonBookAuthorsMasterList: BookAuthorsMasterJsonType[] = bookAuthorsMasterList.map((e: BookAuthorsMasterModel) => {
            return this.parseJsonBookAuthorsMaster(e);
        });

        try {

            JsonFileData.overWrite(BOOK_AUTHROS_MASTER_FILE_PATH, jsonBookAuthorsMasterList);
        } catch (err) {

            throw Error(`書籍著者情報マスタファイルのデータ書き込み中にエラーが発生しました。ERROR:${err}`);
        }
    }
}