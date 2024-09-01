function show(smsg) {
    var addr = document.getElementById('history');
    var box = document.createElement('div');
    box.className='msgbox';
    addr.insertAdjacentElement('afterbegin', document.createElement('br'));
    addr.insertAdjacentElement('afterbegin', box);

    var msg = document.createElement('p');
    msg.innerHTML='***';
    msg.style.flexShrink='0';
    msg.style.paddingRight='0';
    msg.style.flexWrap='nowrap';
    box.insertAdjacentElement('beforeend', msg);

    var msg = document.createElement('p');
    msg.innerHTML=smsg;
    box.insertAdjacentElement('beforeend', msg);
}
function echo(smsg) {
    var addr = document.getElementById('history');
    var box = document.createElement('div');
    box.className='msgbox';
    addr.insertAdjacentElement('afterbegin', document.createElement('br'));
    addr.insertAdjacentElement('afterbegin', box);

    var msg = document.createElement('p');
    msg.innerHTML= '— ';
    msg.style.color='#7fc7ff';
    msg.style.flexShrink='0';
    msg.style.paddingRight='0';
    msg.style.flexWrap='nowrap';
    box.insertAdjacentElement('beforeend', msg);

    var msg = document.createElement('p');
    msg.style.color='#7fc7ff';
    msg.innerHTML=smsg;
    box.insertAdjacentElement('beforeend', msg);
}

export {show, echo};
