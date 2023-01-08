"use strict"

const express = require('express');
const php = require('./util/php.js');
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
    stream.on('regist', m => {
        const car_info_array = JSON.parse(m);
        console.log(car_info_array);
        for (const car_info of car_info_array) {
            
            php(`/upd_exhibit?car_id=${car_info.id}&time_from='${car_info.from}'&time_to='${car_info.to}'`, m => {
                console.log(m);
            });
        }
    });
});