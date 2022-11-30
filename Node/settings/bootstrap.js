module.exports = function(app, express) {
    
    // ビューエンジンをEJSに設定
    app.set('view engine', 'ejs');
    app.use(express.static(__dirname + '/../../public/tmp', {
        index: false
    }));

    // app.use(express.static(__dirname + '/public', {
    //     index: false
    // }));

    app.use(express.json());
    app.use(express.urlencoded({
        extended: true
    }));
}