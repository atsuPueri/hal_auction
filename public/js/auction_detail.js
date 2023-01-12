const socketio = io();

const car_id = document.getElementById('car_id').dataset.car_id;

socketio.emit('detail_join', car_id);

const left_time_txt = document.getElementById('left_time_txt');
const left_time = document.getElementById('left_time');

const from_txt = document.getElementById('from').dataset.from;
const to_txt   = document.getElementById('to').dataset.to;

const from = new Date(from_txt);
const to   = new Date(to_txt);

const interval_fnc = () => {
    const nowDate = new Date();
    
    let baseDate;
    const is_start = nowDate.getTime() > from.getTime();
    if (is_start) {
        baseDate = to;
        left_time_txt.textContent = "残り時間";
    } else {
        baseDate = from;
        left_time_txt.textContent = "開始まで";
    }
    
    const difference = baseDate.getTime() - nowDate.getTime();
    
    const d = Math.trunc(difference / (1000 * 86400)); // -0.xxx は0としたいのでtrunc
    const h = Math.trunc(difference / (1000 * 3600)) % 24;
    const m = Math.trunc(difference / (1000 * 60)) % 60;
    const s = Math.floor(difference / (1000)) % 60; // 0.xxx ~ -0.xxx の区間を潰すためfloor

    if (s < 0 || m < 0 || h < 0 || d < 0) {
        console.log(123);
        socketio.emit('end_auction', {

        });
        return;
    }
    
    left_time.textContent = `${d}日 ${h}時 ${m}分 ${s}秒`;
};

interval_fnc();
setInterval(interval_fnc, 1000);

document.getElementById('bit_button').addEventListener('click', () => {
    const bit_text = document.getElementById('bit_text');
    const price = bit_text.value;
    
    const url = new URL(window.location.href);
    const params = url.searchParams;
    const user_id = params.get('user_id');

    if (user_id === null) {
        window.location.href = window.location.origin + "/login";
    } else {
        socketio.emit('bid', JSON.stringify({
            user_id: user_id,
            price:   price,
            car_id:  car_id
        }));
    }
});

socketio.on('upd_exhibit', m => {
    console.log("upd_exhibit");
    console.log(m);
    now_price.textContent = "￥" + m;
});



function set_price(num) {
    const now_price = document.getElementById('now_price');
    now_price.textContent = `￥${num}`;
};
