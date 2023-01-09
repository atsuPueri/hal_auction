


const left_time = document.getElementById('left_time');

const from_txt = document.getElementById('from').dataset.from;
const to_txt   = document.getElementById('to').dataset.to;

const from = new Date(from_txt);
const to   = new Date(to_txt);

setInterval(() => {
    const nowDate = new Date();
    
    let baseDate;
    
    // 始まっている
    const is_start = nowDate.getTime() < from.getTime();
    if (is_start) {
        baseDate = from;
    } else {
        baseDate = to;
    }
    
    const difference = baseDate.getTime() - nowDate.getTime();
    
    const d = Math.trunc(difference / (1000 * 86400)); // -0.xxx は0としたいのでtrunc
    const h = Math.trunc(difference / (1000 * 3600)) % 24;
    const m = Math.trunc(difference / (1000 * 60)) % 60;
    const s = Math.floor(difference / (1000)) % 60; // 0.xxx ~ -0.xxx の区間を潰すためfloor
    
    if (is_start) {
        left_time.textContent = `残り時間: ${d}日 ${h}時 ${m}分 ${s}秒`;
    } else {
        left_time.textContent = `開始まで: ${d}日 ${h}時 ${m}分 ${s}秒`;
    }
}, 1000);

function set_price(num) {
    const now_price = document.getElementById('now_price');
    now_price.textContent = `￥${num}`;
};