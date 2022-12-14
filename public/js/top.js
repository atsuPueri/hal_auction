//チャットのページを表示した時に動く
const socketio = io();

//ボタンが押されたら動く
const btn = document.getElementById("topBtn");
btn.addEventListener("click", function(event){
    event.preventDefault();

    const item_list = document.getElementsByClassName('item');
    const selected_items = [];
    for (const element of item_list) {
        if (element.checked === true) {
            selected_items.push(element.value);
        }
    }

    console.log(selected_items);
    // const sendData = {
        
    //     item : item_list
    // };
    // クライアント(ブラウザ)→サーバ(Node.js)へSocket送信
    socketio.emit('c2s-chat', sendData);
});

// socketio.on('s2c-chat', function(msg){
//     console.log('ソケットs2c-'+msg.chat+':'+msg);
//     var ul = document.getElementById("output");
//     var li = document.createElement('li');
//     li.innerHTML = msg.id+'     '+msg.username +'       '+msg.message;
//     ul.appendChild(li);
// });