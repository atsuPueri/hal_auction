<?php
require_once 'function.php';
$request_path = require(__DIR__ . '/route.php');
// echo $request_path;

switch ($request_path) {

    case "/test":
        $test = $_GET['test'];

        $sql = "SELECT *
        FROM maker
        WHERE maker_id = {$test} ";

        $list = db_get($sql);
        return enc($list);

    case "/get_maker_list":
        //メーカーテーブルを取得
        $list = get_maker_list();
        return enc($list);
    
    case "/get_car_type_list":
        //車種テーブルを取得
        $list = get_car_type_list();
        return enc($list);

    case "/add_favorite_exhibit":
        //お気に入り出品を登録
        $sql = "INSERT INTO favorite_exhibit(user_id, car_id)
        VALUES (1,10)";
        $list = db_change($sql);
        return enc($list);




    default:
        return enc([
            'html' => '',
            'status' => 404
        ]);
}

