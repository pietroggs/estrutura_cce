// audio cloud object sample
let cloudObj = { id: 0, text: "Texto moderno", audio: "01" }

// audio timeline object sample
let timelineObj = { id: 0, audio: "02" }

// image object sample
let imageFrameObj = { id: 0, image: "image_00" }

// grammar box object sample
let grammarBoxObj = {   
    id: 0,
    title: "Title",
    icon: "icon_lamp",
    text: ["<span class = 'bg-blue'>Vanessa</span>",
            "<hr>",
            "lari lira",
            "lari lira",
            "lari lira",
            "lari lira",
            "lari lira"]
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
    correct: [2,1,3,0], 
    text: ["Olá", "Não sei", "Cacildis", "I don't know"]
}

// draw line object sample WIP
let drawlineObj = { id: 0, amount: 3, orientation: "vertical" }

// practice mp2 object sample
let practiceMC2_Obj = {
    id: 0,
    properties: [
        ["I'm sorry Kieran, but …", 1, 0], // [question text, correct answer, score (always 0)]
        ["If I can just move on to …", 0, 0],
        ["Speaking of humans …", 0, 0],
        ["Let's focus on …", 0, 0],
        ["Sorry Elaine, I'm going to interrupt you there …", 1, 0],
        ["Sorry to cut you off …", 1, 0]
    ],
    columnLabel: ["Changing topic", "Interrupting"]
}

createAudioCloud(cloudObj);
createAudioTimeline(timelineObj);

// createGrammarBox(grammarBoxObj);
// createImageFrame(imageFrameObj);
// createVideo(videoObj);
// createRowOrderer(rowOrdererObj);
// createDrawline(drawlineObj);

createPracticeMultipleChoice2(practiceMC2_Obj);