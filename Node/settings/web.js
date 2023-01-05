const { response } = require('express');
const { request } = require('http');

module.exports = function(app) {

    const php = require('../util/php.js');

    //php呼び出し方
    app.get('/test', (request, response) => {
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


    app.get('/', (request, response) => {
        response.render('top');
    });

    app.get('/top', (request, response) => {
        response.render('top');
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

    app.get('/user', (request, response) => {
        response.render('user');
    });

    app.get('/schedule', (request, response) => {
        response.render('schedule');
    });

    app.get('/exhibit', (request, response) => {
        response.render('exhibit');
    });

    app.get('/auction', (request, response) => {
        response.render('auction');
    });

    app.get('/user_top', (request, response) => {
        response.render('user_top');
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

    app.post('/user_add', (request, response) => {
        php('/add_user?login_id='+user_info.login+'&hash_password="'+user_info.pass+'"&user_name="'+user_info.name+'"&phone_number="'+user_info.tel+'"&post_code="'+user_info.postal+'"&address="'+user_info.address+'"&apartment="'+user_info.apartment+'"&status='+user_info.login, response_message => {
            // console.log(response_message);
            
            response_message = JSON.parse(response_message);
            //todo:test
            //response_message = true;

            if(response_message.status === true){
                //user_topに戻す
                response.redirect('/user_top');
            } else {
                
            }
        });
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