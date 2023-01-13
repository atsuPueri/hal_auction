const { response } = require('express');
const { request } = require('http');
const { loadavg } = require('os');
const php_host = require('./php_host.js');

module.exports = function(app, io_socket) {

    const php = require('../util/php.js');

    app.get('/', (request, response) => {
        php('/get_car_join', response_message => {
            response.render('top', {
                carData : JSON.parse(response_message).data
            });
        });
    });

    app.get('/top', (request, response) => {
        php('/get_car_join', response_message => {
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
        
        
        php('/add_car?car_type_id='+request.body.car_type_name+'&purchase_price='+request.body.purchase_price+'&body_type='+request.body.body_type+'&model_year="'+request.body.year_type+'"&mileage='+request.body.mileage+'&is_actual_driving='+request.body.run+'&color='+request.body.color+'&vehicle_inspection_expiration_date='+request.body.is_actual_driving+'&automatic_or_mission='+request.body.auto+'&displacement='+request.body.displacement+'&number_of_passengers='+request.body.ride+'&drive_system='+request.body.drive_system+'&equipment='+ornaments_total, response_message => {
            
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
        php('/get_exhibit', m => {
            const exhibit_obj = JSON.parse(m).data;
            console.log(exhibit_obj);
    
            const response_array = [];
            for (const value of exhibit_obj) {
                response_array.push({
                    id:            value.car_id,
                    time_from:     value.time_from,
                    time_to:       value.time_to,
                    car_type_name: value.name,
                });
            }
            response.render('schedule', {
                car_info_array: JSON.stringify(response_array)
            });
        });
    });

    app.get('/exhibit', (request, response) => {
        php('/get_car_right', m => {
            const parse_obj = JSON.parse(m);

            const result_array = [];
            for (const column of parse_obj.data) {
                
                if (column.first_price == null) {
                    result_array.push(column);
                }
            }

            response.render('exhibit', {
                car_array: result_array
            });
        })
    });

    app.post('/exhibit', (request, response) => {
        const car_id       = request.body.car_id;
        const lowest_price = request.body.lowest_price;
        const first_price  = request.body.first_price;
        const bid_increase = 0;
        const now_price    = 0;
        // const time_from    = 'null'; // phpでnullを与える必要があるっぽい
        // const time_to      = 'null';
        php(`/add_exhibit?car_id=${car_id}&lowest_price=${lowest_price}&first_price=${first_price}&bid_increase=${bid_increase}&now_price=${now_price}&time_from`, m => {
            console.log(m);
            response.redirect('/exhibit');
        });
    });

    app.get('/auction', (request, response) => {
        php('/get_car_join', response_message => {
            response.render('auction', {
                carData : JSON.parse(response_message).data
            });
        });
    });

    app.get('/detail/:id', (request, response) => {
        // console.log(request.query.user_id);
        php('/detail_info?car_id='+request.params.id, response_message => {
            // console.log(JSON.parse(response_message).data);
            response.render('auction_detail', {
                carData : JSON.parse(response_message).data
            });
        });
    });

    app.get('/user_top', (request, response) => {
        php('/get_maker', get_maker_message => {
            const makerData = JSON.parse(get_maker_message);

            // 現在時刻以降を取得するため
            const date = new Date();
            php(`/get_car_join?time_to='${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}'`, get_car_join_message => {
                
                const get_car_join = JSON.parse(get_car_join_message);

                if(request.query.user_id){
                    php('/get_favorite?user_id='+request.query.user_id, favorite_message => {
                        const get_favorite = JSON.parse(favorite_message);
                        if(get_favorite.data){
                            response.render('user_top', {
                                carData : get_car_join.data,
                                makerData : makerData.data,
                                favoriteData : get_favorite.data
                            });
                        } else {
                            response.render('user_top', {
                                carData : get_car_join.data,
                                makerData : makerData.data,
                            });
                        }
                    });
                } else {
                    response.render('user_top', {
                        carData : get_car_join.data,
                        makerData : makerData.data,

                    });
                }
            });
        });
    });

    app.get('/auction_detail/:car_id', (request, response) => {
        const car_id = request.params.car_id;

        if (isNaN(car_id)) {
            response.redirect('../user_top');
            return;
        }

        php(`/detail_info?car_id=${car_id}`, get_car_join_message => {
            console.log(get_car_join_message);
            const parse_obj = JSON.parse(get_car_join_message);
            const car_data = parse_obj.data;

            let car_info;
            if (car_data !== undefined) {
                car_info = car_data[0];
            } else {
                response.redirect('../error');
            }

            let equipment = "";
            const equipment_list = ["スペアタイヤ", "新車時保証書", "取扱説明書", "試乗、現車確認可能", "限定車", "ペット同乗なし", "禁煙車", "ローダウン", "福祉車両", "寒冷地帯仕様車", "トラクションコントロール", "横滑り防止装置", "純正アルミホイール", "純正エアロパーツ", "本革シート", "サンルーフ", "電動スライドドア", "バックカメラ", "ナビゲーション", "テレビ", "DVDビデオ", "MD", "CD", "スマートキー", "キーレスエントリー", "ETC", "エアバック", "ABS", "集中ドアロック", "パワーウィンドウ", "パワステ", "エアコン"];
            var array_split = Array.from(car_data[0].equipment);
            for(i=0;i<array_split.length;i++){
                if(array_split[i] == 1){
                    equipment += "・"+equipment_list[i];
                }
            }
            car_data[0].equipment = equipment; 

            response.render('auction_detail', {
                car_info: car_info
            });
        });
    });

    app.post('/auction_detail/:car_id', (request, response) => {
        const car_id = request.params.car_id;

        if(request.query.user_id){
            php('/add_favorite_car_type?favorite_car_type_id='+car_id+'&user_id='+request.query.user_id, response_message => {
                if(JSON.parse(response_message).status === true){
                    response.redirect('/auction_detail/'+car_id+'?user_id='+request.query.user_id);
                }
            });
        } else {
            response.redirect('/auction_detail/'+car_id);
        }
    });

    app.get('/car_detail', (request, response) => {
        response.render('car_detail');
    });

    app.get('/evaluation', (request, response) => {
        response.render('evaluation');
    });

    app.get('/favorite', (request, response) => {
        if(request.query.user_id){
            php('/get_favorite?user_id='+request.query.user_id, favorite_message => {
                const get_favorite = JSON.parse(favorite_message);
                if(get_favorite.data){
                    response.render('favorite', {
                        favoriteData : get_favorite.data
                    });
                } else {
                    response.render('favorite');
                }
            });
        } else {
            response.render('favorite');
        }
    });

    app.get('/inform', (request, response) => {
        
        const user_id = request.query.user_id;
        if (user_id == undefined) {
            response.redirect('/login');
            return;
        };
        
        php(`/get_notification?user_id=${user_id}`, m => {

            const parse_obj = JSON.parse(m);
            let table = parse_obj.data;
            if (table == undefined) {
                table = [];
            }

            response.render('inform', {
                table: table
            });
        })
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
        if(request.query.user_id){ 
            php('/get_maker', get_maker_message => {
                const makerData = JSON.parse(get_maker_message);

                // 現在時刻以降を取得するため
                const date = new Date();
                php(`/get_car_join?time_to='${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}'`, get_car_join_message => {
                    
                    const get_car_join = JSON.parse(get_car_join_message);

                    if(request.query.user_id){
                        php('/get_favorite?user_id='+request.query.user_id, favorite_message => {
                            const get_favorite = JSON.parse(favorite_message);
                            if(get_favorite.data){
                                response.render('user_top', {
                                    carData : get_car_join.data,
                                    makerData : makerData.data,
                                    favoriteData : get_favorite.data
                                });
                            } else {
                                response.render('user_top', {
                                    carData : get_car_join.data,
                                    makerData : makerData.data,
                                });
                            }
                        });
                    } else {
                        response.render('user_top', {
                            carData : get_car_join.data,
                            makerData : makerData.data,
                        });
                    }
                });
            });
        } else {
            response.render('login');
        }
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

}