import { FLG } from "../../../util/const/CommonConst";
import { JsonFileData } from "../../../util/service/JsonFileData";
import { CreateDateModel } from "../../common/model/CreateDateModel";
import { DeleteFlgModel } from "../../common/model/DeleteFlgModel";
import { UpdateDateModel } from "../../common/model/UpdateDateModel";
import { BOOK_INFO_MASTER_FILE_PATH } from "../const/BookInfoMasterConst";
import { BookIdModel } from "./BookIdModel";
import { BookInfoMasterCreateModel } from "./BookInfoMasterCreateModel";
import { BookInfoJsonModelType } from "./BookInfoMasterJsonModelType";
import { BookInfoMasterModel } from "./BookInfoMasterModel";
import { DescriptionModel } from "./DescriptionModel";
import { PublishedDateModel } from "./PublishedDateModel";
import { TitleModel } from "./TitleModel";


export class BookInfoMasterListModel {

    private readonly _bookInfoMasterModelList: ReadonlyArray<BookInfoMasterModel>;

    private constructor(bookInfoMasterModelList: BookInfoMasterModel[]) {

        this._bookInfoMasterModelList = bookInfoMasterModelList;
    }


    /**
     * getter
     */
    public get bookInfoMasterModelList() {
        return this._bookInfoMasterModelList;
    }


    /**
     * 書籍情報を取得する
     * @returns 
     */
    public static getBookInfoMasterList() {

        // 書籍情報マスタファイルからデータを取得
        const jsonBookInfoMasterList: BookInfoJsonModelType[] = JsonFileData.getFileObj(BOOK_INFO_MASTER_FILE_PATH);

        // json形式からBookInfoMasterModelに変換する
        const parsedBookInfoMasterList: BookInfoMasterModel[] = jsonBookInfoMasterList.map((e: BookInfoJsonModelType) => {
            return this.parseBookInfoMaster(e);
        });

        return new BookInfoMasterListModel(parsedBookInfoMasterList);
    }


    /**
     * json形式からBookInfoMasterModelに変換する
     * @param jsonBookInfoMaster 
     * @returns 
     */
    private static parseBookInfoMaster(jsonBookInfoMaster: BookInfoJsonModelType): BookInfoMasterModel {

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
     * 書籍情報マスタに対する書き込み用データの作成
     * @param bookInfoMasterList 
     * @param bookInfoMasterCreateModel 
     * @returns 
     */
    public createBookInfoMasterWriteData(bookInfoMasterCreateModel: BookInfoMasterCreateModel): BookInfoMasterListModel {

        // 書籍IDの重複チェック
        const filterdBookInfoById = this._bookInfoMasterModelList.find((e: BookInfoMasterModel) => {
            return e.bookIdModel.checkBookIdDuplicate(bookInfoMasterCreateModel.bookIdModel);
        });

        // 書籍IDが重複している場合
        if (filterdBookInfoById) {
            throw Error(`書籍情報が重複しています。${JSON.stringify(filterdBookInfoById)}`);
        }

        // BookInfoMasterModelに変換する
        const createBookInfoMasterBody = new BookInfoMasterModel(
            bookInfoMasterCreateModel.bookIdModel,
            bookInfoMasterCreateModel.titleModel,
            bookInfoMasterCreateModel.publishedDateModel,
            bookInfoMasterCreateModel.descriptionModel,
            bookInfoMasterCreateModel.createDateModel,
            bookInfoMasterCreateModel.updateDateModel,
            bookInfoMasterCreateModel.deleteFlgModel,
        );

        // 書籍情報を追加する
        const newBookInfoMasterList = [...this._bookInfoMasterModelList, createBookInfoMasterBody];

        return new BookInfoMasterListModel(newBookInfoMasterList);;
    }


    /**
     * タイトルと発売日に一致する書籍情報を取得する
     * @param titleModel 
     * @param publishedDateModel 
     */
    public getBookInfoFiltereByTitleAndDate(titleModel: TitleModel, publishedDateModel: PublishedDateModel): BookInfoMasterListModel {

        const booksFilteredByTitleAndDate: BookInfoMasterModel[] = this._bookInfoMasterModelList.filter((e: BookInfoMasterModel) => {
            return e.titleModel.checkTitleDuplicate(titleModel) &&
                e.publishedDateModel.checkPublishedDateDuplicate(publishedDateModel);
        });

        return new BookInfoMasterListModel(booksFilteredByTitleAndDate);
    }

}