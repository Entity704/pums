var total = 0;
var golds = 0;
var silver = 0;
var a;
var money;
var clicks = 0;
var hits = 0;
var i = 0;
var os = '';

var name = prompt('你的名字', 'nameless tee');

ot = Date.now();

function randomMoney() {
    hits += 1;
    document.getElementById('hits').innerHTML='命中次数: '+hits;
    a = Math.round(Math.random() * 10);
    money = Math.round((Date.now() - ot) / 60);
    money += 5;
    total += money + a;

    update();
}

function update() {
    document.getElementById('total').innerHTML='总计: '+total+'个钱袋';
    document.getElementById('money').innerHTML='你捡到了: '+(money + a)+'个钱袋';
    document.getElementById('golds').innerHTML=parseInt(golds)+'个黄金 '+silver+'个白银';

    show('*** '+name+' 捡到钱袋了! 拿到了 '+a+' + '+money+' 个钱袋!');
    show('*** 你获得了 钱袋x'+(money+a));

    ot = Date.now();
}

function show(smsg) {
    var msg = document.createElement('p');
    msg.innerHTML= smsg;
    var addr = document.getElementById('history');
    addr.insertAdjacentElement('afterbegin', msg);
}

function usingBag() {
    hgold = parseFloat((total * (1.1 - Math.random() / 5)).toFixed(4))
    golds += hgold;
    golds = parseFloat(golds.toFixed(4));
    silver = Math.round((golds - parseInt(golds)) * 1e4);
    document.getElementById('golds').innerHTML=parseInt(golds)+'个黄金 '+silver+'个白银';

    if(total != 0) {
        show('*** '+name+' 使用了物品:钱袋 x'+total+' , 获得了 '+parseInt(hgold)+' 黄金与 '+Math.round((hgold - parseInt(hgold)) * 1e4)+' 白银');
    }

    total = 0;
    document.getElementById('total').innerHTML='总计: '+total+'个钱袋';
}

function detkey(e) {
    e = e||window.event;
    if(e.keyCode == 13 & document.getElementById('say').value != '') {
        if(document.getElementById('say').value != os) {
            var msg = document.createElement('p');
            msg.innerHTML='0: '+name+': '+document.getElementById('say').value;
            os = document.getElementById('say').value;
            document.getElementById('say').value='';
            msg.style.color = '#ffffff';
            var addr = document.getElementById('history');
            addr.insertAdjacentElement('afterbegin', msg);
            i = 0;
        }
        else {
            i += 1;
            var msg = document.createElement('p');
            msg.innerHTML='0: '+name+' ['+(i + 1)+']: '+document.getElementById('say').value;
            os = document.getElementById('say').value;
            document.getElementById('say').value='';
            msg.style.color = '#ffffff';
            var history = document.getElementById("history");
            history.replaceChild(msg, history.childNodes[0]);
        }
    }
}

function eval(evaluation, color) {
    var seval = document.getElementById('seval');
    seval.style.color = color;
    seval.innerHTML = evaluation;
}

window.onload = function() {
    var mb = document.getElementById('moneybtn');
    var rh = document.getElementById('rhit');

    show('*** '+name+' entered and joined the game');

    rh.onclick = function(e) {
        mb.style.animationPlayState = 'paused';
        dis = mb.getBoundingClientRect().left - rh.getBoundingClientRect().left + 12;
        clicks += 1;
        document.getElementById('clicks').innerHTML='点击次数: '+clicks;
        if(dis >= -30 & dis <= 30) {
            randomMoney();
        }

        if(dis >= -5 & dis <= 5) {
            eval('完美', 'forestgreen');
        }
        else if(dis >= -15 & dis <= 15) {
            eval('优秀', 'limegreen');
        }
        else if(dis >= -24 & dis <= 24) {
            eval('还行', '#b9f72b');
        }
        else if(dis >= -30 & dis <= 30) {
            eval('一般', 'gold');
        }
        else {
            eval('错过', 'red');
        }
    }
}
