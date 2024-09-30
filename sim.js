import { show, echo } from "./say.js";
import { cExp } from "./calc.js";

var zh;
var en;
var lang;

fetch('./lang/zh.json')
    .then(res => {
        if (!res.ok) {
            console.log('loadLangFail');
        }
        return res.json();
    })
    .then(data => {
        zh = data;
        lang = zh;
    });

fetch('./lang/en.json')
    .then(res => {
        if (!res.ok) {
            console.log('loadLangFail');
        }
        return res.json();
    })
    .then(data => {
        en = data;
    });

var items = window.items;

let check;
var total = 0;
var golds = 0;
var silver = 0;
var a = 0;
var money = 0;
var clicks = 0;
var hits = 0;
var i = 0;
var os = '';
var combo = 0;
var best = 0;
var combos = [5, 10, 20, 30];

var lv = 1;
var exp = 0;
var needExp = cExp(lv);
var perfect = 0;
document.getElementById('exp').innerHTML = '经验: ' + exp + '/' + needExp;
var inventory = new Array(items.length);
for (var j = 0; j < items.length; j++) {
    inventory[j] = 0;
}

function save() {
    var gameSave = {
        name: name,
        total: total,
        golds: golds,
        clicks: clicks,
        hits: hits,
        combo: combo,
        best: best,
        lv: lv,
        exp: exp,
        perfect: perfect,
        inventory: inventory,
        ot: ot,
        check: total + (golds + 1) ** 2 + clicks + (hits + 1) ** 3 + combo + best + lv + exp + (perfect + 1) ** 4 + inventory.reduce((ac, cv) => ac + cv, 0)
    };
    gameSave = JSON.stringify(gameSave);

    document.getElementById('saveIO').value = gameSave;
}

function load() {
    try {
        var gameSave = JSON.parse(document.getElementById('saveIO').value);
        if (gameSave.check != gameSave.total + (gameSave.golds + 1) ** 2 + gameSave.clicks + (gameSave.hits + 1) ** 3 + gameSave.combo + gameSave.best + gameSave.lv + gameSave.exp + (gameSave.perfect + 1) ** 4 + gameSave.inventory.reduce((ac, cv) => ac + cv, 0)) {
            echo(lang.saveCheckWarn);
            echo(lang.loadError + 'Save seems to have been altered');
            return 0;
        }

        for (let val in gameSave) {
            eval(val + ' = gameSave[val];');
        }

        echo(lang.loadedSave);
        update();
    }
    catch (error) {
        echo(lang.loadError + error)
    }
}

function changeLang() {
    var button = document.getElementById('changeLang');
    if (button.innerHTML == '中') {
        button.innerHTML = 'EN';
        lang = zh;
        update();
    }
    else {
        button.innerHTML = '中';
        lang = en;
        update();
    }
}
window.changeLang = changeLang;

var name = prompt('你的名字', 'nameless tee');
if (name == null || name == '') {
    name = 'nameless tee'
}
document.getElementById('name').innerHTML = '昵称: ' + name;

var ot = Date.now();
var ot2 = Date.now();

function randomMoney() {
    hits += 1;
    a = Math.round(Math.random() * 10);
    money = Math.round((Date.now() - ot) / 60);
    money += 5;
    total += money + a;

    show(name + lang.mainMenu.whoPickedUp + a + ' + ' + money + ' ' + lang.mainMenu.moneyBag + '!');
    show('你获得了 钱袋x' + (money + a));
    inventory[2] += money + a;

    update();
}

function update() {
    document.getElementById('t').innerHTML = lang.pickUpMoneySimulation;
    document.getElementById('name').innerHTML = lang.name + name;
    document.getElementById('total').innerHTML = lang.mainMenu.total + total + lang.mainMenu.moneyBag;
    document.getElementById('money').innerHTML = lang.mainMenu.youPicked + (money + a) + lang.mainMenu.moneyBag;
    document.getElementById('golds').innerHTML = eval(lang.mainMenu.golds);
    document.getElementById('hits').innerHTML = eval(lang.mainMenu.hits);
    document.getElementById('combo').innerHTML = eval(lang.mainMenu.combos);
    document.getElementById('perfect').innerHTML = lang.perfectum + perfect;

    needExp = cExp(lv);
    if (exp >= needExp) {
        exp -= needExp;
        lv++;
        needExp = cExp(lv);
        echo('你升级了！升至Lv.' + lv + ', 需' + needExp + '经验升至Lv.' + (lv + 1));
        update();
    }

    var itemCount = 0;
    var invNode = document.getElementById('inventory');
    for (var j = invNode.childNodes.length - 1; j >= 0; j--) {
        if (invNode.childNodes[j].nodeName == 'DIV' || invNode.childNodes[j].nodeName == 'A') {
            invNode.removeChild(invNode.childNodes[j]);
        }
    }

    for (var j = 0; j < inventory.length; j++) {
        if (inventory[j] > 0) {
            itemCount++;
            var DestId = j;
            var invBox = document.createElement('div');
            var ea = document.createElement('a');
            var p = document.createElement('p');
            var delButton = document.createElement('button');
            invNode.appendChild(invBox);
            invBox.appendChild(ea);
            ea.appendChild(p)
            invBox.appendChild(delButton);
            invBox.className = 'inv';
            ea.href = 'javascript:use(' + j + ');';
            p.innerHTML = items[j][0] + ' x' + inventory[j];
            delButton.onclick = function () {
                destroy(DestId);
            }
            delButton.className = 'del';
            delButton.tabIndex = '-1';
        }
    }
    if (itemCount == 0) {
        var ea = document.createElement('a');
        var p = document.createElement('p');
        invNode.appendChild(ea);
        ea.appendChild(p);
        ea.href = 'javascript:void(0);';
        p.innerHTML = '空空如也';
    }

    var alla = document.querySelectorAll('a');
    for (var i = 0; i < alla.length; i++) {
        alla[i].draggable = 'false';
        alla[i].tabIndex = '-1';
    }

    document.getElementById('lv').innerHTML = lang.level + lv;
    document.getElementById('exp').innerHTML = lang.EXP + exp + '/' + needExp;

    ot = Date.now();
    save();
}

function usingBag(count) {
    if (count == null) {
        count = total;
    }
    var hgold = parseFloat((count * (1.1 - Math.random() / 5)).toFixed(4))
    golds += hgold;
    golds = parseFloat(golds.toFixed(4));
    silver = Math.round((golds - parseInt(golds)) * 1e4);

    if (total != 0) {
        show(name + ' 使用了物品: 钱袋 x' + count + ', 获得了 ' + parseInt(hgold) + ' 黄金与 ' + Math.round((hgold - parseInt(hgold)) * 1e4) + ' 白银');
        total -= count;
    }

    inventory[2] -= count;

    update();
}

var noItem = [3];
function buy(itemId) {
    for (var j = 0; j < noItem.length; j++) {
        if (itemId == noItem[j]) {
            return 0;
        }
    }

    if (golds < items[itemId][1] || perfect < items[itemId][2] || lv < items[itemId][3]) {
        echo(lang.noMoney);
    }
    else {
        golds -= items[itemId][1];
        perfect -= items[itemId][2];
        inventory[itemId]++;
        echo('你购买了: ' + items[itemId][0] + '!');
        update();
    }
}

function use(itemId) {
    inventory[itemId]--;
    show('你使用了: ' + items[itemId][0] + 'x1');
    switch (itemId) {
        case 0:
            exp += 60;
            break;
        case 1:
            show('你贿赂了Entity, 升级了20级');
            lv += 20;
            break;
        case 2:
            inventory[itemId]++;
            usingBag(1);
            break;
        default:
            console.log('use item fail')
    }
    update();
}

function destroy(itemId) {
    inventory[itemId]--;
    show('你摧毁了: ' + items[itemId][0] + 'x1');
    update();
}

function detkey(e) {
    e = e || window.event;
    if (e.keyCode == 13 & document.getElementById('say').value != '') {
        if (document.getElementById('say').value != os) {
            var addr = document.getElementById('history');
            var box = document.createElement('div');
            box.className = 'msgbox';
            addr.insertAdjacentElement('afterbegin', document.createElement('br'));
            addr.insertAdjacentElement('afterbegin', box);

            var msg = document.createElement('p');
            msg.innerHTML = '0: ' + name + ':';
            msg.style.color = '#e2e2e2';
            msg.style.flexShrink = '0';
            msg.style.paddingRight = '0';
            msg.style.flexWrap = 'nowrap';
            box.insertAdjacentElement('beforeend', msg);

            var msg = document.createElement('p');
            os = document.getElementById('say').value;
            document.getElementById('say').value = '';
            msg.style.color = '#ffffff';
            msg.innerHTML = os;
            box.insertAdjacentElement('beforeend', msg);

            i = 0;
        }
        else {
            i++;

            var addr = document.getElementById('history');
            var box = addr.childNodes[0];
            box.className = 'msgbox';

            var msg = document.createElement('p');
            msg.innerHTML = '0: ' + name + ' [' + (i + 1) + ']:';
            msg.style.color = '#e2e2e2';
            msg.style.flexShrink = '0';
            msg.style.paddingRight = '0';
            msg.style.flexWrap = 'nowrap';
            box.replaceChild(msg, box.childNodes[0]);

            var msg = document.createElement('p');
            os = document.getElementById('say').value;
            document.getElementById('say').value = '';
            msg.style.color = '#ffffff';
            msg.innerHTML = os;
            box.replaceChild(msg, box.childNodes[1]);
        }
    }
}

function shake() {
    var title = document.getElementById('t');
    title.style.animation = 'shake 0.5s';
}

function sheval(evaluation, color) {
    var seval = document.getElementById('seval');
    seval.style.color = color;
    seval.innerHTML = evaluation;
}

window.usingBag = usingBag;
window.detkey = detkey;
window.buy = buy;
window.use = use;
window.load = load;

var mb = document.getElementById('moneybtn');
var rh = document.getElementById('rhit');

document.getElementById('moneybtn').addEventListener('focus', function (event) {
    event.preventDefault();
    event.stopPropagation();
    this.blur();
});
document.getElementById('tb').addEventListener('click', shake);

show("'" + name + "' entered and joined the game");

rh.onclick = function () {
    window.golds = golds;
    var dis = mb.getBoundingClientRect().left - rh.getBoundingClientRect().left;
    clicks++;
    if (dis >= -35 & dis <= 35) {
        combo++;
        var ot3 = Date.now();
        if (combo > best) {
            best = combo;
        }
        if (combo >= 2) {
            exp++;
        }
        for (var j = 0; j < combos.length; j++) {
            if (combo == combos[j] || (combo % 20 == 0 & j == 2)) {
                echo(combo + lang.combo)
                if (combo >= 30) {
                    exp += combo * 2;
                }
            }
        }
    }

    if (dis >= -5 & dis <= 5) {
        sheval('完美', 'forestgreen');
        perfect++;
    }
    else if (dis >= -15 & dis <= 15) {
        sheval('优秀', 'limegreen');
    }
    else if (dis >= -24 & dis <= 24) {
        sheval('还行', '#b9f72b');
    }
    else if (dis >= -35 & dis <= 35) {
        sheval('一般', 'gold');
    }
    else {
        sheval('错过', 'red');
        combo = 0;
    }

    if (Date.now() - ot2 >= 1500 & dis >= -35 & dis <= 35) {
        combo = 1;
    }
    document.getElementById('combo').innerHTML = '连击: ' + combo + ' 最佳: ' + best;
    ot2 = ot3;
    if (dis >= -35 & dis <= 35) {
        randomMoney();
    }
    else {
        update();
    }
}

/*
var timeoutId = setInterval(function() {
    save();
}, 1000);
*/
