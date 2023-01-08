const { response } = require('express');

module.exports = function(app) {

    const php = require('../util/php.js');

    app.get('/', (request, response) => {
        
        response.render('top.ejs');
    });



    app.get('/exhibit', (request, response) => {

        response.render('exhibit', {
            maker_list: {
                
            }
        });
    });

    app.get('/schedule', (request, response) => {
        php('/get_exhibit', m => {
            const exhibit_obj = JSON.parse(m).data;
            console.log(exhibit_obj);

            const response_array = [];
            for (const value of exhibit_obj) {
                response_array.push({
                    id:        value.car_id,
                    time_from: value.time_from,
                    time_to:   value.time_to
                });
            }
            response.render('schedule', {
                car_info_array: JSON.stringify(response_array)
            });
        });
    });
}