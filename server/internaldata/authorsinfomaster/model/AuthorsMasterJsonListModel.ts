import { JsonFileData } from "../../../util/service/JsonFileData";
import { BOOK_INFO_MASTER_FILE_PATH } from "../../bookinfomaster/const/BookInfoMasterConst";
import { AuthorsMasterJsonType } from "./AuthorsMasterJsonType";
import { AuthorsMasterListModel } from "./AuthorsMasterListModel";
import { AuthorsMasterModel } from "./AuthorsMasterModel";

export class AuthorsMasterJsonListModel {

    private readonly _authorsJsonListModel: ReadonlyArray<AuthorsMasterJsonType>;


    constructor(authorsMasterListModel: AuthorsMasterListModel) {

        // jsonファイル登録用の型に変換する
        const jsonAuthorsMasterListModel = authorsMasterListModel.authorsMasterList.map((e: AuthorsMasterModel) => {
            return this.parseJsonAuthorsMaster(e);
        });

        this._authorsJsonListModel = jsonAuthorsMasterListModel;
    }


    /**
     * AuthorsMasterModelからjson形式に変換する
     * @param bookAuthorsMaster 
     * @returns 
     */
    private parseJsonAuthorsMaster(bookAuthorsMaster: AuthorsMasterModel): AuthorsMasterJsonType {

        // jsonファイル登録用の型に変換する
        const jsonAuthorsMaster: AuthorsMasterJsonType = {
            authorId: bookAuthorsMaster.authorId,
            authorName: bookAuthorsMaster.authorName,
            createDate: bookAuthorsMaster.createDate,
            updateDate: bookAuthorsMaster.updateDate,
            deleteFlg: bookAuthorsMaster.deleteFlg,
        };

        return jsonAuthorsMaster;
    }


    /**
     * 書籍情報マスタファイルにデータを書き込む
     * @param bookInfoMasterList 
     */
    public overWriteBookInfoMaster() {

        try {

            JsonFileData.overWrite(BOOK_INFO_MASTER_FILE_PATH, this._authorsJsonListModel);
        } catch (err) {

            throw Error(`書籍情報マスタファイルのデータ書き込み処理中にエラーが発生しました。ERROR:${err}`);
        }
    }
}