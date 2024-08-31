import {show, echo} from "./say.js";

var total = 0;
var golds = 0;
var silver = 0;
var a;
var money;
var clicks = 0;
var hits = 0;
var i = 0;
var os = '';
var combo = 0;
var best = 0;
var combos = [5, 10, 20, 30, 50, 100, 200];

var name = prompt('你的名字', 'nameless tee');
if(name == 'null' || name == '') {
    name = 'nameless tee'
}

var ot = Date.now();
var ot2 = Date.now();

function randomMoney() {
    hits += 1;
    document.getElementById('hits').innerHTML='命中率: '+hits+'/'+clicks+' = '+(hits/clicks*100).toFixed(1)+'%';
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

    show(''+name+' 捡到钱袋了! 拿到了 '+a+' + '+money+' 个钱袋!');
    show('你获得了 钱袋x'+(money+a));

    ot = Date.now();
}

function usingBag() {
    var hgold = parseFloat((total * (1.1 - Math.random() / 5)).toFixed(4))
    golds += hgold;
    golds = parseFloat(golds.toFixed(4));
    silver = Math.round((golds - parseInt(golds)) * 1e4);
    document.getElementById('golds').innerHTML=parseInt(golds)+'个黄金 '+silver+'个白银';

    if(total != 0) {
        show(''+name+' 使用了物品:钱袋 x'+total+' , 获得了 '+parseInt(hgold)+' 黄金与 '+Math.round((hgold - parseInt(hgold)) * 1e4)+' 白银');
        total = 0;
        document.getElementById('total').innerHTML='总计: '+total+'个钱袋';
        return true;
    }

    return false;
}

function detkey(e) {
    e = e||window.event;
    if(e.keyCode == 13 & document.getElementById('say').value != '') {
        if(document.getElementById('say').value != os) {
            var addr = document.getElementById('history');
            var box = document.createElement('div');
            box.className='msgbox';
            addr.insertAdjacentElement('afterbegin', box);

            var msg = document.createElement('p');
            msg.innerHTML='0: '+name+':';
            msg.style.color='#e2e2e2';
            msg.style.flexShrink='0';
            msg.style.paddingRight='0';
            msg.style.flexWrap='nowrap';
            box.insertAdjacentElement('beforeend', msg);

            var msg = document.createElement('p');
            os = document.getElementById('say').value;
            document.getElementById('say').value='';
            msg.style.color = '#ffffff';
            msg.innerHTML=os;
            box.insertAdjacentElement('beforeend', msg);
            addr.insertAdjacentElement('afterbegin', document.createElement('br'));

            i = 0;
        }
        else {
            i ++;

            var addr = document.getElementById('history');
            var box = addr.childNodes[1];
            box.className='msgbox';

            var msg = document.createElement('p');
            msg.innerHTML='0: '+name+' ['+(i + 1)+']:';
            msg.style.color='#e2e2e2';
            msg.style.flexShrink='0';
            msg.style.paddingRight='0';
            msg.style.flexWrap='nowrap';
            box.replaceChild(msg, box.childNodes[0]);

            var msg = document.createElement('p');
            os = document.getElementById('say').value;
            document.getElementById('say').value='';
            msg.style.color = '#ffffff';
            msg.innerHTML=os;
            box.replaceChild(msg, box.childNodes[1]);
        }
    }
}

function shake() {
    var title = document.getElementById('t');
    title.style.animation='shake 0.5s';
}

function sheval(evaluation, color) {
    var seval = document.getElementById('seval');
    seval.style.color = color;
    seval.innerHTML = evaluation;
}

window.usingBag = usingBag;
window.detkey = detkey;

var mb = document.getElementById('moneybtn');
var rh = document.getElementById('rhit');

document.getElementById('moneybtn').addEventListener('focus', function(event) {
    event.preventDefault();
    event.stopPropagation();
    this.blur();
});
document.getElementById('tb').addEventListener('click', shake);

show("'"+name+"' entered and joined the game");

rh.onclick = function() {
    var dis = mb.getBoundingClientRect().left - rh.getBoundingClientRect().left;
    clicks ++;
    document.getElementById('hits').innerHTML='命中率: '+hits+'/'+clicks+' = '+(hits/clicks*100).toFixed(1)+'%';
    console.log(dis);
    if(dis >= -30 & dis <= 30) {
        randomMoney();
        combo ++;
        var ot3 = Date.now();
        if(combo > best) {
            best = combo;
        }
        for(var j = 0; j < combos.length; j++) {
            if(combo == combos[j]) {
                echo(combo+'连击! ')
            }
        }
    }

    if(dis >= -5 & dis <= 5) {
        sheval('完美', 'forestgreen');
    }
    else if(dis >= -15 & dis <= 15) {
        sheval('优秀', 'limegreen');
    }
    else if(dis >= -24 & dis <= 24) {
        sheval('还行', '#b9f72b');
    }
    else if(dis >= -30 & dis <= 30) {
        sheval('一般', 'gold');
    }
    else {
        sheval('错过', 'red');
        combo = 0;
    }

    if(Date.now() - ot2 >= 1500) {
        combo = 0;
    }
    document.getElementById('combo').innerHTML='连击: '+combo+' 最佳: '+best;
    ot2 = ot3;
}

