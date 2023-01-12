"use strict"

const { json } = require('body-parser');
const express = require('express');
const php = require('./util/php.js');
const app = express();

const http_socket = require('http').Server(app);
const io_socket = require('socket.io')(http_socket);

// 始めにする設定群
require('./settings/bootstrap.js')(app, express);

// ルーティング
require('./settings/web.js')(app, io_socket);

// httpサーバー起動
http_socket.listen(9000);

// クライアントからサーバーにコネクションしたとき
io_socket.on('connection', (stream) => {

    const php = require('./util/php.js');

    // 車両削除
    stream.on('del_car', request_message => {
        let car_ids = JSON.parse(request_message).join(",");
        php('/del_car?car_id=' + car_ids , response_message => {
            
            //test
            // response_message = true;

            if(response_message === true){
                php('/get_car' , response_message => {
                    //io_socket.emit('update_table', response_message);
                });              
            }
        });
    });

    //車両情報登録
    stream.on('register_car', request_message => {
        let car_info = JSON.parse(request_message);
        

        php(`/add_car?car_type_id=${car_info.carName}&purchase_price=${car_info.price}&body_type=${car_info.bodyType}&model_year=${car_info.yearType}&mileage=${car_info.loadResult}&is_actual_driving=${car_info.run}&color=${car_info.color}&vehicle_inspection_expiration_date=${car_info.vehicleInspection}&automatic_or_mission=${car_info.auto}&displacement=${car_info.co}&number_of_passengers=${car_info.ride}&drive_system=${car_info.drive}&equipment=${car_info.equipment}`, response_message => {
            const status = JSON.parse(response_message).status;
            if(status === true){
                php('/get_car_join', car_info_json => {
                    io_socket.emit('update_table', car_info_json);
                });
            }
        });
    });

    //車両情報登録
    stream.on('register_car', request_message => {
        let car_info = JSON.parse(request_message);
        

        php(`/add_car?car_type_id=${car_info.carName}&purchase_price=${car_info.price}&body_type=${car_info.bodyType}&model_year=${car_info.yearType}&mileage=${car_info.loadResult}&is_actual_driving=${car_info.run}&color=${car_info.color}&vehicle_inspection_expiration_date=${car_info.vehicleInspection}&automatic_or_mission=${car_info.auto}&displacement=${car_info.co}&number_of_passengers=${car_info.ride}&drive_system=${car_info.drive}&equipment=${car_info.equipment}`, response_message => {
            const status = JSON.parse(response_message).status;
            if(status === true){
                php('/get_car_join', car_info_json => {
                    io_socket.emit('update_table', car_info_json);
                });
            }
        });
    });

    // オークション時間終了時
    stream.on('end_auction', request_message => {
        const car_id = request_message;
        console.log('オークション終了', car_id);
        php(`/get_bid?car_id=${car_id}`, response_message => {
            const get_car = JSON.parse(response_message);

            console.log(get_car);

            const table = get_car.data;
            if (table == undefined) {
                return;
            }
            if (table.length == 0) {
                return;
            }

            let max = -Infinity;
            let max_column;
            for (const column of table) {
                if (max < column.bid_price) {
                    max = column.bid_price;
                    max_column = column;
                }
            }

            const now = new Date();

            const car_id            = max_column.car_id;
            const user_id           = max_column.user_id;
            const notification_type = 0;
            const date              = `'${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()} ${now.getHours()}:${now.getMinutes()}'`;

            php(`/get_notification?user_id=${user_id}`, get_m => {

                const parse_obj = JSON.parse(get_m);
                const table = parse_obj.data;

                if (table != undefined) {
                    for (const column of table) {
                        if (column.car_id == max_column.car_id) {
                            return;
                        }
                    }
                }

                php(`/add_notification?user_id=${user_id}&notification_type=${notification_type}&car_id=${car_id}&time=${date}`, m => {
    
                    io_socket.to('user_' + max_column.user_id).emit('inform', max_column);
                });
            });
        });
    });
    
    // ユーザーのJOIN
    stream.on('user_join', user_id => {
        stream.join('user_' + user_id);
    });

    // 入札
    stream.on('bid', request_message => {
        const parse_obj = JSON.parse(request_message);

        php(`/get_car_join?car_id=${parse_obj.car_id}`, get_car_join_message => {
            let get_car = JSON.parse(get_car_join_message);

            if (get_car.data === undefined) {
                return;
            }
            get_car = get_car.data[0];

            const now = new Date();
            const to  = new Date(get_car.time_to);
            if (now.getTime() > to.getTime()) {
                return;
            } 
            
            php(`/add_bid?car_id=${parse_obj.car_id}&bid_price=${parse_obj.price}&user_id=${parse_obj.user_id}`, (res) => {
                
                const obj = JSON.parse(res);
                if (obj.status == false) {
                    return;
                }
                
                php(`/upd_exhibit?car_id=${parse_obj.car_id}&now_price=${parse_obj.price}`, () => {
                    console.log(get_car.car_id);
                    io_socket.to(get_car.car_id).emit('upd_exhibit', parse_obj.price);
                })
            });
        })
    });


    // オークション詳細のJOIN
    stream.on('detail_join', request_message => {
        stream.join(request_message);
    });


    // スケジュール登録時
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

