module.exports = function(app) {
    app.get('/', (request, response) => {
        response.render('index.ejs');
    });
    
    // app.get('/chat1', (request, response) => {
    //     response.render('index.ejs');
    // });
    // app.get('/chat2', (request, response) => {
    //     response.render('index.ejs');
    // });
}