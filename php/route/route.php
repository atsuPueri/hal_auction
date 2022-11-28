<?php
/**
 * リクエストURLを取得する
 */

// 親パスのフルパスを取得
$parent_path = dirname(__FILE__, 2); // 上の上のパスを取得


// Windowsの場合
if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
    $separator = '\\';
} else {
    $separator = '/';
}

// \で分割
$parent_path_array = explode($separator, $parent_path);
// 最後だけ取得(親フォルダ名)
$parent_folder_name = $parent_path_array[count($parent_path_array) - 1];

// アクセスしたURIを取得
$uri = $_SERVER['REQUEST_URI'];

// 親パスから後ろを取得
$request_array = explode($parent_folder_name, rawurldecode($uri));
$request_path = $request_array[count($request_array) - 1];

// GETパラメータもしくはアンカーを削除
$request_path = preg_replace('/(\?|#).*$/', '', $request_path);

return $request_path;









