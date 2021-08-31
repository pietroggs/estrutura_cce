let debug = true;

function log(text) {
    if (debug) {
        console.log('%c' + text, 'color:#ffa500;font-weight: bold;');
    }
}

function find(target) {
    return document.querySelector(target);
}

function create(tipo, target, id, classe) {
    if (tipo == undefined || tipo == '') {
        tipo = 'div';
    }

    var newElement = document.createElement(tipo);

    if (target != undefined && target != '') {
        var tg = find(target);
    } else {
        var tg = find('#container');
    }

    if (id != undefined && id != '') {
        newElement.id = id;
    }

    if (classe != undefined && classe != '') {
        newElement.className = classe;
    }

    tg.appendChild(newElement);
    return newElement;
}

/* FUNCTIONS */
// Shuffe Arrays
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}