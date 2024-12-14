<<<<<<< HEAD

var currentSong = new Audio();
let currfolder;
let songs;
var play = document.getElementById("current");
let songUL = document.querySelector(".songList").getElementsByTagName('ul')[0];

function convertSecondsToMinutes(seconds) {
    // Calculate minutes and remaining seconds
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    // Format minutes and seconds to always have two digits
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    if (isNaN(formattedMinutes) || isNaN(formattedSeconds)) {
        return `00:00`;
    }
    return `${formattedMinutes}:${formattedSeconds}`;
}

// function to get songs from folders
async function getsongs(folder) {
    currfolder = folder;
    let a = await fetch(`http://127.0.0.1:3000/song/${currfolder}`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = [];
    for (let index = 0; index < as.length; index++) {
        let element = as[index].href;
        if (element.endsWith('.mp3')) {
            songs.push(element.split(`/song/${currfolder}/`)[1].split('.mp3')[0].replace('%20', ' '));
        }
    }

    return songs;

}

// Function to play music
let playMusic = (track, pause = false) => {
    currentSong.src = `http://127.0.0.1:3000/song/${currfolder}/` + track + '.mp3';
    if (!pause) {
        currentSong.play();
        play.src = "svg/pause.svg";        
    }
    setInterval(() => {
        document.querySelector(".songtime").innerHTML = `${convertSecondsToMinutes(currentSong.currentTime)}/${convertSecondsToMinutes(currentSong.duration)}`
    }, 1000);

    document.querySelector(".songinfo").innerHTML = track;
    document.querySelector(".songtime").innerHTML = '00:00/00:00';

    // add even listerner if the current song is completed then next song will play automatically

    currentSong.addEventListener('ended',()=>{
        play.src = "svg/currentsong.svg";
        let index = songs.indexOf(currentSong.src.split(`/song/${currfolder}/`)[1].split('.mp3')[0].replace('%20', ' '));
        if(index < songs.length -1)
        {
            playMusic(songs[index+1]);
        }
    })



}

// main() function
async function main() {
    songs = await getsongs("rajasthani");
    playMusic(songs[0], true);
    Array.from(document.querySelectorAll(".play")).forEach(e=>{
        e.getElementsByTagName("img")[0].addEventListener("click", async item=>{
            songs = await getsongs(`${item.target.dataset.folder}`);
            songUL.innerHTML = "";
            for(const song of songs)
            {
                songUL.innerHTML = songUL.innerHTML + `<li class="pointer"><div class = "info">
                    <img class ="invert" src = "svg/music.svg" alt ="">
                    <div class="mid-info">
                        <marquee scrollamount = "5" onmouseover = "this.stop()" onmounseout ="this.start()">${song}</marquee>
                        <div>Ramveer Meena</div>
                    </div>
                </div>
                <div class="playnow">
                <span>play now</span>
                <img class="invert" src = "svg/currentsong.svg" alt="">
                </div>
                </li>`
            }
            playMusic(songs[0],true);
            currentSong.play();
            play.src = "svg/pause.svg";

            Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
                e.addEventListener("click",()=>{
                    playMusic(e.querySelector(".mid-info").firstElementChild.innerHTML);
                })
            })
        })
    })

    // add event linstener to current song if song is paused then it will play the music and change the svg and vice versa

    play.addEventListener("click",()=>{
        if(currentSong.paused)
        {
            currentSong.play();
            play.src = "svg/pause.svg";
        }
        else{
            currentSong.pause();
            play.src = "svg/currentsong.svg";
        }
    })

    // add event listener to previous button
    previous.addEventListener("click",()=>{
        let index = songs.indexOf(currentSong.src.split(`/song/${currfolder}/`)[1].split('.mp3')[0].replace('%20',' '));
        if(index > 0)
        {
            playMusic(songs[index - 1]);
        }
    })

    // add evevnt listerner to next button

    next.addEventListener("click",()=>{
        let index = songs.indexOf(currentSong.src.split(`/song/${currfolder}/`)[1].split('.mp3')[0].replace('%20',' '));
        if(index < songs.length -1)
        {
            playMusic(songs[index + 1]);
        }
    })

    // add event listener to currentsong to get the currentTime and duration of song
    currentSong.addEventListener("timeupdate",()=>{
        document.querySelector(".songtime").innerHTML = `${convertSecondsToMinutes(currentSong.currentTime)}/${convertSecondsToMinutes(currentSong.duration)}`;
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration)*100 + '%';
    })

    // add event listener to seekbar

    document.querySelector(".seekbar").addEventListener("click", e=>{
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + '%';
        currentSong.currentTime = ((currentSong.duration) * percent) / 100;
    })

    // add event linstener to plus icon when i am clicking on plus icon in library all content will erased and vice versa

    document.querySelector(".plus").addEventListener('click',()=>{
        if(document.querySelector(".songList").style.display == "none"){
            document.querySelector(".songList").style.display = "block";
            document.querySelector(".song-bg-image").style.display = "none";
        }
        else{
            document.querySelector(".songList").style.display = "none";
            document.querySelector(".song-bg-image").style.display = "block";
        }
    })

    // add event listener to range

    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",(e)=>{
        currentSong.volume = parseInt(e.target.value)/100;
        if(currentSong.volume == 0)
        {
            document.querySelector(".volume").getElementsByTagName("img")[0].src = "svg/mute.svg";
        }
        else{
            document.querySelector(".volume").getElementsByTagName("img")[0].src = "svg/volume.svg";
        }
    })

    // add eventlistener to volume button

    document.querySelector(".volume").getElementsByTagName("img")[0].addEventListener("click",(e)=>{
        if(e.target.src.includes("svg/volume.svg"))
        {
            e.target.src = "svg/mute.svg";
            currentSong.volume = 0;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
        }
        else{
            e.target.src = "svg/volume.svg";
            currentSong.volume = 1;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 100;
        }
    });

    // add event listener to hamburder
    document.querySelector(".hamburger").addEventListener('click',()=>{
        document.querySelector(".left").style.left = "0%";
        document.querySelector(".cross").style.display = "block";
        document.querySelector(".cross").style.left = "90%";
    })

    // add event listener to cancel the hamburger
    document.querySelector(".cross").addEventListener('click',()=>{
        document.querySelector(".left").style.left = "-200%";
        document.querySelector(".cross").style.display = "none";
    })

}
=======

var currentSong = new Audio();
let currfolder;
let songs;
var play = document.getElementById("current");
let songUL = document.querySelector(".songList").getElementsByTagName('ul')[0];

function convertSecondsToMinutes(seconds) {
    // Calculate minutes and remaining seconds
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    // Format minutes and seconds to always have two digits
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    if (isNaN(formattedMinutes) || isNaN(formattedSeconds)) {
        return `00:00`;
    }
    return `${formattedMinutes}:${formattedSeconds}`;
}

// function to get songs from folders
async function getsongs(folder) {
    currfolder = folder;
    let a = await fetch(`http://127.0.0.1:3000/song/${currfolder}`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = [];
    for (let index = 0; index < as.length; index++) {
        let element = as[index].href;
        if (element.endsWith('.mp3')) {
            songs.push(element.split(`/song/${currfolder}/`)[1].split('.mp3')[0].replace('%20', ' '));
        }
    }

    return songs;

}

// Function to play music
let playMusic = (track, pause = false) => {
    currentSong.src = `http://127.0.0.1:3000/song/${currfolder}/` + track + '.mp3';
    if (!pause) {
        currentSong.play();
        play.src = "svg/pause.svg";        
    }
    setInterval(() => {
        document.querySelector(".songtime").innerHTML = `${convertSecondsToMinutes(currentSong.currentTime)}/${convertSecondsToMinutes(currentSong.duration)}`
    }, 1000);

    document.querySelector(".songinfo").innerHTML = track;
    document.querySelector(".songtime").innerHTML = '00:00/00:00';

    // add even listerner if the current song is completed then next song will play automatically

    currentSong.addEventListener('ended',()=>{
        play.src = "svg/currentsong.svg";
        let index = songs.indexOf(currentSong.src.split(`/song/${currfolder}/`)[1].split('.mp3')[0].replace('%20', ' '));
        if(index < songs.length -1)
        {
            playMusic(songs[index+1]);
        }
    })



}

// main() function
async function main() {
    songs = await getsongs("rajasthani");
    playMusic(songs[0], true);
    Array.from(document.querySelectorAll(".play")).forEach(e=>{
        e.getElementsByTagName("img")[0].addEventListener("click", async item=>{
            songs = await getsongs(`${item.target.dataset.folder}`);
            songUL.innerHTML = "";
            for(const song of songs)
            {
                songUL.innerHTML = songUL.innerHTML + `<li class="pointer"><div class = "info">
                    <img class ="invert" src = "svg/music.svg" alt ="">
                    <div class="mid-info">
                        <marquee scrollamount = "5" onmouseover = "this.stop()" onmounseout ="this.start()">${song}</marquee>
                        <div>Ramveer Meena</div>
                    </div>
                </div>
                <div class="playnow">
                <span>play now</span>
                <img class="invert" src = "svg/currentsong.svg" alt="">
                </div>
                </li>`
            }
            playMusic(songs[0],true);
            currentSong.play();
            play.src = "svg/pause.svg";

            Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
                e.addEventListener("click",()=>{
                    playMusic(e.querySelector(".mid-info").firstElementChild.innerHTML);
                })
            })
        })
    })

    // add event linstener to current song if song is paused then it will play the music and change the svg and vice versa

    play.addEventListener("click",()=>{
        if(currentSong.paused)
        {
            currentSong.play();
            play.src = "svg/pause.svg";
        }
        else{
            currentSong.pause();
            play.src = "svg/currentsong.svg";
        }
    })

    // add event listener to previous button
    previous.addEventListener("click",()=>{
        let index = songs.indexOf(currentSong.src.split(`/song/${currfolder}/`)[1].split('.mp3')[0].replace('%20',' '));
        if(index > 0)
        {
            playMusic(songs[index - 1]);
        }
    })

    // add evevnt listerner to next button

    next.addEventListener("click",()=>{
        let index = songs.indexOf(currentSong.src.split(`/song/${currfolder}/`)[1].split('.mp3')[0].replace('%20',' '));
        if(index < songs.length -1)
        {
            playMusic(songs[index + 1]);
        }
    })

    // add event listener to currentsong to get the currentTime and duration of song
    currentSong.addEventListener("timeupdate",()=>{
        document.querySelector(".songtime").innerHTML = `${convertSecondsToMinutes(currentSong.currentTime)}/${convertSecondsToMinutes(currentSong.duration)}`;
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration)*100 + '%';
    })

    // add event listener to seekbar

    document.querySelector(".seekbar").addEventListener("click", e=>{
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + '%';
        currentSong.currentTime = ((currentSong.duration) * percent) / 100;
    })

    // add event linstener to plus icon when i am clicking on plus icon in library all content will erased and vice versa

    document.querySelector(".plus").addEventListener('click',()=>{
        if(document.querySelector(".songList").style.display == "none"){
            document.querySelector(".songList").style.display = "block";
            document.querySelector(".song-bg-image").style.display = "none";
        }
        else{
            document.querySelector(".songList").style.display = "none";
            document.querySelector(".song-bg-image").style.display = "block";
        }
    })

    // add event listener to range

    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",(e)=>{
        currentSong.volume = parseInt(e.target.value)/100;
        if(currentSong.volume == 0)
        {
            document.querySelector(".volume").getElementsByTagName("img")[0].src = "svg/mute.svg";
        }
        else{
            document.querySelector(".volume").getElementsByTagName("img")[0].src = "svg/volume.svg";
        }
    })

    // add eventlistener to volume button

    document.querySelector(".volume").getElementsByTagName("img")[0].addEventListener("click",(e)=>{
        if(e.target.src.includes("svg/volume.svg"))
        {
            e.target.src = "svg/mute.svg";
            currentSong.volume = 0;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
        }
        else{
            e.target.src = "svg/volume.svg";
            currentSong.volume = 1;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 100;
        }
    });

    // add event listener to hamburder
    document.querySelector(".hamburger").addEventListener('click',()=>{
        document.querySelector(".left").style.left = "0%";
        document.querySelector(".cross").style.display = "block";
        document.querySelector(".cross").style.left = "90%";
    })

    // add event listener to cancel the hamburger
    document.querySelector(".cross").addEventListener('click',()=>{
        document.querySelector(".left").style.left = "-200%";
        document.querySelector(".cross").style.display = "none";
    })

}
>>>>>>> 343d373 (first commit)
main();