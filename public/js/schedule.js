
// 1単位の高さ
const base_height = 35;
const base_height_unit = 'px';

window.addEventListener('load', () => {

    // 時刻の高さを調整
    const time_HTMLCollection = document.getElementsByClassName('time');
    for (const timeElement of time_HTMLCollection) {
        timeElement.style.height = base_height + base_height_unit;
    }

    // ----  ドラッグアンドドロップの処理  ----  \\
    const row_HTMLCollection = document.getElementsByClassName('row');

    // 横のrowに移動できるように保持する
    let catch_draggable_element;
    // rowを取り出し
    for (const row of row_HTMLCollection) {

        // rowの中身を全て取り出し
        for (const draggable of row.children) {

            // draggableの高さ調整
            draggable.style.height = base_height + base_height_unit;

            // つかんだ時の処理
            draggable.addEventListener('dragstart', event => {
                const target = event.target;

                // draggableじゃ無いとき
                if (!target.classList.contains('draggable')) {
                    return;
                }
                catch_draggable_element = target; // ドラッグ開始時に保持
                target.style.opacity = "0.5";
            });

            // 離した時の処理
            draggable.addEventListener('dragend', event => {
                event.target.style.opacity = "1";
                catch_draggable_element = undefined;
            });

            // 移動処理 (縦軸
            draggable.addEventListener('drag', event => {
                const target = event.target;

                // ドラッグ中の要素の真ん中からの距離
                const offsetY = event.offsetY - (target.offsetHeight / 2); // ちょうど真ん中から数える
                let top = target.offsetTop + offsetY; // 移動差分を足す

                const switchng_unit = base_height; // 切り替え単位
                top = Math.round(top / switchng_unit) * switchng_unit; // カクカク動かすために割る

                // 0の時（離したとき） || 上に突き抜けないよう
                if (event.clientY == 0 || top < 0) {
                    return;
                }

                // draggable以外なら終了
                if (!target.classList.contains('draggable')) {
                    return;
                }

                // 同じ位置に別の要素があった時 かぶらないように移動を制限
                const now_row = target.parentElement.getElementsByClassName('draggable');
                for (const element of now_row) {
                    
                    // 選択している物の時はスキップ
                    if (element === target) {
                        continue;
                    }
                    // bottom位置を計算
                    const target_bottom = top + target.offsetHeight;
                    const element_bottom = element.offsetTop + element.offsetHeight;

                    // 動かしている要素のTOPとBOTTOM位置が他要素を侵害するとき
                    if (!(element_bottom <= top) && !(target_bottom <= element.offsetTop)) {
                        return;
                    }
                }

                // 実際に高さをセットする
                target.style.top = top + base_height_unit;
            });

            const sizeElement = draggable.getElementsByClassName('size')[0];
            sizeElement.draggable = true;

            // サイズ変更の処理
            sizeElement.addEventListener('drag', event => {
                // 親要素
                const target = event.target;
                const draggable = target.parentElement;
                let height = draggable.offsetHeight + event.offsetY;

                // 切り替え単位
                const switchng_unit = base_height;
                height = Math.round(height / switchng_unit) * switchng_unit;

                // 0以下は終了
                if (height <= 0) {
                    return;
                }

                // 現在の大きさが他要素を侵害しないかチェック
                const now_row = draggable.parentElement.getElementsByClassName('draggable');
                for (const element of now_row) {
                    // 選択している物の時はスキップ
                    if (element === draggable) {
                        continue;
                    }

                    // bottom位置を計算
                    const draggable_bottom = draggable.offsetTop + height;
                    const element_top = element.offsetTop;
                    const element_bottom = element_top + element.offsetHeight;
                    
                    //  選択しているものより上のものは関係ない
                    if (element_bottom < draggable.offsetTop) {
                        continue;
                    }

                    if (element_top < draggable_bottom) {
                        return;
                    }
                }

                draggable.style.height = height + 'px';
            });
        }

        // 横の要素への移動処理
        row.addEventListener('dragenter', event => {
            const target = event.target;

            // row以外に入れ子にさせないため。
            if (!target.classList.contains('row')) {
                return;
            }
            // 要素が無ければ終了
            if (catch_draggable_element === undefined) {
                return;
            }

            const draggable_top = catch_draggable_element.offsetTop;
            const draggable_bottom = draggable_top + catch_draggable_element.offsetHeight;

            const event_row = target.getElementsByClassName('draggable');
            for (const element of event_row) {

                // 選択している物の時はスキップ
                if (element === catch_draggable_element) {
                    continue;
                }
                
                const element_bottom = element.offsetTop + element.offsetHeight;

                
                if (
                    !(element_bottom <= draggable_top) &&
                    !(draggable_bottom <= element.offsetTop)
                ) {
                    return;
                }
            }
            
            // 要素を移動させる
            target.insertBefore(catch_draggable_element, null);
        });
    }

    
    // Nodeと連携

    /** week要素*/
    const camp_week = document.getElementById('camp-week');

    const now_date = new Date();
    const now_week = getWeek(now_date);

    // 初期値設定
    camp_week.value = now_week;
    

    /** 登録ボタン たぶん未完 */
    const schedule_registration = document.getElementById('schedule_registration');
    schedule_registration.addEventListener('click', event => {
        const socket = io();
        
        const row_HTMLCollection = document.getElementsByClassName('row');
        const  draggable_list = [];
        for (const key of Object.keys(row_HTMLCollection)) {
            const draggable = row_HTMLCollection.getElementById('draggable');
            const car_info = {
                id: draggable.dataset.id,
                row: draggable.parentElement.dataset.week,
                first: draggable.offsetTop / base_height,
                last: (draggable.offsetTop + draggable.offsetHeight) / base_height ,
            };
        }
        const request_message = "";

    });
});

/**
 * draggableを生成する
 * @param {Number} id 
 * @param {Number} rowKey
 * @param {*} first 
 * @param {*} last 
 */
function set_draggable(id, rowKey, first, last) {
    const draggable = document.createElement('div');
    draggable.classList.add('draggable');
    draggable.draggable = true;
    draggable.dataset.id = id;

    const drag_zone = document.getElementById('drag_zone');
    const row_HTMLCollection = drag_zone.getElementsByClassName('row');

    row_HTMLCollection[row]

    const size = document.createElement('div');
    size.classList.add('size');

    draggable.appendChild(size);
}

function DateToNumber(date)
{
    
}

