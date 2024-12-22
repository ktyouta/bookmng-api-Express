import { CommonFileOperation } from "./CommonFileOperation";

export class JsonFileOperation {

    private static readonly fs = require('fs');

    /**
     * ファイル書き込み
     * @param filePath 
     * @param data 
     * @returns 
     */
    public static overWriteFileData<T>(filePath: string, data: T) {
        try {

            //json文字列に変換
            let stream: string = JSON.stringify(data, null, '\t');
            this.fs.writeFileSync(filePath, stream);

            return "";
        } catch (err) {
            return "ファイルの書き込みに失敗しました。";
        }
    }

    /**
     * ファイルを読み込んでオブジェクトを返却
     * @param filePath 
     * @returns 
     */
    public static getFileObj<T>(filePath: string): T {

        //ファイルの読み込み
        let fileData = CommonFileOperation.readFile(filePath);
        return JSON.parse(fileData);
    }
}