let songs = [];
let currentTrack = null;
let currentIndex = 0;
let isPlaying = false;

const playBtn = document.querySelector('.play img');
const nextBtn = document.querySelector('.next img');
const prevBtn = document.querySelector('.prev img');
const seekbarFill = document.querySelector('.seekbar-fill');
const seekbarThumb = document.querySelector('.seekbar-thumb');

function setupControls() {
    playBtn.addEventListener('click', togglePlay);
    nextBtn.addEventListener('click', playNext);
    prevBtn.addEventListener('click', playPrev);

    document.querySelector('.seekbar').addEventListener('click', handleSeek);
}

async function displaySongs() {

    const response = await fetch('./assets/songs.json');
    songs = await response.json();
    const container = document.querySelector('.songs');
    container.innerHTML = '';

    for (const song of songs) {
        const div = document.createElement('div');
        div.classList.add('song', song.nonce);
        div.innerHTML = `
        <img src="${song['cover-path']}" alt="${song.title}">
        <div class="title">${song.title}</div>
        <div class="artist">${song.description}</div>
      `;
        container.appendChild(div);
    }

    container.addEventListener('click', (e) => {
        const img = e.target.closest('img');
        if (!img) return;

        const songDiv = img.closest('.song');
        const index = songs.findIndex(s => songDiv.classList.contains(s.nonce));
        if (index !== -1) {
            playSelectedSong(index);
        }
    });

}


function playSelectedSong(index){
    if(currentTrack){
        currentTrack.pause();
        currentTrack.removeEventListener('timeupdate', updateSeekbar);
    }
    currentIndex=index;
    currentTrack=new Audio(songs[index].track);

    currentTrack.addEventListener('timeupdate', updateSeekbar);
    currentTrack.addEventListener('ended', playNext);

    currentTrack.play();
    isPlaying=true;
    updatePlayIcon();
    console.log(`Now playing: ${songs[index].title}`);
}

function togglePlay(){
    if(!currentTrack){
        playSelectedSong(0);
        return;
    }

    if(isPlaying){
        currentTrack.pause();
        isPlaying=false;
    }
    else{
        currentTrack.play();
        isPlaying=true;
    }
    updatePlayIcon()
}

function updatePlayIcon(){
    if(isPlaying){
        playBtn.src="assets\icons8-pause-50.png"
    }
    else{
        playBtn.src="assets\icons8-play-30.png"
    }
}

function playNext(){
    if(currentIndex==songs.length-1){
        currentIndex=0;
    }
    else{
        currentIndex+=1;
    }
    playSelectedSong(currentIndex);
}
function playPrev(){
    if(currentIndex==0){
        currentIndex=songs.length-1;
    }
    else{
        currentIndex-=1;
    }
    playSelectedSong(currentIndex);
}

function updateSeekbar() {
    if (!currentTrack || !currentTrack.duration) return;
    const progress = (currentTrack.currentTime / currentTrack.duration) * 100;
    seekbarFill.style.width = `${progress}%`;
    seekbarThumb.style.left = `${progress}%`;

    // 🕒 Update time display
    const currentTime = formatTime(currentTrack.currentTime);
    const totalTime = formatTime(currentTrack.duration);
    const timeDisplay = document.querySelector('.time-display');
    if (timeDisplay) {
        timeDisplay.textContent = `${currentTime} / ${totalTime}`;
    }
}

function formatTime(seconds) {
    if(isNaN(seconds)){
        return "00:00"
    }
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function handleSeek(e) {
    if (!currentTrack || !currentTrack.duration) return;
    const seekbar = e.currentTarget;
    const rect = seekbar.getBoundingClientRect();
    const percent = ((e.clientX - rect.left) / rect.width) * 100;
    const newTime = (percent / 100) * currentTrack.duration;
    currentTrack.currentTime = newTime;
}

displaySongs()
setupControls()