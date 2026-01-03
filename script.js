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
});
document.querySelector('.art-icon').addEventListener('click', () => {
    const popup = document.getElementById('artWindow');
    popup.style.display = 'flex';
    currentZIndex++;
    popup.style.zIndex = currentZIndex;
    loadArtwork(currentArtIndex);
});

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
    const musicWindow = document.getElementById("musicWindow");
    musicWindow.style.display = "none";
    if (currentMedia) {
        currentMedia.pause();
        currentMedia.currentTime = 0; //reset music progress
    }
}
function closeArt(e) {
    e.stopPropagation();
    document.getElementById('artWindow').style.display = 'none';
}

//vscode file content
const vscodeFileContent = {
    "Anki Enforcer": {
        demo: `
            <div class="vscode-video-wrapper">
                <iframe
                    src="https://www.youtube.com/embed/5T0wH930keY?rel=0"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    loading="lazy"
                    allowfullscreen>
                </iframe>
            </div>
        `,
        description: "I made a Google chrome extension to shutdown the user's browser every few minutes and force them to study their Anki flashcards. It works by using Anki Connect in order to connect with the user's Anki deck information.",
        learned: "Through this project, I learned a lot about creating a chrome extension and how they work, such as using a service worker. I also learned how to use an API like Anki Connect and this was my first experience using HTML to create a website, using cascading style sheets to design a webpage, and using javascript."
    },
    "Posture Detector": {
        demo: `
            <div class="vscode-video-wrapper">
                <iframe
                    src="https://www.youtube.com/embed/Ru3O4oCLbvk?rel=0"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    loading="lazy"
                    allowfullscreen>
                </iframe>
            </div>
        `,
        description: "This was the first project I ever created by myself. It takes input from a camera and detects whether the user's posture is good or bad. I used CV2 to access the camera and take photos, MediaPipe to extract the joints from the photos, and RandomForest classifier to serve as the classifier.",
        learned: "I had previous experience coding in Python, but this project taught me how to use Python libraries such as MediaPipe and CV2, along with introducing me to various machine learning models such as RandomForest classifier."
    },
    "Ticketmaster Trainer": {
        demo: `
            <div class="vscode-video-wrapper">
                <iframe
                    src="https://www.youtube.com/embed/UMD-AODqu20?rel=0"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    loading="lazy"
                    allowfullscreen>
                </iframe>
            </div>
        `,
        description: "This is another game I made in Godot. The point of the game is a meme of how hard it is to get good seats on Ticketmaster, so the user needs to select the highlighted seats as quickly as possible. I made this in Godot game engine",
        learned: "Creating this taught me a lot about scene management (managing different game screens), such as levels, intro screens, and popups in Godot "
    },
    "Zeroni Dressup Game": {
        demo: `
            <div class="vscode-video-wrapper">
                <iframe
                    src="https://www.youtube.com/embed/BIHZ9pxZTZo?rel=0"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    loading="lazy"
                    allowfullscreen>
                </iframe>
            </div>
        `,
        description: "I created a dressup game for Zeronis, animal characters of my favorite band. The program I used was a game engine called Godot.",
        learned: "This was my first time ever using Godot or creating a video game so I learned a lot about how to code in GDScript, how to create assets, and manage user input."
    },
    "Portfolio Website": {
        demo: `
            <p> you're on the demo right now! </p>
        `,
        description: "This is my most recent project, and the one you're looking at right now! I designed and coded a website to showcase more about myself. I didn't want it to seem like plain so I designed it with a computer-like interface.",
        learned: "I had some previous experience working with webpages in the Anki Enforcer project, but desiging my own webpage forced me to learn a lot more about style sheets and handling user input. Overall, I think this was the most challenging thing I've ever made because it taught me a lot about handling user events, playing media, and styling my webpage."
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
        images: ['assets/photos/family1.jpg', 'assets/photos/family2.jpg'],
        text: 'I love spending time with my dad, grandma, and my dog Fudgie. We usually go hiking, play board games, or cook good food together.'
    },
    debate: {
        images: ['assets/photos/debate1.jpg', 'assets/photos/debate2.jpg', 'assets/photos/debate3.jpg'],
        text: 'I have been competing on the Boston Latin School speech and debate team for the past three years. I have also finaled at the local and state level along with competing at the national level.'
    },
    hobbies: {
            images: ['assets/photos/hobbies1.jpg', 'assets/photos/hobbies2.jpg', 'assets/photos/hobbies3.jpg'],
            text: 'Some of my hobbiese are fixing cars with my dad, home improvement, or eating good food (not sure if that is a hobbie). Having things to do beside school in my downtime really help me relax and recharge.'
    },
    travel: {
        images: ['assets/photos/travel1.jpg', 'assets/photos/travel2.jpg', 'assets/photos/travel3.jpg'],
        text: 'I enjoy traveling around the world. Getting the opportunity to travel, really immerses me within the culture and atmosphere of other countries, whether it be historical landmarks, culturally important food, or just walking walking around the city. Traveling has really expanded my world view and awareness of other nations beside the U.S.'
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
    "2025-2026": [
        {
            title: "Jupiter",
            artist: "Gustav Holst",
            type: "audio",
            cover: "assets/music/songs/song_covers/jupiter.png",
            src: "assets/music/songs/2025-2026/Jupiter(1).mp3"
        },
        {
            title: "Mars",
            artist: "Gustav Holst",
            type: "audio",
            cover: "assets/music/songs/song_covers/mars.png",
            src: "assets/music/songs/2025-2026/Mars(1).mp3"
        },
        {
            title: "Sleigh Ride",
            artist: "Leroy Anderson",
            type: "audio",
            cover: "assets/music/songs/song_covers/sleigh_ride.png",
            src: "assets/music/songs/2025-2026/sleight_ride.mp3"
        }
    ],
    "2024-2025": [
        {
            title: "Winter Winds",
            artist: "Randall Standridge",
            type: "audio",
            cover: "assets/music/songs/song_covers/winter_winds.png",
            src: "assets/music/songs/2024-2025/(Audio) Winter_Winds_by_Randall_Standridge-1.mp3"
        },
        {
            title: "Ancient Voices",
            artist: "Michael Sweeney",
            type: "audio",
            cover: "assets/music/songs/song_covers/ancient_voices.png",
            src: "assets/music/songs/2024-2025/(Audio) Ancient_Voices_by_Michael_Sweeney-1.mp3"
        },
        {
            title: "The Tempest",
            artist: "Robert W Smith",
            type: "audio",
            cover: "assets/music/songs/song_covers/the_tempest.png",
            src: "assets/music/songs/2024-2025/(Audio) The_Tempest_by_Robert_W_Smith-1.mp3"
        },
        {
            title: "Spitfire",
            artist: "William Owens",
            type: "audio",
            cover: "assets/music/songs/song_covers/spitfire.png",
            src: "assets/music/songs/2024-2025/(Audio) Spitfire_by_William_Owens-1.mp3"
        },
        {
            title: "A Song For Friends",
            artist: "Larry Daehn",
            type: "audio",
            cover: "assets/music/songs/song_covers/a_song_for_friends.png",
            src: "assets/music/songs/2024-2025/(Audio) A_Song_For_Friends_by_Larry_Daehn-1.mp3"
        },
        {
            title: "Blue Ridge Reel",
            artist: "Brian Balmages",
            type: "audio",
            cover: "assets/music/songs/song_covers/blue_ridge_reel.png",
            src: "assets/music/songs/2024-2025/(Audio) Blue_Ridge_Reel_by_Brian_Balmages-1.mp3"
        }
    ],
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
    "Jazz": [
        {
            title: "Second Line",
            artist: "Paul Barbarin",
            type: "audio",
            cover: "assets/music/songs/song_covers/second_line.png",
            src: "assets/music/songs/Jazz/(Audio) Second_Line_(Joe_Avery's_Blues)-1.mp3"
        },
        {
            title: "Blue Monk",
            artist: "Thelonious Monk",
            type: "audio",
            cover: "assets/music/songs/song_covers/blue_monk.png",
            src: "assets/music/songs/Jazz/(Audio) Blue_Monk_by_Thelonious_Monk-1.mp3"
        },
        {
            title: "In a Mellotone",
            artist: "Duke Ellington",
            type: "audio",
            cover: "assets/music/songs/song_covers/mellotone.png",
            src: "assets/music/songs/Jazz/(Audio) In_a_Mellotone_by_Duke_Ellington-1.mp3"
        },
        {
            title: "So What",
            artist: "Miles Davis",
            type: "audio",
            cover: "assets/music/songs/song_covers/so_what.png",
            src: "assets/music/songs/Jazz/(Audio) So_What_by_Miles_Davis-1.mp3"
        },
        {
            title: "Is That You?",
            artist: "Bryan Kidd",
            type: "audio",
            cover: "assets/music/songs/song_covers/is_that_you.png",
            src: "assets/music/songs/Jazz/(Audio) Is_That_You_by_Bryan_Kidd-1.mp3"
        },
        {
            title: "Change Up",
            artist: "Carl Strommen",
            type: "audio",
            src: "assets/music/songs/Jazz/(Audio) Change_Up_by_Carl_Strommen-1.mp3"
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
        document.getElementById("musicControls").classList.remove("hidden");
        progress.classList.remove("hidden");
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
    if (currentMedia) {
        currentMedia.pause();
        currentMedia.currentTime = 0;
        currentMedia = null;
    }
    if (song.cover) {
        const img = document.createElement("img");
        img.src = song.cover;
        img.style.width = "220px";
        img.style.borderRadius = "8px";
        img.style.marginBottom = "10px";
        mediaContainer.appendChild(img)
    }
    const audio = document.createElement("audio");
    audio.src = song.src;
    audio.preload = "metadata";
    audio.controls = false;
    mediaContainer.appendChild(audio);
    currentMedia = audio;
    progress.value = 0;
    audio.addEventListener("loadedmetadata", () => {
        progress.value = 0;
    });
    audio.addEventListener("timeupdate", () => {
        if (!audio.duration) return;
        progress.value = (audio.currentTime / audio.duration) * 100;
    });
    audio.play().then(() => {
        playPauseBtn.textContent = "⏸";
    }).catch(() => {
        playPauseBtn.textContent = "▶";
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
        currentMedia.play()
        
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

function updateProgressUI() {
    if (!currentMedia || !currentMedia.duration) return;
    progress.value = (currentMedia.currentTime / currentMedia.duration) * 100;
}


//art app
const artworks = [
    "assets/art/69248656661__E8BA3948-A0BC-4577-93F6-D728C4834239.jpeg",
    "assets/art/69309196614__F1E72D9C-8199-4765-A46A-720FA0A2B0FA.jpeg",
    "assets/art/IMG_0859.jpeg",
    "assets/art/IMG_9275.jpeg",
    "image (1).png"
];
let currentArtIndex = 0;
const artProgress = {}; // store img data
const canvas = document.getElementById("scratchCanvas");
const ctx = canvas.getContext("2d");
const img = document.getElementById("artImage");
const artInitialized = {};
let isDrawing = false;
let brushSize = 20;
let canvasScale = 1;
const prevArrow = document.getElementById("artPrev");
const nextArrow = document.getElementById("artNext");

function updateArrows(force = false) {
    const revealedEnough = force || getRevealPercent() > 0.8;
    prevArrow.classList.toggle("show", revealedEnough && currentArtIndex > 0);
    nextArrow.classList.toggle("show", revealedEnough && currentArtIndex < artworks.length - 1);
}

nextArrow.addEventListener("click", () => {
    if (currentArtIndex < artworks.length - 1) {
        loadArtwork(currentArtIndex + 1);
    }
});

prevArrow.addEventListener("click", () => {
    if (currentArtIndex > 0) {
        loadArtwork(currentArtIndex - 1);
    }
});

function loadArtwork(index) {
    //save current progress only if art was init
    if (artInitialized[currentArtIndex]) {
        artProgress[currentArtIndex] = ctx.getImageData(0,0,canvas.width, canvas.height);
    }
    currentArtIndex = index;
    prevArrow.classList.remove("show");
    nextArrow.classList.remove("show");

    img.src = artworks[currentArtIndex];
    
    img.onload = () => {
        const rect = img.getBoundingClientRect();
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        canvas.style.width = rect.width + "px";
        canvas.style.height = rect.height + "px";
        canvasScale = rect.width / canvas.width;
        ctx.globalCompositeOperation = "source-over";

        //restore progress if existing
        if (artProgress[currentArtIndex]) {
            ctx.putImageData(artProgress[currentArtIndex], 0, 0);
        } else {
            //first time
            ctx.fillStyle = "white";
            ctx.fillRect(0,0,canvas.width, canvas.height);
            artInitialized[currentArtIndex] = true;
        }
        updateArrows();
    };
}

function getRevealPercent() {
    const imageData = ctx.getImageData(0,0,canvas.width,canvas.height).data;
    let transparent = 0;
    for (let i = 3; i< imageData.length; i += 4) {
        if (imageData[i] === 0) transparent++;
    }
    return transparent / (imageData.length / 4);
}

//art toolbar
document.querySelectorAll(".art-toolbar button[data-size]").forEach(btn => {
    btn.addEventListener("click", () => {
        brushSize = Number(btn.dataset.size);
    });
});
function resetArt() {
    resizeArtCanvas();
}


//art mouse events
canvas.addEventListener("mousedown", () => isDrawing = true);
canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mouseleave", () => isDrawing = false);

canvas.addEventListener("mousemove", (e) => {
    if (!isDrawing) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x,y,brushSize,0,Math.PI * 2);
    ctx.fill();

    //check reveal progress
    if (getRevealPercent() > 0.8) {
        updateArrows(true);
    }
});

//brush preview
const brushCursor = document.getElementById("brushCursor");
canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    brushCursor.style.left = (e.clientX - rect.left) + "px";
    brushCursor.style.top = (e.clientY - rect.top) + "px";

    //scale cursor
    const screenRadius = brushSize * canvasScale;
    brushCursor.style.width = screenRadius * 2 + "px";
    brushCursor.style.height = screenRadius * 2 + "px";
});
canvas.addEventListener("mouseenter", () => {
    brushCursor.style.display = "block";
});
canvas.addEventListener ("mouseleave", () => {
    brushCursor.style.display = "none";
});