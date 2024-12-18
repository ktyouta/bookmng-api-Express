import { AddBookInfoController } from './addbookinfo/conrtoller/AddBookInfoController';
import { BookSearchController } from './booksearch/controller/BookSearchController';
import ENV from './env.json';

const express = require('express');
const app = express();

// 書籍検索
const bookSearchController = new BookSearchController();
// 書籍情報登録
const addBookInfoController = new AddBookInfoController();

app.use('/', bookSearchController.router);
app.use('/', addBookInfoController.router);

app.listen(ENV.PORT, () => {

    console.log(`Book Manage API Server listening on port ${ENV.PORT}`);
});