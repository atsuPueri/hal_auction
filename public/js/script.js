// 1単位の高さ
const base_height = 35;
const base_height_unit = 'px';

window.addEventListener('load', () => {

    // 時刻の高さを調整
    const time_HTMLCollection = document.getElementsByClassName('time');
    for (const timeElement of time_HTMLCollection) {
        timeElement.style.height = base_height + base_height_unit;
    }

    // ドラッグアンドドロップの処理
    const drag_zone = document.getElementById('drag_zone');
    const row_HTMLCollection = drag_zone.getElementsByClassName('row');

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
                const parentElement = event.target.parentElement;
                let height = parentElement.offsetHeight + event.offsetY;

                // 切り替え単位
                const switchng_unit = base_height;
                height = Math.round(height / switchng_unit) * switchng_unit;

                // 0以下は終了
                if (height <= 0) {
                    return;
                }

                parentElement.style.height = height + 'px';
            });
        }

        // 横の要素への移動処理
        row.addEventListener('dragenter', event => {
            const target = event.target;

            // 自分自身、もしくは他のドラッグ要素に入れ子にさせないため。
            if (!target.classList.contains('row')) {
                return;
            }
            // 要素が無ければ終了
            if (catch_draggable_element === undefined) {
                return;
            }

            // 要素を移動させる
            target.insertBefore(catch_draggable_element, null);
        });
    }
});