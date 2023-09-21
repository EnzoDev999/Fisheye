// Importe le module textExemple
import { textExemple } from "../utils/textExemple.js";
import { createMediaElement } from "../factory/dataFactory.js";
import { displayModal } from "../utils/contactForm.js";

// Fonction pour obtenir le paramètre 'id' de l'URL
function getPhotographerId() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  return urlSearchParams.get("id");
}

// Sélectionne l'élément HTML où vous voulez afficher les informations du photographe
const photographerHeader = document.querySelector(".photograph-header");

// Création des divs dans notre espace grid
const headerCol1 = document.createElement("div");
headerCol1.classList.add("col1");
const headerCol2 = document.createElement("div");
headerCol2.classList.add("col2");
const headerCol3 = document.createElement("div");
headerCol3.classList.add("col3");
// ajoute dans la structuration de notre HTML
photographerHeader.appendChild(headerCol1);
photographerHeader.appendChild(headerCol2);
photographerHeader.appendChild(headerCol3);

const buttonModal = document.querySelector(".contact_button");
// Utilise fetch pour charger le fichier JSON des photographes
fetch("../../data/photographers.json")
  .then((response) => response.json())
  .then((photographersData) => {
    // Obtient l'ID du photographe à partir de l'URL
    // Ici on utilise parseInt pour être sur que la chaîne soit convertie en un nombre
    const photographerId = parseInt(getPhotographerId(), 10);
    // Recherche le photographe correspondant dans les données
    const photographer = photographersData.photographers.find(
      (photographer) => photographer.id === photographerId
    );
    // Vérifie si le photographe a été trouvé
    if (photographer) {
      buttonModal.addEventListener("click", () => {
        displayModal(photographer.name);
      });

      // Utilise textExemple pour générer tous les éléments
      const photographerNameElement = textExemple(
        photographer,
        "photographerName",
        "h1",
        { fontSize: "64px", margin: "0" }
      );
      const photographerCityElement = textExemple(
        photographer,
        "photographerCity",
        null,
        { fontSize: "24px" }
      );
      const photographerTaglineElement = textExemple(
        photographer,
        "photographerTagLine",
        null,
        { fontSize: "18px", margin: "19px 0 0" }
      );
      const photographerImageElement = textExemple(
        photographer,
        "photographerImage"
      );
      const contactButton = document.querySelector(".contact_button");

      // Répartie nos éléments dans les divs qu'on souhaite
      headerCol1.appendChild(photographerNameElement);
      headerCol1.appendChild(photographerCityElement);
      headerCol1.appendChild(photographerTaglineElement);
      headerCol2.appendChild(contactButton);
      headerCol3.appendChild(photographerImageElement);

      // Appel de la fonction pour charger les médias du photographe
      loadPhotographerMedia(photographerId);

      // Crée un élément div pour l'encart
      const priceLikesContainer = document.createElement("div");

      // Utilise la fonction textExemple pour créer l'élément texte avec le tarif journalier
      const dailyPriceElement = textExemple(
        photographer,
        "photographerPrice",
        null,
        { fontSize: "24px", color: "#000", fontWeight: "500" }
      );

      // Ajoute cet élément texte à l'encart
      priceLikesContainer.appendChild(dailyPriceElement);

      // Ajoute des classes CSS pour le formattage
      priceLikesContainer.classList.add("price-likes-container");
      dailyPriceElement.classList.add("daily-price");

      // Ajoute l'encart au body de la page
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

// Créez un conteneur pour les médias
const mediaContainer = document.createElement("div");
mediaContainer.classList.add("media-container");
// Ajoutez le conteneur à votre page
const mainPage = document.getElementById("main");
mainPage.appendChild(mediaContainer);

function loadPhotographerMedia(photographerId) {
  // Utilise fetch pour charger le fichier JSON des médias
  fetch("../../data/photographers.json")
    .then((response) => response.json())
    .then((data) => {
      // Recherchez le photographe correspondant dans les données
      const photographer = data.photographers.find(
        (photographer) => photographer.id === photographerId
      );

      if (photographer) {
        // Filtrer les médias spécifiques à ce photographe
        const photographerMedia = data.media.filter(
          (media) => media.photographerId === photographerId
        );

        // Créez et affichez chaque élément média
        photographerMedia.forEach((media) => {
          const mediaElement = createMediaElement(
            media,
            `assets/medias/${photographer.name}`
          );

          mediaContainer.appendChild(mediaElement);
        });
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
}
