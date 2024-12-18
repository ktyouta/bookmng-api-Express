import { GoogleBookInfoApis } from "../../api/googlebookinfo/service/GoogleBookInfoApis";
import { FileOperation } from "../../util/service/FileOperation";

export class AddBookInfoService {


    fileOperation = new FileOperation();

    // マスタから書籍情報を取得する
    public getBookInfo() {

        let bookInfoList = this.fileOperation.getFileObj("");
    }
}