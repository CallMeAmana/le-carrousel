// Variables globales
const images = ['images/img1.jpg', 'images/img6.jpg', 'images/img3.jpg', 'images/img4.jpg', 'images/img7.jpg'];
const titles = ['Blueberry Moon ', 'Stairy red night', 'Mysterious night', 'icelandic view', 'Green night'];

let currentIndex = 0;
let isPlaying = false;
let timerId;

// Sélecteurs DOM
const displayedImg = document.querySelector('figure img');
const figcaption = document.querySelector('figure figcaption');
const thumbnails = document.querySelectorAll('#thumbnails img');
const playPauseButton = document.querySelector('#playPause');
const toolbar = document.querySelector('#toolbar');
const thumbnailsContainer = document.getElementById('thumbnails');
const arrowIcon = document.getElementById('arrowIcon');

// Fonctions
function showImage(index) {
    displayedImg.src = images[index];
    displayedImg.alt = titles[index];
    figcaption.textContent = titles[index];
    thumbnails.forEach((thumb, idx) => {
        thumb.classList.toggle('active', idx === index);
    });
    currentIndex = index;
}

function showPrevImage() {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(newIndex);
}

function showNextImage() {
    const newIndex = (currentIndex + 1) % images.length;
    showImage(newIndex);
}

function showRandomImage() {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * images.length);
    } while (randomIndex === currentIndex);
    showImage(randomIndex);
}

function togglePlayPause() {
    if (isPlaying) {
        clearInterval(timerId);
        playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        timerId = setInterval(showNextImage, 2000);
        playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isPlaying = !isPlaying;
}


// Fonction pour changer la direction de la flèche en fonction de la visibilité de la barre d'outils
function changeArrowDirection() {
    arrowIcon.classList.toggle('fa-arrow-right', toolbar.style.display === 'none');
    arrowIcon.classList.toggle('fa-arrow-down', toolbar.style.display !== 'none');
}

function toggleToolbarVisibility() {
    const isToolbarHidden = toolbar.style.display === 'none';
    toolbar.style.display = isToolbarHidden ? 'flex' : 'none';
    thumbnailsContainer.style.display = isToolbarHidden ? 'none' : 'flex';
    changeArrowDirection();
}

// Initialisation
toolbar.style.display = 'none'; // Masquer la barre d'outils au début
thumbnailsContainer.style.display = 'flex'; // Afficher les miniatures par défaut
showImage(currentIndex);
changeArrowDirection();

// Gestionnaires d'événements
document.querySelector('#toggleToolbar').addEventListener('click', toggleToolbarVisibility);
document.querySelector('#prev').addEventListener('click', showPrevImage);
document.querySelector('#playPause').addEventListener('click', togglePlayPause);
document.querySelector('#next').addEventListener('click', showNextImage);
document.querySelector('#random').addEventListener('click', showRandomImage);

document.querySelector('#prevPage').addEventListener('click', () => {
    showPrevImage();
});

document.querySelector('#nextPage').addEventListener('click', () => {
    showNextImage();
});

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case ' ':
            event.preventDefault(); // Empêcher le défilement de la page
            togglePlayPause();
            break;
        case 'ArrowLeft':
            showPrevImage();
            break;
        case 'ArrowRight':
            showNextImage();
            break;
    }
});
