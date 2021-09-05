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
                audio.src = "./assets/audios/" + obj.audio + ".mp3";
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

        // Temp Audio
        let m_audio = new Audio();
        m_audio.src = "./assets/audios/" + obj.audio + ".mp3";
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
                audio.src = "./assets/audios/" + obj.audio + ".mp3";
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
                icon.src = "../../assets/img/components/" + obj.icon + ".png";
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
    img.src = "./assets/img/" + obj.image + ".jpg";

    //#region Frame Container
        create('',"#--imageFrame-frameBg-" + id, "--imageFrame-frameContainer-" + id, "--imageFrame-frameContainer");

        // Top line
        create('',"#--imageFrame-frameContainer-" + id, "--imageFrame-frameTop-" + id, "--imageFrame-frameTop");

        //Button Container
        create('',"#--imageFrame-frameContainer-" + id, "--imageFrame-frameButtonContainer-" + id, "--imageFrame-frameButtonContainer");
        let btn = create('',"#--imageFrame-frameButtonContainer-" + id, "--imageFrame-frameButton-" + id, "--imageFrame-frameButton");
        if(!obj.zoom) btn.style.cssText = "display: none;";

        // Bottom line
        create('',"#--imageFrame-frameContainer-" + id, "--imageFrame-frameBottom-" + id, "--imageFrame-frameBottom");

    //#endregion

    //#region Popup
    function popup()
    {
        let topBar = parent.document.querySelector(".--topbar");
        topBar.style.cssText = "display: none;";

        log(topBar);

        body = document.getElementsByTagName("body");
        body = body[0];

        // Mask
        let popMask = create('',"#--container-outer", "--imageFrame-popupMask", "--imageFrame-popupMask");

        //#region Popup Container
            create('', "#--imageFrame-popupMask", "--imageFrame-popupBg", "--imageFrame-popupBg");

            // Image
            popImage = create('img', "#--imageFrame-popupBg", "--imageFrame-popupImage", "--imageFrame-popupImage");
            popImage.src = "./assets/img/" + obj.image + ".jpg";

            // Close button
            let popClose = create('img', "#--imageFrame-popupBg", "--imageFrame-popupClose", "--imageFrame-popupClose");
            popClose.src = "../../assets/img/components/pop_close.png";
                    // Pop Close
            popClose.addEventListener("click", function()
            {
                body.removeChild(popMask);
                topBar.style.cssText = "display: block;";
            });

        //#endregion

        body.append(popMask);
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
        if(obj.poster != "") video.poster="./assets/img/" + obj.poster + ".jpg";

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
            playBlockImg.src = "../../assets/img/components/button_play_3.png";
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
            let topBar = parent.document.querySelector(".--topbar");
            topBar.style.cssText = "display: none;";

            body = document.getElementsByTagName("body");
            body = body[0];

            videoMask = create('',"#--container-outer", "--videoContainer-videoMask", "--videoContainer-videoMask");
            videoMask.appendChild(videoContainer);
            btn_fullScreen.classList.add("--controlsContainer-fullscreen-close");

            body.append(videoMask);
        }
        function closeFullscreen()
        {
            let topBar = parent.document.querySelector(".--topbar");
            topBar.style.cssText = "display: block;";

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
    let newOrder;
    let drag = [];
    let container = [];
    let draggedItem = null;
    let draggedItemParent = null;
    let currentAnswer = [];
    let startOrder = [];

    let containerEvent = function()
    {
        if(this.firstChild != null)
        {
            draggedItemParent.append(this.firstChild);
            this.append(draggedItem);
            draggedItemParent = this;
        }
    }
    let dragStart = function(e)
    {
        draggedItem = e.target;
        draggedItemParent = e.target.parentNode;
        setTimeout(function()
        {
            draggedItem.style.display = "none";
        }, 0);
    }
    let dragEnd = function(e)
    {
        setTimeout(function()
        {
            draggedItem.style.display = "flex";
            draggedItemParent = null;
            draggedItem = null;
            CheckResult();
        }, 0);
    }

    let id = obj.id;

    let rowOrdererContainer = document.getElementById("--inner-rowOrderer-" + id);
    let orientationClass = "--inner-rowOrderer-" + obj.orientation;
    rowOrdererContainer.classList.add(orientationClass);

    for(let i = 0; i < obj.text.length; i++)
    {
        // Backgound Container
        container[i] = create('',"#--inner-rowOrderer-" + id, "--rowOrderer-bg-" + id + "-" + i, "--rowOrderer-bg");

        container[i].addEventListener("dragenter", containerEvent);

        // Draggable Element
        drag[i] = create('',"#--rowOrderer-bg-" + id + "-" + i, "--rowOrderer-drag-" + id + "-" + i, "--rowOrderer-drag");
        drag[i].setAttribute("draggable", "true");
        // Text
        let text = create('p',"#--rowOrderer-drag-" + id + "-" + i, "--rowOrderer-text-" + id + "-" + i, "--rowOrderer-text text white");
        text.innerHTML = obj.text[i];

        // Arrow
        create('',"#--rowOrderer-drag-" + id + "-" + i, "--rowOrderer-arrow-" + id + "-" + i, "--rowOrderer-arrow");

        drag[i].addEventListener("dragstart", dragStart);
        drag[i].addEventListener("dragend", dragEnd);

        currentAnswer[i] = i;
        startOrder[i] = i;
    }

    function RandomizeOrder()
    {
        let temp_newOrder = shuffle(currentAnswer);

        if(JSON.stringify(temp_newOrder) === JSON.stringify( startOrder ) )
        {
            log("Embaralhar novamente: " + temp_newOrder);
            RandomizeOrder();
            return;
        }

        newOrder = temp_newOrder;

        for(let i = 0; i < container.length; i ++)
        {
            container[i].append(drag[ newOrder[i] ]);
            currentAnswer[i] = newOrder[i];
        }
    }

    RandomizeOrder();

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

    function EnableDrag(index)
    {
        drag[index].setAttribute("draggable", "true");
        container[index].addEventListener("dragenter", containerEvent);
        drag[index].addEventListener("dragstart", dragStart);
        drag[index].addEventListener("dragend", dragEnd);
    }
    function DisableDrag(index)
    {
        drag[index].setAttribute("draggable", "false");
        container[index].removeEventListener("dragenter", containerEvent);
        drag[index].removeEventListener("dragstart", dragStart);
        drag[index].removeEventListener("dragend", dragEnd);
    }

    // #region Pratice Handler

        function DefaultState()
        {
            for(let i = 0; i < drag.length; i++)
            {
                EnableDrag(i);

                if(currentAnswer.length == 0)
                {
                    container[i].append( drag[i] );
                }
                else
                {
                    container[i].append( drag[ currentAnswer[i] ] );
                }

                drag[i].setAttribute("draggable", "true");
                container[i].addEventListener("dragenter", containerEvent);
                drag[i].addEventListener("dragstart", dragStart);
                drag[i].addEventListener("dragend", dragEnd);
                drag[i].classList.remove("--pratice-blocked");
                drag[i].classList.remove("--pratice-correct");
                drag[i].classList.remove("--pratice-incorrect");
            }
        }
        // Show Correct Markeds
        let markAllIsActive;
        function MarkAll(callback)
        {
            // Enable Mark All
            if(callback === "mark-all" && !markAllIsActive)
            {
                markAllIsActive = true;

                for(let i = 0; i < drag.length; i++)
                {
                    DisableDrag(i);

                    if(currentAnswer[i] == obj.correct[i])
                    {
                        drag[newOrder[i]].classList.add("--pratice-correct");
                    }
                    else
                    {
                        drag[newOrder[i]].classList.add("--pratice-incorrect");
                    }
                }
            }
            // Disable MarkAll
            else markAllIsActive = false;
        }

        // Show All
        let showAnswersIsActive;
        function ShowAnswer(callback)
        {
            // Enable Show All
            if(callback === "show-answers" && !showAnswersIsActive)
            {
                showAnswersIsActive = true;

                for(let i = 0; i < drag.length; i++)
                {
                    DisableDrag(i);
                    container[i].append( drag[obj.correct[i]] );
                    drag[i].classList.add("--pratice-blocked");
                }
            }
            // Disable Show All
            else showAnswersIsActive = false;
        }


        // Reset All
        function Reset(callback)
        {
            DefaultState();
            // Enable Reset
            if(callback === "reset")
            {
                RandomizeOrder();

                setTimeout(function()
                {
                    document.getElementById("reset").classList.remove("active");
                }, 200);
            }
        }

        SignInFooterButton(MarkAll, ShowAnswer, Reset);
    //#endregion

    //#endregion
}
//#endregion

// #region DRAW LINE
function createDrawline(obj)
{
    let id = obj.id;
    let startPoint = [];
    let endPoint = [];
    let currentAnswer = [];
    let currentStartPoint = null;
    let currentMousePosition = [];
    let pointsContainerOrientation = (obj.orientation == "vertical") ? "horizontal" : "vertical";


    let startPointEvent = function(e)
    {
        e.preventDefault();
        this.classList.add("--pratice-selected");
        currentStartPoint = this;
        currentMousePosition = [e.pageX, e.pageY];

        let m_startPositions = GetPointArrayPosition(currentStartPoint);

        // Clear Endpoint connected
        if(currentStartPoint.firstChild != null)
        {
            if(currentAnswer[m_startPositions] !== "")
            {
                let m_endPosition = document.getElementById("--drawline-endpoint-" + id + "-" + currentAnswer[m_startPositions]);
                m_endPosition.classList.remove("--pratice-selected");
                currentAnswer[m_startPositions] = "";
            }
        }
        RemoveGhost();
        CreateGhost();
    }

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
        startPoint[i] = create('',"#--drawline-startpointBorder-" + id + "-" + i, "--drawline-startpoint-" + id + "-" + i, "--drawline-startpoint");

        create('',"#--drawline-endpointContainer-" + id, "--drawline-endpointBorder-" + id + "-" + i, "--drawline-endpointBorder");
        endPoint[i] = create('',"#--drawline-endpointBorder-" + id + "-" + i, "--drawline-endpoint-" + id + "-" + i, "--drawline-endpoint");

        EnableStartPoint();

        endPoint[i].addEventListener("mouseup", function()
        {
            RemoveGhost();

            // Set end point case its free
            if(CheckEndPointIsMarked(endPoint[i]))
            {
                if(currentStartPoint != null)
                {
                    currentStartPoint.classList.add("--pratice-selected");
                    endPoint[i].classList.add("--pratice-selected");
                    CreateLine(currentStartPoint, this);

                    let m_startPositions = GetPointArrayPosition(currentStartPoint);
                    let m_endPositions = GetPointArrayPosition(endPoint[i]);

                    // set answer
                    currentAnswer[m_startPositions] = m_endPositions;
                    console.log(currentAnswer);
                }
            }
            else
            {
                currentStartPoint.classList.remove("--pratice-selected");
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
        ghost = create('',"#--drawline-drawlineContainer-" + id, "--drawline-ghost", "--drawline-ghost");

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
                    currentStartPoint.classList.remove("--pratice-selected");
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

    // #region Functions
    function EnableStartPoint()
    {
        for(let i = 0 ; i < startPoint.length; i++)
        {
            startPoint[i].addEventListener("mousedown", startPointEvent);
            startPoint[i].style.cssText = "cursor: pointer;";
        }
    }
    function DisableStartPoint()
    {
        for(let i = 0 ; i < startPoint.length; i++)
        {
            startPoint[i].removeEventListener("mousedown", startPointEvent);
            startPoint[i].style.cssText = "cursor: default;";
        }
    }
    // #region Pratice Handler

        function DefaultState()
        {
            EnableStartPoint();

            for(let i = 0; i < startPoint.length; i++)
            {
                if(currentAnswer[i] !== "")
                {
                    CreateLine(startPoint[i], endPoint[ currentAnswer[i] ]);
                    startPoint[i].classList.add("--pratice-selected");
                    endPoint[ currentAnswer[i] ].classList.add("--pratice-selected");
                }
                else if( startPoint[i].childElementCount > 0)
                {
                    startPoint[i].removeChild(startPoint[i].firstChild);
                }

                startPoint[i].classList.remove("--pratice-correct");
                startPoint[i].classList.remove("--pratice-incorrect");
                endPoint[i].classList.remove("--pratice-correct");
                endPoint[i].classList.remove("--pratice-incorrect");
            }
        }

        // Show Correct Markeds
        let markAllIsActive;
        function MarkAll(callback)
        {
            // Enable Mark All
            if(callback === "mark-all" && !markAllIsActive)
            {
                markAllIsActive = true;

                for(let i = 0; i < startPoint.length; i++)
                {
                    DisableStartPoint();
                    if( startPoint[i].childElementCount > 0)
                    {
                        if(currentAnswer[i] == obj.correct[i])
                        {
                            startPoint[i].classList.add("--pratice-correct");
                            startPoint[i].firstChild.classList.add("--pratice-correct");
                            endPoint[currentAnswer[i]].classList.add("--pratice-correct");
                        }
                        else
                        {
                            startPoint[i].classList.add("--pratice-incorrect");
                            startPoint[i].firstChild.classList.add("--pratice-incorrect");
                            endPoint[currentAnswer[i]].classList.add("--pratice-incorrect");
                        }
                    }
                }
            }
            // Disable Mark All
            else markAllIsActive = false;
        }

        // Show All
        let showAnswersIsActive;
        function ShowAnswer(callback)
        {
            // Enable Show All
            if(callback === "show-answers" && !showAnswersIsActive)
            {
                showAnswersIsActive = true;
                DisableStartPoint();

                for(let i = 0; i < startPoint.length; i++)
                {
                    CreateLine(startPoint[i], endPoint[obj.correct[i]]);
                    startPoint[i].classList.remove("--pratice-selected");
                    endPoint[i].classList.remove("--pratice-selected");
                }
            }
            // Disable Show All
            else showAnswersIsActive = false;
        }

        // Reset All
        function Reset(callback)
        {
            DefaultState();

            // Enable Reset
            if(callback === "reset")
            {
                for(let i = 0; i < startPoint.length; i++)
                {
                    startPoint[i].classList.remove("--pratice-selected");
                    endPoint[i].classList.remove("--pratice-selected");

                    if( startPoint[i].childElementCount > 0)
                    {
                        startPoint[i].removeChild(startPoint[i].firstChild);
                    }

                    currentAnswer[i] = "";
                }
                setTimeout(function()
                {
                    document.getElementById("reset").classList.remove("active");
                }, 200);
            }
        }

        SignInFooterButton(MarkAll, ShowAnswer, Reset);
    //#endregion

    //#endregion
}
//#endregion

//#region SENTENCE INPUT
function createSentenceInput(obj)
{
    let id = obj.id;
    let input = [];
    let savedAnswer = [];
    let text = create("p", "#--inner-sentenceInput-" + id, "--sentenceInput-text" + id, "text gray --sentenceInput-text");

    for(let i = 0; i < (obj.text.length - 1); i++)
    {
        text.innerHTML = text.innerHTML + obj.text[i] + " ";

        input[i] = create("input", "#--inner-sentenceInput-" + id, "--sentenceInput-input" + id + "-" + i, "text gray --sentenceInput-input");
        input[i].setAttribute("autocomplete", "off");

        text.append(input[i]);

        text.innerHTML = text.innerHTML + " ";

    }

    text.innerHTML = text.innerHTML + obj.text[obj.text.length - 1];

    //#region Functions
    function CheckInput(value, index)
    {
        let m_value = value.toLowerCase();
        let m_index = obj.correct[index].toLowerCase();

        if(m_value === m_index)
        {
            console.log("correto");
        }
        else
        {
            console.log("errado");
        }
    }

    // #region Pratice Handler

        function DefaultState()
        {
            for(let i = 0; i < input.length; i++)
            {
                let currentInput = document.getElementById(input[i].id);
                currentInput.value = savedAnswer[i];
                currentInput.disabled = false;
                currentInput.style.cssText = "background-color: none;";
                currentInput.classList.remove("--pratice-correct");
                currentInput.classList.remove("--pratice-incorrect");
                currentInput.classList.remove("--pratice-blocked");
            }
        }

        // Show Correct Markeds
        let markAllIsActive;
        function MarkAll(callback)
        {
            // Enable Mark All
            if(callback === "mark-all" && !markAllIsActive)
            {
                markAllIsActive = true;

                for(let i = 0; i < input.length; i++)
                {
                    let currentInput = document.getElementById(input[i].id);

                    currentInput.disabled = true;

                    if(currentInput.value === obj.correct[i])
                    {
                        currentInput.classList.add("--pratice-correct");
                    }
                    else if(currentInput.value != "")
                    {
                        currentInput.classList.add("--pratice-incorrect");
                    }
                }
            }
            // Disable Mark All
            else markAllIsActive = false;
        }

        // Show All
        let showAnswersIsActive;
        function ShowAnswer(callback)
        {
            // Enable Show All
            if(callback === "show-answers" && !showAnswersIsActive)
            {
                showAnswersIsActive = true;
                for(let i = 0; i < input.length; i++)
                {
                    let currentInput = document.getElementById(input[i].id);
                    savedAnswer[i] = currentInput.value;
                    currentInput.value = obj.correct[i];
                    currentInput.disabled = true;
                    currentInput.classList.add("--pratice-blocked");
                }
            }
            // Disable Show All
            else showAnswersIsActive = false;
        }

        // Reset All
        function Reset(callback)
        {
            DefaultState();

            // Enable Reset
            if(callback === "reset")
            {
                for(let i = 0; i < input.length; i++)
                {
                    let currentInput = document.getElementById(input[i].id);
                    currentInput.value = "";
                    savedAnswer[i] = "";
                }

                setTimeout(function()
                {
                    document.getElementById("reset").classList.remove("active");
                }, 200);
            }
        }
        SignInFooterButton(MarkAll, ShowAnswer, Reset);
    //#endregion

    //#endregion

    // #region Listeners
        for(let i = 0; i < input.length; i++)
        {
            let currentInput = document.getElementById(input[i].id);

            savedAnswer[i] = (currentInput.value != undefined) ? currentInput.value : "";

            document.getElementById(input[i].id).addEventListener("blur", function(e)
            {
                savedAnswer[i] = (e.target.value != undefined) ? e.target.value : "";
                CheckInput(e.target.value, i);
            });
        }
    //#endregion
}
//#endregion

// #region PRACTICE - MP2
/**
 * @author Flavio Martins
 * @version 1.2 (2021-08-31)
 * 2021-08-20
 *
 * @description multiple choice 2 - dynamic activity (one item selection per line)
 */

 function createPracticeMultipleChoice2(practiceObj){

    var practiceContainerId = "--inner-multiple-choice-2-" + practiceObj.id;
    var practiceIsScored = document.querySelector("#" + practiceContainerId).hasAttribute("data-practice-scored");

    var mainFramePathScreen = parent.screen;
    var mainFramePathEST = parent.EST.telas.geral;
    var currentScreen = window.frameElement.id;

    var MFPontuar = mainFramePathScreen.pontuar; // função mainFramePathScreen.pontuar():

    // Practice specific properties
    var practiceProperties = practiceObj.properties;

    var practiceScore = mainFramePathEST[currentScreen].max_pontos;
    var scorePerItem = practiceScore / practiceProperties.length;
    var finalScore = 0;
    var scoreResults = [];

    log("<<< Practice MC2 - Max score: " + practiceScore + " >>>");
    log("<<< Practice MC2 - scorePerItem: " + scorePerItem + " >>>");

    var selectedAnswers = [];

    var buttonLabel = practiceObj.columnLabel; // [label btn left (0), label btn right(1)]

    var soundId = [
        parent.document.getElementById("sound-correct"), // correct answer sound
        parent.document.getElementById("sound-incorrect"), // incorrect answer sound
        parent.document.getElementById("sound-success") // success answer sound
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

            finalScore = 0;

            for (let i = 0; i < selectedAnswers.length; i++) {
                if (selectedAnswers[i] !== null) {
                    if (practiceProperties[i][1] == selectedAnswers[i]) {
                        allCorrect++;

                        scoreResults[i] = scorePerItem;

                        finalScore += practiceProperties[i][2];
                    } else {
                        scoreResults[i] = 0;
                    }
                } else {
                    scoreResults[i] = null;
                }
            }

            // Send score if 'practiceIsScored'
            if (practiceIsScored) {
                 log("<<< Practice MC2 - Final score: " + finalScore.toFixed() + " >>>");

                // send score each interaction
                MFPontuar(scoreResults);
            }

            // log("<<< Score: " + finalScore.toFixed() + " >>>");

            if (allCorrect == practiceProperties.length) {
                /** play success sound if all are correct */
                soundId[2].play();
            }

             log("<<< Practice MC2 - selectedAnswers: " + selectedAnswers + " >>>");
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
}
//#endregion

// #region FOOTER BUTTONS
function createFooterButtons()
{
    let footerButtons = [];

    create("", "#--inner-content", "practice-footer-buttons");
    footerButtons[0] = create("", "#practice-footer-buttons", "mark-all", "mark-all");
    footerButtons[1] = create("", "#practice-footer-buttons", "show-answers", "show-answers");
    footerButtons[2] = create("", "#practice-footer-buttons", "reset", "reset");

    let footerButtonEvent = function()
    {
        for(let i = 0; i < footerButtons.length; i++)
        {
            if(this.id == footerButtons[i].id)
            {
                if(!footerButtons[i].classList.contains("active"))
                {
                    footerButtons[i].classList.add("active");
                }
                else
                {
                    footerButtons[i].classList.remove("active");
                }
            }
            else
            {
                footerButtons[i].classList.remove("active");
            }
        }
    }

    for(let i = 0; i < footerButtons.length; i ++)
    {
        footerButtons[i].addEventListener("click", footerButtonEvent);
    }
}

function SignInFooterButton(markFunction, showFunction, resetFunction)
{
    let footerButtons= [];
    footerButtons[0] = document.getElementById("mark-all");
    footerButtons[1] = document.getElementById("show-answers");
    footerButtons[2] = document.getElementById("reset");

    for(let i = 0; i < footerButtons.length; i++)
    {
        footerButtons[i].addEventListener("click", function()
        {
            resetFunction(footerButtons[i].id);
            markFunction(footerButtons[i].id);
            showFunction(footerButtons[i].id);
        });
    }
}
//#endregion

//#region SELECT LIST
function createSelectList(obj){
    let currentSelected = null;
    let buttonInner = [];

    let container = create("", "#--inner-selectList-" + obj.id, "--selectList-selectListContainer-"+ obj.id, "--selectListContainer");

    let input = create("", "#--selectList-selectListContainer-"+ obj.id, "--selectListContainer-input-"+ obj.id, "--selectListContainer-input");
    let text = create("p", "#--selectListContainer-input-"+ obj.id, "--selectListContainer-text-"+ obj.id, "--selectListContainer-text text gray");
    create("", "#--selectListContainer-input-"+ obj.id, "--selectListContainer-button-"+ obj.id, "--selectListContainer-button");


    input.addEventListener("click", function(){
        let previewListOpened = document.querySelector(".--selectListContainer-list");
        if(previewListOpened != null)
        {
            previewListOpened.parentNode.removeChild(previewListOpened);
        }

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

    // #region Pratice Handler

    function DefaultState()
    {
        input.classList.remove("--pratice-correct");
        // currentInput.style.cssText = "background-color: none;";
        // currentInput.classList.remove("--pratice-correct");
        // currentInput.classList.remove("--pratice-incorrect");
        // currentInput.classList.remove("--pratice-blocked");
    }

    // Show Correct Markeds
    let markAllIsActive;
    function MarkAll(callback)
    {
        // Enable Mark All
        if(callback === "mark-all" && !markAllIsActive)
        {
            markAllIsActive = true;
            input.classList.add("--pratice-correct");

        }
        // Disable Mark All
        else markAllIsActive = false;
    }

    // Show All
    let showAnswersIsActive;
    function ShowAnswer(callback)
    {
        // Enable Show All
        if(callback === "show-answers" && !showAnswersIsActive)
        {
            showAnswersIsActive = true;

        }
        // Disable Show All
        else showAnswersIsActive = false;
    }

    // Reset All
    function Reset(callback)
    {
        DefaultState();

        // Enable Reset
        if(callback === "reset")
        {


            setTimeout(function()
            {
                document.getElementById("reset").classList.remove("active");
            }, 200);
        }
    }
    SignInFooterButton(MarkAll, ShowAnswer, Reset);
}
//#endregion

// #region SENTENCE CHOICE
function createSentenceChoice(obj){
    let buttons = [];
    let texts = [];
    let selectedAnswer = "";

    create("", "#--inner-sentenceChoice-0", "--sentenceChoice-sentenceChoiceContainer-"+obj.id, "--sentenceChoice-sentenceChoiceContainer  text  gray");

    texts[0] = create("p", "#--sentenceChoice-sentenceChoiceContainer-"+obj.id, "--sentenceChoice-sentenceChoiceText-0-"+obj.id, "--sentenceChoice-sentenceChoiceText");
    texts[0].innerHTML = obj.text[0];

    buttons[0]= create("", "#--sentenceChoice-sentenceChoiceContainer-"+obj.id, "--sentenceChoice-sentenceChoiceButton-0-"+obj.id, "--sentenceChoice-sentenceChoiceButton");
    buttons[0].innerHTML = obj.text[1];

    let slash = create("p", "#--sentenceChoice-sentenceChoiceContainer-"+obj.id, "--sentenceChoice-sentenceChoiceSlash-"+obj.id, "--sentenceChoice-sentenceChoiceSlash");
    slash.innerHTML = "/";

    buttons[1]= create("", "#--sentenceChoice-sentenceChoiceContainer-"+obj.id, "--sentenceChoice-sentenceChoiceButton-1-"+obj.id, "--sentenceChoice-sentenceChoiceButton");
    buttons[1].innerHTML = obj.text[2];

    texts[1] = create("p", "#--sentenceChoice-sentenceChoiceContainer-"+obj.id, "--sentenceChoice-sentenceChoiceText-1-"+obj.id, "--sentenceChoice-sentenceChoiceText");
    texts[1].innerHTML = obj.text[3];

    buttons.forEach(function(element, index) {
        element.addEventListener("click", function(){
            if(selectedAnswer === "" || selectedAnswer != index){
                selectedAnswer = index;
                buttons.forEach(function(e){
                    if(e.classList.contains("buttonBackgroundSelected")){
                        e.classList.remove("buttonBackgroundSelected");
                    }
                });
                element.classList.toggle("buttonBackgroundSelected");

                if(index === obj.correct){
                    log("CORRETO")
                }else{
                    log("INCORRETO")
                }

            }else {
                element.classList.remove("buttonBackgroundSelected");
                selectedAnswer = "";
            }
        });
    });

}
//#endregion

// #region SENTENCE SELECT
function createSentenceSelect(obj){
    let buttonsInner = [];
    let selectedAnswer = "";

    create("", "#--inner-sentenceSelect-0", "--sentenceSelect-sentenceSelectContainer-" + obj.id, "--sentenceSelect-sentenceSelectContainer  text gray");
    for (let i = 0; i < obj.text.length; i++) {

        create("", "#--sentenceSelect-sentenceSelectContainer-" + obj.id, "--sentenceSelect-sentenceSelect-0-" + obj.id + "-"+i, "--sentenceSelect-sentenceSelect");
        create("", "#--sentenceSelect-sentenceSelect-0-" + obj.id + "-"+i, "--sentenceSelect-sentenceSelect-button-0-" + obj.id+"-"+i, "--sentenceSelect-sentenceSelect-button  --drawline-startpointBorder");

        buttonsInner[i] = create("", "#--sentenceSelect-sentenceSelect-button-0-" + obj.id+"-"+i, "--sentenceSelect-sentenceSelect-text-0-"+ obj.id+"-"+i, "--sentenceSelect-sentenceSelect-buttonInner  --drawline-startpoint");

        let text = create("p", "#--sentenceSelect-sentenceSelect-0-" + obj.id + "-"+i, "--sentenceSelect-sentenceSelect-text-0-" + obj.id, "--sentenceSelect-sentenceSelect-text");
        text.innerHTML = obj.text[i];
    }

    buttonsInner.forEach(function(element, index){
        document.getElementById(element.id).addEventListener("click", function(){
            if(selectedAnswer === "" || selectedAnswer != index){
                selectedAnswer = index;
                buttonsInner.forEach(function(e){
                    if(e.classList.contains("buttonBackgroundSelected")){
                        e.classList.remove("buttonBackgroundSelected");
                    }
                });
                buttonsInner[index].classList.toggle("buttonBackgroundSelected");
                if(index === obj.correct){
                    log("CORRETOOO");
                }else{
                    log("INCORRETOOOOO");
                }
            }else{
                buttonsInner[index].classList.remove("buttonBackgroundSelected");
                selectedAnswer = "";
            }
        });
    });
}
// #endregion

// #region DRAGDROP
function createDragDrop(obj) {
    let divs = [];
    let dragDrop = [];
    let text = [];
    let answer = [];
    let changes = [];
    
    for (let index = 0; index < obj.text.length - 1; index++) {
      text[index] = create("p","#--inner-sentenceDragDrop-" + obj.id,"--sentenceDropped-text" + obj.id + "-" + index,"text gray --sentenceDropped-text");
  
      text[index].innerHTML = obj.text[index];
  
      divs[index] = create("","#--inner-sentenceDragDrop-" + obj.id,"--sentenceDropped-container-" + obj.id + "-" + index,"--sentenceDropped-container");
  
      answer[index] = create("p","#--sentenceDropped-container-" + obj.id + "-" + index,"--sentenceDropped-text-answer-" + obj.id + "-" + index,"text gray --sentenceDropped-text-answer");
  
      dragDrop[index] = create("","#--inner-dragDrop-sentenceContainer-0","--sentenceDragged-" + obj.id + "-" + index,"--sentenceDragged");
      dragDrop[index].setAttribute("draggable", true);
      let dragText = create("p","#--sentenceDragged-" + obj.id + "-" + index,"--sentenceDragged-text-" + obj.id,"text gray --sentenceDragged-text");
      dragText.innerHTML = obj.dragText[index];
    }
    let lastId = obj.text.length - 1;
    text[lastId] = create("p","#--inner-sentenceDragDrop-" + obj.id,"--sentenceDropped-text" + obj.id + "-" + lastId,"text gray --sentenceDropped-text");
    text[lastId].innerHTML = obj.text[lastId];
  
    const dragContainer = document.querySelector(".--inner-dragDrop-sentenceContainer");
    // var draggedItem = null;
    for (let index = 0; index < obj.text.length - 1; index++) {
      //DRAG
      dragDrop[index].addEventListener("dragstart", function (e) {
        draggedItem = dragDrop[index];
        let idDropContainer = dragDrop[index].id.split("-")[3] + this.id.split("-")[4];
        verification.key = idDropContainer;
      });
  
      dragDrop[index].addEventListener("dragend", function (e) {
        setTimeout(function () {
          draggedItem.style.display = "flex";
          draggedItem = null;
        }, 0);
      });
  
      // container dragged
      dragContainer.addEventListener("dragover", function (e) {
        e.preventDefault();
        this.style.backgroundColor = "#536fc3";
      });
      dragContainer.addEventListener("dragenter", function (e) {
        e.preventDefault();
      });
      dragContainer.addEventListener("dragleave", function (e) {
        e.preventDefault();
        this.style.backgroundColor = "#a7b4da21";
      });
      dragContainer.addEventListener("drop", function (e) {
        this.append(draggedItem);
        this.style.backgroundColor = "#a7b4da21";
      });
  
      //DROP
      divs[index].addEventListener("dragover", function (e) {
        e.preventDefault();
      });
  
      divs[index].addEventListener("dragenter", function (e) {
        e.preventDefault();
        this.style.backgroundColor = "#536fc3";
      });
  
      divs[index].addEventListener("dragleave", function (e) {
        e.preventDefault();
        this.style.backgroundColor = "white";
      });
  
      divs[index].addEventListener("drop", function () {
        if(divs[index].childElementCount < 2){
            this.append(draggedItem);
            changes[index] = draggedItem;
            verification.value = divs[index].id.split("-")[4] + this.id.split("-")[5];
            if (verification.key === verification.value) {
                log("ACERTOUUU");
            } else {
                log("ERRROUUUU");
            }
        }else{
          changes[index + 1] = this.lastChild;
          this.removeChild(this.lastChild);
          this.append(draggedItem);
          dragContainer.append(changes[index + 1])
        }
        
      });
    }
    // #region Pratice Handler
    function DefaultState() {
        for (let i = 0; i < divs.length; i++) {
            dragDrop[i].classList.remove("--pratice-blocked");
            divs[i].lastChild.classList.remove("--pratice-correct");
            divs[i].lastChild.classList.remove("--pratice-incorrect");
            
            answer[i].innerHTML = "";
            divs[i].classList.remove("--pratice-blocked");
            divs[i].style.backgroundColor = "white";
            divs[i].lastChild.classList.remove("--hiddenDrag");
            divs[i].lastChild.setAttribute("draggable", true);
        }
    }
    // Show Correct Markeds
    let markAllIsActive;
    function MarkAll(callback) {
        // Enable Mark All
      if (callback === "mark-all" && !markAllIsActive) {
          markAllIsActive = true;
          for (let i = 0; i < divs.length; i++) {
              if(divs[i].childElementCount > 1){
                let childDropped = divs[i].lastChild;
                if(childDropped.firstChild.innerHTML === obj.dragText[i]){
                    childDropped.classList.add("--pratice-correct");
                }else{
                    childDropped.classList.add("--pratice-incorrect");
                }
                childDropped.setAttribute("draggable", false);
            }  
        }
    }
    // Disable MarkAll
    else markAllIsActive = false;
    }
  
    // Show All
    let showAnswersIsActive;
    function ShowAnswer(callback) {
      // Enable Show All
      if (callback === "show-answers" && !showAnswersIsActive) {
        showAnswersIsActive = true;
  
        for (let i = 0; i < divs.length; i++) {
            answer[i].innerHTML = obj.dragText[i];
            divs[i].classList.add("--pratice-blocked");
            if(divs[i].lastChild.tagName.toLowerCase() === "div"){
                divs[i].lastChild.classList.add("--hiddenDrag");
            }
        }
      }
      // Disable Show All
      else showAnswersIsActive = false;
    }
  
    // Reset All
    function Reset(callback) {
      DefaultState();
      // Enable Reset
      if (callback === "reset") {
          
        setTimeout(function () {
            document.getElementById("reset").classList.remove("active");
            for (let index = 0; index < dragDrop.length; index++) {  
                dragContainer.append(dragDrop[index]);
            }
        }, 200);
      }
    }
  
    SignInFooterButton(MarkAll, ShowAnswer, Reset);
    //#endregion
} 