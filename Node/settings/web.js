module.exports = function(app) {
    app.get('/', (request, response) => {
        response.render('top');
    });

    app.get('/top', (request, response) => {
        response.render('top');
    })

    app.get('/carentry', (request, response) => {
        response.render('carentry');
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

    const php = require('../util/php.js');
    php("/test", (m) => {
        console.log(m);
    });
}