// Import des éventuels modules nécessaires
import { textsBase } from "../templates/textsBase.js";

// Sélectionne l'élément HTML où on veut afficher les photographes
const photographerSection = document.querySelector(".photographer_section");

// Utilise fetch pour charger le fichier JSON des photographes
fetch("data/photographers.json")
  .then((response) => response.json())
  .then((photographersData) => {
    // Parcours la liste des photographes et génère les éléments pour chaque photographe
    photographersData.photographers.forEach((photographer) => {
      // Crée un élément <article> pour chaque photographe
      const photographerCard = document.createElement("article");
      photographerCard.classList.add("photographer-card");

      // Crée un élément <a> qui vas permettre d'englober les éléments qu'on souhaites rendre cliquable
      const photographerLink = document.createElement("a");
      photographerLink.href = `photographer.html?id=${photographer.id}`;
      photographerLink.ariaLabel = photographer.name;
      photographerLink.classList.add("photographer-redirect");

      // Crée une image du photographe avec textsBase
      const photographerImageElement = textsBase(
        photographer,
        "photographerImage"
      );

      // Crée d'autres éléments (nom, pays/ville, tagline, prix) en utilisant textsBase
      const photographerNameElement = textsBase(
        photographer,
        "photographerName"
      );
      const photographerCityElement = textsBase(
        photographer,
        "photographerCity"
      );
      const photographerTaglineElement = textsBase(
        photographer,
        "photographerTagLine"
      );
      const photographerPriceElement = textsBase(
        photographer,
        "photographerPrice"
      );

      // Ajoute ces éléments à l'article du photographe (faire attention à l'ordre)

      // On veut que le <a> (photographerLink) contienne le "photographerNameElement" et le "photographerImageElement"
      photographerLink.appendChild(photographerImageElement);
      photographerLink.appendChild(photographerNameElement);
      // Enfin on ajoute la balise globale "photographerLink" (contenant "photographerNameElement" et
      // "photographerImageElement") en tant qu'enfant de notre card
      photographerCard.appendChild(photographerLink);

      // ajout du reste des éléments
      photographerCard.appendChild(photographerCityElement);
      photographerCard.appendChild(photographerTaglineElement);
      photographerCard.appendChild(photographerPriceElement);

      // Ajoute l'article du photographe à la section des photographes
      photographerSection.appendChild(photographerCard);
    });
  })
  .catch((error) => {
    console.error(
      "Une erreur s'est produite lors du chargement des données :",
      error
    );
  });
