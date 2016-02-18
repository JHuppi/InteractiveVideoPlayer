var videoContainer = document.getElementById('video-container');
var video = document.getElementById('video');

var playButton = document.getElementById("play-pause");
var duration = document.getElementById("duration");
var muteButton = document.getElementById("mute-unmute");
var fullScreenButton = document.getElementById("full-screen");

var progress = document.getElementById("progress");
var bufferBar = document.getElementById('buffer');
var progressBar = document.getElementById("time-bar");

var cap1 = document.getElementById("cap1");
var cap2 = document.getElementById("cap2");
var cap3 = document.getElementById("cap3");
var cap4 = document.getElementById("cap4");
var cap5 = document.getElementById("cap5");
var cap6 = document.getElementById("cap6");
var cap7 = document.getElementById("cap7");
var cap8 = document.getElementById("cap8");
var cap9 = document.getElementById("cap9");
var cap10 = document.getElementById("cap10");
var cap11 = document.getElementById("cap11");
var cap12 = document.getElementById("cap12");
var cap13 = document.getElementById("cap13");
var cap14 = document.getElementById("cap14");
var cap15 = document.getElementById("cap15");
var cap16 = document.getElementById("cap16");

video.controls = false;

//Play-Pause Button
playButton.addEventListener("click", function() {
    if (video.paused === true) {
        video.play();
        playButton.innerHTML = '<img src="icon/pause-icon.png" alt="pause">';
    } else {
        video.pause();
        playButton.innerHTML = '<img src="icon/play-icon.png" alt="play">';
    }
});

//Mute-Unmute Button
muteButton.addEventListener("click", function() {
    if (video.muted === false) {
        video.muted = true;
        muteButton.innerHTML = '<img src="icon/volume-off-icon.png" alt="Unmute">';
    } else {
        video.muted = false;
        muteButton.innerHTML = '<img src="icon/volume-on-icon.png" alt="Mute">';
    }
});

//FullScreen Button
fullScreenButton.addEventListener("click", function() { 
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
    }
});

//Progress Bar Interactivity
progress.addEventListener('click', function(e) {
    var position = (e.pageX - this.offsetLeft) / this.offsetWidth;
    video.currentTime = position * video.duration;
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
    var durationFormat = (durationVideoMin < 10 ? "0" : "") + durationVideoMin + ":" 
                       + (durationVideoSec < 10 ? "0" : "") + durationVideoSec;
    return durationFormat;
}

function currentDuration() {
    var currentVideoMin = Math.floor(video.currentTime/60);
    var currentVideoSec = Math.floor(video.currentTime % 60);
    var currentFormat = (currentVideoMin < 10 ? "0" : "") + currentVideoMin + ":" 
                       + (currentVideoSec < 10 ? "0" : "") + currentVideoSec;
    return currentFormat;
}

video.addEventListener('loadedmetadata', function() {
    duration.innerHTML = "00:00 / " + videoDuration();
});


video.addEventListener('progress', function() {
        bufferBar.style.width = Math.floor((video.buffered.end(1-video.buffered.length)/video.duration)*100) + "%";
});

video.addEventListener("timeupdate", function() {
    progressBar.style.width = ((video.currentTime / video.duration) * 100) + "%";  
    duration.innerHTML = currentDuration() + " / " 
                       + videoDuration();
    switch(currentDuration()) {
        case "00:01": 
            cap1.style.color = "orange";
            break;
        case "00:04":
            cap1.style.color = "black";
            cap2.style.color = "orange";
            break;
        case "00:07":
            cap2.style.color = "black";
            cap3.style.color = "orange";
            break;
        case "00:11":
            cap3.style.color = "black";
            cap4.style.color = "orange";
            break;
        case "00:14":
            cap4.style.color = "black";
            cap5.style.color = "orange";
            break;
        case "00:18":
            cap5.style.color = "black";
            cap6.style.color = "orange";
            break;
        case "00:22":
            cap6.style.color = "black";
            cap7.style.color = "orange";
            break;
        case "00:26":
            cap7.style.color = "black";
            cap8.style.color = "orange";
            break;
        case "00:32":
            cap8.style.color = "black";
            cap9.style.color = "orange";
            break;
        case "00:35":
            cap9.style.color = "black";
            cap10.style.color = "orange";
            break;
        case "00:40":
            cap10.style.color = "black";
            cap11.style.color = "orange";
            break;
        case "00:42":
            cap11.style.color = "black";
            cap12.style.color = "orange";
            break;
        case "00:46":
            cap12.style.color = "black";
            cap13.style.color = "orange";
            break;
        case "00:49":
            cap13.style.color = "black";
            cap14.style.color = "orange";
            break;
        case "00:54":
            cap14.style.color = "black";
            cap15.style.color = "orange";
            break;
        case "00:58":
            cap15.style.color = "black";
            cap16.style.color = "orange";
            break;
        default: cap16.style.color = "black";
    }
});

