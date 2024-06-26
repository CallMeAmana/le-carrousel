// Variables globales
const images = [
    'images/img1.jpg', 'images/img6.jpg', 'images/img3.jpg', 'images/img4.jpg', 
    'images/img7.jpg', 'images/img1black.jpg', 'images/img6black.jpg', 'images/img3black.jpg', 
    'images/img4black.jpg', 'images/img7black.jpg',
];
const titles = [
    'Blueberry Moon 1', 'Stairy red night 2', 'Mysterious night 3', 'icelandic view 4', 
    'Green night 5', 'Black Moon 6', 'Stairy black night 7', 'Mysterious black night 8', 
    'icelandic black view 9', 'Black night 10'
];
const thumbnailsPerPage = 5;
let currentIndex = 0;
let isPlaying = false;
let isRandomPlaying = false;
let timerId;
let currentPage = 0;

// Sélecteurs DOM
const displayedImg = document.querySelector('figure img');
const figcaption = document.querySelector('figure figcaption');
const thumbnailsContainer = document.getElementById('thumbnails');
const playPauseButton = document.querySelector('#playPause');
const randomButton = document.querySelector('#random');
const toolbar = document.querySelector('#toolbar');
const arrowIcon = document.getElementById('arrowIcon');

// Fonctions

function showImage(index) {
    const currentImg = displayedImg.cloneNode(); // Clone the current image
    currentImg.src = images[currentIndex];
    currentImg.alt = titles[currentIndex];
    currentImg.classList.add('fade-out');
    displayedImg.parentNode.insertBefore(currentImg, displayedImg);

    // On animation end, remove the old image
    currentImg.addEventListener('animationend', () => {
        currentImg.remove();
    });

    // Set up the new image
    displayedImg.src = images[index];
    displayedImg.alt = titles[index];
    figcaption.textContent = titles[index];
    currentIndex = index;

    // Apply the fade-in animation
    displayedImg.classList.add('fade-in');
    displayedImg.addEventListener('animationend', () => {
        displayedImg.classList.remove('fade-in');
    });

    // Calculer la page actuelle à partir de l'index de l'image
    const newPage = Math.floor(currentIndex / thumbnailsPerPage);
    if (newPage !== currentPage) {
        currentPage = newPage;
        showThumbnails();
    }

    // Mise à jour de l'apparence des miniatures
    const thumbnails = thumbnailsContainer.querySelectorAll('img');
    thumbnails.forEach((thumbnail, idx) => {
        thumbnail.classList.toggle('active', idx === index % thumbnailsPerPage);
    });
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

    if (currentIndex === images.length - 1) {
        
        randomIndex = Math.floor(Math.random() * (images.length - 1));
    } else {
        
        randomIndex = Math.floor(Math.random() * (images.length - (currentIndex + 1))) + (currentIndex + 1);
    }

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
// Basculer la lecture/pause aléatoire des images
function toggleRandomPlayPause() {
    if (isRandomPlaying) {
        clearInterval(timerId);
        randomButton.innerHTML = '<i class="fas fa-random"></i>';
    } else {
        timerId = setInterval(showRandomImage, 2000);
        randomButton.innerHTML = '<i class="fas fa-stop"></i>';
    }
    isRandomPlaying = !isRandomPlaying;
    isPlaying = false;
    playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
}

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

function showThumbnails() {
    const start = currentPage * thumbnailsPerPage;// Calculer l'indice de départ pour les miniatures
    const end = start + thumbnailsPerPage;// Calculer l'indice de fin pour les miniatures
    const thumbnailsDiv = thumbnailsContainer.querySelector('.cadre');
    thumbnailsDiv.innerHTML = '';// Effacer les miniatures existantes

    for (let i = start; i < end && i < images.length; i++) {
        const img = document.createElement('img');
        img.src = images[i];
        img.alt = titles[i];// Définir le texte alternatif de l'image
        img.addEventListener('click', () => showImage(i));// Ajouter un écouteur d'év
        thumbnailsDiv.appendChild(img);// Ajouter l'image au conteneur des miniatures
    }

    // Mise à jour de l'apparence des miniatures
    const thumbnails = thumbnailsDiv.querySelectorAll('img');
    thumbnails.forEach((thumbnail, idx) => {
        thumbnail.classList.toggle('active', start + idx === currentIndex);
    });
}

function showPrevPage() {
    if (currentPage > 0) {
        currentPage--;
        showThumbnails();
    }
}

function showNextPage() {
    if ((currentPage + 1) * thumbnailsPerPage < images.length) {
        currentPage++;
        showThumbnails();
    }
}

// Initialisation
toolbar.style.display = 'none';
thumbnailsContainer.style.display = 'flex';
showImage(currentIndex);
changeArrowDirection();
showThumbnails();

// Gestionnaires d'événements
document.querySelector('#toggleToolbar').addEventListener('click', toggleToolbarVisibility);
document.querySelector('#prev').addEventListener('click', showPrevImage);
document.querySelector('#playPause').addEventListener('click', togglePlayPause);
document.querySelector('#next').addEventListener('click', showNextImage);
document.querySelector('#random').addEventListener('click', toggleRandomPlayPause);
document.querySelector('#prevPage').addEventListener('click', showPrevPage);
document.querySelector('#nextPage').addEventListener('click', showNextPage);

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case ' ':
            event.preventDefault();
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
