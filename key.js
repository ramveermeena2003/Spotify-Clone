
// add eventlistener to  space keyward to pausa and play the music
document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
        if (!currentSong.paused) {
            // If the audio is playing, pause it
            currentSong.pause();
            play.src = "svg/currentsong.svg";
        }
        else {
            currentSong.play();
            play.src = "svg/pause.svg";
        }
    }
});

// add event listener to keyword 'M' to mute and unmute the music
document.addEventListener('keydown', function (event) {
    if (event.key === 'm' || event.key === 'M'){
        if(currentSong.muted){
            currentSong.muted = !currentSong.muted; // Toggles the mute status
            document.querySelector(".volume").getElementsByTagName("img")[0].src = "svg/volume.svg";
        }
        else{
            currentSong.muted = !currentSong.muted; // Toggles the mute status
            document.querySelector(".volume").getElementsByTagName("img")[0].src = "svg/mute.svg";   
        }
    }
});