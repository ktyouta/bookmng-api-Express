export class DateUtil {

    /**
     * 現在日時(yyyy/MM/dd HH:mm)を取得
     * @returns 
     */
    public static getNowDatetime() {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, "0");
        const date = (now.getDate()).toString().padStart(2, "0");
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        return `${year}/${month}/${date} ${hours}:${minutes}:${seconds}`;
    }

}