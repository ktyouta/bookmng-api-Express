import * as fs from 'fs';

export class FileOperation {

    private static readonly fs = fs;


    /**
     * ファイル書き込み
     * @param filePath 
     * @param data 
     * @returns 
     */
    public static overWriteFileData(filePath: string, data: string) {

        try {

            this.fs.writeFileSync(filePath, data, { encoding: 'utf8' });
        } catch (err) {

            throw Error(`FileOperation overWriteFileData filePath:${filePath} err:${err}`);
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
        } catch (err) {

            throw Error(`FileOperation addWriteFileData filePath:${filePath} err:${err}`);
        }
    }
}