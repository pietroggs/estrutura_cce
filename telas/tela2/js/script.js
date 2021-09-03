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

function createSelectList(obj){
    let currentSelected = null;
    let buttonInner = [];

    let container = create("", "#--inner-selectList-" + obj.id, "--selectList-selectListContainer-"+ obj.id, "--selectListContainer");

    let input = create("", "#--selectList-selectListContainer-"+ obj.id, "--selectListContainer-input-"+ obj.id, "--selectListContainer-input");
    let text = create("p", "#--selectListContainer-input-"+ obj.id, "--selectListContainer-text-"+ obj.id, "--selectListContainer-text text gray");
    create("", "#--selectListContainer-input-"+ obj.id, "--selectListContainer-button-"+ obj.id, "--selectListContainer-button");
    

    input.addEventListener("click", function(){
        let list = create("", "#--selectList-selectListContainer-"+ obj.id, "--selectListContainer-list-"+ obj.id, "--selectListContainer-list");
        
        for(let i = 0; i < obj.text.length; i++){
            let listItem = create("", "#--selectListContainer-list-"+ obj.id, "--selectListContainer-listItem-"+ obj.id + "-"+ i, "--selectListContainer-listItem");
            let textOption = create("p", "#--selectListContainer-listItem-"+ obj.id + "-"+ i, "--selectListContainer-listItem-text-"+ obj.id + "-"+ i, "--selectListContainer-listItem-text  text gray");

            textOption.innerHTML = obj.text[i];
           
            create("", "#--selectListContainer-listItem-"+ obj.id + "-"+ i, "--selectListContainer-listItem-button-"+ obj.id + "-"+ i, "--selectListContainer-listItem-button  --drawline-startpointBorder");
            
            buttonInner[i] = create("", "#--selectListContainer-listItem-button-"+ obj.id + "-"+ i, "--selectListContainer-listItem-buttonInner-"+ obj.id + "-"+ i, "--selectListContainer-listItem-buttonInner  --drawline-startpoint");

            listItem.addEventListener("click", function(){
                container.removeChild(list);
                text.innerHTML = obj.text[i];
                currentSelected = i;

                if(obj.correct == i){
                    log("CORRETO")
                }else{
                    log("INCORRETO")
                }
                
            });
        }
        if(currentSelected != null){
            buttonInner[currentSelected].style.cssText = "background-color: rgb(135, 136, 157);";
        }
    });
}
