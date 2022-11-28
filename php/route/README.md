
# ルーティングのやり方


### web.php
ルーティングを行うファイル

``` php
// アクセスしてきたURL
$request_path = require(__DIR__ . '/route.php');

switch ($request_path) {
    // このURLの時に以下の値を出力
    case '/':
        return json_enc([
            'data' => [
                'name' => 'あつ',
                'age' => 20,
            ],
            'status' => 200,
        ]);
    
    default:
        return json_enc([
            'data' => [],
            'status' => 403,
        ]);
}

function json_enc($data) {
    return json_encode($data,
        JSON_HEX_AMP | JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT
    );
}
```

### route.php
requestされたURLを取得するファイル、基本変更の必要なし

