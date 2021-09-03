// audio cloud object sample
let cloudObj = { id: 0, text: "Texto moderno", audio: "01" }

// audio timeline object sample
let timelineObj = { id: 0, audio: "02" }

// image object sample
let imageFrameObj = {
    id: 0,
    image: "image_00",
    zoom: true
}

// grammar box object sample
let grammarBoxObj = {   
    id: 0,
    title: "Title",
    icon: "icon_lamp",
    text: ["Mussum Ipsum, cacilds vidis litro abertis. Suco de cevadiss deixa as pessoas mais interessantis. Quem num gosta di mé, boa gentis num é. Casamentiss faiz malandris se pirulitá.", "Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis."]
}

// video object sample
let videoObj = { 
    id: 0,
    video: "video_00",
    poster: "video_00",
    keyframe: [0.05, 0.16],
    subtitle: ["Cacilds",
    "Diuretics paradis num copo é motivis de denguis. Sapien in monti palavris qui num significa nadis i pareci latim."]
}

// row orderer object sample
let rowOrdererObj = {
    id: 0,
    orientation: "vertical",
    correct: [2,1,3,0], 
    text: ["Olá", "Não sei", "Cacildis", "I don't know"]
}

// draw line object sample
let drawlineObj = { 
    id: 0,
    amount: 3,
    orientation: "vertical",
    correct: [2,0,1]
}

// sentence input object sample
let sentenceInputObj = { 
    id: 0,
    text: ["You are not a journalist. You are a secretary. You", "a secretary.", "a secretary."],
    correct: ["aren't", "Uh Didiii"]
}



let sentenceInputObj1 = { 
    id: 1,
    text: ["You are not a journalist. You are a secretary. You", "a secretary."],
    correct: ["aren't"]
}
let imageFrameObj1 = {
    id: 1,
    image: "image_00",
    zoom: true
}

let buttonStatus = createFooterButtons();

createAudioCloud(cloudObj);
createAudioTimeline(timelineObj);
createGrammarBox(grammarBoxObj);
createImageFrame(imageFrameObj);
createVideo(videoObj);
createRowOrderer(rowOrdererObj);
createDrawline(drawlineObj);
createSentenceInput(sentenceInputObj);



// createSentenceInput(sentenceInputObj1);
// createImageFrame(imageFrameObj1);
