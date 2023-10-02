// lightBox.js

import { photographerMedia } from "../pages/photographer.js";
import { photographer } from "../pages/photographer.js";
import lockFocus from "./lockFocus.js";

// Sélectionnez les éléments de la lightbox
const lightbox = document.getElementById("works-lightbox");
const closeLightboxIcon = document.querySelector(".close-lightbox-icon");
const leftArrowLightbox = document.querySelector(".left-arrow-lightbox");
const rightArrowLightbox = document.querySelector(".right-arrow-lightbox");
const lightboxMedia = document.getElementById("works-lightbox-media");
const lightboxName = document.getElementById("works-lightbox-name");

// Créez une variable pour suivre l'index de l'image ou de la vidéo actuellement affichée
let currentMediaIndex = 0;

//On cible notre body pour pouvoir le manipuler lors d'évènements
const body = document.querySelector("body");

let previouslyFocusedElement = null;

// Ouvrir la lightbox lorsque on clique sur une miniature
function openLightbox(index, mediaUrl, mediaName) {
  currentMediaIndex = index;
  displayMediaInLightbox(mediaUrl, mediaName);

  previouslyFocusedElement = document.activeElement;

  const firstFocusableElement = lightbox.querySelector("button:first-of-type");

  lightbox.setAttribute("aria-hidden", "false");
  //Quand on ouvre la lightBox, cela créer une class à notre body(pouvoir cacher le scroll via le css)
  body.classList.add("lightboxOpen");
  lockFocus(lightbox);

  firstFocusableElement.focus();
}

// Fermer la lightbox lorsque on clique sur l'icône de fermeture
closeLightboxIcon.addEventListener("click", () => {
  lightbox.setAttribute("aria-hidden", "true");
  if (previouslyFocusedElement) {
    previouslyFocusedElement.focus();
  }
  //La même chose mais ici on l'enlève lorsqu'on ferme la lighBox
  body.removeAttribute("class");
});

// Afficher l'image ou la vidéo actuelle dans la lightbox
function displayMediaInLightbox(mediaUrl, mediaName) {
  lightboxMedia.innerHTML = ""; // Nettoyez le contenu précédent

  if (mediaUrl.endsWith(".3g2")) {
    // Si c'est une vidéo
    const mediaVideo = document.createElement("video");
    mediaVideo.src = mediaUrl;
    mediaVideo.controls = true;
    mediaVideo.preload = "auto";
    lightboxMedia.appendChild(mediaVideo);
  } else if (mediaUrl.endsWith(".webp")) {
    // Si c'est une image
    const mediaImage = document.createElement("img");
    mediaImage.src = mediaUrl;
    mediaImage.alt = mediaName;
    lightboxMedia.appendChild(mediaImage);
  }

  // Ajoutez le nom de l'image ou de la vidéo sous le contenu à gauche
  lightboxName.textContent = mediaName;
}

function nextImage() {
  currentMediaIndex = (currentMediaIndex + 1) % photographerMedia.length;
  const media = photographerMedia[currentMediaIndex];
  if (media.video) {
    // Si c'est une vidéo, ouvrez la lightbox avec la vidéo
    displayMediaInLightbox(
      `assets/medias/${photographer.name}/${media.video}`,
      media.title
    );
  } else {
    // Sinon, ouvrez la lightbox avec l'image
    displayMediaInLightbox(
      `assets/medias/${photographer.name}/${media.image}`,
      media.title
    );
  }
}

function prevImage() {
  currentMediaIndex =
    (currentMediaIndex - 1 + photographerMedia.length) %
    photographerMedia.length;
  const media = photographerMedia[currentMediaIndex];
  if (media.video) {
    // Si c'est une vidéo, ouvrez la lightbox avec la vidéo
    displayMediaInLightbox(
      `assets/medias/${photographer.name}/${media.video}`,
      media.title
    );
  } else {
    // Sinon, ouvrez la lightbox avec l'image
    displayMediaInLightbox(
      `assets/medias/${photographer.name}/${media.image}`,
      media.title
    );
  }
}

// Gérer la navigation entre les images ou vidéos
leftArrowLightbox.addEventListener("click", () => {
  prevImage();
});

rightArrowLightbox.addEventListener("click", () => {
  nextImage();
});

// NAVIGATION VIA LES FLECHES DU CLAVIER
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") {
    prevImage();
  } else if (e.key === "ArrowRight") {
    nextImage();
  }
});

export { openLightbox };
