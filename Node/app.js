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
// 削除の時
io_socket.on('connection', (stream) => {
    const php = require('./util/php.js');
    stream.on('del_car', request_message => {

        let car_ids = JSON.parse(request_message).join(",");
        php('/del_car?car_id=' + car_ids , response_message => {
            console.log(response_message);

            //test
            response_message = true;
            
            if(response_message === true){
                php('/get_car' , response_message => {
                    
                });
                io_socket.to(複数の場合).emit('update_table', msg);
            }
        });
    });

    stream.on('register_car', request_message => {
        
    });
});

