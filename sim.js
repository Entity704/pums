var total = 0;
var golds = 0;
var silver = 0;
var a;
var money;
var clicks = 0;
var hits = 0;
ot = Date.now();

function randomMoney(isup) {
    hits += 1;
    document.getElementById('hits').innerHTML='命中次数: '+hits;
    a = Math.round(Math.random() * 10);
    money = Math.round((Date.now() - ot) / 60);
    money += 5;
    total += money + a;

    if(isup) {
        update();
    }
}

function update() {
    document.getElementById('total').innerHTML='总计: '+total+'个钱袋';
    document.getElementById('money').innerHTML='你捡到了: '+(money + a)+'个钱袋';
    document.getElementById('golds').innerHTML=parseInt(golds)+'个黄金 '+silver+'个白银';

    var history = document.createElement('p');
    history.innerText = '*** 你捡到了'+money+'+'+a+'个钱袋';
    history.style.lineHeight = '80%';
    history.style.fontSize = '8px';

    var addressContainer = document.getElementById('history');
    addressContainer.insertAdjacentElement('afterbegin', history);

    ot = Date.now();
}

function usingBag() {
    golds += total * (1 - Math.random() / 10);
    golds = parseFloat(golds.toFixed(5));
    silver = Math.round((golds - parseInt(golds)) * 1e5);
    total = 0;
    document.getElementById('total').innerHTML='总计: '+total+'个钱袋';
    document.getElementById('golds').innerHTML=parseInt(golds)+'个黄金 '+silver+'个白银';

    clicks -= 1;
    document.getElementById('clicks').innerHTML='点击次数: '+clicks;
}

window.onload = function() {
    document.onmousedown = function(event) {
        clicks += 1;
        document.getElementById('clicks').innerHTML='点击次数: '+clicks;
    }
}
