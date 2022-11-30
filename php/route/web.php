<?php
require_once __DIR__.'/../function.php';
$request_path = require(__DIR__ . '/route.php');
// echo $request_path;

switch ($request_path) {

    // -----テスト用
    case "/test":
        $test = $_GET['test'];

        $sql = "SELECT *
        FROM maker
        WHERE maker_id = {$test} ";

        $list = db_get($sql);
        return enc($list);


    // -----メーカー    
    case "/get_maker_list":
        //メーカー一覧を取得
        $list = get_maker_list();
        return enc($list);

    case "/get_maker":
        //maker_idからメーカーを取得
        $maker_id = $_GET['maker_id'];
    
        $sql = "SELECT *
        FROM maker
        WHERE maker_id = {$maker_id} ";

        $list = db_get($sql);
        return enc($list);


    // -----車種
    case "/get_car_type_list":
        //車種一覧を取得
        $list = get_car_type_list();
        return enc($list);

    case "/get_car_type":
        //car_type_idから車種を取得
        $car_type_id = $_GET['car_type_id'];
        
        $sql = "SELECT *
        FROM car_type
        WHERE car_type_id = {$car_type_id} ";
        
        $list = db_get($sql);
        return enc($list);


    // -----お気に入り出品    
    case "/get_favorite_exhibit":
        //user_idからお気に入り出品を取得
        $user_id = $_GET['user_id'];

        $sql = "SELECT * FROM favorite_exhibit 
        WHERE user_id = {$user_id}";

        $list = db_get($sql);
        return  enc($list);

    case "/add_favorite_exhibit":
        //お気に入り出品を登録
        $user_id = $_GET['user_id'];
        $car_id = $_GET['car_id'];

        $sql = "INSERT INTO favorite_exhibit(user_id, car_id)
        VALUES ({$user_id},{$car_id})";

        $list = db_change($sql);
        return enc($list);

    case "/del_favorite_exhibit":
        //お気に入り出品を削除
        $user_id = $_GET['user_id'];
        $car_id = $_GET['car_id'];

        $sql = "DELETE FROM favorite_exhibit 
        WHERE user_id = {$user_id} AND car_id = {$car_id}";

        $list = db_change($sql);
        return enc($list);


    // -----入札
    case "/get_bid":
        //user_idやcar_idから入札一覧を取得
        $user_id = $_GET['user_id'] ?? null;
        $car_id = $_GET['car_id'] ?? null;

        $where1 = "";
        if(!is_null($user_id)){
            $where1 = "user_id = {$user_id}";
            if(!is_null($car_id)){
                $where1 .= " AND car_id = {$car_id}";
            }
        }elseif(!is_null($car_id)){
            $where1 = "car_id = {$car_id}";
        }
        $sql = "SELECT * FROM bid WHERE {$where1}";

        $list = db_get($sql);
        return  enc($list);  

    case "/add_bid":
        //入札一覧を登録
        $user_id = $_GET['user_id'];
        $car_id = $_GET['car_id'];
        $bid_price = $_GET['bid_price'];
        $time = $_GET['time'];

        $sql = "INSERT INTO bid(user_id, car_id, bid_price, time)
        VALUES ({$user_id},{$car_id},{$bid_price},{$time})";

        $list = db_change($sql);
        return enc($list);


    // -----車両テーブル
    case "/get_car_list":
        //車両一覧を取得
        $list = get_car_list();
        return enc($list);

    case "/get_car":
        //user_idから車両を取得
        $car_id = $_GET['car_id'];

        $sql = "SELECT * FROM car 
        WHERE car_id = {$car_id}";

        $list = db_get($sql);
        return enc($list);


    // -----出品テーブル
    case "/get_exhibit_list":
        //出品一覧を取得
        $list = get_exhibit_list();
        return enc($list);


    // -----ユーザーテーブル
    case "/get_user":
        //ユーザーIDからユーザーを取得
        $user_id = $_GET['user_id'];

        $sql = "SELECT * FROM user 
        WHERE user_id = {$user_id}";

        $list = db_get($sql);
        return  enc($list);


    // -----お気に入り車両テーブル
    case "/get_favorite_car_type":
        //ユーザーIDからお気に入り車両を取得
        $user_id = $_GET['user_id'];

        $sql = "SELECT * FROM favorite_car_type 
        WHERE user_id = {$user_id}";

        $list = db_get($sql);
        return  enc($list);



    // -----その他   
    default:
        return enc([
            'html' => '',
            'status' => 404
        ]);
}




