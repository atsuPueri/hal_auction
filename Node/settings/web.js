module.exports = function(app) {
    app.get('/', (request, response) => {
        response.render('index.ejs');
    });
    
}