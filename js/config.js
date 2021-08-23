// 'EST' = Estrutura, todas as informações globlais devem ser armezanadas lá dentro

var EST = {
    telas: {
        // Tela inicial
        content: {
            text_skill: 'Skills: Listening and speaking',
            text_learning: 'Recognising and using a range of devices for changing the topic of conversation and politely interrupting speakers',
            text_title: 'The animal rights debate'
        },
        // Telas do curso
        geral: {
            content: {
                title: 'Content',
                color: 'green',
                src: 'tela-content',
                max_pontos: 0,
                pontos: 0
            },
            // TELAS EDITAVEIS
            tela1: {
                title: 'Lead-in',
                color: 'orange',
                src: 'tela1',
                max_pontos: 0,
                pontos: 0
            },
            tela2: {
                title: 'Main input',
                color: 'pink',
                src: 'tela2',
                max_pontos: 0,
                pontos: 0
            },
            tela3: {
                title: 'Pratice',
                color: 'purple',
                src: 'tela3',
                max_pontos: 10,
                pontos: 0
            },
            // TELAS EDITAVEIS FIM
            report: {
                title: 'Report',
                color: 'blue',
                src: 'tela-report',
                max_pontos: 0,
                pontos: 0
            },
            expediente: {
                title: 'Expediente',
                color: 'green',
                src: 'tela-expediente',
                max_pontos: 0,
                pontos: 0
            },
        },
        // Lista de telas
        lista: [],

    }
}

//#region PreBuild

function config() {
    let telas = EST.telas.geral;
    loadContentScreen(telas);
    loadIframes(telas);
}

function loadContentScreen(telas) {
    // Setando text
    document.querySelector('.--desc-title').innerText = EST.telas.content.text_skill;
    document.querySelector('.--desc-learning').innerText = EST.telas.content.text_learning;
    document.querySelector('.--content-title').innerText = EST.telas.content.text_title;

    // Criando links
    let link_list = document.querySelector('.--content-link');

    for (var key in telas) {
        // skip loop if the property is from prototype
        if (!telas.hasOwnProperty(key)) continue;
        let tela = telas[key];
        let li = document.createElement('li');
        li.className = `-${tela.color}`;
        let span = document.createElement('span');
        span.innerText = tela.title;
        li.appendChild(span);

        EST.telas.lista.push(tela.src);

        li.onclick = function () {
            screen.move(EST.telas.lista.indexOf(tela.src));
        };

        link_list.appendChild(li);
    }

    log(`Telas a serem carregadas: ${[EST.telas.lista]}`);
}

function loadIframes(telas) {
    let div_t = document.querySelector('#iframes');
    delete telas['content'];
    delete telas['report'];
    delete telas['expediente'];
    for (var key in telas) {
        // skip loop if the property is from prototype
        if (!telas.hasOwnProperty(key)) continue;
        let tela = telas[key];
        let frame = document.createElement('iframe');
        frame.src = (`telas/${key}/index.html`);
        frame.frameBorder = '0';
        frame.width = '100%';
        frame.height = '100%';
        frame.className = 'hide';
        frame.id = tela.src;
        
        div_t.appendChild(frame);
    }
}

//#endregion

this.config();