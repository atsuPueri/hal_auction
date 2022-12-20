const { describe } = require("node:test");

//チャットのページを表示した時に動く
const socketio = io();
socketio.emit('test', '');

//ボタンが押されたら動く
const entryBtn = document.getElementById("entryBtn");
entryBtn.addEventListener("click", function(event){
    event.preventDefault();
    
    const carName = document.getElementById("name");
    const make = document.getElementById("meka");
    const date = document.getElementById("date");
    const bodyType = document.getElementById("bodyType");
    const yearType = document.getElementById("yearType");
    const loadResult = document.getElementById("loadResult");
    const run = document.getElementById("run");
    const color = document.getElementById("color");
    const vehicleInspection = document.getElementById("vehicleInspection");
    const auto = document.getElementById("auto");
    const co = document.getElementById("co");
    const ride = document.getElementById("ride");
    const drive = document.getElementById("drive");
    const equipment = document.getElementById("equipment");

    const sendData = {
        carName : carName,
        make : make,
        date : date,
        bodyType : bodyType,
        yearType : yearType,
        loadResult : loadResult,
        run : run,
        color : color,
        vehicleInspection : vehicleInspection,
        auto : auto,
        co : co,
        ride : ride,
        drive : drive,
        equipment : equipment,
    };
    // クライアント(ブラウザ)→サーバ(Node.js)へSocket送信
    socketio.emit('register_car', JSON.stringify (sendData));
});

// socketio.on('s2c-chat', function(msg){
//     console.log('ソケットs2c-'+msg.chat+':'+msg);
//     var ul = document.getElementById("output");
//     var li = document.createElement('li');
//     li.innerHTML = msg.id+'     '+msg.username +'       '+msg.message;
//     ul.appendChild(li);
// });