function startPortfolio() {
                const popup = document.querySelector('.popup');
                const bg = document.querySelector('.bg-image');
                bg.style.backgroundImage = "url('assets/desktop/background.png')";
                bg.style.opacity = "1";
                // fade out popup
                popup.style.opacity = "0";
                popup.style.transform= "scale(0.9)";
                popup.style.transition = "0.4s";
                setTimeout(() => popup.remove(), 400);
                setTimeout(() => {
                    desktop.style.opacity = "1";
                    desktop.style.pointerEvents = "auto";
                }, 500);
            }
let currentZIndex = 100;
/* all desktop app windows */
document.querySelector('.fitness-icon').addEventListener('click', () => {
    const popup = document.getElementById('fitnessWindow');
    popup.style.display = 'flex';
    currentZIndex++;
    popup.style.zIndex = currentZIndex;
});
document.querySelector('.email-icon').addEventListener('click', () => {
    const popup = document.getElementById('emailWindow');
    popup.style.display = 'flex';
    currentZIndex++;
    popup.style.zIndex = currentZIndex;
});

document.querySelector('.photo-icon').addEventListener('click', () => {
    const popup = document.getElementById('photoWindow');
    popup.style.display = 'flex';
    currentZIndex++;
    popup.style.zIndex = currentZIndex;
});
document.querySelector('.vscode-icon').addEventListener('click', () => {
    const popup = document.getElementById('vscodeWindow');
    popup.style.display = 'flex';
    currentZIndex++;
    popup.style.zIndex = currentZIndex;
});
document.querySelector('.music-icon').addEventListener('click', () => {
    const popup = document.getElementById('musicWindow');
    popup.style.display = 'flex';
    currentZIndex++;
    popup.style.zIndex = currentZIndex;
    document.getElementById("musicControls").classList.remove("hidden");
    progress.classList.remove("hidden");
    musicTitle.textContent = ""
})

/* desktop app window drag */
document.querySelectorAll('.app-popup').forEach(popup => {
    let isDragging = false;
    let offsetX, offsetY;
    const header = popup.querySelector('div:first-child');
    header.addEventListener('mousedown', (e) => {
        isDragging = true;
        const rect = popup.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        const overlay = popup.parentElement;
        currentZIndex++;
        overlay.style.zIndex = currentZIndex;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        popup.style.position = 'fixed';
        popup.style.left = e.clientX - offsetX + 'px';
        popup.style.top = e.clientY - offsetY + 'px';
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    popup.addEventListener('mousedown', () => {
        const overlay = popup.parentElement;
        currentZIndex++;
        overlay.style.zIndex = currentZIndex;
    });
});

/* close functions */
function closeEmail(e) {
    e.stopPropagation(e);
    document.getElementById('emailWindow').style.display = 'none';
}

function closePhoto(e) {
    e.stopPropagation(e);
    document.getElementById('photoWindow').style.display = 'none';
    document.getElementById('photoPreview').style.display = 'none';
}
function closeFitness(e) {
    e.stopPropagation();
    document.getElementById('fitnessWindow').style.display = 'none';
}
function closeVSCode(e) {
    e.stopPropagation();
    document.getElementById('vscodeWindow').style.display = 'none';
}
function closeMusic(e) {
    e.stopPropagation();
    document.getElementById("musicWindow").style.display = 'none';
}

//vscode file content
const vscodeFileContent = {
    "Anki Enforcer": {
        demo: `
            <audio controls width="90%">
                <source src="placeholder" type="audio/m4a">
            </audio>
        `,
        description: "67",
        learned: "..."
    },
    "Posture Detector": {
        demo: `
            <audio controls width="90%">
                <source src="placeholder" type="audio/m4a">
            </audio>
        `,
        description: "89",
        learned: "..."
    },
    "Ticketmaster Trainer": {
        demo: `
            <audio controls width="90%">
                <source src="placeholder" type="audio/m4a">
            </audio>
        `,
        description: "10",
        learned: "..."
    },
    "Zeroni Dressup Game": {
        demo: `
            <audio controls width="90%">
                <source src="placeholder" type="audio/m4a">
            </audio>
        `,
        description: "11",
        learned: "..."
    },
    "Portfolio Website": {
        demo: `
            <audio controls width="90%">
                <source src="placeholder" type="audio/m4a">
            </audio>
        `,
        description: "...",
        learned: "..."
    }
};

//vscode file click
function renderVSCodeFile(fileName) {
    const data = vscodeFileContent[fileName];
    if (!data) return;
    editor.innerHTML = `
    <div class="vscode-section">
        <h3>Demo</h3>
        <div class="vscode-demo">${data.demo}</div>
    </div>
    <div class="vscode-section">
        <h3>Description</h3>
        <p>${data.description}</p>
    </div>
    <div class="vscode-section">
        <h3>What I Learned</h3>
        <p>${data.learned}</p>
    </div>
    `.trim();
}
const tabsContainer = document.querySelector('.vscode-tabs');
const editor = document.querySelector('.vscode-file-content');
const placeholder = document.querySelector('.vscode-placeholder');
document.querySelectorAll('.vscode-file-list li').forEach(file => {
    file.addEventListener('click', () => {
        const fileName = file.textContent;
        //check if tab already open
        if ([...tabsContainer.children].some(tab => tab.dataset.file === fileName)) {
            setActiveTab(fileName);
            return;
        }

        //deactivate oter tabs
        tabsContainer.querySelectorAll('.vscode-tab').forEach(t => t.classList.remove('active'));

        //create new tab
        const tab = document.createElement('div');
        tab.className = 'vscode-tab active';
        tab.dataset.file = fileName;
        tab.innerHTML = `${fileName} <span class="close-tab">✖</span>`;
        tabsContainer.appendChild(tab);

        //show ediitor conotent 
        placeholder.style.display = 'none';
        editor.style.display = 'block';
        const data = vscodeFileContent[fileName];
        renderVSCodeFile(fileName);


        //tab click to activate
        tab.addEventListener('click', (e) => {
            if (e.target.classList.contains('close-tab')) return;
            setActiveTab(fileName);
        });
        //close tab
        tab.querySelector('.close-tab').addEventListener('click', (e) => {
            e.stopPropagation();
            tab.remove();
            //activate last tab if any
            const remainingTabs = tabsContainer.querySelectorAll('.vscode-tab');
            if (remainingTabs.length > 0) {
                setActiveTab(remainingTabs[remainingTabs.length-1].dataset.file);
            } else {
                //no tabs left
                editor.style.display = 'none';
                placeholder.style.display = 'block';
            }
        });

        function setActiveTab(name) {
            tabsContainer.querySelectorAll('.vscode-tab').forEach(t => t.classList.remove('active'));
            const activeTab = [...tabsContainer.children].find(t => t.dataset.file === name);
            if (activeTab) activeTab.classList.add('active');
            renderVSCodeFile(name)
        }
    });
});



// photo file click
const previewOverlay = document.getElementById('photoPreview');
const previewImage = document.querySelector('.preview-image');
const previewText = document.querySelector('.preview-text');
const previewClose = document.querySelector('.preview-close');
const folderData = {
    family: {
        images: ['assets/photos/family1.jpg', 'assets/photos/family2.jpg', 'assets/photos/family3.jpg'],
        text: 'Me and My Dad'
    },
    debate: {
        images: ['assets/photos/debate1.jpg', 'assets/photos/debate2.jpg', 'assets/photos/debate3.jpg'],
        text: 'St. Nicks Speech and Debate 12/13/2025'
    },
    hobbies: {
            images: ['assets/photos/hobbies1.jpg', 'assets/photos/hobbies2.jpg', 'assets/photos/hobbies3.jpg'],
            text: 'I love eating good food'
    },
    travel: {
        images: ['assets/photos/travel1.jpg', 'assets/photos/travel2.jpg', 'assets/photos/travel3.jpg'],
        text: 'My Japan Trip April 2025'
    }
};
let currentPhotos = [];
let currentIndex = 0;
document.querySelectorAll('.photo-folder').forEach(folder => {
    folder.addEventListener("click", () => {
    const key = folder.dataset.folder;
    const data = folderData[key];
    currentPhotos = data.images;
    currentIndex = 0;

    previewImage.src = currentPhotos[currentIndex];
    previewText.textContent = data.text;
    previewOverlay.style.display = 'flex';
    });
});

// photo scroll buttons
document.querySelector('.photo-nav-btn.next').addEventListener('click', () => {
    if (!currentPhotos.length) return;
    currentIndex = (currentIndex + 1) % currentPhotos.length;
    previewImage.src = currentPhotos[currentIndex];
});

document.querySelector('.photo-nav-btn.prev').addEventListener('click', () => {
    if (!currentPhotos.length) return;
    currentIndex = (currentIndex - 1 + currentPhotos.length) % currentPhotos.length;
    previewImage.src = currentPhotos[currentIndex];
});
                
previewClose.addEventListener('click', () => {
    previewOverlay.style.display = 'none';
});

//music app stuff
const musicData = {
    "2023-2024": [
        {
            title: "Ember Skies",
            artist: "Kevin Day",
            type: "audio",
            cover: "assets/music/songs/song_covers/ember_skies.png",
            src: "assets/music/songs/2023-2024/Ember Skies_by_Kevin_Day.mp3"
        },
        {
            title: "Flying High",
            artist: "William Owens",
            type: "audio",
            cover: "assets/music/songs/song_covers/flying_high.png",
            src: "assets/music/songs/2023-2024/Flying Highk_by_William_Owens.mp3"
        },
        {
            title: "Joshua",
            artist: "Andrew Balent",
            type: "audio",
            cover: "assets/music/songs/song_covers/joshua.png",
            src: "assets/music/songs/2023-2024/Joshua_arr_Andrew_Balent.mp3"
        }
    ],
    "2024-2025": [
        {
            title: "Winter Winds",
            artist: "Randall Standridge",
            type: "audio",
            src: "assets/music/songs/2024-2025/(Audio) Winter_Winds_by_Randall_Standridge-1.m4a"
        },
        {
            title: "Ancient Voices",
            artist: "Michael Sweeney",
            type: "audio",
            src: "assets/music/songs/2024-2025/(Audio) Ancient_Voices_by_Michael_Sweeney-1.m4a"
        },
        {
            title: "The Tempest",
            artist: "Robert W Smith",
            type: "audio",
            src: "assets/music/songs/2024-2025/(Audio) The_Tempest_by_Robert_W_Smith-1.m4a"
        },
        {
            title: "Spitfire",
            artist: "William Owens",
            type: "audio",
            src: "assets/music/songs/2024-2025/(Audio) Spitfire_by_William_Owens-1.m4a"
        },
        {
            title: "A Song For Friends",
            artist: "Larry Daehn",
            type: "audio",
            src: "assets/music/songs/2024-2025/(Audio) A_Song_For_Friends_by_Larry_Daehn-1.m4a"
        },
        {
            title: "Blue Ridge Reel",
            artist: "Brian Balmages",
            type: "audio",
            src: "assets/music/songs/2024-2025/(Audio) Blue_Ridge_Reel_by_Brian_Balmages-1.m4a"
        }
    ],
    "2025-2026": [
        {
            title: "Jupiter",
            artist: "Gustav Holst",
            type: "audio",
            cover: "assets/music/songs/song_covers/jupiter.png",
            src: "assets/music/songs/2025-2026/Jupiter.mp3"
        },
        {
            title: "Mars",
            artist: "Gustav Holst",
            type: "audio",
            cover: "assets/music/songs/song_covers/mars.png",
            src: "assets/music/songs/2025-2026/Mars.mp3"
        },
        {
            title: "Sleigh Ride",
            artist: "Leroy Anderson",
            type: "audio",
            cover: "assets/music/songs/song_covers/sleigh_ride.png",
            src: "assets/music/songs/2025-2026/Sleigh Ride.mp3"
        }
    ],
    "Jazz": [
        {
            title: "Second Line",
            artist: "Paul Barbarin",
            type: "audio",
            src: "assets/music/songs/Jazz/(Audio) Second_Line_(Joe_Avery's_Blues)-1.m4a"
        },
        {
            title: "Blue Monk",
            artist: "Thelonious Monk",
            type: "audio",
            src: "assets/music/songs/Jazz/(Audio) Blue_Monk_by_Thelonious_Monk-1.m4a"
        },
        {
            title: "In a Mellotone",
            artist: "Duke Ellington",
            type: "audio",
            src: "assets/music/songs/Jazz/(Audio) In_a_Mellotone_by_Duke_Ellington-1.m4a"
        },
        {
            title: "So What",
            artist: "Miles Davis",
            type: "audio",
            src: "assets/music/songs/Jazz/(Audio) So_What_by_Miles_Davis-1.m4a"
        },
        {
            title: "Is That You?",
            artist: "Bryan Kidd",
            type: "audio",
            src: "assets/music/songs/Jazz/(Audio) Is_That_You_by_Bryan_Kidd-1.m4a"
        },
        {
            title: "Change Up",
            artist: "Carl Strommen",
            type: "audio",
            src: "assets/music/songs/Jazz/(Audio) Change_Up_by_Carl_Strommen-1.m4a"
        }
    ]
}
const musicArtist = document.getElementById("musicArtist");

let currentQueue = [];
let currentSongIndex = 0;
document.querySelectorAll(".playlist").forEach(p => {
    p.addEventListener("click", () => {
        const name = p.dataset.playlist;
        currentQueue = musicData[name];
        currentSongIndex = 0;
        renderDemo(currentQueue[0]);
        renderQueue();
    });
});

function renderQueue() {
    const ul = document.getElementById("queueList");
    ul.innerHTML = "";
    currentQueue.forEach((song, i) => {
        const li = document.createElement("li");
        li.textContent = song.title;
        li.onclick = () => {
            currentSongIndex = i;
            renderDemo(song);
        };
        ul.appendChild(li);
    });
}

const mediaContainer = document.getElementById("mediaContainer");
const musicTitle = document.getElementById("musicTitle");
let currentMedia = null;
function renderDemo(song) {
    mediaContainer.innerHTML = "";
    musicTitle.textContent = song.title;
    musicArtist.textContent = song.artist || "";
    playPauseBtn.textContent = "▶";
    if (currentMedia) {
        currentMedia.pause?.();
        currentMedia = null;
    }

    //if theres vid
    if (song.type === "audio") {
        const audio = document.createElement("audio");
        audio.src = song.src;
        audio.style.width = "100%";
        audio.controls = false;
        audio.preload = "metadata";
        mediaContainer.appendChild(audio);
        currentMedia = audio;
    }
    //if audio only (mp3)
    if (song.type === "audio") {
        const img = document.createElement("img");
        img.src = song.cover;
        img.style.width = "220px";
        img.style.borderRadius = "8px";
        img.style.marginBottom = "10px";
        const audio = document.createElement("audio");
        audio.src = song.src;
        audio.controls = false;
        audio.preload = "metadata";
        mediaContainer.appendChild(img);
        mediaContainer.appendChild(audio);
        currentMedia = audio;
    }
    currentMedia.addEventListener("loadedmetadata", () => {
        progress.value = 0;
    });
    currentMedia.addEventListener("timeupdate", () => {
        if (!currentMedia.duration) return;
        progress.value = (currentMedia.currentTime / currentMedia.duration) * 100;
    });
}

//progress drag bar
const progress = document.getElementById("musicProgress");
progress.addEventListener("input", () => {
    if (!currentMedia || !currentMedia.duration) return;
    currentMedia.currentTime = (progress.value / 100) * currentMedia.duration;
});

//buttons
const playPauseBtn = document.getElementById("playPause");
const rewindBtn = document.getElementById("rewind");
const forwardBtn = document.getElementById("forward");
playPauseBtn.addEventListener("click", () => {
    if (!currentMedia) return;
    if (currentMedia.paused) {
        currentMedia.play().catch(err => {
            console.log("playback blocked: ", err);
        });
        playPauseBtn.textContent = "⏸";
    } else {
        currentMedia.pause();
        playPauseBtn.textContent = "▶";
    }
});

rewindBtn.addEventListener("click", () => {
    if (!currentMedia) return;
    currentMedia.currentTime = Math.max(0, currentMedia.currentTime - 15);
});

forwardBtn.addEventListener("click", () => {
    if (!currentMedia) return;
    currentMedia.currentTime = Math.min(currentMedia.duration, currentMedia.currentTime + 15);
});
document.getElementById("prev").addEventListener("click", () => {
    if (!currentQueue.length) return;
    currentSongIndex = (currentSongIndex - 1 + currentQueue.length) % currentQueue.length;
    renderDemo(currentQueue[currentSongIndex]);
});

document.getElementById("next").addEventListener("click", () => {
    if (!currentQueue.length) return;
    currentSongIndex = (currentSongIndex + 1) % currentQueue.length;
    renderDemo(currentQueue[currentSongIndex]);
});