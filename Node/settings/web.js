module.exports = function(app) {

    const php = require('../util/php.js');

    app.get('/', (request, response) => {
        response.render('user_top.ejs');
    });
    
    app.get('/mypage', (request, response) => {
        response.render('mypage');
    });

    app.get('/favorite', (request, response) => {
        response.render('favorite');
    });

    app.get('/auction_detail', (request, response) => {
        response.render('auction_detail');
    });

    app.get('/auction', (request, response) => {
        response.render('auction');
    });
    app.get('/error', (request, response) => {
        response.render('error');
    });
}