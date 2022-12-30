module.exports = function(app) {

    const php = require('../util/php.js');

    app.get('/', (request, response) => {
        response.render('user_top.ejs');
    });
    
    app.get('/mypage', (request, response) => {
        response.render('mypage');
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