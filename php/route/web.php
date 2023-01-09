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

    case "/get_car_join":
        //車種とメーカーをJOINした車両を取得
        $sql = "SELECT c.*, 
        ct.name AS car_type_name, 
        ct.img_name AS car_type_img_name, 
        m.name AS maker_name, 
        m.img_name AS maker_img_name, 
        ex.time_from AS time_from,
        ex.time_to AS time_to,
        ex.now_price AS now_price,
        ex.first_price AS first_price,
        ex.lowest_price AS lowest_price 
        FROM car AS c LEFT JOIN car_type AS ct
        ON c.car_type_id = ct.car_type_id 
        LEFT JOIN maker AS m 
        ON ct.maker_id = m.maker_id 
        LEFT JOIN exhibit AS ex 
        ON c.car_id = ex.car_id ";
        $sql = add_and($sql, "c.car_id",    "=", $_GET["car_id"]  ?? '');
        $sql = add_and($sql, "ex.time_to", ">=", $_GET["time_to"] ?? '');//時間

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
            "color" => $_GET['color'],
            "vehicle_inspection_expiration_date" => $_GET['vehicle_inspection_expiration_date'],
            "automatic_or_mission" => $_GET['automatic_or_mission'],
            "displacement" => $_GET['displacement'],
            "number_of_passengers" => $_GET['number_of_passengers'],
            "drive_system" => $_GET['drive_system'],
            "equipment" => $_GET['equipment']
        ]);

        $into_make["equipment"] = decbin($into_make["equipment"]);

        $length = 32;
        $count = $length - strlen($into_make["equipment"]);

        $into_make["equipment"] = str_repeat('0', $count).$into_make["equipment"];

        $sql = "INSERT INTO car ";
        $sql .= into_make($into_make);
        var_dump($sql);
        $list = db_change($sql);
        
        return enc($list);

    case "/upd_car":
        $sql = "UPDATE car ";
        $sql = add_and($sql, "car_type_id", "=", $_GET['car_type_id'] ?? '','SET');
        $sql = add_and($sql, "purchase_price", "=", $_GET['purchase_price'] ?? '','SET');
        $sql = add_and($sql, "body_type", "=", $_GET['body_type'] ?? '','SET');
        $sql = add_and($sql, "model_year", "=", $_GET['model_year'] ?? '','SET');
        $sql = add_and($sql, "mileage", "=", $_GET['mileage'] ?? '','SET');
        $sql = add_and($sql, "is_actual_driving", "=", $_GET['is_actual_driving'] ?? '','SET');
        $sql = add_and($sql, "color", "=", $_GET['color'] ?? '','SET');
        $sql = add_and($sql, "vehicle_inspection_expiration_date", "=", $_GET['vehicle_inspection_expiration_date'] ?? '','SET');
        $sql = add_and($sql, "automatic_or_mission", "=", $_GET['automatic_or_mission'] ?? '','SET');
        $sql = add_and($sql, "displacement", "=", $_GET['displacement'] ?? '','SET');
        $sql = add_and($sql, "number_of_passengers", "=", $_GET['number_of_passengers'] ?? '','SET');
        $sql = add_and($sql, "equipment", "=", $_GET['equipment'] ?? '','SET');
        //WHERE句
        $sql = add_and($sql, "car_id", "=", $_GET["car_id"] ?? '');
        
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
        $sql = "SELECT *
        FROM 
        exhibit AS e LEFT JOIN car AS c 
        ON e.car_id = c.car_id 
        LEFT JOIN car_type AS ct 
        ON c.car_type_id = ct.car_type_id ";
        $sql = add_and($sql, "e.car_id", "=", $_GET["car_id"] ?? '');//車両ID
        $sql = add_and($sql, "e.time_to", ">=", $_GET["time_to"] ?? '');//時間
        $sql = add_and($sql, "c.car_type_id", "=", $_GET["car_type_id"] ?? '');//車種
        $sql = add_and($sql, "ct.name", "LIKE", "'%" . ($_GET['keyword'] ?? '') . "%'");//車種（キーワード検索）
        $sql = add_and($sql, "c.equipment", "=", $_GET["equipment"] ?? '');//装備品
        if(isset($_GET["mileage_max"])){//走行距離
            //maxがある場合
            $sql = add_and($sql, "c.mileage", "BETWEEN", $_GET["mileage_min"] ?? 0  . " AND " . $_GET["mileage_max"]);
        }elseif(isset($_GET["mileage_min"])){
            //minだけの場合
            $sql = add_and($sql, "c.mileage", ">=", $_GET["mileage_min"] ?? '');
        }
        $sql = add_and($sql, "c.color", "=", $_GET["color"] ?? '');//色
        $sql = add_and($sql, "c.automatic_or_mission", "=", $_GET["automatic_or_mission"] ?? '');//オートマ・ミッション
        $sql = add_and($sql, "c.number_of_passengers", "=", $_GET["number_of_passengers"] ?? '');//乗車人数
       
        $list = db_get($sql);
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
            "credit_card_number" => $_GET['credit_card_number'],
            // "status" => $_GET['status']
        ]);
        $sql = "INSERT INTO user ";
    
        //パスワードをハッシュ化
        $hash_password = md5($_GET['hash_password']);
        $into_make['hash_password'] = '"'.$hash_password.'"';

        $sql .= into_make($into_make);
        $list = db_change($sql);
        return enc($list);

    case "/upd_user":
        $sql = "UPDATE user ";
        $sql = add_and($sql, "login_id", "=", $_GET['login_id'] ?? '','SET');
        $sql = add_and($sql, "hash_password", "=", $_GET['hash_password'] ?? '','SET');
        $sql = add_and($sql, "user_name", "=", $_GET['user_name'] ?? '','SET');
        $sql = add_and($sql, "phone_number", "=", $_GET['phone_number'] ?? '','SET');
        $sql = add_and($sql, "post_code", "=", $_GET['post_code'] ?? '','SET');
        $sql = add_and($sql, "address", "=", $_GET['address'] ?? '','SET');
        $sql = add_and($sql, "apartment", "=", $_GET['apartment'] ?? '','SET');
        $sql = add_and($sql, "credit_card_number", "=", $_GET['credit_card_number'] ?? '','SET');
        $sql = add_and($sql, "status", "=", $_GET['status'] ?? '','SET');
        //WHERE句
        $sql = add_and($sql, "user_id", "=", $_GET["user_id"] ?? '');
        
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

    case "/upd_favorite_car_type":
        $sql = "UPDATE favorite_car_type ";
        $sql = add_and($sql, "user_id", "=", $_GET['user_id'] ?? '','SET');
        $sql = add_and($sql, "car_type_id", "=", $_GET['car_type_id'] ?? '','SET');
        $sql = add_and($sql, "maker_id", "=", $_GET['maker_id'] ?? '','SET');
        $sql = add_and($sql, "keyword", "=", $_GET['keyword'] ?? '','SET');
        $sql = add_and($sql, "equipment", "=", $_GET['equipment'] ?? '','SET');
        $sql = add_and($sql, "mileage", "=", $_GET['mileage'] ?? '','SET');
        $sql = add_and($sql, "clor", "=", $_GET['clor'] ?? '','SET');
        $sql = add_and($sql, "automatic_or_mission", "=", $_GET['automatic_or_mission'] ?? '','SET');
        $sql = add_and($sql, "number_of_passengers", "=", $_GET['number_of_passengers'] ?? '','SET');
        //WHERE句
        $sql = add_and($sql, "favorite_car_type_id", "=", $_GET["favorite_car_type_id"] ?? '');
        
        $list = db_change($sql);
        return enc($list);    

    case "/del_favorite_car_type":
        //お気に入り車種を削除
        $sql = "SELECT * FROM favorite_car_type 
        WHERE favorite_car_type_id = {$_GET['favorite_car_type_id']}";

        $list = db_change($sql);
        return  enc($list);


    // ---------------------------------通知テーブル
    case "/get_notification":
        //お気に入り車種を取得
        $sql = "SELECT * FROM notification ";
        $sql = add_and($sql, "user_id", "=", $_GET["user_id"] ?? '');

        $list = db_get($sql);
        return  enc($list);

    case "/add_notification":
        $into_make = ([
            "user_id" => $_GET['user_id'],
            "notification_type" => $_GET['notification_type'],
            "car_id" => $_GET['car_id'],
            "time" => $_GET['time']
        ]);
        $sql = "INSERT INTO notification ";
        $sql .= into_make($into_make);

        $list = db_change($sql);
        return enc($list);

    case "/color":
        $color_number = $_GET['color'];
        $color_array = ["白色" , "灰色" , "赤色" , "ピンク色" , "オレンジ色" , "黄色" , "薄緑" , "緑" , "青色" , "紫色" , "紺色" , "黒色"];
        if(count($color_array) > $color_number){
            return enc([
                "data" => $color_array[$color_number],
                "status" => true,
            ]);
        } else {
            return enc([
                "data" => "該当なし",
                "status" => false,
            ]);
        }
        
    case "/login_user":
        //ログイン時のパスワードチェック
        $sql = "SELECT * FROM user ";
        $sql = add_and($sql, "login_id", "=", $_GET["login_id"] ?? '');
        $list = db_get($sql);
        
        $pass = md5('"'.$_GET['pass'].'"');
        // var_dump($pass);
        // var_dump($list["data"][0]["hash_password"]);
        if($list["data"][0]["hash_password"] == $pass){
            return enc([
                "data" => $list["data"][0]["user_id"],
                "status" => true
            ]);
        } else {
            return enc([
                "data" => "",
                "status" => false
            ]);
        }

    case "/detail_info":
        // 駆動方式とボディタイプを取る
        //車種とメーカーをJOINした車両を取得
        $sql = "SELECT c.*, 
        ct.name AS car_type_name, 
        ct.img_name AS car_type_img_name, 
        m.name AS maker_name, 
        m.img_name AS maker_img_name, 
        ex.time_from AS time_from,
        ex.time_to AS time_to,
        ex.now_price AS now_price,
        ex.first_price AS first_price,
        ex.lowest_price AS lowest_price 
        FROM car AS c LEFT JOIN car_type AS ct
        ON c.car_type_id = ct.car_type_id 
        LEFT JOIN maker AS m 
        ON ct.maker_id = m.maker_id 
        LEFT JOIN exhibit AS ex 
        ON c.car_id = ex.car_id ";
        $sql = add_and($sql, "c.car_id",    "=", $_GET["car_id"]  ?? '');
        $sql = add_and($sql, "ex.time_to", ">=", $_GET["time_to"] ?? '');//時間

        $list = db_get($sql);

        //ボディタイプ
        $body_type_list = ["セダン", "クーペ", "オープンカー", "ステーションワゴン", "ワンボックス", "ミニバン", "SUV", "ハッチバック"];
        $list["data"][0]["body_type"] = $body_type_list[$list["data"][0]["body_type"]];

        //駆動処理
        $drive_system_list = ["FF", "FR", "MR", "4WD"];
        $list["data"][0]["drive_system"] = $drive_system_list[$list["data"][0]["drive_system"]];

        //色
        $color_array = ["白色" , "灰色" , "赤色" , "ピンク色" , "オレンジ色" , "黄色" , "薄緑" , "緑" , "青色" , "紫色" , "紺色" , "黒色"];
        $list["data"][0]["color"] = $color_array[$list["data"][0]["color"]];

        return enc($list);

    // ---------------------------------その他   
    default:
        return enc([
            'data' => '存在しないURLです',
            'status' => 404
        ]);
}




