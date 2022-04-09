let $ = document.querySelector.bind(document);
let $$ = document.querySelectorAll.bind(document);

let timeOut = $('#timeout')

setInterval(() => {
    let d = new Date()
    timeOut.innerText = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
}, 980);


let allies = $$('.allies .fa-solid');

let check = (mine, yours) => {
    if (mine === yours)
        return -1;
    let count = 2;
    switch (mine) {
        case 1: --count
        case 2: --count
        case 0: if (yours === count) return true;
    }
    return false;
}

let alliesPoint = $('#header #myPoint');
let enemyPoint = $('#header #yourPoint');
let myTurn
let yourTurn

allies.forEach((als, index) => {
    als.onclick = () => {
        myTurn = index;
        yourTurn = Math.round(Math.random() * 100) % 3;

        let cssAllies = $(`#alliesOTT .allies#allies-${index}`);

        let cssEnemy = $(`#enemyOTT .enemy#enemy-${yourTurn}`);
        let style = `animation-duration: 2s;
            position: absolute;
            top: 35%;`
        // cssAllies.style = ` animation-name: goRight;
        // animation-duration: 2s;
        // position: absolute;
        // top: 35%;`;

        // cssEnemy.style = ` animation-name: goLeft;
        // animation-duration: 2s;
        // position: absolute;
        // top: 35%;`;

        console.log('mine: ', myTurn, '---yours:', yourTurn)

        if (check(myTurn, yourTurn) === -1) {
            cssAllies.style = `animation-name: goRight;
                ${style}
                z-index: 99
                `
            cssEnemy.style = `animation-name: goLeft;
                ${style}
                z-index: 98`
        }
        else if (check(myTurn, yourTurn)) {
            cssAllies.style = `animation-name: goRight;
                ${style}
                z-index: 99`
            cssEnemy.style = `animation-name: goLeft;
            ${style}`
        }
        else if (!check(myTurn, yourTurn)) {
            cssAllies.style = `animation-name: goRight;
                ${style}`
            cssEnemy.style = `animation-name: goLeft;
                ${style}
                z-index: 99`
        }
    }
});

let myEndFunction = () => {
    $(`.allies[style]`).removeAttribute('style');
    $(`.enemy[style]`).removeAttribute('style');

    if (check(myTurn, yourTurn) === -1) {
    }
    else if (check(myTurn, yourTurn)) {
        ++alliesPoint.innerText;
    }
    else if (!check(myTurn, yourTurn)) {
        ++enemyPoint.innerText;
    }
}

$('#game').addEventListener("webkitAnimationEnd", myEndFunction);


