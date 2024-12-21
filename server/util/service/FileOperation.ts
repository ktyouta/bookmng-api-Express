export class FileOperation {

    private static readonly fs = require('fs');

    /**
     * ファイルの存在チェック
     * @param filePath 
     * @returns 
     */
    public static checkFileExist(filePath: string) {

        let isExist = false;

        try {

            this.fs.statSync(filePath);
            isExist = true;
        } catch (err) {

            isExist = false;
        }

        return isExist;
    }


    /**
     * ファイルの読み込み
     * @param filePath 
     * @returns 
     */
    public static readFile(filePath: string) {
        let content: string = "";
        if (this.checkFileExist(filePath)) {
            content = this.fs.readFileSync(filePath, 'utf8');
        }
        return content;
    };


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
     * 指定したディレクトリ内のファイル名を取得する
     * @param dirPath 
     * @returns 
     */
    public static getFileName(dirPath: string,) {
        const files: string[] = this.fs.readdirSync(dirPath);

        return files;
    }


    /**
     * ファイルを読み込んでオブジェクトを返却
     * @param filePath 
     * @returns 
     */
    public static getFileObj<T>(filePath: string): T {

        //ファイルの読み込み
        let fileData = this.readFile(filePath);
        return JSON.parse(fileData);
    }
}