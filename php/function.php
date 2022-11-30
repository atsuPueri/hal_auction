<?php
//階層はrouteと同階層に移動させる

//SELECT
function db_get($param){    
    $link=mysqli_connect('localhost','root','','hal_auction');
    mysqli_set_charset($link,'utf8');

    $result=mysqli_query($link,$param);

    //処理が正しく行われなかったとき
    if($result == false){
        //データは空、ステータスはfalse
        return [ 'data' => [], 'status' => false ];
    }

    while($row = mysqli_fetch_assoc($result)){
        $list['data'][] = $row;
    }
    mysqli_close($link);
    //データが入り、ステータスはtrue
    $list['status'] = true;
    return $list;
}
//INSERT DELETE 
function db_change($param){
    $link=mysqli_connect('localhost','root','','hal_auction');
    mysqli_set_charset($link,'utf8');

    $result = mysqli_query($link,$param);

    //処理が正しく行われなかったとき
    if($result == false){
        //データは空、ステータスはfalse
        return [ 'data' => [], 'status' => false ];
    }
    //データが入り、ステータスはtrue
    $list['status'] = true;
    mysqli_close($link);
    return $list;
}

//JSONエンコード
function enc($data) {
    return json_encode($data,
        JSON_HEX_AMP | JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_UNESCAPED_UNICODE
    );
}

//メーカー一覧を取得
function get_maker_list(){
    $sql = "SELECT * FROM maker";
    return db_get($sql);
}
//車種一覧を取得
function get_car_type_list(){
    $sql = "SELECT * FROM car_type";
    return db_get($sql);
}
//車両一覧を取得
function get_car_list(){
    $sql = "SELECT * FROM car";
    return db_get($sql);
}
//出品一覧を取得
function get_exhibit_list(){
    $sql = "SELECT * FROM exhibit";
    return db_get($sql);
}

