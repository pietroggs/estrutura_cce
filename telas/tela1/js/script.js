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
    tagType: "text",
    orientation: "vertical",
    text: ["zero", "um", "um", "um", "um", "zero"],
    correct: ["um", "um", "um", "um", "zero", "zero"]
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

// image orderer object sample
let imageOrdererObj = {
    id: 0,
    tagType: "image",
    orientation: "horizontal",
    correct: [2,1,3,0], 
    image: ["image_01", "image_02", "image_03", "image_04"]
}

let sentenceChoiceMultiploObj = {
    id: 0,
    separator: "/",
    text: ["always", "never", "sometimes"],
    correct: [0, 1]
}

let tableChoiceObj = {
    id: 0,
    header: ["True", "False"],
    text: ["always", "never", "sometimes", "sometimes"],
    correct: [0, 1, 0, 1]
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


// createSentenceChoice(sentenceChoiceObj);
createSentenceSelect(sentenceSelectObj);

createAudioButton(audioButtonObj);

createRowOrderer(imageOrdererObj);

createSentenceMultipleChoice(sentenceChoiceMultiploObj);

createTableChoice(tableChoiceObj);
// createSentenceInput(sentenceInputObj1);
// createImageFrame(imageFrameObj1);
