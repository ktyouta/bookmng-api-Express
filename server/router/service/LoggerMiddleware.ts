import { Router, Request, Response, NextFunction } from 'express';
import { Logger } from '../../util/service/Logger';


export class LoggerMiddleware {


    // コントローラーアクセス時のログ出力処理
    public static accessLogMiddleware = (req: Request, res: Response, next: NextFunction) => {
        const userAgent = req.headers['user-agent'];
        const ip = req.ip;
        const queryParams = JSON.stringify(req.query);
        // 出力内容
        const output = `${req.method} ${req.originalUrl} | User-Agent: ${userAgent} | Query: ${queryParams} | ip: ${ip}`;

        // ログに出力
        Logger.info(output);
        next();
    };

}