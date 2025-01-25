import { AUTHORS_MASTER_FILE, MASTER_FILE_PATH } from "../../../../util/const/FileInfoConst";
import { JsonFileData } from "../../../../util/service/JsonFileData";
import { AuthorsInfoMasterInsertEntity } from "../../entity/AuthorsInfoMasterInsertEntity";
import { AuthorsInfoMasterUpdateEntity } from "../../entity/AuthorsInfoMasterUpdateEntity";
import { AuthorsMasterJsonType } from "../../model/AuthorsMasterJsonType";
import { AuthorsInfoMasterRepositoryInterface } from "../interface/AuthorsInfoMasterRepositoryInterface";


// 著者マスタファイルのパス
export const AUTHROS_MASTER_FILE_PATH = `${MASTER_FILE_PATH}${AUTHORS_MASTER_FILE}`;


export class AuthorsInfoMasterRepositoryJson implements AuthorsInfoMasterRepositoryInterface {

    private _authorsMasterJsonList: AuthorsMasterJsonType[];

    constructor() {

        // 著者マスタファイルからデータを取得
        const authorsMasterList: AuthorsMasterJsonType[] = JsonFileData.getFileObj(AUTHROS_MASTER_FILE_PATH);

        this._authorsMasterJsonList = authorsMasterList;
    }


    /**
     * 著者追加
     */
    insert(authorsInfoMasterInsertEntity: AuthorsInfoMasterInsertEntity) {

        // IDの重複チェック
        const duplicateAuthor = this._authorsMasterJsonList.find((e: AuthorsMasterJsonType) => {
            return e.authorId === authorsInfoMasterInsertEntity.authorId;
        });

        if (duplicateAuthor) {
            throw Error(`著者情報が重複してるため登録できません。`);
        }

        // jsonに変換する
        const authorsMasterJsonList = this.parseInsertToJson(authorsInfoMasterInsertEntity);

        // データを追加する
        this._authorsMasterJsonList = [...this._authorsMasterJsonList, authorsMasterJsonList];
    }


    /**
     * 著者更新
     */
    update(authorsInfoMasterUpdateEntity: AuthorsInfoMasterUpdateEntity) {

        // 著者の存在チェック
        const updateAuthor = this._authorsMasterJsonList.find((e: AuthorsMasterJsonType) => {
            return e.authorId === authorsInfoMasterUpdateEntity.authorId;
        });

        if (!updateAuthor) {
            throw Error(`更新対象の著者が存在しません。`);
        }
    }


    /**
     * コミット
     */
    commit() {

        try {

            JsonFileData.overWrite(AUTHROS_MASTER_FILE_PATH, this._authorsMasterJsonList);
        } catch (err) {

            throw Error(`著者情報マスタファイルのデータ書き込み中にエラーが発生しました。ERROR:${err}`);
        }
    }


    /**
     * json形式に変換する
     */
    private parseInsertToJson(authorsInfoMasterInsertEntity: AuthorsInfoMasterInsertEntity): AuthorsMasterJsonType {

        // jsonファイル登録用の型に変換する
        const authorsMasterJson: AuthorsMasterJsonType = {
            authorId: authorsInfoMasterInsertEntity.authorId,
            authorName: authorsInfoMasterInsertEntity.authorName,
            createDate: authorsInfoMasterInsertEntity.createDate,
            updateDate: authorsInfoMasterInsertEntity.updateDate,
            deleteFlg: authorsInfoMasterInsertEntity.deleteFlg,
        };

        return authorsMasterJson;
    }
}