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
    const php = require('./util/php.js');

    // 削除の時
    stream.on('del_car', request_message => {
        let car_ids = JSON.parse(request_message).join(",");
        php('/del_car?car_id=' + car_ids , response_message => {
            console.log(response_message);
            
            //test
            // response_message = true;

            if(response_message === true){
                php('/get_car' , response_message => {
                    io_socket.emit('update_table', response_message);
                });              
            }
        });
    });

    //車両情報登録
    stream.on('register_car', request_message => {
        let car_info = JSON.parse(request_message);
        
        //todo:test
        // console.log(`/add_car?car_type_id=${car_info.make}&purchase_price=${car_info.price}&body_type=${car_info.bodyType}&model_year=${car_info.yearType}&mileage=${car_info.loadResult}&is_actual_driving=${car_info.run}&color=${car_info.color}&vehicle_inspection_expiration_date=${car_info.vehicleInspection}&automatic_or_mission=${car_info.auto}&displacement=${car_info.co}&number_of_passengers=${car_info.ride}&drive_system=${car_info.drive}&equipment=${car_info.equipment}`);
        

        php(`/add_car?car_type_id=${car_info.make}&purchase_price=${car_info.price}&body_type=${car_info.bodyType}&model_year=${car_info.yearType}&mileage=${car_info.loadResult}&is_actual_driving=${car_info.run}&color=${car_info.color}&vehicle_inspection_expiration_date=${car_info.vehicleInspection}&automatic_or_mission=${car_info.auto}&displacement=${car_info.co}&number_of_passengers=${car_info.ride}&drive_system=${car_info.drive}&equipment=${car_info.equipment}`, response_message => {
            console.log(response_message);
            
            //todo:test
            //response_message = true;

            if(response_message === true){
                php('/get_car' , response_message => {
                    // io_socket.emit('update_table', response_message);
                    console.log("成功");
                });
            }
        });
    });

});

