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
}