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
            <video controls width="90%">
                <source src="placeholder" type="video/mp4">
            </video>
        `,
        description: "67",
        learned: "..."
    },
    "Posture Detector": {
        demo: `
            <video controls width="90%">
                <source src="placeholder" type="video/mp4">
            </video>
        `,
        description: "89",
        learned: "..."
    },
    "Ticketmaster Trainer": {
        demo: `
            <video controls width="90%">
                <source src="placeholder" type="video/mp4">
            </video>
        `,
        description: "10",
        learned: "..."
    },
    "Zeroni Dressup Game": {
        demo: `
            <video controls width="90%">
                <source src="placeholder" type="video/mp4">
            </video>
        `,
        description: "11",
        learned: "..."
    },
    "Portfolio Website": {
        demo: `
            <video controls width="90%">
                <source src="placeholder" type="video/mp4">
            </video>
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
const player = document.getElementById("musicPlayer");
const titleEl = document.getElementById("musicTitle");
const musicData = {
    "2023-2024": [
        {
            title: "song1",
            artist: "artist1",
            src: "source1"
        },
        {
            title: "song2",
            artist: "artist2",
            src: "source2"
        }
    ],
    "2024-2025": [
        {
            title: "song1",
            artist: "artist1",
            src: "source1"
        },
        {
            title: "song2",
            artist: "artist2",
            src: "source2"
        }
    ],
    "2025-2026": [
        {
            title: "song1",
            artist: "artist1",
            src: "source1"
        },
        {
            title: "song2",
            artist: "artist2",
            src: "source2"
        }
    ]
}

let currentQueue = [];
let currentSongIndex = 0;
document.querySelectorAll(".playlist").forEach(p => {
    p.addEventListener("click", () => {
        const name = p.dataset.playlist;
        currentQueue = musicData[name];
        currentSongIndex = 0;
        loadSong(currentQueue[0]);
        renderQueue();
    });
});

function loadSong(song) {
    player.src = song.src;
    titleEl.textContent = song.title;
    artistEl.textContent = song.artist;
    player.play();
}

function renderQueue() {
    const ul = document.getElementById("queueList");
    ul.innerHTML = "";
    currentQueue.forEach((song, i) => {
        const li = document.createElement("li");
        li.textContent = song.title;
        li.onclick = () => {
            currentSongIndex = i;
            loadSong(song);
        };
        ul.appendChild(li);
    });
}