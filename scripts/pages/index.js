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

  const image = document.createElement("img");
  image.src = `assets/photographers/${photographer.portrait}`;
  image.alt = photographer.name;
  card.appendChild(image);

  const info = document.createElement("div");
  info.classList.add("photographer-info");

  const name = document.createElement("h1");
  name.classList.add("photographer-name");
  name.textContent = photographer.name;
  info.appendChild(name);

  const city = document.createElement("p");
  city.classList.add("photographer-city");
  city.textContent = `${photographer.city}, ${photographer.country}`;
  info.appendChild(city);

  const tagline = document.createElement("p");
  tagline.classList.add("photographer-tagline");
  tagline.textContent = photographer.tagline;
  info.appendChild(tagline);

  const price = document.createElement("p");
  price.classList.add("photographer-price");
  price.textContent = `${photographer.price}€/jour`;
  info.appendChild(price);

  card.appendChild(info);

  // Ajouter un écouteur d'événement de clic à la carte
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
