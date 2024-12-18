export class FileOperation {

    private readonly fs = require('fs');


    /**
     * ファイルの存在チェック
     * @param filePath 
     * @returns 
     */
    public checkFileExist(filePath: string) {

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
    readFile(filePath: string) {
        let content: string = "";
        if (this.checkFileExist(filePath)) {
            content = this.fs.readFileSync(filePath, 'utf8');
        }
        return content;
    };


    /**
     * ファイルの書き込み
     * @param filePath 
     * @param stream 
     * @returns 
     */
    overWriteData(filePath: string, stream: string) {
        try {
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
    getFileName(dirPath: string,) {
        const files: string[] = this.fs.readdirSync(dirPath);

        return files;
    }


    /**
     * ファイルを読み込んでオブジェクトを返却
     * @param filePath 
     * @returns 
     */
    getFileObj<T>(filePath: string): T {

        //ファイルの読み込み
        let fileData = this.readFile(filePath);
        return JSON.parse(fileData);
    }
}