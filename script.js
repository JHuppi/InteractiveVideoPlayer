var videoContainer = document.getElementById('video-container');
var video = document.getElementById('video');
var container = document.getElementById('container');
var track = document.getElementById("entrack");

var progress = document.getElementById("progress");
var bufferBar = document.getElementById('buffer');
var progressBar = document.getElementById("time-bar");

var playButton = document.getElementById("play-pause");
var duration = document.getElementById("duration");
var volumeTotal = document.getElementById("volume-total");
var volumeBar = document.getElementById("volume-bar");
var muteButton = document.getElementById("mute-unmute");
var ccButton = document.getElementById("captions");
var fullScreenButton = document.getElementById("full-screen");
var tranScript = document.getElementById("tran-script");

video.controls = false;

//Load Transcript
document.addEventListener("DOMContentLoaded", function() {
        track.mode = "hidden";
        video.textTracks[0].mode = "hidden";
});
var videoCaptionList;
track.addEventListener("load", function(){
    videoCaptionList = video.textTracks[0].cues;
    for (var i = 0; i < videoCaptionList.length; i++) {
        var newPara = document.createElement("p");
        newPara.id = "" + (i+1);
        newPara.innerHTML = videoCaptionList[i].text;
        tranScript.appendChild(newPara);
    }
});

//Play-Pause Button
playButton.addEventListener("click", function() {
    if (video.paused) {
        video.play();
        playButton.innerHTML = '<img src="icon/pause-icon.png" alt="pause">';
    } else {
        video.pause();
        playButton.innerHTML = '<img src="icon/play-icon.png" alt="play">';
    }
});

//Duration Display
video.addEventListener('loadedmetadata', function() {
    duration.innerHTML = "00:00 / " + videoDuration();
});

//Volume Bar Interactivity
volumeTotal.addEventListener('click', function(e) {
   var position;
   if (isFullScreen()) {
        position = (e.pageX - this.offsetLeft) / this.offsetWidth;
        video.volume = position / 1;
        volumeBar.style.width =  (position*100) / 1 + "%";
   } else {
        position = (e.pageX - this.offsetLeft - container.offsetLeft) / this.offsetWidth;
        video.volume = position / 1;
        volumeBar.style.width =  (position*100) / 1 + "%";
   }
});

//Mute-Unmute Button
muteButton.addEventListener("click", function() {
    if (video.muted === false) {
        video.muted = true;
        muteButton.innerHTML = '<img src="icon/volume-off-icon.png" alt="Unmute">';
        volumeBar.style.width = "0%";
    } else {
        video.muted = false;
        muteButton.innerHTML = '<img src="icon/volume-on-icon.png" alt="Mute">';
        volumeBar.style.width = (video.volume*100) / 1 + "%";
    }
});

var captionStatus;
//Captions Button
ccButton.addEventListener("click", function() {
    if (captionStatus) {
        ccButton.style.color = "#888";
        video.textTracks[0].mode = "hidden";
        captionStatus = false;
    } else {
        ccButton.style.color = "white";
        this.mode = "showing";
        video.textTracks[0].mode = "showing";
        captionStatus = true;
    }
});

//FullScreen Button
function isFullScreen() {
    return !!(document.fullScreen || 
              document.webkitIsFullScreen || 
              document.mozFullScreen ||
              document.msFullscreenElement ||
              document.fullscreenElement);
}

fullScreenButton.addEventListener("click", function() { 
    if (isFullScreen()) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }     
    } else {
        if (videoContainer.requestFullscreen) {
            videoContainer.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
        } else if (videoContainer.mozRequestFullScreen) {
            videoContainer.mozRequestFullScreen();
        } else if (videoContainer.msRequestFullscreen) {
            videoContainer.msRequestFullscreen();
        }
    }
});

//Progress Bar Interactivity
progress.addEventListener("click", function(e) {
   var position;
    if (isFullScreen()) {
        position = (e.pageX - this.offsetLeft) / this.offsetWidth;
        video.currentTime = position * video.duration;
    } else {
        position = (e.pageX - this.offsetLeft - container.offsetLeft) / this.offsetWidth;
        video.currentTime = position * video.duration;
    }
});

progress.addEventListener("mousedown", function() {
    video.pause();
    playButton.innerHTML = '<img src="icon/play-icon.png" alt="play">';
});

progress.addEventListener("mouseup", function() {
    video.play();
    playButton.innerHTML = '<img src="icon/pause-icon.png" alt="pause">';
});

function videoDuration() {
    var durationVideoMin = Math.floor(video.duration/60);
    var durationVideoSec = Math.floor(video.duration % 60);
    var durationFormat = (durationVideoMin < 10 ? "0" : "") + durationVideoMin + ":" +
                         (durationVideoSec < 10 ? "0" : "") + durationVideoSec;
    return durationFormat;
}

function currentDuration() {
    var currentVideoMin = Math.floor(video.currentTime/60);
    var currentVideoSec = Math.floor(video.currentTime % 60);
    var currentFormat = (currentVideoMin < 10 ? "0" : "") + currentVideoMin + ":" +
                        (currentVideoSec < 10 ? "0" : "") + currentVideoSec;
    return currentFormat;
}
video.addEventListener('progress', function() {
    if (video.readyState === 4) {
        var currentBuffer = video.buffered.end(0);
        bufferBar.style.width = Math.round(currentBuffer/video.duration*100) + "%";
    }
});

video.addEventListener("timeupdate", function() {
    progressBar.style.width = ((video.currentTime / video.duration) * 100) + "%";  
    duration.innerHTML = currentDuration() + " / " +
                         videoDuration();
});

//Update Transcript
track.addEventListener("cuechange", function(){
    var currentCue = track.track.activeCues;
    if(currentCue.length > 0) {
        var newId = currentCue[0].id;
        var newPara = "" + newId;
        document.getElementById(newPara).style.color = "orange";
        for (var i = 1; i <= videoCaptionList.length; i++) {
            if (videoCaptionList[i-1].id != newId) {
                document.getElementById(""+i).style.color = "black";
            }
        }
    }
});

tranScript.addEventListener("click", doSomething);

function doSomething(e) {
    if (e.target !== e.currentTarget) {
        var paraId = parseInt(e.target.id);
        var cueStart = videoCaptionList[paraId-1].startTime;
        video.currentTime = cueStart + 0.01;
    }
    e.stopPropagation();
}

