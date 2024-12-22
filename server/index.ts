import { AddBookInfoController } from './addbookinfo/conrtoller/AddBookInfoController';
import { BookSearchController } from './booksearch/controller/BookSearchController';
import ENV from './env.json';
import { NextFunction, Request, Response } from 'express';
import { Logger } from './util/service/Logger';
import { LoggerMiddleware } from './router/service/LoggerMiddleware';
import bodyParser from 'body-parser';


const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// 書籍検索
const bookSearchController = new BookSearchController();
// 書籍情報登録
const addBookInfoController = new AddBookInfoController();


app.use('/', LoggerMiddleware.accessLogMiddleware, bookSearchController.router);
app.use('/', LoggerMiddleware.accessLogMiddleware, addBookInfoController.router);



app.listen(ENV.PORT, () => {

    console.log(`Book Manage API Server listening on port ${ENV.PORT}`);
});