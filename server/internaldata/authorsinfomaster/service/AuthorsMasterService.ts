import { JsonFileOperation } from "../../../util/service/JsonFileOperation";
import { AUTHROS_MASTER_FILE_PATH } from "../const/AuthorsMasterConst";
import { AuthorsMasterModeType } from "../model/AuthorsMasterModeType";

export class AuthorsMasterService {


    /**
     * 著者マスタファイルのデータを取得
     * @returns 
     */
    public getAuthorsMaster(): AuthorsMasterModeType[] {

        // 著者マスタファイルからデータを取得
        const authorsMasterList: AuthorsMasterModeType[] = JsonFileOperation.getFileObj(AUTHROS_MASTER_FILE_PATH);

        return authorsMasterList;
    }

}