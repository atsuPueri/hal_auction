const { response } = require('express');
const { request } = require('http');
const { loadavg } = require('os');
const php_host = require('./php_host.js');

module.exports = function(app, io_socket) {

    const php = require('../util/php.js');

    //php呼び出し方
    // app.get('/test', (request, response) => {
    //     php('/get_car_type', response_message => {
    //         const carTypeData = JSON.parse(response_message);
    //         php('/get_maker', response_message => {
    //             const makerData = JSON.parse(response_message);
    //             response.render('carentry', {
    //                 carData : carTypeData.data,
    //                 makerData : makerData.data
    //             });
    //         });
    //     });
    // });

    app.get('/', (request, response) => {
        php('/get_car_join', response_message => {
            // console.log(JSON.parse(response_message).data);
            response.render('top', {
                carData : JSON.parse(response_message).data
            });
        });
    });

    app.get('/top', (request, response) => {
        php('/get_car_join', response_message => {
            // console.log(JSON.parse(response_message).data);
            response.render('top', {
                carData : JSON.parse(response_message).data
            });
        });
    })

    app.get('/carentry', (request, response) => {
        php('/get_car_type', response_message => {
            const carTypeData = JSON.parse(response_message);
            php('/get_maker', response_message => {
                const makerData = JSON.parse(response_message);
                response.render('carentry', {
                    carData : carTypeData.data,
                    makerData : makerData.data
                });
            });
        });
    });

    app.post('/car_entry', (request, response) => {
        let ornaments_total = 0;

        if (request.body.ornaments !== undefined) {
            for (const value of request.body.ornaments) {
                ornaments_total += Number.parseInt(value);
            }
        }

        // console.log('add_car?car_type_id='+request.body.car_type_name+'&purchase_price='+request.body.purchase_price+'&body_type='+request.body.body_type+'&model_year="'+request.body.year_type+'"&mileage='+request.body.mileage+'&is_actual_driving='+request.body.run+'&color='+request.body.color+'&vehicle_inspection_expiration_date="'+request.body.is_actual_driving+'"&automatic_or_mission='+request.body.auto+'&displacement='+request.body.displacement+'&number_of_passengers='+request.body.ride+'&drive_system='+request.body.drive_system+'&equipment="'+ornaments_total+'"');   

        
        
        php('/add_car?car_type_id='+request.body.car_type_name+'&purchase_price='+request.body.purchase_price+'&body_type='+request.body.body_type+'&model_year="'+request.body.year_type+'"&mileage='+request.body.mileage+'&is_actual_driving='+request.body.run+'&color='+request.body.color+'&vehicle_inspection_expiration_date="'+request.body.is_actual_driving+'"&automatic_or_mission='+request.body.auto+'&displacement='+request.body.displacement+'&number_of_passengers='+request.body.ride+'&drive_system='+request.body.drive_system+'&equipment="'+ornaments_total+'"', response_message => {
            
            response_message = JSON.parse(response_message);
            //ユーザーの登録が正常に動いたか
            if(response_message.status === true){
                php('/get_car_join', car_info_json => {
                    io_socket.emit('update_table', car_info_json);
                    response.redirect('/top');
                });
            } else {
                response.redirect('/error');
            }
        });
    });

    app.get('/user', (request, response) => {
        php('/get_user', response_message => {
            const userData = JSON.parse(response_message);
            response.render('user', {
                userData : userData.data
            });
        });
    });

    app.get('/schedule', (request, response) => {
        response.render('schedule');
    });

    app.get('/exhibit', (request, response) => {
        response.render('exhibit');
    });

    app.get('/auction', (request, response) => {
        php('/get_car_join', response_message => {
            response.render('auction', {
                carData : JSON.parse(response_message).data
            });
        });
    });

    app.get('/detail/:id', (request, response) => {
        php('/detail_info?car_id='+request.params.id, response_message => {
            console.log(JSON.parse(response_message).data);
            response.render('detail', {
                carData : JSON.parse(response_message).data
            });
        });
    });

    app.get('/user_top', (request, response) => {
        // phpが非同期関数の為複数のテーブル情報が欲しいときにネストするしかなくなっている
        php('/get_car_type', get_car_type_message => {
            console.log(get_car_type_message, "---");

            const carTypeData = JSON.parse(get_car_type_message);
            php('/get_maker', get_maker_message => {
                const makerData = JSON.parse(get_maker_message);

                // 現在時刻以降を取得するため
                const date = new Date();
                php(`/get_car_join?time_to='${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}'`, get_car_join_message => {

                    php('/color?color='+JSON.parse(get_car_join_message).data[0].color, color_message => {
                        
                        response.render('user_top', {
                            carData : carTypeData.data,
                            makerData : makerData.data,
                            carData : JSON.parse(get_car_join_message).data,
                            color : JSON.parse(color_message).data
                        });
                    });
                });
            });
        });
    });

    app.get('/user_top/:id', (request, response) => {
        // phpが非同期関数の為複数のテーブル情報が欲しいときにネストするしかなくなっている
        php('/get_car_type', response_message => {
            const carTypeData = JSON.parse(response_message);
            php('/get_maker', response_message => {
                const makerData = JSON.parse(response_message);

                // 現在時刻以降を取得するため
                const date = new Date();
                // console.log(`/get_car_join?time_to='${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}'`);
                php(`/get_car_join?time_to='${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}'`, m => {

                    php('/color?color='+JSON.parse(m).data[0].color, response_msg => {
                        
                        console.log(JSON.parse(response_message).data);
                        response.render('user_top', {
                            user_id : request.params.id,
                            carData : carTypeData.data,
                            makerData : makerData.data,
                            carData : JSON.parse(m).data,
                            color : JSON.parse(response_msg).data
                        });
                    });
                });
            });
        });
    });

    app.get('/auction_detail/:car_id', (request, response) => {
        const car_id = request.params.car_id;

        php(`/detail_info?car_id=${car_id}`, get_car_join_message => {

            const parse_obj = JSON.parse(get_car_join_message);
            const car_data = parse_obj.data;

            console.log(car_data);
            let car_info;
            if (car_data !== undefined) {
                car_info = car_data[0];
            } else {
                response.redirect('../error');
            }

            console.log(car_info, "-");
            response.render('auction_detail', {
                car_info: car_info
            });
        });
    });

    app.get('/car_detail', (request, response) => {
        response.render('car_detail');
    });

    app.get('/evaluation', (request, response) => {
        response.render('evaluation');
    });

    app.get('/exhibit', (request, response) => {
        response.render('exhibit');
    });

    app.get('/favorite', (request, response) => {
        response.render('favorite');
    });

    app.get('/inform', (request, response) => {
        response.render('inform');
    });

    app.post('/login_check', (request, response) => {
        response.render('login_check',{
            user_info:request.body
        });
    });

    app.post('/user_add', (request, response) => {
        php('/add_user?login_id="'+request.body.login+'"&hash_password="'+request.body.pass+'"&user_name="'+request.body.name+'"&phone_number="'+request.body.tel+'"&post_code="'+request.body.postal+'"&address="'+request.body.address+'"&apartment="'+request.body.apartment+'"&credit_card_number='+request.body.card, response_message => {
            response_message = JSON.parse(response_message);
            //ユーザーの登録が正常に動いたか
            if(response_message.status === true){
                response.redirect('/user_top');
            } else {
                response.redirect('/error');

            }
        });
    });

    app.post('/login_user', (request, response) => {
        php('/login_user?login_id="'+request.body.login_id+'"&pass='+request.body.pass, response_message => {
            response_message = JSON.parse(response_message);
            response.redirect('/user_top?user_id='+response_message.data);
        });
    });

    
    app.get('/login', (request, response) => {
        response.render('login');
    });
    
    app.get('/mypage', (request, response) => {
        response.render('mypage');
    });
    
    
        
    app.get('/detail', (request, response) => {
        response.render('detail');
    });
    app.get('/error', (request, response) => {
        response.render('error');
    });



    app.get('/test1', (request, response) => {
        response.render('test1');
    });

    app.get('/test1/:id', (request, response) => {
        php('/add_favorite_car_type?car_id='+request.params.id, response_message => {
            response.render('test1', {
                carData : JSON.parse(response_message).data
            });
        });
    });

    app.get('/test1/:car_id/:user_id', (request, response) => {
        php('/add_favorite_car_type?favorite_car_type_id='+request.params.car_id+'&user_id='+request.params.user_id, response_message => {
            // console.log(response_message);
            php('/test1?car_id='+request.params.car_id, car_response => {
                console.log(car_response);
                if(JSON.parse(response_message).status === true){
                    response.render('test1', {
                        carData : JSON.parse(car_response).data
                    });
                }
            });
        });
    });
}