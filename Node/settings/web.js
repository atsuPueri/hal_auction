module.exports = function(app) {

    const php = require('../util/php.js');

    app.get('/', (request, response) => {

        php("/test", (m) => {
            console.log(m);
        });
        
        response.render('top.ejs');
    });
    
}