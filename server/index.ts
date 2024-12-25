import { AddBookInfoController } from './addbookinfo/conrtoller/AddBookInfoController';
import { BookSearchController } from './booksearch/controller/BookSearchController';
import ENV from './env.json';
import { NextFunction, Request, Response } from 'express';
import { Logger } from './util/service/Logger';
import bodyParser from 'body-parser';
import { ROUTE_CONTROLLER_LIST } from './router/conf/RouteControllerList';


const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// コントローラーアクセス時のログ出力
function accessLogMiddleware(req: Request, res: Response, next: NextFunction) {
    const userAgent = req.headers['user-agent'];
    const ip = req.ip;
    const queryParams = JSON.stringify(req.query);
    // 出力内容
    const output = `${req.method} ${req.originalUrl} | User-Agent: ${userAgent} | Query: ${queryParams} | ip: ${ip}`;

    // ログに出力
    Logger.info(output);
    next();
};


// エラー時のログ出力
function errorLogMiddleware(err: Error, req: Request) {
    const userAgent = req.headers['user-agent'];
    const ip = req.ip;
    const queryParams = JSON.stringify(req.query);
    // 出力内容
    const output = `${req.method} ${req.originalUrl} | User-Agent: ${userAgent} | Query: ${queryParams} | ip: ${ip} | ERROR: ${err}`;

    // エラーログに出力
    Logger.error(output);
};


// コントローラーのルートを設定
ROUTE_CONTROLLER_LIST.forEach((e) => {

    app.use('/', accessLogMiddleware, e.router);
});



// エラー時共通処理
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {

    // コンソールログ出力
    console.error(`error occurred in xxx bookmng-api : ${err.message}`);

    // エラーログ出力
    errorLogMiddleware(err, req);

    res.status(500).json({
        status: "error",
        message: "予期しないエラーが発生しました。",
    });
});


// サーバーを起動
app.listen(ENV.PORT, () => {

    console.log(`Book Manage API Server listening on port ${ENV.PORT}`);
});