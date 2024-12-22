import { GoogleBookInfoApis } from "../../api/googlebookinfo/service/GoogleBookInfoApis";
import { FileOperation } from "../../util/service/FileOperation";
import { JsonFileOperation } from "../../util/service/JsonFileOperation";

export class AddBookInfoService {


    // マスタから書籍情報を取得する
    public getBookInfo() {

        let bookInfoList = JsonFileOperation.getFileObj("");
    }
}