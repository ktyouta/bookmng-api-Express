import { AddBookInfoController } from './addbookinfo/conrtoller/AddBookInfoController';
import { BookSearchController } from './booksearch/controller/BookSearchController';
import ENV from './env.json';
import { NextFunction, Request, Response } from 'express';
import { Logger } from './util/service/Logger';
import { LoggerMiddleware } from './router/service/LoggerMiddleware';
import bodyParser from 'body-parser';
import { ROUTE_CONTROLLER_LIST } from './router/conf/RouteControllerList';


const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// コントローラーのルートを設定
ROUTE_CONTROLLER_LIST.forEach((e) => {

    app.use('/', LoggerMiddleware.accessLogMiddleware, e.router);
});


// サーバーを起動
app.listen(ENV.PORT, () => {

    console.log(`Book Manage API Server listening on port ${ENV.PORT}`);
});