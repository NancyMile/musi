document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

function initApp() {
    createGallery();
}

function createGallery() {
    const gallery = document.querySelector('.images-gallery');
    for (let i = 1; i <= 12; i++) {

        const image = document.createElement('picture');
        image.innerHTML = `
            <source srcset="build/img/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
            <img  loading="lazy" width="200" height ="300" src="build/img/thumb/${i}.jpg" alt="image gallery" />
        `;
        image.onclick = function () {
            displayImage(i);
        }

        gallery.appendChild(image);
    }
}

function displayImage(id) {
    const image = document.createElement('picture');
        image.innerHTML = `
            <source srcset="build/img/grande/${id}.avif" type="image/avif">
            <source srcset="build/img/grande/${id}.webp" type="image/webp">
            <img  loading="lazy" width="200" height ="300" src="build/img/grande/${id}.jpg" alt="image gallery" />
        `;

    //create div for image
    const overlay = document.createElement('DIV');
    overlay.appendChild(image);
    overlay.classList.add('overlay');
    overlay.onclick = function () {
        const body = document.querySelector('body');
        body.classList.remove('fixed-body');
        overlay.remove();
    }


    //button to close the modal
    const closeModal = document.createElement('P');
    closeModal.textContent = 'x';
    closeModal.classList.add('btn-close');
    closeModal.onclick = function () {
        const body = document.querySelector('body');
        body.classList.remove('fixed-body');
        overlay.remove();
    }
    overlay.appendChild(closeModal);


    //append image to html
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fixed-body');
}