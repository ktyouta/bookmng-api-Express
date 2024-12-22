export class CommonFileOperation {

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
     * 指定したディレクトリ内のファイル名を取得する
     * @param dirPath 
     * @returns 
     */
    public static getFileName(dirPath: string,) {
        const files: string[] = this.fs.readdirSync(dirPath);

        return files;
    }

}