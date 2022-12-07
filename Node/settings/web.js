module.exports = function(app) {

    const php = require('../util/php.js');

    app.get('/', (request, response) => {
        
        response.render('top.ejs');
    });
    
    app.get('/schedule', (request, response) => {
        response.render('schedule');
    });
}