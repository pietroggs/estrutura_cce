/**
 * @author Flavio Martins
 * @version 1.1
 * 2021-08-20
 * 
 * @description multiple choice 2 - dynamic activity (one item selection per line)
 */

var practiceId = 0;
var practiceContainerId = "multiple-choice-2";
var practiceIsScored = document.querySelector("#" + practiceContainerId).hasAttribute("data-practice-scored");

var mainFramePath = parent.screen; // parent ...
var MFPontuar = mainFramePath.pontuar; // função mainFramePath.pontuar():

// Practice specific properties
var practiceProperties = [
    ["I'm sorry Kieran, but …", 1, 0], // [alternative text, correct answer, score]
    ["If I can just move on to …", 0, 0],
    ["Speaking of humans …", 0, 0],
    ["Let's focus on …", 0, 0],
    ["Sorry Elaine, I'm going to interrupt you there …", 1, 0],
    ["Sorry to cut you off …", 1, 0]

    // To add a new registry, just add a new line to this array with its proper info
]

// var practiceScore = 6;
var practiceScore = practiceProperties.length; // vem de fora! mainFrame
var scorePerItem = practiceScore / practiceProperties.length;
var finalScore = 0;

log("<<< scorePerItem: " + scorePerItem + " >>>");

var selectedAnswers = [];

var buttonLabel = ["Changing topic", "Interrupting"]; // [label btn left (0), label btn right(1)]

var soundId = [
    document.getElementById("sound-correct"), // correct answer sound
    document.getElementById("sound-incorrect"), // incorrect answer sound
    document.getElementById("sound-success") // success answer sound
];

var answerButtonsAux = [];

// SetUp function
var SetUp_PracticeMultipleChoice2 = function () {

    /** Structure */
    // ul container
    create('ul', '#' + practiceContainerId, 'practice-mc2-container', 'practice-mc2-ul');

    // lines
    var lines = [];
    // var answerButtons0 = [];
    var answerButtons = [];

    create('li', '#practice-mc2-container', '', 'practice-mc2-li-labels');
    create('span', '.practice-mc2-li-labels', '', 'label0').innerHTML = buttonLabel[0];
    create('span', '.practice-mc2-li-labels', '', 'label1').innerHTML = buttonLabel[1];

    for (let i = 0; i < practiceProperties.length; i++) {
        lines[i] = create('li', '#practice-mc2-container', '', 'practice-mc2-li-' + i);
        lines[i].innerHTML = "<span class='text-limiter'>" + practiceProperties[i][0] + "</span>";

        answerButtons.push([create('div', '.' + lines[i].getAttribute("class"), 'b0' + i, 'button button0 practice-mc2-button-0-' + i),
        create('div', '.' + lines[i].getAttribute("class"), 'b1' + i, 'button button1 practice-mc2-button-1-' + i)]);

        /** Action */
        for (let j = 0; j < answerButtons[i].length; j++) {
            answerButtons[i][j].addEventListener("click", handlerSelectButton);
        }

        selectedAnswers[i] = null;
    }

    answerButtonsAux = answerButtons; // to 'outside'

    /** Selecting buttons */
    function handlerSelectButton(event) {
        var btnId = this.id;
        var btnPair = btnId.substr(1, 1);
        var btnGroup = btnId.substr(2);

        var allCorrect = 0;

        for (let i = 0; i < practiceProperties.length; i++) {
            for (let j = 0; j < answerButtons[i].length; j++) {
                if (btnGroup == i && btnPair != j) {
                    answerButtons[i][j].classList.remove('active');
                }
            }
        }

        this.classList.toggle('active');

        /** validating (sound on click) */
        for (let i = 0; i < practiceProperties.length; i++) {
            for (let j = 0; j < answerButtons[i].length; j++) {
                if (practiceProperties[i][1] == btnPair) {
                    // correct answer
                    if (btnGroup == i && this.classList.contains('active')) {
                        soundId[0].play();
                        selectedAnswers[btnGroup] = btnPair;

                        practiceProperties[i][2] = scorePerItem;
                    }
                } else {
                    // incorrect answer
                    if (btnGroup == i && this.classList.contains('active')) {
                        soundId[1].play();
                        selectedAnswers[btnGroup] = btnPair;

                        practiceProperties[i][2] = 0;
                    }
                }
            }

            if (!this.classList.contains('active')) {
                selectedAnswers[btnGroup] = null;
            }
        }

        /** play success sound if all are correct */
        finalScore = 0;

        for (let i = 0; i < selectedAnswers.length; i++) {
            if (selectedAnswers[i] !== null) {
                if (practiceProperties[i][1] == selectedAnswers[i]) {
                    allCorrect++;

                    finalScore += practiceProperties[i][2];
                }
            }
        }

        // send score each interaction
        MFPontuar(finalScore.toFixed());

        // console.log("<<< Score: " + finalScore.toFixed() + " >>>");

        if (allCorrect == practiceProperties.length) {
            soundId[2].play();

            // Send score if 'practiceIsScored'
            if (practiceIsScored) {
                console.log("<<< Final score: " + finalScore.toFixed() + " >>>");
            }
        }

        console.log("<<< selectedAnswers: " + selectedAnswers + " >>>");
    }
}();

/** Footer buttons actions */

var markAllOn = false;
var showAllOn = false;
var resetOn = false;

var buttonMarkAll = document.querySelector('.mark-all');
var buttonShowAnswers = document.querySelector('.show-answers');
var buttonReset = document.querySelector('.reset');

/** Show feedback of all selected itens on click and block/unblock all buttons */

buttonMarkAll.addEventListener("click", markAnswers);
function markAnswers(event) {

    for (let i = 0; i < selectedAnswers.length; i++) {
        if (selectedAnswers[i] !== null) {
            if (practiceProperties[i][1] == selectedAnswers[i]) {
                answerButtonsAux[i][selectedAnswers[i]].classList.add('correct');
            } else {
                answerButtonsAux[i][selectedAnswers[i]].classList.add('incorrect');
            }
        }
    }

    // Turn OFF ShowAnswer results if it's on
    if (showAllOn) {
        showAnswers();
    }

    /** block all buttons when selected and unblock when it's not */
    blockAllButtons(!markAllOn ? 0 : 1, 0);

    /** apply class active */
    buttonMarkAll.classList.toggle('active');

    /** toggle true/false */
    markAllOn = !markAllOn;
}

/** Show feedback of all selected itens on click and block/unblock all buttons */

buttonShowAnswers.addEventListener("click", showAnswers);
function showAnswers(event) {

    for (let i = 0; i < selectedAnswers.length; i++) {
        for (let j = 0; j < answerButtonsAux[i].length; j++) {
            answerButtonsAux[i][j].classList.remove('active');
        }
    }

    for (let i = 0; i < selectedAnswers.length; i++) {
        if (!showAllOn) {
            answerButtonsAux[i][practiceProperties[i][1]].classList.add('active'); // show all correct answers
        } else {
            if (selectedAnswers[i] !== null) {
                answerButtonsAux[i][selectedAnswers[i]].classList.add('active'); // show previous selection
            }
        }
    }

    // Turn OFF markAnswers results if it's on
    if (markAllOn) {
        markAnswers();
    }

    /** block all buttons when selected and unblock when it's not */
    blockAllButtons(!showAllOn ? 0 : 1, 1);

    /** apply class active */
    buttonShowAnswers.classList.toggle('active');

    /** toggle true/false */
    showAllOn = !showAllOn;
}

/** Reset this practice */

buttonReset.addEventListener("mousedown", resetPractice);
buttonReset.addEventListener("mouseup", resetPractice);
function resetPractice(event) {

    // reset all buttons to initial state
    var allButtons = document.querySelectorAll(".button");

    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove('active', 'correct', 'incorrect'); // remove classes
    }

    // Set all registered selections to null
    for (let i = 0; i < selectedAnswers.length; i++) {
        selectedAnswers[i] = null;
    }

    log("<<< selectedAnswers [on reset]: " + selectedAnswers + " >>>");

    // Turn OFF ShowAnswer results if it's on
    if (showAllOn) {
        showAnswers();
    }

    // Turn OFF markAnswers results if it's on
    if (markAllOn) {
        markAnswers();
    }

    /** apply class active */
    this.classList.toggle('active');

    /** toggle true/false */
    resetOn = !resetOn;
}

/** block all practice buttons */
function blockAllButtons(stat, from) {
    var allButtons = document.querySelectorAll(".button");

    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].style.pointerEvents = stat == 0 ? 'none' : 'auto'; // block stat = 0 / unblock stat = 1
        if (stat == 1 && from == 0) allButtons[i].classList.remove('correct', 'incorrect'); // remove classes -> stat = 1
    }
}