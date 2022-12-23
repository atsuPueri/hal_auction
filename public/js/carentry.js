//車両情報登録した時に動く
const socketio = io();

//車種名によってメーカー名の表示を変える
const makeName = document.getElementById("make");
makeName.addEventListener('change', function(){
    const carJson = document.getElementById("carInfo").dataset.car;
    const carParseObj = JSON.parse(carJson);

    const name = document.getElementById("name");
    //子要素(option)を削除
    while(name.firstChild){
        name.removeChild(name.firstChild);
    }

    const carData = [];
    for (const column of carParseObj) {
        if (column.maker_id == makeName.value) {
            carData.push(column);
            const option = document.createElement("option");
            option.value = column.car_type_id;
            option.textContent = column.name;
            name.appendChild(option);
        }
    }

});

//登録ボタンが押されたら動く
const entryBtn = document.getElementById("entryBtn");
entryBtn.addEventListener("click", function(event){
    event.preventDefault();
    
    const carName = document.getElementById("name");
    const make = document.getElementById("make");
    const price = document.getElementById("price");
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
    // const equipment = document.getElementById("equipment");
    const ornamentsList = document.getElementsByClassName("ornaments");

    console.log(auto.value);

    let selected_items = "";
    for (const element of ornamentsList) {
        if (element.checked === true) {
            selected_items += "1";
        } else {
            selected_items += "0";
        }
    }

    const sendData = {
        carName : carName.value,
        make : make.value,
        price : price.value,
        bodyType : bodyType.value,
        yearType : yearType.value,
        loadResult : loadResult.value,
        run : run.value,
        color : color.value,
        vehicleInspection : vehicleInspection.value,
        auto : auto.value,
        co : co.value,
        ride : ride.value,
        drive : drive.value,
        equipment : selected_items
        // equipment : equipment.value,
        // selected_items, selected_items
    };
    console.log(sendData);
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