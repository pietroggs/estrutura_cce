// audio cloud object sample
let audioButtonObj = { id: 0, audio: "01" }

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
    correct: ["are", "U"]
}
// sentence list object sample
let selectListObj = {
    id: 0,
    text: ["ON", "KJAH", "AFAS"],
    correct: 1
}
let selectListObj2 = {
    id: 1,
    text: ["ON", "KJAH", "AFAS"],
    correct: 1
}
// sentence choice object sample
let sentenceChoiceObj = {
    id: 0,
    text: ["ON", "KJAH", "AFAS", "Rene"],
    correct: 1
}
// sentence select object sample
let sentenceSelectObj = {
    id: 0,
    text: ["Yes, he is.", "No, he isn't."],
    correct: 1
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

let sentenceInputObj2 = { 
    id: 2,
    text: ["<strong>Tony: </strong>Wow! It's great there, I went last year. In the winter it's really ", " and", ", and there's ", " and ", " everywhere. But at this time, in the summer, it's ", " and ", "."],
    correct: ["cold", "dark", "ice", "snow", "warm", "sunny"]
}

let sentenceInputObj3 = { 
    id: 3,
    text: ["<strong>William: </strong>", " like London?"],
    correct: ["Did you", ""]
}

let sentenceInputObj4 = { 
    id: 4,
    text: ["<strong>Tony: </strong>Of course, it's awesome! I ", "David Beckham!"],
    correct: ["saw", ""]
}

let sentenceInputObj5 = { 
    id: 5,
    text: ["<strong>William: </strong>Wow! ", " you doing when you saw him?"],
    correct: ["What were", ""]
}

let sentenceInputObj6 = { 
    id: 6,
    text: ["<strong>Tony: </strong>I was walking down Oxford Street when ", " I saw a lot of people taking photos. I looked closer and it was him!"],
    correct: ["suddenly", ""]
}

//Use to Create The Footer Buttons
createFooterButtons();

createAudioCloud(cloudObj);
createAudioTimeline(timelineObj);
createGrammarBox(grammarBoxObj);
createImageFrame(imageFrameObj);
createVideo(videoObj);
createRowOrderer(rowOrdererObj);
createDrawline(drawlineObj);
createSentenceInput(sentenceInputObj);
createSelectList(selectListObj);
createSelectList(selectListObj2);


createSentenceChoice(sentenceChoiceObj);
createSentenceSelect(sentenceSelectObj);

createAudioButton(audioButtonObj);

createSentenceInput(sentenceInputObj2);
createSentenceInput(sentenceInputObj3);
createSentenceInput(sentenceInputObj4);
createSentenceInput(sentenceInputObj5);
createSentenceInput(sentenceInputObj6);

// createSentenceInput(sentenceInputObj1);
// createImageFrame(imageFrameObj1);
