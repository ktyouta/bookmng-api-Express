import { CommonFileOperation } from "./CommonFileOperation";

export class FileOperation {

    private static readonly fs = require('fs');

    /**
     * ファイル書き込み
     * @param filePath 
     * @param data 
     * @returns 
     */
    public static overWriteFileData<T>(filePath: string, data: string) {
        try {

            this.fs.writeFileSync(filePath, data, { encoding: 'utf8' });

            return "";
        } catch (err) {
            return "ファイルの書き込みに失敗しました。";
        }
    }


    /**
     * ファイル書き込み(追記)
     * @param filePath 
     * @param data 
     * @returns 
     */
    public static addWriteFileData<T>(filePath: string, data: string) {
        try {

            this.fs.appendFileSync(filePath, data, { encoding: 'utf8' });

            return "";
        } catch (err) {
            return `ファイルの追記に失敗しました。(${err})`;
        }
    }
}