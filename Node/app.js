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
        php(`/get_bid?car_id=${car_id}`, response_message => {
            const get_car = JSON.parse(response_message);

            // php(`/add_notification?`)
            io_socket.to(get_car.user_id).emit('inform', get_car);
        });
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
                    // console.log(get_car.car_id);
                    io_socket.to(get_car.car_id).emit('upd_exhibit', parse_obj.price);
                })
            });
        })
    });

    stream.on('detail_join', request_message => {
        // console.log(request_message);
        stream.join(request_message);
    });

    //車両情報登録
    // stream.on('login_info', request_message => {
    //     let user_info = JSON.parse(request_message);
    
    //     php(`/login_user?user_id=${user_info.login_id}&pass=${user_info.pass}`, response_message => {
    //         const status = JSON.parse(response_message).status;
    //         if(status === true){
                
    //         }
    //     });
    // });


    // ユーザー側
    // stream.on('login', request_message => {
    //     let user_info = JSON.parse(request_message);

    //     //todo:test
    //     // console.log(`/add_user?login_id=${user_info.login}&hash_password=${user_info.pass}&user_name=${user_info.name}&phone_number=${user_info.tel}&post_code=${user_info.postal}&address=${user_info.address}&apartment=${user_info.apartment}&credit_card_number=${user_info.login}&status=${user_info.login}`);
    //     // '/add_user?login_id='+user_info.login+'&hash_password="'+user_info.pass+'"&user_name="'+user_info.name+'"&phone_number="'+user_info.tel+'"&post_code="'+user_info.postal+'"&address="'+user_info.address+'"&apartment="'+user_info.apartment+'"&status='+user_info.login;
    //     php('/add_user?login_id='+user_info.login+'&hash_password="'+user_info.pass+'"&user_name="'+user_info.name+'"&phone_number="'+user_info.tel+'"&post_code="'+user_info.postal+'"&address="'+user_info.address+'"&apartment="'+user_info.apartment+'"&status='+user_info.login, response_message => {
    //         // console.log(response_message);
            
    //         response_message = JSON.parse(response_message);
    //         //todo:test
    //         //response_message = true;

    //         if(response_message.status === true){
    //             //user_topに戻す
    //             console.log("成功");
    //         }
    //     });
    // });
});

