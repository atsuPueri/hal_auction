<?php
require_once __DIR__.'/../function.php';
$request_path = require(__DIR__ . '/route.php');


switch ($request_path) {

    // ---------------------------------車両テーブル
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

    case "/del_car":
        //車両を取得
        $sql = "SELECT * FROM car 
        WHERE car_id = {$_GET["car_id"]}";

        $list = db_get($sql);
        return enc($list);    


    // ---------------------------------メーカーテーブル 
    case "/get_maker":
        //メーカーを取得
        $sql = "SELECT * FROM maker ";
        $sql = add_and($sql, "maker_id", "=", $_GET["maker_id"] ?? '');

        $list = db_get($sql);
        return enc($list);


    // ---------------------------------車種テーブル
    case "/get_car_type":
        //車種を取得
        $sql = "SELECT * FROM car_type ";
        $sql = add_and($sql, "car_type_id", "=", $_GET["car_type_id"] ?? '');

        $list = db_get($sql);
        return enc($list);


    // ---------------------------------出品テーブル
    case "/get_exhibit":
        //出品を取得
        $sql = "SELECT * FROM exhibit ";
        $sql = add_and($sql, "car_id", "=", $_GET["car_id"] ?? '');

        $list = db_get("SELECT * FROM exhibit");
        return enc($list);

    case "/add_exhibit":
        //出品を登録
        $into_make = ([
            "car_id" => $_GET['car_id'],
            "lowest_price" => $_GET['lowest_price'],
            "first_price" => $_GET['first_price'],
            "bid_increase" => $_GET['bid_increase'],
            "now_price" => $_GET['now_price'],
            "time_from" => $_GET['time_from'],
            "time_to" => $_GET['time_to']
        ]);
        $sql = "INSERT INTO exhibit ";
        $sql .= into_make($into_make);

        $list = db_change($sql);
        return enc($list);

    case "/upd_exhibit":
        $sql = "UPDATE exhibit ";
        $sql = add_and($sql, "lowest_price", "=", $_GET['lowest_price'] ?? '','SET');
        $sql = add_and($sql, "first_price", "=", $_GET['first_price'] ?? '','SET');
        $sql = add_and($sql, "bid_increase", "=", $_GET['bid_increase'] ?? '','SET');
        $sql = add_and($sql, "now_price", "=", $_GET['now_price'] ?? '','SET');
        $sql = add_and($sql, "time_from", "=", $_GET['time_from'] ?? '','SET');
        $sql = add_and($sql, "time_to", "=", $_GET['time_to'] ?? '','SET');
        //WHERE句
        $sql = add_and($sql, "car_id", "=", $_GET["car_id"] ?? '');
        
        $list = db_change($sql);
        return enc($list);

    case "/del_exhibit":
        //出品を削除
        $sql = "DELETE FROM exhibit 
        WHERE car_id = {$_GET['car_id']}";
        
        $list = db_change($sql);
        return enc($list);
        

    // ---------------------------------入札テーブル
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


    // ---------------------------------ユーザーテーブル
    case "/get_user":
        //ユーザーを取得
        $sql = "SELECT * FROM user ";
        $sql = add_and($sql, "user_id", "=", $_GET["user_id"] ?? '');

        $list = db_get($sql);
        return  enc($list);

    case "/add_user":    
        //ユーザーを登録
        $into_make = ([
            "login_id" => $_GET['login_id'],
            "hash_password" => $_GET['hash_password'],
            "user_name" => $_GET['user_name'],
            "phone_number" => $_GET['phone_number'],
            "post_code" => $_GET['post_code'],
            "address" => $_GET['address'],
            "apartment" => $_GET['apartment'],
            "status" => $_GET['status']
        ]);
        $sql = "INSERT INTO user ";
        $sql .= into_make($into_make);

        $list = db_change($sql);
        return enc($list);

    
    // ---------------------------------お気に入り出品テーブル
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
        $sql = "DELETE FROM favorite_exhibit 
        WHERE user_id = {$_GET["user_id"]} AND car_id = {$_GET["car_id"]}";

        $list = db_change($sql);
        return enc($list);


    // ---------------------------------お気に入り車種テーブル
    case "/get_favorite_car_type":
        //お気に入り車種を取得
        $sql = "SELECT * FROM favorite_car_type ";
        $sql = add_and($sql, "user_id", "=", $_GET["user_id"] ?? '');

        $list = db_get($sql);
        return  enc($list);

    case "/add_favorite_car_type":
        $into_make = ([
            "user_id" => $_GET['user_id'],
            "car_type_id" => $_GET['car_type_id'],
            "maker_id" => $_GET['maker_id'],
            "keyword" => $_GET['keyword'],
            "equipment" => $_GET['equipment'],
            "mileage" => $_GET['mileage'],
            "clor" => $_GET['clor'],
            "automatic_or_mission" => $_GET['automatic_or_mission'],
            "number_of_passengers" => $_GET['number_of_passengers']
        ]);
        $sql = "INSERT INTO favorite_car_type ";
        $sql .= into_make($into_make);

        $list = db_change($sql);
        return enc($list);

    case "/del_favorite_car_type":
        //お気に入り車種を削除
        $sql = "SELECT * FROM favorite_car_type 
        WHERE favorite_car_type_id = {$_GET['favorite_car_type_id']}";

        $list = db_change($sql);
        return  enc($list);


    // ---------------------------------その他   
    default:
        return enc([
            'html' => '',
            'status' => 404
        ]);
}




