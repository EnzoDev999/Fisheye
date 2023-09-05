import { buildImage } from "../utils/buildImage.js";
import { buildText } from "../utils/buildText.js";

// on défini nos constantes en dehors de la fonction createPhotographerCard (pour faciliter l'exportation)
let photographerImage;
let photographerName;
let photographerCity;
let photographerTagline;
let photographerPrice;

async function getPhotographers() {
  const response = await fetch("data/photographers.json");
  const data = await response.json();
  return data.photographers;
}

function redirectToPhotographerPage(photographerId) {
  window.location.href = `photographer.html?id=${photographerId}`;
}

function createPhotographerCard(photographer) {
  const card = document.createElement("article");
  card.classList.add("photographer-card");

  photographerImage = buildImage(
    `assets/photographers/${photographer.portrait}`,
    {
      alt: photographer.name,
      containerClass: "photographer-image",
    }
  );
  // On intègre l'html défini dans notre constante juste avant dans notre DOM
  card.innerHTML = photographerImage;

  const info = document.createElement("div");
  info.classList.add("photographer-info");

  photographerName = buildText({
    tag: "h2",
    className: "photographer-name",
    text: photographer.name,
    color: "#D3573C",
    fontSize: "36px",
    margin: "10px 0 5px",
    fontWeight: "400",
  });
  info.appendChild(photographerName);

  photographerCity = buildText({
    tag: "p",
    className: "photographer-city",
    text: `${photographer.city}, ${photographer.country}`,
    color: "#901C1C",
    fontSize: "18px",
    fontWeight: "400",
  });
  info.appendChild(photographerCity);

  photographerTagline = buildText({
    tag: "p",
    className: "photographer-tagline",
    text: photographer.tagline,
    color: "black",
    fontSize: "15px",
    fontWeight: "400",
  });
  info.appendChild(photographerTagline);

  photographerPrice = buildText({
    tag: "p",
    className: "photographer-price",
    text: `${photographer.price}€/jour`,
    color: "#757575",
    fontSize: "13px",
    fontWeight: "400",
  });
  info.appendChild(photographerPrice);

  card.appendChild(info);

  card.addEventListener("click", () => {
    redirectToPhotographerPage(photographer.id);
  });

  return card;
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerCard = createPhotographerCard(photographer);
    photographersSection.appendChild(photographerCard);
  });
}

async function init() {
  const photographers = await getPhotographers();
  displayData(photographers);
}

document.addEventListener("DOMContentLoaded", init);

// On exporte nos constantes
export {
  photographerImage,
  photographerName,
  photographerCity,
  photographerTagline,
  photographerPrice,
};
