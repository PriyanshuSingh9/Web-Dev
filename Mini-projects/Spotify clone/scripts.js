
async function displaySongs() {
    const response = await fetch('./assets/songs.json');
    const songArray = await response.json();
    const container = document.querySelector('.songs');

    for (const song of songArray) {
        const div = document.createElement('div');
        div.classList.add("song", song.nonce);

        div.innerHTML = `
      <img src="${song['cover-path']}" alt="${song.title}">
      <div class="title">${song.title}</div>
      <div class="artist">${song.description}</div>
    `;

        container.appendChild(div);
    }
    const songs = document.querySelector(".songs")
    songs.addEventListener("click", (e) => {
        console.log("clicked")
        const img = e.target.closest("img");
        if (!img) {
            return
        }

        const songDiv = img.closest(".song");
        let track;
        for (const song of songArray) {
            if (songDiv.classList.contains(song.nonce)) {
                track = new Audio(song.track)
                console.log(song.title)
                track.play()
            }

        }

    })
}

displaySongs()
