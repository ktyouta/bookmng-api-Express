import { FLG } from "../../../util/const/CommonConst";
import { JsonFileData } from "../../../util/service/JsonFileData";
import { CreateDateModel } from "../../common/model/CreateDateModel";
import { DeleteFlgModel } from "../../common/model/DeleteFlgModel";
import { UpdateDateModel } from "../../common/model/UpdateDateModel";
import { BOOK_INFO_MASTER_FILE_PATH } from "../const/BookInfoMasterConst";
import { BookIdModel } from "../model/BookIdModel";
import { BookInfoMasterCreateModel } from "../model/BookInfoMasterCreateModel";
import { BookInfoJsonModelType } from "../model/BookInfoMasterJsonModelType";
import { BookInfoMasterModel } from "../model/BookInfoMasterModel";
import { DescriptionModel } from "../model/DescriptionModel";
import { PublishedDateModel } from "../model/PublishedDateModel";
import { TitleModel } from "../model/TitleModel";


export class BookInfoMasterService {


    /**
     * 書籍情報マスタファイルのデータを取得
     */
    public getBookInfoMaster(): BookInfoMasterModel[] {

        // 書籍情報マスタファイルからデータを取得
        const jsonBookInfoMasterList: BookInfoJsonModelType[] = JsonFileData.getFileObj(BOOK_INFO_MASTER_FILE_PATH);

        // json形式からBookInfoMasterModelに変換する
        const parsedBookInfoMasterList: BookInfoMasterModel[] = jsonBookInfoMasterList.map((e: BookInfoJsonModelType) => {
            return this.parseBookInfoMaster(e);
        });

        return parsedBookInfoMasterList;
    }


    /**
     * json形式からBookInfoMasterModelに変換する
     * @param BookInfoJsonModelType 
     */
    private parseBookInfoMaster(jsonBookInfoMaster: BookInfoJsonModelType): BookInfoMasterModel {

        const bookIdModel = BookIdModel.reConstruct(jsonBookInfoMaster.bookId);
        const titleModel = new TitleModel(jsonBookInfoMaster.title);
        const publishedDateModel = new PublishedDateModel(jsonBookInfoMaster.publishedDate);
        const descriptionModel = new DescriptionModel(jsonBookInfoMaster.description);
        const createDateModel = CreateDateModel.reConstruct(jsonBookInfoMaster.createDate, `書籍情報マスタ`);
        const updateDateModel = UpdateDateModel.reConstruct(jsonBookInfoMaster.updateDate, `書籍情報マスタ`);
        const deleteFlgModel = new DeleteFlgModel(jsonBookInfoMaster.deleteFlg);

        return new BookInfoMasterModel(
            bookIdModel,
            titleModel,
            publishedDateModel,
            descriptionModel,
            createDateModel,
            updateDateModel,
            deleteFlgModel
        );
    }


    /**
     * BookInfoMasterModelからjson形式に変換する
     * @param bookInfoMaster 
     * @returns 
     */
    private parseJsonBookInfoMaster(bookInfoMaster: BookInfoMasterModel): BookInfoJsonModelType {

        // jsonファイル登録用の型に変換する
        const jsonBookInfoMaster: BookInfoJsonModelType = {
            bookId: bookInfoMaster.bookId,
            title: bookInfoMaster.title,
            publishedDate: bookInfoMaster.publishedDate,
            description: bookInfoMaster.description,
            createDate: bookInfoMaster.createDate,
            updateDate: bookInfoMaster.updateDate,
            deleteFlg: bookInfoMaster.deleteFlg,
        };

        return jsonBookInfoMaster;
    }


    /**
     * BookInfoMasterModelからBookInfoMasterModelに変換する
     * @param bookInfoMaster 
     * @returns 
     */
    private parseCreateBookInfoMaster(bookInfoMasterCreateModel: BookInfoMasterCreateModel): BookInfoMasterModel {

        return new BookInfoMasterModel(
            bookInfoMasterCreateModel.bookIdModel,
            bookInfoMasterCreateModel.titleModel,
            bookInfoMasterCreateModel.publishedDateModel,
            bookInfoMasterCreateModel.descriptionModel,
            bookInfoMasterCreateModel.createDateModel,
            bookInfoMasterCreateModel.updateDateModel,
            bookInfoMasterCreateModel.deleteFlgModel,
        );
    }


    /**
     * 未削除の書籍情報データを取得
     * @returns 
     */
    public getActiveBookInfoMaster(bookInfoMasterList: BookInfoMasterModel[]) {

        // 未削除の書籍情報を取得
        const activeBookInfoMasterList = bookInfoMasterList.filter((e: BookInfoMasterModel) => {

            return e.deleteFlg !== FLG.ON;
        });

        return activeBookInfoMasterList;
    }


    /**
     * 書籍情報登録用データの作成
     * @param title 
     * @param publishedDate 
     * @param description 
     * @returns 
     */
    public createBookInfoMasterCreateBody(bookId: BookIdModel, title: TitleModel,
        publishedDate: PublishedDateModel, description: DescriptionModel) {

        return new BookInfoMasterCreateModel(bookId, title, publishedDate, description);
    }


    /**
     * 書籍情報マスタに対する書き込み用データの作成
     * @param bookInfoMasterCreateModel 
     */
    public createBookInfoMasterWriteData(
        bookInfoMasterList: BookInfoMasterModel[],
        bookInfoMasterCreateModel: BookInfoMasterCreateModel): BookInfoMasterModel[] {

        // jsonファイル登録用の型に変換する
        const createBookInfoMasterBody = new BookInfoMasterModel(
            bookInfoMasterCreateModel.bookIdModel,
            bookInfoMasterCreateModel.titleModel,
            bookInfoMasterCreateModel.publishedDateModel,
            bookInfoMasterCreateModel.descriptionModel,
            bookInfoMasterCreateModel.createDateModel,
            bookInfoMasterCreateModel.updateDateModel,
            bookInfoMasterCreateModel.deleteFlgModel
        );

        // 書籍情報を追加する
        bookInfoMasterList = [...bookInfoMasterList, createBookInfoMasterBody];

        return bookInfoMasterList;
    }


    /**
     * 書籍情報マスタファイルにデータを書き込む
     * @param bookInfoMasterList 
     */
    public overWriteBookInfoMaster(bookInfoMasterList: BookInfoMasterModel[]) {

        // json形式に変換する
        const jsonBookInfoMasterList = bookInfoMasterList.map((e: BookInfoMasterModel) => {
            return this.parseJsonBookInfoMaster(e);
        });

        try {

            JsonFileData.overWrite(BOOK_INFO_MASTER_FILE_PATH, jsonBookInfoMasterList);
        } catch (err) {

            throw Error(`書籍情報マスタファイルのデータ書き込み処理中にエラーが発生しました。ERROR:${err}`);
        }
    }
}