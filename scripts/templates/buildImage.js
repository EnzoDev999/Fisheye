const buildImage = (src, options = {}) => {
  try {
    if (!src) {
      throw new Error("Image source is missing or invalid.");
    }

    const {
      containerClass = "image-container",
      width,
      height,
      alt,
      imgClass,
      loading = "lazy",
      link,
    } = options;

    // Crée le conteneur de l'image (figure)
    const figureElement = document.createElement("figure");
    figureElement.classList.add(containerClass);

    // Crée l'élément image (img)
    const imgElement = document.createElement("img");
    imgElement.src = src;

    // Vérifie chaque option avant de l'ajouter à l'élément image
    if (width) {
      imgElement.width = width;
    }
    if (height) {
      imgElement.height = height;
    }
    if (alt) {
      imgElement.alt = alt;
    }
    if (imgClass) {
      imgElement.classList.add(imgClass);
    }
    imgElement.loading = loading;

    // Ajoute l'élément image au conteneur (figure)
    figureElement.appendChild(imgElement);

    // Si un lien est spécifié, crée un lien autour de l'image
    if (link) {
      const linkElement = document.createElement("a");
      linkElement.href = link;
      linkElement.appendChild(figureElement);
      return linkElement;
    } else {
      return figureElement;
    }
  } catch (error) {
    console.error("Error building image:", error);
    return "";
  }
};

export { buildImage };
