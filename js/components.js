//#region AUDIO CLOUD
let audioCloudPauseEvent,
    audioTimelinePauseEvent,
    audioTimelineEndEvent;

function createAudioCloud(obj)
{
    let id = obj.id;

    //#region Cloud Container
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

    //#endregion

    //#region Audio
        let audio = document.querySelector("audio");
        audio.id = "audio-cl-" + id;
    //#endregion

    //#region Button Listener
        btn.addEventListener("click", function()
        {
            ResetAudioButtons();
            ResetProgressBarEvents();
            StopAllMediaOfType("video");

            if(audio.id == "audio-cl-" + id)
            {
                if(audio.paused)
                {
                    PlayAudioCloud();
                }
                else
                {
                    audio.pause();
                }
            }
            else
            {
                audio.id = "audio-cl-" + id;
                audio.src = "./audios/" + obj.audio + ".mp3";
                PlayAudioCloud();
            }
        });

    //#endregion

    //#region Functions
        function PlayAudioCloud()
        {
            audio.play();
            audio.removeEventListener("pause", audioTimelinePauseEvent);
            audio.removeEventListener("ended", audioTimelineEndEvent);
            EnableAudioEvents();
            btn.classList.add("--audio-button-active");
            btn.classList.add("--cloud-button-active");
        }
        function EnableAudioEvents()
        {
            audio.addEventListener("pause", audioCloudPauseEvent);
            audio.addEventListener("ended", audioCloudPauseEvent);
        }
        function DisableAudioEvent()
        {
            audio.removeEventListener("pause", audioCloudPauseEvent);
            audio.removeEventListener("ended", audioCloudPauseEvent);
        }
    //#endregion

    //#region Audio Events
        // Audio Pause/End Event
        audioCloudPauseEvent = function()
        {
            DisableAudioEvent();
            ResetAudioButtons();
        }
    //#endregion
}
//#endregion

//#region AUDIO TIMELINE
let timelineProgressInterval,
    timelineTimerInterval,
    timelineProgressBarEvent;

function createAudioTimeline(obj)
{
    let m_totalTime;
    let id = obj.id;

    // Button Container
    create('', "#--inner-timeline-" + id, "--timeline-buttonContainer-" + id);

    // Play Button
    let btn = create('', "#--timeline-buttonContainer-" + id, "--timeline-button-" + id, "--timeline-button --audio-btn");

    //#region ProgressBar Container
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
    //#endregion

    //#region Audio
        // Audio
        let audio = document.querySelector("audio");
        audio.src = "./audios/" + obj.audio + ".mp3";
        audio.id = "audio-tl-" + id;

        // Temp Audio
        let m_audio = new Audio();
        m_audio.src = "./audios/" + obj.audio + ".mp3";
    //#endregion

    //#region Event Listeners
        // Button Listener
        btn.addEventListener("mousedown", function()
        {
            ResetAudioButtons();
            ResetProgressBarEvents();
            StopAllMediaOfType("video");

            if(audio.id == "audio-tl-" + id)
            {
                if(audio.paused)
                {
                    PlayAudioTimeline();
                }
                else
                {
                    audio.pause();
                }
            }
            else
            {
                audio.id = "audio-tl-" + id;
                audio.src = "./audios/" + obj.audio + ".mp3";
                PlayAudioTimeline();
            }
            progressBar.addEventListener("mousedown", timelineProgressBarEvent);
        });

        // ProgressBar Event
        timelineProgressBarEvent = function(e){
            let clickedValue = e.offsetX / e.target.clientWidth;

            clickedValue = Math.floor(clickedValue * 100);
            clickedValue = (audio.duration * clickedValue) / 100;

            audio.currentTime = clickedValue;
        };

    //#endregion

    //#region Functions
        // Play Audio
        function PlayAudioTimeline()
        {
            audio.play();
            audio.removeEventListener("pause", audioCloudPauseEvent);
            audio.removeEventListener("ended", audioCloudPauseEvent);
            EnableAudioEvents();
            btn.classList.add("--audio-button-active");
            btn.classList.add("--timeline-button-active");
            StartInterval();
        }
        // Intervals
        function StartInterval()
        {
            timelineProgressInterval = setInterval(function()
            {
                RefreshProgreesBar();
            }, 100);

            timelineTimerInterval = setInterval(function()
            {
                RefreshTimer();
            }, 1000);
        }
        // Timer
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
        // Progrees Bar
        function RefreshProgreesBar()
        {
            let position = (audio.currentTime / audio.duration) * 100;
            progressBar.value = position;
            slider.style.left = (position - 0.5) + "%";
        }
        function EnableAudioEvents()
        {
            audio.addEventListener("pause", audioTimelinePauseEvent);
            audio.addEventListener("ended", audioTimelineEndEvent);
        }
        function DisableAudioEvents()
        {
            audio.addEventListener("pause", audioTimelinePauseEvent);
            audio.addEventListener("ended", audioTimelineEndEvent);
        }
    //#endregion

    //#region Audio Events
        // Audio Pause Event
        audioTimelinePauseEvent = function()
        {
            DisableAudioEvents();
            ResetAudioButtons();
        }

        // Audio End Event
        audioTimelineEndEvent = function()
        {
            audio.currentTime = 0;
        }
    //#endregion

    // Delay To Set Audio Total Time
    setTimeout(function()
    {
        SetTotalTime();
    }, 500);
}
//#endregion

//#region Audio Generic Functions
function ResetAudioButtons()
{
    let btns = document.querySelectorAll(".--audio-btn");
    clearInterval(timelineProgressInterval);
    clearInterval(timelineTimerInterval);

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
        progressBar[i].removeEventListener("mousedown", timelineProgressBarEvent);
    }
}
function StopAllMediaOfType(type)
{
    ResetAudioButtons();
    let media = document.querySelectorAll(type);
    for(let i = 0; i < media.length; i++)
    {
        media[i].pause();
    }
}
//#endregion

//#region GRAMMAR BOX
function createGrammarBox(obj)
{
    let id = obj.id;

    create('',"#--inner-grammarbox-" + id, "--grammarbox-bg-" + id, "--grammarbox-bg");

    //#region Header
        create('',"#--grammarbox-bg-" + id, "--grammarbox-header-" + id, "--grammarbox-header");

        // Title
        let title = create('p',"#--grammarbox-header-" + id, "--grammarbox-title-" + id, "--grammarbox-title title white");
        title.innerHTML = obj.title;

        //#region Icon
            if(obj.icon != "")
            {
                let icon = create('img',"#--grammarbox-header-" + id, "--grammarbox-icon-" + id, "--grammarbox-icon");
                icon.src = "../../images/" + obj.icon + ".png";
            }
        //#endregion

    //#endregion

    //#region White box
        create('',"#--grammarbox-bg-" + id, "--grammarbox-whitebox-" + id, "--grammarbox-whitebox");

        // Texts
        for(let i = 0; i < obj.text.length; i++)
        {
            let text = create('p',"#--grammarbox-whitebox-" + id, "--grammarbox-text-" + id + "-" + i, "--grammarbox-title text gray");
            text.innerHTML = obj.text[i];
        }
    //#endregion
}
//#endregion

//#region IMAGE WITH FRAME
function createImageFrame(obj)
{
    let popImage;
    let id = obj.id;

    // Background
    create('',"#--inner-imageFrame-" + id, "--imageFrame-frameBg-" + id, "--imageFrame-frameBg divImg");

    //Image
    let img = create('img',"#--imageFrame-frameBg-" + id, "--imageFrame-image-" + id, "--imageFrame-image");
    img.src = "./images/" + obj.image + ".png";

    //#region Frame Container
        create('',"#--imageFrame-frameBg-" + id, "--imageFrame-frameContainer-" + id, "--imageFrame-frameContainer");

        // Top line
        create('',"#--imageFrame-frameContainer-" + id, "--imageFrame-frameTop-" + id, "--imageFrame-frameTop");

        //Button Container
        create('',"#--imageFrame-frameContainer-" + id, "--imageFrame-frameButtonContainer-" + id, "--imageFrame-frameButtonContainer");
        let btn = create('',"#--imageFrame-frameButtonContainer-" + id, "--imageFrame-frameButton-" + id, "--imageFrame-frameButton");

        // Bottom line
        create('',"#--imageFrame-frameContainer-" + id, "--imageFrame-frameBottom-" + id, "--imageFrame-frameBottom");

    //#endregion

    //#region Popup
    function popup()
    {
        let body = document.getElementsByTagName("body");
        body = body[0];

        // Mask
        let popMask = create('',"#--container-outer", "--imageFrame-popupMask", "--imageFrame-popupMask");
        body.append(popMask);

        //#region Popup Container
            create('', "#--imageFrame-popupMask", "--imageFrame-popupBg", "--imageFrame-popupBg");

            // Image
            popImage = create('img', "#--imageFrame-popupBg", "--imageFrame-popupImage", "--imageFrame-popupImage");
            popImage.src = "./images/" + obj.image + ".png";

            // Close button
            let popClose = create('img', "#--imageFrame-popupBg", "--imageFrame-popupClose", "--imageFrame-popupClose");
            popClose.src = "../../images/pop_close.png";
                    // Pop Close
            popClose.addEventListener("click", function()
            {
                body.removeChild(popMask);
            });

        //#endregion
    }
    //#endregion

    // #region Event Listeners
        //Zoom Button
        btn.addEventListener("click", function()
        {
            popup();
        });
    //#endregion
}
//#endregion

//#region VIDEO
let videoProgressInterval,
    videoTimerInterval,
    videoProgressBarEvent,
    videoVolumeBarEvent;

function createVideo(obj)
{
    let text;
    let body;
    let videoMask;
    let id = obj.id;
    let isFullScreen;
    let isShowingHUD;
    let currentVolume;

    // Background
    create('',"#--inner-video-" + id, "--inner-videoBg-" + id, "--inner-videoBg");

    // Frame Top
    create('',"#--inner-videoBg-" + id, "--videoBg-frameTop-" + id, "--videoBg-frameTop");

    //#region Video Container
        let videoContainer =create('',"#--inner-videoBg-" + id, "--videoBg-videoContainer-" + id, "--videoBg-videoContainer");

        // Video Player
        let video = create("video", "#--videoBg-videoContainer-" + id, "--videoContainer-video-" + id, "--videoContainer-video");
        video.src = "./videos/" + obj.video + ".mp4";
        if(obj.poster != "") video.poster="./images/" + obj.poster + ".png";

        // Video HUD
        let hud = create("", "#--videoBg-videoContainer-" + id, "--videoContainer-hud-" + id, "--videoContainer-hud");

        //#region Subtitles
            let subtitlesContainer = create("", "#--videoContainer-hud-" + id, "--videoContainer-subtitlesContainer-" + id, "--videoContainer-subtitlesContainer");
            let subtitle = create("p", "#--videoContainer-subtitlesContainer-" + id, "--subtitlesContainer-subtitles-" + id, "--subtitlesContainer-subtitles text white textOutline");
            subtitle.innerHTML = "";
        //#endregion

        //#region Progress Bar
            create('', "#--videoContainer-hud-" + id, "--videoContainer-progressBarContainer-" + id, "--videoContainer-progressBarContainer");

            let progressBar = create('progress', "#--videoContainer-progressBarContainer-" + id, "--videoContainer-progressBar-" + id, "--videoContainer-progressBar");
            progressBar.max = 100;
            progressBar.value = 0;

            let progressBarSlider = create('', "#--videoContainer-progressBarContainer-" + id, "--videoContainer-progressBarSlider-" + id, "--videoContainer-progressBarSlider");
        //#endregion

        //#region Controls
            create("", "#--videoContainer-hud-" + id, "--videoContainer-controlsContainer-" + id, "--videoContainer-controlsContainer");

            //#region LEFT
                // Play Button
                create("", "#--videoContainer-controlsContainer-" + id, "--controlsContainer-left-" + id, "--controlsContainer-left");
                let btn_play = create("", "#--controlsContainer-left-" + id, "--controlsContainer-play-" + id, "--controlsContainer-play");

                // Timer
                let timer = create("p", "#--controlsContainer-left-" + id, "--controlsContainer-timer-" + id, "--controlsContainer-timer text white");
                timer.innerHTML = "0:00 / 0:00";
                // Temp Audio
                let m_video = document.createElement("video");
                m_video.src = "./videos/" + obj.video + ".mp4";
            //#endregion

            //#region RIGHT
                // Volume Button
                create("", "#--videoContainer-controlsContainer-" + id, "--controlsContainer-right-" + id, "--controlsContainer-right");
                let btn_volume = create("", "#--controlsContainer-right-" + id, "--controlsContainer-volumeContainer-" + id, "--controlsContainer-volumeContainer");
                create("", "#--controlsContainer-volumeContainer-" + id, "--controlsContainer-volumeIcon-" + id, "--controlsContainer-volumeIcon");
                let volume_level = create("", "#--controlsContainer-volumeContainer-" + id, "--controlsContainer-level-" + id, "--controlsContainer-level --controlsContainer-level_3");

                // Volume Bar
                create('', "#--controlsContainer-right-" + id, "--controlsContainer-volumeBarContainer-" + id, "--controlsContainer-volumeBarContainer");
                let volumeBar = create('progress', "#--controlsContainer-volumeBarContainer-" + id, "--controlsContainer-volumeBar-" + id, "--controlsContainer-volumebar");
                volumeBar.value = 1;
                volumeBar.max = 1;

                // Slider
                let volumeSlide = create('', "#--controlsContainer-volumeBarContainer-" + id, "--controlsContainer-volumeSlider-" + id, "--controlsContainer-volumeSlider");

                // Full Screen
                let btn_fullScreen = create("", "#--controlsContainer-right-" + id, "--controlsContainer-fullscreen-" + id, "--controlsContainer-fullscreen");
            //#endregion

        //#endregion

        //#region Video Play BLock
            let playBlock = create("", "#--videoBg-videoContainer-" + id, "--videoContainer-playblock-" + id, "--videoContainer-playblock");
            create("", "#--videoContainer-playblock-" + id, "--playblock-square-" + id, "--playblock-square");
            let playBlockImg = create("img", "#--playblock-square-" + id, "--playblock-image-" + id, "--playblock-image");
            playBlockImg.src = "../../images/button_play_3.png";
        //#endregion

    //#endregion

    // Frame Bottom
    create('',"#--inner-videoBg-" + id, "--videoBg-frameBottom-" + id, "--videoBg-frameBottom");

    //#region Event Listeners
        // Play
        btn_play.addEventListener("mousedown", function()
        {
            PlayVideo();
        });
        // Volume Button
        btn_volume.addEventListener("mousedown", function()
        {
            if(video.volume != 0)
            {
                currentVolume = video.volume;
                video.volume = 0;
                volume_level.classList.add("--controlsContainer-level-muted");
            }
            else
            {
                video.volume = currentVolume;
                volume_level.classList.remove("--controlsContainer-level-muted");
            }
        });
        // VolumeBar Click Event
        videoVolumeBarEvent = function(e){
            let clickedValue = e.offsetX / e.target.clientWidth;

            clickedValue = Math.floor(clickedValue * 100);
            clickedValue = (clickedValue <= 5) ?  0 : clickedValue;

            video.volume = clickedValue / 100;
            volumeBar.value = clickedValue / 100;
            volumeSlide.style.left = (clickedValue - 1) + "%";

            if(clickedValue <= 0)
            {
                volume_level.className = "--controlsContainer-level";
                volume_level.classList.add("--controlsContainer-level-muted");
            }
            else if(clickedValue < 30)
            {
                volume_level.className = "--controlsContainer-level";
                volume_level.classList.add("--controlsContainer-level_1");
            }
            else if(clickedValue < 60)
            {
                volume_level.className = "--controlsContainer-level";
                volume_level.classList.add("--controlsContainer-level_2");
            }
            else
            {
                volume_level.className = "--controlsContainer-level";
                volume_level.classList.add("--controlsContainer-level_3");
            }
        };
        //Full Screen
        volumeBar.addEventListener("mousedown", videoVolumeBarEvent);
        btn_fullScreen.addEventListener("mousedown", function()
        {
            if(!isFullScreen) openFullscreen();
            else closeFullscreen();

            isFullScreen = !isFullScreen;
        });
        // ProgressBar Click Event
        videoProgressBarEvent = function(e){
            let clickedValue = e.offsetX / e.target.clientWidth;

            clickedValue = Math.floor(clickedValue * 100) - 0.2;
            clickedValue = (video.duration * clickedValue) / 100;

            video.currentTime = clickedValue;
        };
        // Subtitles
        subtitlesContainer.addEventListener("click", function()
        {
            PlayVideo();
        });
        // Play Block
        playBlock.addEventListener("click", function()
        {
            ToggleHUD();
            PlayVideo();
        });
    //#endregion

    //#region Functions
        // Play/Pause
        function PlayVideo()
        {
            if(video.paused)
            {
                StopAllMediaOfType("audio");
                video.play();
                btn_play.classList.add("--controlsContainer-play-active");
                StartInterval();
                progressBar.addEventListener("mousedown", videoProgressBarEvent);
            }
            else
            {
                PauseVideo();
            }
        }
        function PauseVideo()
        {
            video.pause();
            btn_play.classList.remove("--controlsContainer-play-active");
        }
        // Timer
        function SetTotalTime()
        {
            m_totalTime = CalculateTime(m_video.duration);
            timer.innerHTML = "0:00 / " + m_totalTime[0] + ":" + m_totalTime[1];
        }
        function RefreshTimer()
        {
            let m_currentTime = CalculateTime(video.currentTime);
            timer.innerHTML = m_currentTime[0] + ":" + m_currentTime[1] + " / " + m_totalTime[0] + ":" + m_totalTime[1];
        }
        function CalculateTime(amount)
        {
            let sec = Math.floor(amount % 60);
            let min = Math.floor(amount / 60);

            sec = (sec < 10) ? "0" + sec : sec.toString();
            min = min.toString();

            return m_timer = [min, sec];
        }
        // Full Screen
        function openFullscreen()
        {
            body = document.getElementsByTagName("body");
            body = body[0];

            videoMask = create('',"#--container-outer", "--videoContainer-videoMask", "--videoContainer-videoMask");
            videoMask.appendChild(videoContainer);
            body.append(videoMask);
            btn_fullScreen.classList.add("--controlsContainer-fullscreen-close");
        }
        function closeFullscreen()
        {
            let videoBg = document.getElementById("--inner-videoBg-" + id);
            videoBg.insertBefore(videoContainer, videoBg.children[1]);
            body.removeChild(videoMask);
            btn_fullScreen.classList.remove("--controlsContainer-fullscreen-close");
        }
        // Progrees Bar
        function ResetProgressBarEvents()
        {
            let videoProgressBar = document.querySelectorAll(".--videoContainer-progressBar");

            for(let i = 0; i < videoProgressBar.length; i++)
            {
                videoProgressBar[i].removeEventListener("mousedown", videoProgressBarEvent);
            }
        }
        // Subtitles
        function RefreshSubtitle()
        {
            let cur_Time = CalculateTime(video.currentTime);
            cur_Time = parseFloat(cur_Time[0] + "." + cur_Time[1]);

            if(obj.keyframe != "" && obj.keyframe != null)
            {
                if(cur_Time <= obj.keyframe[0]) text = "";

                for(let i = 0; i < obj.keyframe.length; i++)
                {
                    if(cur_Time >= obj.keyframe[i]) text = obj.subtitle[i];
                }
            }
            else
            {
                text = "";
            }
            subtitle.innerHTML = text;
        }
        // Play Block
        function ToggleHUD()
        {
            if(!isShowingHUD)
            {
                hud.style.display = "flex";
                playBlock.style.display = "none";
            }
            else
            {
                hud.style.display = "none";
                playBlock.style.display = "flex";
            }

            isShowingHUD = !isShowingHUD;
        }
        // Intervals
        function StartInterval()
        {
            // Progress Bar
            videoProgressInterval = setInterval(function()
            {
                let position = (video.currentTime / video.duration) * 100;
                progressBar.value = position;
                progressBarSlider.style.left = (position - 0.5) + "%";
            }, 50);

            // Timer
            videoTimerInterval = setInterval(function()
            {
                RefreshTimer();
                RefreshSubtitle();
            }, 1000);
        }
    //#endregion

    //#region Video Events
        // Video Pause Event
        video.addEventListener("pause", function()
        {
            PauseVideo();
            clearInterval(videoProgressInterval);
            clearInterval(videoTimerInterval);
            ResetProgressBarEvents();
        });

        // Video End Event
        video.onended = function()
        {
            video.currentTime = 0;
            btn_play.classList.remove("--controlsContainer-play-active");
            ToggleHUD();
        };
    //#endregion

    // Delay To Set Audio Total Time
    setTimeout(function()
    {
        SetTotalTime();
    }, 500);
}
//#endregion

//#region ROW ORDERER
function createRowOrderer(obj)
{
    let drag = [];
    let container = [];
    let draggedItem = null;
    let draggedItemParent = null;
    let currentAnswer = [];

    let id = obj.id;

    for(let i = 0; i < obj.text.length; i++)
    {
        // Backgound Container
        container[i] = create('',"#--inner-rowOrderer-" + id, "--rowOrderer-bg-" + id + "-" + i, "--rowOrderer-bg");

        container[i].addEventListener("dragenter", function(e)
        {
            if(this.firstChild != null)
            {
                draggedItemParent.append(this.firstChild);
                this.append(draggedItem);
                draggedItemParent = this;
            }
        });

        // Draggable Element
        drag[i] = create('',"#--rowOrderer-bg-" + id + "-" + i, "--rowOrderer-drag-" + id + "-" + i, "--rowOrderer-drag");
        drag[i].setAttribute("draggable", "true");
        // Text
        let text = create('p',"#--rowOrderer-drag-" + id + "-" + i, "--rowOrderer-text-" + id + "-" + i, "--rowOrderer-text text white");
        text.innerHTML = obj.text[i];

        drag[i].addEventListener("dragstart", function(e)
        {
            draggedItem = e.target;
            draggedItemParent = e.target.parentNode;
            setTimeout(function()
            {
                draggedItem.style.display = "none";
            }, 0);
        });
        drag[i].addEventListener("dragend", function(e)
        {
            setTimeout(function()
            {
                draggedItem.style.display = "flex";
                draggedItemParent = null;
                draggedItem = null;
                CheckResult();
            }, 0);
        });
    }

    // #region Functions
    function CheckResult()
    {
        for(let i = 0; i < container.length; i++)
        {
            currentAnswer[i] = parseInt(container[i].firstChild.id.split("-")[5]);
        }
        for(let i = 0; i < container.length; i++)
        {
            if(currentAnswer[i] != obj.correct[i])
            {
                console.log("Errou");
                return;
            }
        }
        console.log("Correto");
    }
    //#endregion
}
//#endregion

// #region DRAW LINE
function createDrawline(obj)
{
    let id = obj.id;
    let currentAnswer = [];
    let currentStartPoint = null;
    let currentMousePosition = [];
    let pointsContainerOrientation = (obj.orientation == "vertical") ? "horizontal" : "vertical";

    let drawlineContainer = create('',"#--inner-drawline-" + id, "--drawline-drawlineContainer-" + id, "--drawline-drawlineContainer");
    drawlineContainer.classList.add("--drawline-" + obj.orientation);

    // Start point Container
    let startPointContainer = create('',"#--drawline-drawlineContainer-" + id, "--drawline-startpointContainer-" + id, "--drawline-startpointContainer");
    startPointContainer.classList.add("--drawline-" + pointsContainerOrientation);

    // End point Container
    endPointContainer = create('',"#--drawline-drawlineContainer-" + id, "--drawline-endpointContainer-" + id, "--drawline-startpointContainer");
    endPointContainer.classList.add("--drawline-" + pointsContainerOrientation);

    // Elements
    for(let i = 0; i < obj.amount; i++)
    {
        currentAnswer[i] = "";

        create('',"#--drawline-startpointContainer-" + id, "--drawline-startpointBorder-" + id + "-" + i, "--drawline-startpointBorder");
        let startPoint = create('',"#--drawline-startpointBorder-" + id + "-" + i, "--drawline-startpoint-" + id + "-" + i, "--drawline-startpoint");
        
        create('',"#--drawline-endpointContainer-" + id, "--drawline-endpointBorder-" + id + "-" + i, "--drawline-endpointBorder");
        let endPoint = create('',"#--drawline-endpointBorder-" + id + "-" + i, "--drawline-endpoint-" + id + "-" + i, "--drawline-endpoint");
        
        startPoint.addEventListener("mousedown", function(e)
        {
            e.preventDefault();
            startPoint.style.cssText = "background-color: rgb(135, 136, 157);";
            currentStartPoint = this;
            currentMousePosition = [e.pageX, e.pageY];

            let m_startPositions = GetPointArrayPosition(currentStartPoint);

            // Clear Endpoint connected
            if(currentStartPoint.firstChild != null)
            {
                if(currentAnswer[m_startPositions] !== "")
                {
                    let m_endPosition = document.getElementById("--drawline-endpoint-" + id + "-" + currentAnswer[m_startPositions]);
                    m_endPosition.style.cssText = "background-color: none;";
                    currentAnswer[m_startPositions] = "";
                }
            }

            RemoveGhost();
            CreateGhost();
        });

        endPoint.addEventListener("mouseup", function()
        {
            RemoveGhost();

            // Set end point case its free
            if(CheckEndPointIsMarked(endPoint))
            {
                if(currentStartPoint != null)
                {
                    currentStartPoint.style.cssText = "background-color: rgb(135, 136, 157);";
                    endPoint.style.cssText = "background-color: rgb(135, 136, 157);";
                    CreateLine(currentStartPoint, this);
    
                    let m_startPositions = GetPointArrayPosition(currentStartPoint);
                    let m_endPositions = GetPointArrayPosition(endPoint);
    
                    // set answer
                    currentAnswer[m_startPositions] = m_endPositions;
                    console.log(currentAnswer);
                }
            }
            else
            {
                currentStartPoint.style.cssText = "background-color: none;";
                currentStartPoint.removeChild(currentStartPoint.firstChild);
            }

            currentStartPoint = null;
        });
    }

    function CheckEndPointIsMarked(endPoint)
    {
        let m_end = GetPointArrayPosition(endPoint);

        for(let i = 0; i < currentAnswer.length; i++)
        {
            if(currentAnswer[i] === m_end)
            {
                return false;
            }
        }

        return true;
    }

    function GetPointArrayPosition(point)
    {
        let position = parseInt( point.id.split("-")[5] );
        return position;
    }
    
    // Line follow the cursor
    let ghost = null;

    function CreateGhost()
    {
        ghost = create('',"#--drawline-drawlineContainer-" + id, "--ghost", "--ghost");
       
        window.onmousemove = function(e) { 

            let left = e.pageX;
            let top = e.pageY;
            ghost.style.left = ((currentStartPoint.offsetLeft) - (currentMousePosition[0] - left) ) + "px";
            ghost.style.top = ((currentStartPoint.offsetTop) - (currentMousePosition[1] - top) ) + "px";

            CreateLine(currentStartPoint, ghost);
        }

        window.addEventListener("mouseup", function(e)
        {
            if(currentStartPoint != null)
            {
                window.onmousemove = function(e) {};
                if(currentStartPoint.firstChild != null)
                {
                    currentStartPoint.removeChild(currentStartPoint.firstChild);
                    currentStartPoint.style.cssText = "background-color: none";
                } 
            }
        });
    }

    function RemoveGhost()
    {
        if(ghost != null)
        {
            window.onmousemove = function(e) {};
            document.getElementById("--drawline-drawlineContainer-" + id).removeChild(ghost);
            ghost = null;
        }
    }

    function CreateLine(from, to)
    {
        if(from.firstChild != null)
        {
            from.removeChild(from.firstChild);
        }

        let line = create('',"#" + from.id, "--drawline-line-" + id + "-0", "--drawline-line");

        let m_height = (to.offsetTop - to.offsetHeight/2) - (from.offsetTop - from.offsetHeight/2);
        let m_width = (to.offsetLeft - to.offsetWidth/2) - (from.offsetLeft - from.offsetWidth/2);

        let tan = Math.sqrt(Math.pow(m_height, 2) + Math.pow(m_width, 2));

        let angleDeg = Math.atan2( m_height, m_width) * 180 / Math.PI;

        line.style.transform = "rotate(" + angleDeg + "deg)";
        line.style.width = tan + "px";  
    }
}
//#endregion