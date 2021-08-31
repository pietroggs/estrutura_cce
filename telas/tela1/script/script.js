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
    text: ["<span class = 'pink'>span</span>", "<hr>", "lari lira"]
}

// video object sample
let videoObj = { 
    id: 0,
    video: "video_00",
    poster: "video_00",
    keyframe: [0.10, 0.16],
    subtitle: [ "Cacilds vidis litro abertis. Suco de cevadiss deixa as pessoas mais interessantis.",
    "Diuretics paradis num copo é motivis de denguis. Sapien in monti palavris qui num significa nadis i pareci latim."]
}

// row orderer object sample
let rowOrdererObj = {
    id: 0,
    correct: [2,1,3,0], 
    text: ["Olá", "Não sei", "Cacildis", "I don't know", "Aline", "Flávio"]
}

// draw line object sample WIP
let drawlineObj = { id: 0, amount: 3, orientation: "vertical" }


createAudioCloud(cloudObj);
createAudioTimeline(timelineObj);
createGrammarBox(grammarBoxObj);
createImageFrame(imageFrameObj);
createVideo(videoObj);
createRowOrderer(rowOrdererObj);
createDrawline(drawlineObj);
