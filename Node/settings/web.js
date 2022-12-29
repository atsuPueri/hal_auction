module.exports = function(app) {

    const php = require('../util/php.js');

    app.get('/', (request, response) => {
        response.render('inform.ejs');
    });
    
}