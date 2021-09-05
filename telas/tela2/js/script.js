// audio cloud object sample
let cloudObj = { id: 0, text: "Texto moderno", audio: "01" };

// audio timeline object sample
let timelineObj = { id: 0, audio: "02" };

// image object sample
let imageFrameObj = {
  id: 0,
  image: "image_00",
  zoom: true,
};

// grammar box object sample
let grammarBoxObj = {
  id: 0,
  title: "Title",
  icon: "icon_lamp",
  text: [""],
};

// video object sample
let videoObj = {
  id: 0,
  video: "video_00",
  poster: "video_00",
  keyframe: [0.05, 0.16],
  subtitle: [
    "Cacilds",
    "Diuretics paradis num copo é motivis de denguis. Sapien in monti palavris qui num significa nadis i pareci latim.",
  ],
};

// row orderer object sample
let rowOrdererObj = {
  id: 0,
  orientation: "vertical",
  correct: [2, 1, 3, 0],
  text: ["Olá", "Não sei", "Cacildis", "I don't know"],
};

// draw line object sample
let drawlineObj = {
  id: 0,
  amount: 3,
  orientation: "vertical",
  correct: [2, 0, 1],
};

// sentence input object sample
let sentenceInputObj = {
  id: 0,
  text: ["You are not a journalist. You are a secretary. You", "a secretary."],
  correct: ["aren't"],
};

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

let selectListObj = {
  id: 0,
  text: ["ON", "KJAH", "AFAS"],
  correct: 1,
};

createSelectList(selectListObj);

let sentenceChoiceObj = {
  id: 0,
  text: ["She's", "a", "an", "photographer."],
  correct: 0,
};

let lesson2 = {
  id: 0,
  text: ["This is Emma's", "mum", "aunt", "."],
  correct: 0,
};

createSentenceChoice(sentenceChoiceObj);
createSentenceChoice(lesson2);

let sentenceSelectObj = {
  id: 0,
  text: ["Yes, he is.", "No, he isn't."],
  correct: 1,
};

createSentenceSelect(sentenceSelectObj);

let dragDropObj = {
  0: {
    id: 0,
    text: ["she", "your uncle a dentist?", "jsdf"],
    dragText: ["he", "she"],
  },
};
createDragDrop(dragDropObj[0]);
// createDragDrop(dragDropObj[1]);
