// Importez les modules nécessaires
import { textsBase } from "../templates/textsBase.js";
import { createMediaElement } from "../factory/dataFactory.js";
import { displayModal } from "../utils/contactForm.js";
import { openLightbox } from "../utils/lightBox.js";

// Fonction pour obtenir le paramètre 'id' de l'URL
function getPhotographerId() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  return urlSearchParams.get("id");
}

// Fonction pour créer un élément d'icône de cœur
function createHeartIcon(liked) {
  const heartIcon = document.createElement("i");
  heartIcon.classList.add("fa-heart");
  if (liked) {
    heartIcon.classList.add("fas"); // Ajoutez la classe "fas" pour le cœur rempli
  } else {
    heartIcon.classList.add("far"); // Ajoutez la classe "far" pour le cœur vide
  }
  return heartIcon;
}
// // DROPDOWN SECTION
let data;
function dropDown(data) {
  const arrowOpen = document.getElementsByClassName("sort-btn");
  const arrowClose = document.getElementsByClassName("arrow-up-close");
  const hiddenSort = document.getElementsByClassName("hidden-sort");
  if (arrowOpen.length > 0) {
    arrowOpen[0].addEventListener("click", () => {
      hiddenSort[0].style.display = "block";
      mediaGrid.style.margin = "170px 100px 0 100px";
    });
  }

  if (arrowClose.length > 0) {
    arrowClose[0].addEventListener("click", () => {
      hiddenSort[0].style.display = "none";
      mediaGrid.style.margin = "101px 100px 0 100px";
    });
  }
}
dropDown(data);

// On tire notre main pour pouvoir intégrer nos élements dans le DOM
const mainPage = document.getElementById("main");

// Sélectionnez l'élément HTML où vous voulez afficher les informations du photographe
const photographerHeader = document.querySelector(".photograph-header");

// Créez des divs dans notre espace grid
const headerCol1 = document.createElement("div");
headerCol1.classList.add("col1");
const headerCol2 = document.createElement("div");
headerCol2.classList.add("col2");
const headerCol3 = document.createElement("div");
headerCol3.classList.add("col3");
// Ajoutez ces divs à la structure HTML
photographerHeader.appendChild(headerCol1);
photographerHeader.appendChild(headerCol2);
photographerHeader.appendChild(headerCol3);

const buttonModal = document.querySelector(".contact_button");

//TOTAL LIKES SECTION

// Créez un élément pour afficher le nombre total de likes
const totalLikesElement = document.createElement("p");
totalLikesElement.classList.add("total-likes");
totalLikesElement.textContent = "0"; // Initialisez à zéro

const totalLikesHeartIcon = document.createElement("div");
totalLikesHeartIcon.classList.add("totalLikes-heartIcon-container");

// Ajoutez l'encart au corps de la page
const priceLikesContainer = document.createElement("div");

let photographerId;

// Utilisez fetch pour charger le fichier JSON des photographes
fetch("../../data/photographers.json")
  .then((response) => response.json())
  .then((photographersData) => {
    // Obtenez l'ID du photographe à partir de l'URL
    photographerId = parseInt(getPhotographerId(), 10);
    // Recherchez le photographe correspondant dans les données
    const photographer = photographersData.photographers.find(
      (photographer) => photographer.id === photographerId
    );
    // Vérifiez si le photographe a été trouvé
    if (photographer) {
      buttonModal.addEventListener("click", () => {
        displayModal(photographer.name);
      });

      // Utilisez textsBase pour générer tous les éléments
      const photographerNameElement = textsBase(
        photographer,
        "photographerName",
        "h1",
        { fontSize: "55px", margin: "0" }
      );
      const photographerCityElement = textsBase(
        photographer,
        "photographerCity",
        null,
        { fontSize: "24px" }
      );
      const photographerTaglineElement = textsBase(
        photographer,
        "photographerTagLine",
        null,
        { fontSize: "18px", margin: "19px 0 0" }
      );
      const photographerImageElement = textsBase(
        photographer,
        "photographerImage"
      );
      const contactButton = document.querySelector(".contact_button");

      // Ajoutez ces éléments aux divs correspondantes
      headerCol1.appendChild(photographerNameElement);
      headerCol1.appendChild(photographerCityElement);
      headerCol1.appendChild(photographerTaglineElement);
      headerCol2.appendChild(contactButton);
      headerCol3.appendChild(photographerImageElement);

      // Appel de la fonction pour charger les médias du photographe
      loadPhotographerMedia(photographerId);

      // Utilisez la fonction textsBase pour créer l'élément texte avec le tarif journalier
      const dailyPriceElement = textsBase(
        photographer,
        "photographerPrice",
        null,
        { fontSize: "24px", color: "#000", fontWeight: "500" }
      );

      const encartHeartIcon = document.createElement("i");
      encartHeartIcon.classList.add("fa-heart", "fas");

      // Ajoutez cet élément à l'encart
      totalLikesHeartIcon.appendChild(totalLikesElement);
      totalLikesHeartIcon.appendChild(encartHeartIcon);
      priceLikesContainer.appendChild(totalLikesHeartIcon);

      // Ajoutez cet élément texte à l'encart
      priceLikesContainer.appendChild(dailyPriceElement);

      // Ajoutez des classes CSS pour le formattage
      priceLikesContainer.classList.add("price-likes-container");
      dailyPriceElement.classList.add("daily-price");

      // Ajoutez l'encart au corps de la page
      document.body.appendChild(priceLikesContainer);
    } else {
      console.error("Le photographe n'a pas été trouvé.");
    }
  })
  .catch((error) => {
    console.error(
      "Une erreur s'est produite lors du chargement des données :",
      error
    );
  });

// on crée un conteneur pour les médias
const mediaGrid = document.createElement("div");
mediaGrid.classList.add("media-grid");
// On ajoute le conteneur à notre page
mainPage.appendChild(mediaGrid);

let photographerMedia = [];
console.log("photographerMedia initialisé : ", photographerMedia);
let photographer = [];
let totalLikes = 0; // Initialisez le nombre total de likes à zéro

function updateLikeCount(likeCount, numberOfLikes) {
  likeCount.textContent = numberOfLikes;
}

function handleLikeClick(
  likeButton,
  likeCount,
  photographerId,
  mediaId,
  defaultLikes
) {
  let numberOfLikes = mediaLikes[mediaId] || defaultLikes; // Initialisez le nombre de likes avec la valeur par défaut
  let isLiked = false;

  const heartIcon = createHeartIcon(isLiked);
  likeButton.appendChild(heartIcon);

  updateLikeCount(likeCount, numberOfLikes);

  likeButton.addEventListener("click", () => {
    if (isLiked) {
      numberOfLikes--;
      isLiked = false;
    } else {
      numberOfLikes++;
      isLiked = true;
    }

    // Mettez à jour l'objet mediaLikes avec le nouveau nombre de likes
    mediaLikes[mediaId] = numberOfLikes;
    console.log("nombre de likes : ", mediaLikes[mediaId]);
    updateLikeCount(likeCount, numberOfLikes);

    const newHeartIcon = createHeartIcon(isLiked);
    likeButton.innerHTML = "";
    likeButton.appendChild(newHeartIcon);

    // // Mettez à jour le nombre total de likes et affichez-le
    totalLikes += isLiked ? 1 : -1;
    totalLikesElement.textContent = `${totalLikes}`;
  });

  if (isLiked) {
    const newHeartIcon = createHeartIcon(isLiked);
    likeButton.innerHTML = "";
    likeButton.appendChild(newHeartIcon);
  }
}

let sortBy; // Initialisez sortBy avec la valeur par défaut

function updateMediaGrid(photographerId, sortBy) {
  console.log("updateMediaGrid appelée avec sortBy : ", sortBy);
  // Effacez le contenu actuel de la grille
  while (mediaGrid.firstChild) {
    mediaGrid.removeChild(mediaGrid.firstChild);
  }

  // Appelez la fonction loadPhotographerMedia pour obtenir les médias triés
  const sortedMedia = loadPhotographerMedia(photographerId, sortBy);

  if (sortedMedia) {
    // Vérifiez si sortedMedia est défini
    // Affichez les médias triés dans la console pour le débogage
    console.log("Médias triés : ", sortedMedia);

    // Parcourez les médias triés et ajoutez-les à la grille
    sortedMedia.forEach((media) => {
      const mediaElement = createMediaElement(media); // Créez une fonction createMediaElement pour générer l'élément HTML pour chaque média
      mediaGrid.appendChild(mediaElement);
    });
  }
}

// Écoutez les clics sur les options de tri
const hiddenSort = document.getElementsByClassName("hidden-sort");
const sortButtons = document.querySelectorAll(".sort");
sortButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Obtenez l'option de tri à partir du texte du bouton
    const selectedSortOption = button.textContent.toLowerCase();
    hiddenSort[0].style.display = "none";
    console.log(button);
    // Mettez à jour la valeur de sortBy
    sortBy = selectedSortOption;
    console.log("Bouton de tri cliqué :", sortBy);

    console.log("Avant l'appel à updateMediaGrid : sortBy =", sortBy);

    // Mettez à jour la grille HTML avec les médias triés
    updateMediaGrid(photographerId, sortBy);

    console.log("après l'appel à updateMediaGrid : sortBy =", sortBy);
  });
});

const mediaLikes = {};

function loadPhotographerMedia(photographerId) {
  // Utilisez fetch pour charger le fichier JSON des médias
  fetch("../../data/photographers.json")
    .then((response) => response.json())
    .then((data) => {
      // Recherchez le photographe correspondant dans les données
      photographer = data.photographers.find(
        (photographer) => photographer.id === photographerId
      );

      if (photographer) {
        // Filtrer les médias spécifiques à ce photographe
        photographerMedia = data.media.filter(
          (media) => media.photographerId === photographerId
        );
        console.log("Médias après filtrage : ", photographerMedia);
        totalLikes = 0;

        console.log("Tri en cours : ", sortBy); // Cette ligne affiche la valeur de sortBy avant le tri

        // Tri en fonction du critère choisi
        if (sortBy === "titre") {
          console.log("Tri par titre en cours...");
          photographerMedia.sort((a, b) => a.title.localeCompare(b.title));
          console.log("Médias triés par titre : ", photographerMedia);
        } else if (sortBy === "date") {
          console.log("Tri par date en cours...");
          photographerMedia.sort((a, b) => new Date(a.date) - new Date(b.date));
          console.log("Médias triés par date : ", photographerMedia);
        } else {
          // Si sortBy n'est ni "titre" ni "date", effectuer le tri par popularité
          console.log("Tri par popularité en cours...");
          photographerMedia.sort((a, b) => b.likes - a.likes);
          console.log("Médias triés par popularité : ", photographerMedia);
        }

        // on crée et affiche chaque élément média
        photographerMedia.forEach((media) => {
          mediaLikes[media.id] = media.likes || 0;
          console.log("test media likes:", mediaLikes[media.id]);
          // On crée la div global qui va contenir l'image et les textes en dessous
          const mediaContainer = document.createElement("article");
          mediaContainer.classList.add("media-container");
          mediaGrid.appendChild(mediaContainer);

          const mediaElement = createMediaElement(
            media,
            `assets/medias/${photographer.name}`
          );

          mediaContainer.appendChild(mediaElement);

          // Structure HTML pour le système de like et du nom
          const mediaInfoContainer = document.createElement("div");
          mediaInfoContainer.classList.add("media-info");

          // Structure HTML pour le nom dans les infos de l'image
          const mediaName = document.createElement("p");
          mediaName.classList.add("media-name");
          mediaName.textContent = media.title;

          // Structure HTML pour le like
          const likeContainer = document.createElement("div");
          likeContainer.classList.add("like-container");

          const likeButton = document.createElement("button");
          likeButton.classList.add("like-button");

          const likeCount = document.createElement("span");
          likeCount.classList.add("like-count");

          // Obtenez la valeur par défaut des likes à partir du fichier JSON
          const defaultLikes = media.likes || 0;

          // Mettez à jour le nombre total de likes d'une image lorsque le likeButton est cliqué
          handleLikeClick(
            likeButton,
            likeCount,
            photographerId,
            media.id,
            defaultLikes
          );

          totalLikes += media.likes || 0;

          // Met ensemble le nombre de like/button like
          likeContainer.appendChild(likeCount);
          likeContainer.appendChild(likeButton);

          // Ajoute le nom, le bouton de like et l'affichage du nombre de likes au conteneur des infos
          mediaInfoContainer.appendChild(mediaName);
          mediaInfoContainer.appendChild(likeContainer);

          // Ajoutez le conteneur de like à l'article
          mediaContainer.appendChild(mediaInfoContainer);

          mediaElement.addEventListener("click", () => {
            if (media.video) {
              openLightbox(
                photographerMedia.indexOf(media),
                `assets/medias/${photographer.name}/${media.video}`,
                media.title,
                photographerMedia
              );
            } else {
              openLightbox(
                photographerMedia.indexOf(media),
                `assets/medias/${photographer.name}/${media.image}`,
                media.title,
                photographerMedia
              );
            }
          });
        });
        totalLikesElement.textContent = `${totalLikes}`;
        console.log("Médias après filtrage : ", photographerMedia);
        // Retournez les médias triés
        return photographerMedia;
      } else {
        console.error("Le photographe n'a pas été trouvé.");
      }
    })
    .catch((error) => {
      console.error(
        "Une erreur s'est produite lors du chargement des données :",
        error
      );
      // Rejetez la promesse en cas d'erreur
      reject(error);
    });
}

console.log("tableau de likes", mediaLikes);

export { photographerMedia };

export { photographer };
