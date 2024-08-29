var total = 0;
var a;
var money = 0;
var chicks = 0;
var hits = 0;
ot = Date.now();

function randomMoney(isup) {
    hits += 1;
    document.getElementById('hits').innerHTML='命中次数: '+hits;
    a = Math.round(Math.random() * 10);
    money = Math.round((Date.now() - ot) / 6);
    money += 5;
    total += money + a;
    if(isup) {
        update();
    }
}

function update() {
    document.getElementById('total').innerHTML='总计: '+total+'个钱袋';
    document.getElementById('money').innerHTML='你捡到了: '+(money + a)+'个钱袋';
    var history = document.createElement('p');
    history.innerText = '*** 捡到了'+money+'+'+a+'个钱袋';
    history.style.lineHeight = '80%';
    history.style.fontSize = '8px';
    var addressContainer = document.getElementById('history');
    addressContainer.insertAdjacentElement('afterbegin', history);
    ot = Date.now();
}

window.onload=function() {
    document.onmousedown=function(event) {
        chicks += 1;
        document.getElementById('chicks').innerHTML='点击次数: '+chicks;
    }
}