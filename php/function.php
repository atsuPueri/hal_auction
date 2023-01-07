<?php

//-----SQL実行関数

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
    mysqli_close($link);
    //データが入り、ステータスはtrue
    $list['status'] = true;
    return $list;
}


//-----SQL生成関数

//ANDもしくはカンマで繋いでSQL文を生成 SELECT DELETE
function add_and($sql, $column, $operator, $val, $middle = "WHERE") {
    //値が入っていなかった場合空で返す
    if (($val ?? '') === '') {
        return $sql;
    }

    static $flg = true;
    static $flg_middle;

    if($flg){
        $flg_middle = $middle;
    }
    //句が変わったとき
    if($flg_middle != $middle){
        $flg = true;
        $flg_middle = $middle;
    }

    $sql .= "\n";
    // 一回目のみtrue
    if($middle == "SET"){
        if ($flg) {
            $sql .= $middle;
            $flg = false;
        } else {
            $sql .= ",";
        }
    }
    if($middle == "WHERE"){
        if ($flg) {
            $sql .= $middle;
            $flg = false;
        } else {
            $sql .= "AND";
        }
    }
    $sql .= " {$column} {$operator} {$val} ";
    return $sql;
}

//INSERT文を生成
function into_make(array $associative_array): string {

    // insert文作成
    $keys = [];
    $values = [];
    foreach ($associative_array as $key => $value) { // 添え字と中身をそれぞれ配列に格納
        $keys[] = $key;
        $values[] = $value;
    }

    $column = implode(", ", $keys); // A,B,C 　この形で格納
    $data = implode(", ", $values); // 'A','B','C','D' 
    $sql = "({$column}) VALUES ({$data}) ";
    
    return $sql;
}

//JSONエンコード
function enc($data) {
    return json_encode($data,
        JSON_HEX_AMP | JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_UNESCAPED_UNICODE
    );
}





