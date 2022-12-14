<?php
require_once __DIR__.'/../function.php';
$request_path = require(__DIR__ . '/route.php');
// echo $request_path;

// $get_array = [
//     "user_id" => 1,
//     "maker_id" => 1,
//     "car_type_id" => 1,
//     "car_id" => 5,
//     "bid_price" => 40000,
//     "time" => '2022-11-30 13:52:30'
// ];


// echo $sql;

switch ($request_path) {

    // -----テスト用
    case "/test":
        // $list = db_get($sql);
        $list = [
            "AAA" => "VAL"
        ];
        return enc($list);


    // -----車両テーブル
    case "/get_car":
        //車両を取得
        $sql = "SELECT * FROM car ";
        $sql = add_and($sql, "car_id", "=", $_GET["car_id"] ?? '');

        $list = db_get($sql);
        return enc($list);

    case "/add_car":    
       //車両を登録
       $into_make = ([
            "car_type_id" => $_GET['car_type_id'],
            "purchase_price" => $_GET['purchase_price'],
            "body_type" => $_GET['body_type'],
            "model_year" => $_GET['model_year'],
            "mileage" => $_GET['mileage'],
            "is_actual_driving" => $_GET['is_actual_driving'],
            "clor" => $_GET['clor'],
            "vehicle_inspection_expiration_date" => $_GET['vehicle_inspection_expiration_date'],
            "automatic_or_mission" => $_GET['automatic_or_mission'],
            "displacement" => $_GET['displacement'],
            "number_of_passengers" => $_GET['number_of_passengers'],
            "drive_system" => $_GET['drive_system'],
            "equipment" => $_GET['equipment']
        ]);
        $sql = "INSERT INTO car ";
        $sql .= into_make($into_make);

        $list = db_change($sql);
        return enc($list);

        
    // -----メーカー    
    case "/get_maker":
        //メーカーを取得
        $sql = "SELECT * FROM maker ";
        $sql = add_and($sql, "maker_id", "=", $_GET["maker_id"] ?? '');

        $list = db_get($sql);
        return enc($list);


    // -----車種
    case "/get_car_type":
        //車種を取得
        $sql = "SELECT * FROM car_type ";
        $sql = add_and($sql, "car_type_id", "=", $_GET["car_type_id"] ?? '');

        $list = db_get($sql);
        return enc($list);


    // -----出品
    case "get_exhibit":
        //出品を取得
        $sql = "SELECT * FROM exhibit ";
        $sql = add_and($sql, "car_id", "=", $_GET["car_id"] ?? '');

        $list = db_get($sql);
        return enc($list);


    // -----入札
    case "/get_bid":
        //入札を取得
        $sql = "SELECT * FROM bid ";
        $sql = add_and($sql, "user_id", "=", $_GET["user_id"] ?? '');
        $sql = add_and($sql, "car_id", "=", $_GET["car_id"] ?? '');

        $list = db_get($sql);
        return  enc($list);  

    case "/add_bid":
        //入札を登録
        $into_make = ([
            "user_id" => $_GET['user_id'],
            "car_id" => $_GET['car_id'],
            "bid_price" => $_GET['bid_price'],
            "time" => $_GET['time']
        ]);
        $sql = "INSERT INTO bid ";
        $sql .= into_make($into_make);

        $list = db_change($sql);
        return enc($list);


    // -----ユーザーテーブル
    case "/get_user":
        //ユーザーを取得
        $sql = "SELECT * FROM user ";
        $sql = add_and($sql, "user_id", "=", $_GET["user_id"] ?? '');

        $list = db_get($sql);
        return  enc($list);
    
    
    // -----お気に入り出品    
    case "/get_favorite_exhibit":
        //お気に入り出品を取得
        $sql = "SELECT * FROM favorite_exhibit ";
        $sql = add_and($sql, "user_id", "=", $_GET["user_id"] ?? '');

        $list = db_get($sql);
        return  enc($list);

    case "/add_favorite_exhibit":
        //お気に入り出品を登録
        $into_make = ([
            "user_id" => $_GET['user_id'],
            "car_id" => $_GET['car_id']
        ]);

        $sql = "INSERT INTO favorite_exhibit ";
        $sql .= into_make($into_make);

        $list = db_change($sql);
        return enc($list);

    case "/del_favorite_exhibit":
        //お気に入り出品を削除
        $sql = "DELETE FROM favorite_exhibit ";
        $sql = add_and($sql, "user_id", "=", $_GET["user_id"] ?? '');
        $sql = add_and($sql, "car_id", "=", $_GET["car_id"] ?? '');

        $list = db_change($sql);
        return enc($list);


    // -----お気に入り車両テーブル
    case "/get_favorite_car_type":
        //お気に入り車両を取得
        $sql = "SELECT * FROM favorite_car_type ";
        $sql = add_and($sql, "user_id", "=", $_GET["user_id"] ?? '');

        $list = db_get($sql);
        return  enc($list);


    // -----その他   
    default:
        return enc([
            'html' => '',
            'status' => 404
        ]);
}




