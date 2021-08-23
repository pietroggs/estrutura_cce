// Cloud Audio
function createAudioCloud(obj)
{
    let id = obj.id;

    // Cloud Top Container
    create('', "#--inner-cloud-" + id, "--cloud-top-" + id, "--cloud-top");
    // Button Container
    create('', "#--cloud-top-" + id, "--cloud-buttonContainer-" + id, "--cloud-buttonContainer");
    // Button
    let btn = create('', "#--cloud-buttonContainer-" + id, "--cloud-button-" + id, "--cloud-button --audio-btn");
    // Text
    let txt = create('p', "#--cloud-top-" + id, "--cloud-text-" + id, "text gray --cloud-text");
    txt.innerHTML = obj.text;

    // Cloud Bottom Container
    create('', "#--inner-cloud-" + id, "--cloud-bottom-" + id, "--cloud-bottom");
    create('', "#--cloud-bottom-" + id, "--cloud-bottomImg-" + id, "divImg --cloud-bottomImg");

    // Audio
    let audio = document.querySelector("audio");
    audio.id = "audio-cl-" + id;

    // Button Listener
    btn.addEventListener("click", function()
    {
        ResetAudioButtons();

        if(audio.id == "audio-cl-" + id)
        {
            if(audio.paused)
            {
                audio.play();
                btn.classList.add("--audio-button-active");
                btn.classList.add("--cloud-button-active");
            }
            else
            {
                audio.pause();
                audio.currentTime = 0;
            }
        }
        else
        {
            btn.classList.add("--audio-button-active");
            btn.classList.add("--cloud-button-active");

            audio.id = "audio-cl-" + id;
            audio.src = "./audio/" + obj.audio + ".mp3";
            audio.play();
        }
    });
}

// ---
// TIMELINE
let timelineInterval,
    progressBarEvent;

function createAudioTimeline(obj)
{
    let m_totalTime;
    let id = obj.id;

    // Button Container
    create('', "#--inner-timeline-" + id, "--timeline-buttonContainer-" + id);
    // Button
    let btn = create('', "#--timeline-buttonContainer-" + id, "--timeline-button-" + id, "--timeline-button --audio-btn");

    // ProgressBar Container
    create('', "#--inner-timeline-" + id, "--timeline-progressbarcontainer-" + id,"--timeline-progressbarcontainer");
    // Timer
    let txt = create('p', "#--timeline-progressbarcontainer-" + id, "--timeline-text-" + id, "text gray --timeline-text");
    txt.innerHTML = "00:00 / 00:00";
    // ProgressBar
    let progressBar = create('progress', "#--timeline-progressbarcontainer-" + id, "--timeline-progressbar-" + id, "--timeline-progressbar");
    progressBar.value = 0;
    progressBar.max = 100;
    // Slider
    let slider = create('', "#--timeline-progressbarcontainer-" + id, "--timeline-slider-bg-slider-" + id, "--timeline-slider-bg-slider");

    // Audio
    let audio = document.querySelector("audio");
    audio.src = "./audio/" + obj.audio + ".mp3";
    audio.id = "audio-tl-" + id;

    // Temp Audio
    let m_audio = new Audio();
    m_audio.src = "./audio/" + obj.audio + ".mp3";

    // ProgressBar Click Event
    progressBarEvent = function(e){
        let x = e.pageX - this.offsetLeft, // or e.offsetX (less support, though)
            clickedValue = x * this.max / this.offsetWidth;
        
        clickedValue = Math.floor(clickedValue) - 0.5;
        clickedValue = (audio.duration * clickedValue) / 100;

        audio.currentTime = clickedValue;
    };

    // Button Listener
    btn.addEventListener("click", function()
    {
        ResetAudioButtons();
        ResetProgressBarEvents();

        if(audio.id == "audio-tl-" + id)
        {
            if(audio.paused)
            {
                audio.play();
                btn.classList.add("--audio-button-active");
                btn.classList.add("--timeline-button-active");
                StartInterval();
            }
            else
            {
                audio.pause();
            }
        }
        else
        {
            btn.classList.add("--audio-button-active");
            btn.classList.add("--timeline-button-active");

            audio.id = "audio-tl-" + id;
            audio.src = "./audio/" + obj.audio + ".mp3";
            audio.play();
            StartInterval();
        }
        progressBar.addEventListener("click", progressBarEvent);
    });

    // Audio Pause Event
    audio.addEventListener("pause", function()
    {
        clearInterval(timelineInterval);
    });

    // Audio End Event
    audio.onended = function()
    {
        ResetAudioButtons();
        audio.currentTime = 0;
    };

    // Functions
    function StartInterval()
    {
        timelineInterval = setInterval(function()
        {
            let position = (audio.currentTime / audio.duration) * 100;
            progressBar.value = position;
            slider.style.marginLeft = position + "%";
            RefreshTimer();
        }, 1000);
    }
    function SetTotalTime()
    {
        m_totalTime = CalculateTime(m_audio.duration);
        txt.innerHTML = "00:00 / " + m_totalTime[0] + ":" + m_totalTime[1];
    }
    function RefreshTimer()
    {
        let m_currentTime = CalculateTime(audio.currentTime);
        txt.innerHTML = m_currentTime[0] + ":" + m_currentTime[1] + " / " + m_totalTime[0] + ":" + m_totalTime[1];
    }
    function CalculateTime(amount)
    {
        let sec = Math.floor(amount % 60);
        let min = Math.floor(amount / 60);

        sec = (sec < 10) ? "0" + sec : sec.toString();
        min = (min < 10) ? "0" + min : min.toString();

        return m_timer = [min, sec];
    }

    // Delay To Set Audio Total Time
    setTimeout(function()
    {
        SetTotalTime();
    }, 500);
}

// ---
// Audio Components Functions
function ResetAudioButtons()
{
    let btns = document.querySelectorAll(".--audio-btn");
    clearInterval(timelineInterval);

    for(let i = 0; i < btns.length; i++)
    {
        btns[i].classList.remove("--audio-button-active");
        btns[i].classList.remove("--cloud-button-active");
        btns[i].classList.remove("--timeline-button-active");
    }
}
function ResetProgressBarEvents()
{
    let progressBar = document.querySelectorAll(".--timeline-progressbar");
    for(let i = 0; i < progressBar.length; i++)
    {
        progressBar[i].removeEventListener("click", progressBarEvent);
    }
}

// ---
// GRAMMAR BOX
function createGrammarBox(obj)
{
    let id = obj.id;

    create('',"#--inner-grammarbox-" + id, "--grammarbox-bg-" + id, "--grammarbox-bg");

    create('',"#--grammarbox-bg-" + id, "--grammarbox-header-" + id, "--grammarbox-header");

    let title = create('p',"#--grammarbox-header-" + id, "--grammarbox-title-" + id, "--grammarbox-title title white");
    title.innerHTML = obj.title;
    
    if(obj.icon != "")
    {
        let icon = create('img',"#--grammarbox-header-" + id, "--grammarbox-icon-" + id, "--grammarbox-icon");
        icon.src = "./images/" + obj.icon + ".png";
    }

    create('',"#--grammarbox-bg-" + id, "--grammarbox-whitebox-" + id, "--grammarbox-whitebox");

    let textAmount = Object.keys(obj).length - 3;

    for(let i = 0; i < textAmount; i++)
    {
        let text = create('p',"#--grammarbox-whitebox-" + id, "--grammarbox-text-" + id + "-" + i, "--grammarbox-title text gray");
        text.innerHTML = Object.values(obj)[i + 3];
    }
}

// ---
// IMAGE WITH FRAME
function createImageFrame(obj)
{
    let popImage;

    let id = obj.id;
    
    let bg = create('',"#--inner-imageFrame-" + id, "--imageFrame-frameBg-" + id, "--imageFrame-frameBg divImg");
    bg.style.backgroundImage = "url(./images/" + obj.image + ".png)";
    
    create('',"#--imageFrame-frameBg-" + id, "--imageFrame-frameTop-" + id, "--imageFrame-frameTop");

    create('',"#--imageFrame-frameBg-" + id, "--imageFrame-frameButtonContainer-" + id, "--imageFrame-frameButtonContainer");
    let btn = create('',"#--imageFrame-frameButtonContainer-" + id, "--imageFrame-frameButton-" + id, "--imageFrame-frameButton");
    create('',"#--imageFrame-frameBg-" + id, "--imageFrame-frameBottom-" + id, "--imageFrame-frameBottom");
   
    function RefreshElementSize(img)
    {
        img.style.height = (obj.square) ? img.clientWidth + "px" : ((img.clientWidth * 56) / 100) + "px";
    }

    btn.addEventListener("click", function()
    {
        popUp();
    })

    function popUp()
    {
        let body = document.getElementsByTagName("body");
        body = body[0];

        let popMask = create('',"#container", "--imageFrame-popupMask", "--imageFrame-popupMask");
        body.append(popMask);
        
        create('', "#--imageFrame-popupMask", "--imageFrame-popupBg", "--imageFrame-popupBg");

        let popClose = create('img', "#--imageFrame-popupBg", "--imageFrame-popupClose", "--imageFrame-popupClose");
        popClose.src = "./images/pop_close.png";

        popImage = create('img', "#--imageFrame-popupBg", "--imageFrame-popupImage", "--imageFrame-popupImage");
        popImage.src = "./images/" + obj.image + ".png";

        RefreshElementSize(popImage);

        popClose.addEventListener("click", function()
        {
            body.removeChild(popMask);
        });
    }

    window.onresize = function()
    {
        RefreshElementSize(bg);
        if(popImage != null && popImage != undefined)RefreshElementSize(popImage);
    }
    
    RefreshElementSize(bg);
}

// ---
// ROW ORDERER
function createRowOrderer(obj)
{
    let id = obj.id;

    let textAmount = Object.keys(obj).length - 1;

    for(let i = 0; i < textAmount; i++)
    {
        let container = create('',"#--inner-rowOrderer-" + id, "--rowOrderer-bg-" + id + "-" + i, "--rowOrderer-bg");
        container.setAttribute("ondrop", "dropSwitch(event)");
        container.setAttribute("ondragover", "allowDrop(event)");

        let drag = create('',"#--rowOrderer-bg-" + id + "-" + i, "--rowOrderer-drag-" + id + "-" + i, "--rowOrderer-drag");
        drag.setAttribute("draggable", "true");
        drag.setAttribute("ondragstart", "dragSwitch(event)");

        let text = create('p',"#--rowOrderer-drag-" + id + "-" + i, "--rowOrderer-text-" + id + "-" + i, "--rowOrderer-text text white");
        text.innerHTML = obj[i].text;
    }
}

// ---
//Switch Drag Functions
function allowDrop(ev)
{
    ev.preventDefault();
}
function dragSwitch(ev)
{
    ev.dataTransfer.setData("elementID", ev.target.id);
    ev.dataTransfer.setData("container", ev.target.parentNode.id);

    let rowOrderer = ev.target.parentNode.parentNode.id.split("-");
    ev.dataTransfer.setData("rowOrdererID", rowOrderer[4]);
}
function dropSwitch(ev)
{
    ev.preventDefault();
    var data = ev.dataTransfer.getData("elementID");
    var container = ev.dataTransfer.getData("container");
    var rowOrdererID = ev.dataTransfer.getData("rowOrdererID");
    
    let lastContainer = document.getElementById(container);
    let currentChild = ev.target;
    
    ev.target.parentNode.appendChild(document.getElementById(data));
    lastContainer.appendChild(currentChild);

    let rowOrderer = document.getElementById("--inner-rowOrderer-" + rowOrdererID);
    let rowChildren = rowOrderer.getElementsByClassName("--rowOrderer-drag");
    let rowChildrenPosition = [];

    for(let i = 0; i < rowChildren.length; i ++)
    {
        rowChildrenPosition[i] = parseInt(rowChildren[i].id.split("-")[4]);
    }

    //Verificar resultado
    console.log("Atual: " + rowChildrenPosition);
    console.log("Correta: " + rowOrdererResult[rowOrdererID]);
    
    for(let i = 0; i < rowChildren.length; i ++)
    {
        if(rowChildrenPosition[i] != rowOrdererResult[rowOrdererID][i])
        {
            console.log("Errou");
            return;
        }

        if(i == rowChildren.length - 1) console.log("Correto");
    }
}