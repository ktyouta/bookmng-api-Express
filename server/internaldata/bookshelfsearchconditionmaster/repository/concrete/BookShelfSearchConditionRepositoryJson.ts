import { BOOKSHELF_FILE, BOOKSHELF_SEARCHCONDITION_FILE, MASTER_FILE_PATH, TRANSACTION_FILE_PATH } from "../../../../util/const/FileInfoConst";
import { JsonFileData } from "../../../../util/service/JsonFileData";
import { CreateDateModel } from "../../../common/model/CreateDateModel";
import { DeleteFlgModel } from "../../../common/model/DeleteFlgModel";
import { UpdateDateModel } from "../../../common/model/UpdateDateModel";
import { BookShelfSearchConditionInsertEntity } from "../../entity/BookShelfSearchConditionInsertEntity";
import { BookShelfSearchConditionUpdateEntity } from "../../entity/BookShelfSearchConditionUpdateEntity";
import { BookShelfSearchConditionJsonModelType } from "../../model/BookShelfSearchConditionJsonModelType";
import { BookShelfSearchConditionRepositoryInterface } from "../interface/BookShelfSearchConditionRepositoryInterface";


// 本棚検索条件ファイルパス
export const BOOKSHELF_FILE_PATH = `${MASTER_FILE_PATH}${BOOKSHELF_SEARCHCONDITION_FILE}`;


/**
 * json形式の永続ロジック用クラス
 */
export class BookShelfSearchConditionRepositoryJson implements BookShelfSearchConditionRepositoryInterface {

    private _bookShelfSearchConditionJsonList: ReadonlyArray<BookShelfSearchConditionJsonModelType>;

    constructor() {

        // 本棚検索条件ファイルからデータを取得
        const bookShelfSearchConditionJsonModelType: BookShelfSearchConditionJsonModelType[] = JsonFileData.getFileObj(BOOKSHELF_FILE_PATH);

        this._bookShelfSearchConditionJsonList = bookShelfSearchConditionJsonModelType;
    }


    /**
     * 本棚検索条件追加
     * @param frontBookShelfSearchConditionInfoMasterModel 
     * @returns 
     */
    public insert(bookShelfSearchConditionInsertEntity: BookShelfSearchConditionInsertEntity) {

        // IDの重複チェック
        const duplicateBookShelfSearchCondition = this._bookShelfSearchConditionJsonList.find((e: BookShelfSearchConditionJsonModelType) => {
            return e.bookShelfSearchConditionId === bookShelfSearchConditionInsertEntity.bookShelfSearchConditionId;
        });

        if (duplicateBookShelfSearchCondition) {
            throw Error(`本棚検索条件が重複してるため登録できません。`);
        }

        // jsonに変換する
        const frontBookShelfSearchConditionInfoJsonList = this.parseInsertToJson(bookShelfSearchConditionInsertEntity);

        // 本棚検索条件を追加する
        this._bookShelfSearchConditionJsonList = [...this._bookShelfSearchConditionJsonList, frontBookShelfSearchConditionInfoJsonList];
    }


    /**
     * 本棚検索条件更新
     */
    public update(bookShelfSearchConditionUpdateEntity: BookShelfSearchConditionUpdateEntity) {

        // 本棚検索条件の存在チェック
        const updateBookShelfSearchCondition = this._bookShelfSearchConditionJsonList.find((e: BookShelfSearchConditionJsonModelType) => {
            return e.bookShelfSearchConditionId === bookShelfSearchConditionUpdateEntity.bookShelfSearchConditionId;
        });

        if (!updateBookShelfSearchCondition) {
            throw Error(`更新対象の本棚検索条件が存在しません。`);
        }

        updateBookShelfSearchCondition.bookShelfSearchConditionName = bookShelfSearchConditionUpdateEntity.bookShelfSearchConditionName;
    }


    /**
     * 本棚検索条件ファイルにデータを書き込む
     */
    public commit() {

        try {
            JsonFileData.overWrite(BOOKSHELF_FILE_PATH, this._bookShelfSearchConditionJsonList);
        } catch (err) {
            throw Error(`本棚検索条件ファイルのデータ書き込み処理中にエラーが発生しました。ERROR:${err}`);
        }
    }


    /**
     * json形式に変換する
     * @param BookShelfSearchConditionInfoMaster 
     * @returns 
     */
    private parseInsertToJson(bookShelfSearchConditionInsertEntity: BookShelfSearchConditionInsertEntity): BookShelfSearchConditionJsonModelType {

        // jsonファイル登録用の型に変換する
        const jsonBookShelfSearchConditionInfoMaster: BookShelfSearchConditionJsonModelType = {
            createDate: bookShelfSearchConditionInsertEntity.createDate,
            updateDate: bookShelfSearchConditionInsertEntity.updateDate,
            deleteFlg: bookShelfSearchConditionInsertEntity.deleteFlg,
            bookShelfSearchConditionId: bookShelfSearchConditionInsertEntity.bookShelfSearchConditionId,
            bookShelfSearchConditionName: bookShelfSearchConditionInsertEntity.bookShelfSearchConditionName,
        };

        return jsonBookShelfSearchConditionInfoMaster;
    }
}