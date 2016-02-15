var videoContainer = document.getElementById('video-container');
var video = document.getElementById('video');

var playButton = document.getElementById("play-pause");
var duration = document.getElementById("duration");
var muteButton = document.getElementById("mute-unmute");
var fullScreenButton = document.getElementById("full-screen");

var progress = document.getElementById("progress");
var bufferBar = document.getElementById('buffer');
var progressBar = document.getElementById("time-bar");


video.controls = false;

playButton.addEventListener("click", function() {
    if (video.paused === true) {
        video.play();
        playButton.innerHTML = '<img src="icon/pause-icon.png" alt="pause">';
    } else {
        video.pause();
        playButton.innerHTML = '<img src="icon/play-icon.png" alt="play">';
    }
});

muteButton.addEventListener("click", function() {
    if (video.muted === false) {
        video.muted = true;
        muteButton.innerHTML = '<img src="icon/volume-off-icon.png" alt="Unmute">';
    } else {
        video.muted = false;
        muteButton.innerHTML = '<img src="icon/volume-on-icon.png" alt="Mute">';
    }
});

fullScreenButton.addEventListener("click", function() { 
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
    }
});

//video.addEventListener('loadedmetadata', function() {
//  progress.setAttribute('max', video.duration);
//});

video.addEventListener('progress', function() {
    var bufferEnd = video.buffered.end(video.buffered.length-1);
    bufferBar.style.width = Math.floor((bufferEnd/video.duration)*100) + "%";
});

video.addEventListener("timeupdate", function() {
    //progress.value = video.currentTime;
    progressBar.style.width = Math.floor((video.currentTime / video.duration) * 100) + "%";
    var durationVideoMin = Math.floor(video.duration/60);
    var durationVideoSec = Math.floor(video.duration % 60);
    var currentVideoMin = Math.floor(video.currentTime/60);
    var currentVideoSec = Math.floor(video.currentTime % 60);
    duration.innerHTML = (currentVideoMin < 10 ? "0" : "") + currentVideoMin + ":" 
                       + (currentVideoSec < 10 ? "0" : "") + currentVideoSec + " / " 
                       + (durationVideoMin < 10 ? "0" : "") + durationVideoMin + ":" 
                       + (durationVideoSec < 10 ? "0" : "") + durationVideoSec;
});

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