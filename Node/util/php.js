
/**
 * php
 * @param {string} url アクセスするPHPURL
 * @param {callable} callable  取得した際に実行する関数、引数としてレスポンスメッセージを与える
 * @returns 
 */
module.exports = function(url, callable) {
    const http = require('http');
    
    const php_host = require('../settings/php_host');

    const request_url = php_host.host + url;
    let data = '';
    http.get(request_url, response => {

        response.on('data', chunk => {
            data = String(chunk);
        });

        response.on('end', () => {
            callable(data);
        });

    }).on('error', err => {
        console.log('Error', err.message);
    });

    return data;
};