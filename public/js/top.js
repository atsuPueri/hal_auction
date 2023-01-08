//管理者topページの時に動く

const socketio = io();

//削除ボタンが押されたら動く
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

socketio.on('update_table', function(msg) {
    const table = document.getElementById("table");
    while(table.firstChild){
        table.removeChild(table.firstChild);
    }
    console.log(msg);

    
    const tr = document.createElement('tr');

    const item = document.createElement('th');
    item.textContent = "項目";
    tr.appendChild(item);

    const vehicle = document.createElement('th');
    vehicle.textContent = "車両ID";
    tr.appendChild(vehicle);

    const car_model = document.createElement('th');
    car_model.textContent = "車種名";
    tr.appendChild(car_model);

    const price = document.createElement('th');
    price.textContent = "価格";
    tr.appendChild(price);

    const maker = document.createElement('th');
    maker.textContent = "メーカー名";
    tr.appendChild(maker);

    const start = document.createElement('th');
    start.textContent = "開始時刻";
    tr.appendChild(start);

    const finish = document.createElement('th');
    finish.textContent = "終了時刻";
    tr.appendChild(finish);

    const detail = document.createElement('th');
    detail.textContent = "詳細項目";
    tr.appendChild(detail);

    table.append(tr);

    const parse_obj = JSON.parse(msg);
    for (const column of parse_obj.data) {
        const tr = document.createElement('tr');

        const box_td = document.createElement('td');
        const box = document.createElement('checkbox');
        box.class = "item";
        box.name = "car";
        box.value = column.car_id;
        box_td.appendChild(box);
        tr.appendChild(box_td);


        const car_id = document.createElement('td');
        car_id.textContent = column.car_id;
        tr.appendChild(car_id);

        const name = document.createElement('td');
        name.textContent = column.car_type_name;
        tr.appendChild(name);

        const purchase_price = document.createElement('td');
        purchase_price.textContent = column.purchase_price;
        tr.appendChild(purchase_price);

        const maker_name = document.createElement('td');
        maker_name.textContent = column.maker_name;
        tr.appendChild(maker_name);

        const time_from = document.createElement('td');
        time_from.textContent = column.time_from;
        tr.appendChild(time_from);

        const time_to = document.createElement('td');
        time_to.textContent = column.time_to;
        tr.appendChild(time_to);

        const link = document.createElement('td');
        const a = document.createElement('a');
        a.href = "test1/" +column.car_id;
        a.textContent = "詳細表示";
        link.appendChild(a);
        tr.appendChild(link);
        

        table.append(tr);
    }
});