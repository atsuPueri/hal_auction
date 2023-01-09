//loginページの時に動く

// const socketio = io();
// //登録ボタンが押されたら動く
// const btn = document.getElementById("login_btn");
// btn.addEventListener("click", function(event){

//     const login_id = document.getElementById("login_id");
//     const pass = document.getElementById("pass");
    
//     const sendData = {
//         login_id : login_id.value,
//         pass : pass.value
//     };

//     // クライアント(ブラウザ)→サーバ(Node.js)へSocket送信
//     socketio.emit('login_info', JSON.stringify (sendData));
// });

//登録ボタンが押されたら動く
// const btn = document.getElementById("register");
// btn.addEventListener("click", function(event){

//     const name = document.getElementById("name");
//     const login = document.getElementById("login");
//     const pass = document.getElementById("pass");
//     const tel = document.getElementById("tel");
//     const postal = document.getElementById("postal");
//     const address = document.getElementById("address");
//     const apartment = document.getElementById("apartment");

//     const sendData = {
//         name : name.value,
//         login : login.value,
//         pass : pass.value,
//         tel : tel.value,
//         postal : postal.value,
//         address : address.value,
//         apartment : apartment.value
//     };

//     // クライアント(ブラウザ)→サーバ(Node.js)へSocket送信
//     socketio.emit('login', JSON.stringify (sendData));
// });