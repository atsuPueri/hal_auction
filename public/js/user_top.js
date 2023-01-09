//user_topページの時に動く
// const socketio = io();

//登録ボタンが押されたら動く
// const btn = document.getElementById("deleteBtn");
// btn.addEventListener("click", function(event){
//     event.preventDefault();

//     const item_list = document.getElementsByClassName('item');
//     const selected_items = [];
//     for (const element of item_list) {
//         if (element.checked === true) {
//             selected_items.push(element.value);
//         }
//     }

//     // クライアント(ブラウザ)→サーバ(Node.js)へSocket送信
//     socketio.emit('del_car', JSON.stringify (selected_items));
// });


const json = document.getElementById('carDataJson').dataset.car_data;
const parse_obj = JSON.parse(json);

let min = Infinity;
let mincolmn = {};
// 一番若いcolumnを特定
for (const column of parse_obj) {
    const from = new Date(column.time_from);
    if (from.getTime() < min) {
        mincolmn = column;
    }
}

const path = window.location.pathname;
const user_id = path.split('/')[3]; // /user_top/:userId

const held = document.getElementById('held');
const heldH2 = held.getElementsByTagName('h2')[0];
const heldInPHTMLColection = held.getElementsByTagName('p');

const car_type_name = heldInPHTMLColection[0];
const now_price     = heldInPHTMLColection[1];
const time_left     = heldInPHTMLColection[2];

car_type_name.textContent = `車種名：${mincolmn.car_type_name}`;
now_price.textContent     = `現在の落札価格：${mincolmn.now_price}`;

let from = new Date(mincolmn.time_from);
let to   = new Date(mincolmn.time_to);

console.log(parse_obj);

setInterval(() => {
    const nowDate = new Date();

    let baseDate;

    if (nowDate.getTime() < from.getTime()) {
        baseDate = from;
        heldH2.textContent = "開催予定";
    } else {
        baseDate = to;
        heldH2.textContent = "オークション開催中";
    }
    const difference = baseDate.getTime() - nowDate.getTime();
    
    const d = Math.trunc(difference / (1000 * 86400)); // -0.xxx は0としたいのでtrunc
    const h = Math.trunc(difference / (1000 * 3600)) % 24;
    const m = Math.trunc(difference / (1000 * 60)) % 60;
    const s = Math.floor(difference / (1000)) % 60; // 0.xxx ~ -0.xxx の区間を潰すためfloor

    time_left.textContent = `残り時間: ${d}日 ${h}時 ${m}分 ${s}秒`;
}, 1000);