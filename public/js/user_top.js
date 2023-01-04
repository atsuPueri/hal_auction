//user_topページの時に動く
const socketio = io();

//登録ボタンが押されたら動く
const btn = document.getElementById("deleteBtn");
btn.addEventListener("click", function(event){
    event.preventDefault();

    const item_list = document.getElementsByClassName('item');
    const selected_items = [];
    for (const element of item_list) {
        if (element.checked === true) {
            selected_items.push(element.value);
        }
    }

    // クライアント(ブラウザ)→サーバ(Node.js)へSocket送信
    socketio.emit('del_car', JSON.stringify (selected_items));
});