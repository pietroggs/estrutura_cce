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
// createRowOrderer(rowOrdererObj);
createDrawline(drawlineObj);

createSentenceInput(sentenceInputObj);

let selectListObj = {
  id: 0,
  text: ["ON", "KJAH", "AFAS"],
  correct: 1,
};

createSelectList(selectListObj);

let sentenceChoiceObj = {
  0:{
    id: 0,
    separator: "",
    text: ["I", "wear a blue uniform."],
    alternativesText: [["always", "never", "sometimes"]],
    correct: [1],
  }
};


for (const index in sentenceChoiceObj) {
  createSentenceChoice(sentenceChoiceObj[index]);
}
// createSentenceChoice(lesson2);

let sentenceSelectObj = {
  id: 0,
  text: ["Yes, he is.", "No, he isn't."],
  correct: 1,
};

createSentenceSelect(sentenceSelectObj);

let dragDropObj = {
  0: {
    id: 0,
    text: ["", "your uncle a dentist?"],
    dragText: ["he"],
  },
  1: {
    id: 1,
    text: ["Is your", "a waiter?"],
    dragText: ["brother"],
  },
  2: {
    id: 2,
    text: ["Yes,", "is"],
    dragText: ["she"],
  },
  3: {
    id: 3,
    text: ["Yes,", "is", "fdkj"],
    dragText: ["she", "fsd"],
  }
};

var draggedItem = null;
let verification = {
  key: "",
  value: "",
};

for (const index in dragDropObj) {
  createDragDrop(dragDropObj[index])
}

// createDragDrop(dragDropObj[0]);
// createDragDrop(dragDropObj[1]);


let sentenceChoiceMultiploObj = {
  id: 0,
  separator: "/",
  text: ["always", "never", "sometimes", "k", "jkjkjkjk", "JKJJK", "KJK", "JKJJK", "KJK","JKJJK", "KJK","KJK","KJK","KJK","KJK","KJK"],
  correct: [1, 3]
}

sentenceMultipleChoice(sentenceChoiceMultiploObj);

function sentenceMultipleChoice(obj){
  let sentenceBlocks = [];
  let answerSelected = "";
  let responseArray = [];
  let count = 0;
  let lastObj = obj.text.length - 1;

  function buttonEvent(){
    answerSelected = sentenceBlocks.indexOf(this);
    if(!responseArray.includes(answerSelected)){
      responseArray.push(answerSelected);
      count ++;
    }else{
      let idInResponse = responseArray.indexOf(answerSelected);
      responseArray.splice(idInResponse, 1);
      count --;
    }
    checkAnswer();
  }


  function checkAnswer(){
    for (let index = 0; index < obj.correct.length; index++) {
      let objCorrect = obj.correct[index];
      if(!responseArray.includes(objCorrect) || count != obj.correct.length){
        return;
      }
    }
    console.log("CORRETO")
    parent.parent.playSoundFx("success");
  }


  for (let index = 0; index < lastObj; index++) {
    sentenceBlocks[index] = create("", "#--innerSenteceChoiceMultiple-" + obj.id, "--sentenceChoiceMultipliceItem-" + obj.id +"-"+ index, "--sentenceChoiceMultipliceItem gray text");
    let text = create("p", "#--sentenceChoiceMultipliceItem-" + obj.id +"-"+ index, "--sentenceChoiceMultipliceText-" + obj.id +"-"+index, "--sentenceChoiceMultipliceText");
    text.innerHTML = obj.text[index];

    sentenceBlocks[index].append(" " + obj.separator + " ");

    sentenceBlocks[index].addEventListener("click", buttonEvent);
  }
  
  sentenceBlocks[lastObj] = create("", "#--innerSenteceChoiceMultiple-" + obj.id, "--sentenceChoiceMultipliceItem-" + obj.id +"-"+ lastObj, "--sentenceChoiceMultipliceItem gray text");
  let text = create("p", "#--sentenceChoiceMultipliceItem-" + obj.id +"-"+ lastObj, "--sentenceChoiceMultipliceText-" + obj.id +"-"+lastObj, "--sentenceChoiceMultipliceText");
  text.innerHTML = obj.text[lastObj];
  sentenceBlocks[lastObj].addEventListener("click", buttonEvent);

}
















