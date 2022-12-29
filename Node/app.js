"use strict"

const express = require('express');
const app = express();

const http_socket = require('http').Server(app);
const io_socket = require('socket.io')(http_socket);

// 始めにする設定群
require('./settings/bootstrap.js')(app, express);

// ルーティング
require('./settings/web.js')(app);

// httpサーバー起動
http_socket.listen(9000);

// クライアントからサーバーにコネクションしたとき
io_socket.on('connection', (stream) => {
    
});