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
    text: [""]
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
    text: ["You are not a journalist. You are a secretary. You", "a secretary."],
    correct: ["aren't"]
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



let selectListObj = {
    id: 0,
    text: ["ON", "KJAH", "AFAS"],
    correct: 1
}

createSelectList(selectListObj);

let sentenceChoiceObj = {
    id: 0,
    text: ["She's", "a", "an", "photographer."],
    correct: 0
}

let lesson2 = {
    id: 0,
    text: ["This is Emma's", "mum", "aunt", "."],
    correct: 0
}

createSentenceChoice(sentenceChoiceObj);
createSentenceChoice(lesson2);



let sentenceSelectObj = {
    id: 0,
    text: ["Yes, he is.", "No, he isn't."],
    correct: 1
}

createSentenceSelect(sentenceSelectObj);


let dragDropObj = {
    0:{
        id: 0,
        text:["she", "your uncle a dentist?", "jsdf"],
        dragText: ["he", "she"]
    }
}
createDragDrop(dragDropObj[0]);
// createDragDrop(dragDropObj[1]);

function createDragDrop(obj){
    let divs = [];
    let dragDrop = [];
    let text = [];
    let verification = {
        key: "",
        value: ""
    }

    // text[0] = create("p", "#--inner-sentenceDragDrop-" + obj.id, "--sentenceDropped-text" + obj.id, "text gray --sentenceDropped-text");
    // text.innerHTML = text.innerHTML + obj.text[index] + " ";
    for (let index = 0; index < (obj.text.length - 1); index++) {
        text[index] = create("p", "#--inner-sentenceDragDrop-" + obj.id, "--sentenceDropped-text" + obj.id + "-" + index, "text gray --sentenceDropped-text");

        text[index].innerHTML = obj.text[index];

        divs[index] = create("", "#--inner-sentenceDragDrop-" + obj.id, "--sentenceDropped-container-" + obj.id + "-" + index, "--sentenceDropped-container");

        dragDrop[index] = create("", "#--inner-dragDrop-sentenceContainer-0", "--sentenceDragged-"+ obj.id + "-" + index, "--sentenceDragged");
        dragDrop[index].setAttribute("draggable", true);
        let dragText = create("p", "#--sentenceDragged-"+ obj.id + "-" + index, "--sentenceDragged-text-" + obj.id, "text gray --sentenceDragged-text");
        dragText.innerHTML = obj.dragText[index];
    }
    let lastId = obj.text.length - 1;
    text[lastId] = create("p", "#--inner-sentenceDragDrop-" + obj.id, "--sentenceDropped-text" + obj.id + "-" + lastId, "text gray --sentenceDropped-text");
    text[lastId].innerHTML = obj.text[lastId];    

    const dragContainer = document.querySelector(".--inner-dragDrop-sentenceContainer");
    let draggedItem = null;
    for (let index = 0; index < (obj.text.length - 1); index++) {
        
        //DRAG
        dragDrop[index].addEventListener("dragstart", function(e){
            draggedItem = dragDrop[index];
            let idDropContainer = this.id.split("-")[3] + this.id.split("-")[4];
            verification.key = idDropContainer;
            // console.log(this)
        });

        dragDrop[index].addEventListener("dragend", function(e){
            setTimeout(function(){
                draggedItem.style.display = "flex";
                draggedItem = null;
            },0);
        });

        // container dragged
        dragContainer.addEventListener("dragover", function(e){
            e.preventDefault();
            this.style.backgroundColor = "#536fc3";
        });
        dragContainer.addEventListener("dragenter", function(e){
            e.preventDefault();
        });
        dragContainer.addEventListener("dragleave", function(e){
            e.preventDefault();
            this.style.backgroundColor = "#a7b4da21";
        });
        dragContainer.addEventListener("drop", function(e){
            this.append(draggedItem);
            this.style.backgroundColor = "#a7b4da21";
        });

        //DROP
        divs[index].addEventListener("dragover", function(e){
            e.preventDefault();
        });

        divs[index].addEventListener("dragenter", function(e){
            e.preventDefault();
            this.style.backgroundColor = "#536fc3";
        });

        divs[index].addEventListener("dragleave", function(e){
            e.preventDefault();
            this.style.backgroundColor = "white";
        });

        divs[index].addEventListener("drop", function(){
            this.append(draggedItem);
            let idDrag = this.id.split("-")[4] + this.id.split("-")[5]
            verification.value = idDrag;
            if(verification.key === verification.value){
                log("ACERTOUUU");
            }else{
                log("ERRROUUUU")
            }
        });

    }
}