// audio cloud object sample
let cloudObj = { id: 0, text: "Texto moderno", audio: "01" }

// audio timeline object sample
let timelineObj = { id: 0, audio: "02" }

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
    columnLabel: ["Changing topic", "Interrupting"],
    debug: true
}

createAudioCloud(cloudObj);
createAudioTimeline(timelineObj);

createPracticeMultipleChoice2(practiceMC2_Obj);