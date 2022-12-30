//管理者userページの時に動く

const socketio = io();

//退会ボタンが押されたら動く
const btn = document.getElementsByClassName('withdrawalBtn');
console.log(btn);

btn.addEventListener("click", function(event){
    event.preventDefault();

    console.log("a");
    // const selected_items = [];
    // for (const element of item_list) {
    //     if (element.checked === true) {
    //         selected_items.push(element.value);
    //     }
    // }

    // // クライアント(ブラウザ)→サーバ(Node.js)へSocket送信
    // socketio.emit('del_car', JSON.stringify (selected_items));
});