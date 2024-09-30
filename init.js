// [name, gold, perfect, level, effect]
var items = [
    ['经验瓶子', 1000, 4, 2, '增加60经验', 1],
    ['贵重礼物', 20000, 8, 12, '贿赂Entity给你走后门升20级', 1],
    ['钱袋', 0, 0, 1, '里边有钱', 0],
    ['面包', 500000, 0, 1, '已售罄，缺货', 1],
];
window.items = items;

window.onload = function() {
    var shop = document.getElementById('shop');
    var inv = document.getElementById('inventory');
    for(var i = 0; i < items.length; i++) {
        if(items[i][1] > 5) {
            var item = items[i];
            var a = document.createElement('a');
            var p = document.createElement('p');
            shop.appendChild(a);
            a.appendChild(p);
            a.href='javascript:buy('+i+');';
            var showItem = '[Lv.'+item[3]+'] '+item[0]+'<br>-'+item[4]+'<br>&nbsp;';
            showItem += item[1]+'黄金';
            if(item[2] > 0) {
                showItem += ', '+item[2]+'完美';
            }
            p.innerHTML=showItem;
        }
    }

    var a = document.createElement('a');
    var p = document.createElement('p');
    inv.appendChild(a);
    a.appendChild(p);
    a.href='javascript:void(0);';
    p.innerHTML='空空如也';

    var alla = document.querySelectorAll('a');
    for(var i = 0; i < alla.length; i++) {
        alla[i].draggable='false';
        alla[i].tabIndex='-1';
    }
}
