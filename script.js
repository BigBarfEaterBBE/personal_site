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
    currentIndex++;
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


//vscode file click
const tabsContainer = document.querySelector('.vscode-tabs');
const editor = document.querySelector('.vscode-file-content');
const placeholder = document.querySelector('.vscode-placeholder');
document.querySelectorAll('.vscode-file-list li').forEach(file => {
    file.addEventListener('click', () => {
        const fileName = file.textContent;
        //check if tab already open
        if ([...tabsConotainer.children].some(tab => tab.dataset.file === fileName)) {
            seetActiveTab(fileName);
            return;
        }

        //create new tab
        const tab = document.createElement('div');
        tab.className = 'vscode-tab active';
        tab.dataset.file = fileName;
        tab.innerHTML = `${fileName} <span class="close-tab">✖</span>`;
        //deactivate other tabs
        tabsContainer.querySelectorAll('.vscode-tab').forEach(t => t.classList.remove('active'));
        tabsContainier.appendChild(tab);
        //show ediitor conotent (placeholder)
        placeholder.style.display = 'none';
        editor.style.display = 'block';
        editor.textContent = `//Placeholder content for ${fileName}`;
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
            const activeTab = [...tabsContainer.children].findIndex(t => t.dataset.file === name);
            if (activeTab) activeTab.classList.add('active');
            editor.textContent = `//placeholder content for ${name}`
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