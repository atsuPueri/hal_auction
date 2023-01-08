const { response } = require('express');
const { request } = require('http');
const { loadavg } = require('os');

module.exports = function(app) {

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

    app.get('/test1', (request, response) => {
    });


    app.get('/test1/:id', (request, response) => {
        php('/get_car_join?car_id='+request.params.id, response_message => {
            php('/color?color='+JSON.parse(response_message).data[0].color, response_msg => {
                response.render('test1', {
                    carData : JSON.parse(response_message).data,
                    color : JSON.parse(response_msg).data
                });
            });
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

    app.get('/user_top', (request, response) => {
        php('/get_car_type', response_message => {
            const carTypeData = JSON.parse(response_message);
            php('/get_maker', response_message => {
                const makerData = JSON.parse(response_message);
                php('/get_car_join', response_message => {
                    php('/color?color='+JSON.parse(response_message).data[0].color, response_msg => {
                        response.render('user_top', {
                            carData : carTypeData.data,
                            makerData : makerData.data,
                            carData : JSON.parse(response_message).data,
                            color : JSON.parse(response_msg).data
                        });
                    });
                });
            });
        });
    });

    app.post('/login_user', (request, response) => {
        response.render('auction_detail');
    });

    app.get('/auction_detail', (request, response) => {
        response.render('auction_detail');
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

    // app.post('/user_add', (request, response) => {
    //     // console.log(request.body);

    //     php('/add_user?login_id="'+request.body.login+'"&hash_password="'+request.body.pass+'"&user_name="'+request.body.name+'"&phone_number="'+request.body.tel+'"&post_code="'+request.body.postal+'"&address="'+request.body.address+'"&apartment="'+request.body.apartment+'"&credit_card_number='+request.body.card, response_message => {
            
    //         response_message = JSON.parse(response_message);
    //         //ユーザーの登録が正常に動いたか
    //         if(response_message.status === true){
    //             response.redirect('/user_top');
    //         } else {
    //             response.redirect('/error');

    //         }
    //     });
    // });

    app.get('/error', (request, response) => {
        response.render('error');
    });

    app.get('/login', (request, response) => {
        response.render('login');
    });

    app.get('/mypage', (request, response) => {
        response.render('mypage');
    });

    // app.get('/', (request, response) => {
    //     response.render('');
    // });
}