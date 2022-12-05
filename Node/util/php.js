
/**
 * php
 * @param {string} url アクセスするPHPURL
 * @param {callable} callable  取得した際に実行する関数、引数としてレスポンスメッセージを与える
 * @returns 
 */
module.exports = function(url, callable) {
    const http = require('http');
    
    const php_host = require('../settings/php_host');

    console.log("3");

    const request_url = php_host.host + url;
    let data = '';
    http.get(request_url, response => {

        console.log("4");
        response.on('data', chunk => {
            data = String(chunk);
        });

        response.on('end', () => {
            
            console.log("5");
            callable(data);
            console.log("6");
        });

    }).on('error', err => {
        console.log('Error', err.message);
    });

    return data;
};