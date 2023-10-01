import { buildImage } from "./buildImage.js";
import { buildText } from "./buildText.js";

// Définir la fonction textsBase
function textsBase(
  photographer,
  elementName,
  customTag = null,
  customOptions = {}
) {
  // Crée un objet de mapping pour faire correspondre les noms d'éléments avec les fonctions de construction
  const elementMapping = {
    photographerImage: () => {
      // Options par défaut pour l'élément de l'image
      const defaultOptions = {
        alt: photographer.name,
        containerClass: "photographer-image",
      };

      // Fusionne les options par défaut avec les options personnalisées
      const imageOptions = { ...defaultOptions, ...customOptions };

      // Appelle la fonction buildImage avec les options
      const photographerImage = buildImage(
        `assets/photographers/${photographer.portrait}`,
        imageOptions
      );

      // Retourne l'image générée
      return photographerImage;
    },

    photographerName: () => {
      // Options par défaut pour l'élément de nom du photographe
      const defaultOptions = {
        tag: customTag || "h2", // Utilise customTag s'il est spécifié, sinon utilise "h2"
        className: "photographer-name",
        text: photographer.name,
        color: "#D3573C",
        fontSize: "36px",
        margin: "10px 0 5px",
        fontWeight: "400",
      };

      // Fusionne les options par défaut avec les options personnalisées
      const textOptions = { ...defaultOptions, ...customOptions };

      // Appelle la fonction buildText avec les options
      return buildText(textOptions);
    },

    photographerCity: () => {
      // Options par défaut pour l'élément de la ville du photographe
      const defaultOptions = {
        tag: "p",
        className: "photographer-city",
        text: `${photographer.city}, ${photographer.country}`,
        color: "#901C1C",
        fontSize: "18px",
        fontWeight: "400",
      };

      // Fusionne les options par défaut avec les options personnalisées
      const textOptions = { ...defaultOptions, ...customOptions };

      // Appelle la fonction buildText avec les options
      return buildText(textOptions);
    },

    photographerTagLine: () => {
      // Options par défaut pour l'élément de la ligne de tag du photographe
      const defaultOptions = {
        tag: "p",
        className: "photographer-tagline",
        text: photographer.tagline,
        color: "black",
        fontSize: "15px",
        fontWeight: "400",
        margin: "3px 0",
      };

      // Fusionne les options par défaut avec les options personnalisées
      const textOptions = { ...defaultOptions, ...customOptions };

      // Appelle la fonction buildText avec les options
      return buildText(textOptions);
    },

    photographerPrice: () => {
      // Options par défaut pour l'élément de prix du photographe
      const defaultOptions = {
        tag: "p",
        className: "photographer-price",
        text: `${photographer.price}€/jour`,
        color: "#757575",
        fontSize: "13px",
        fontWeight: "400",
      };

      // Fusionne les options par défaut avec les options personnalisées
      const textOptions = { ...defaultOptions, ...customOptions };

      // Appelle la fonction buildText avec les options
      return buildText(textOptions);
    },
  };

  // Vérifier si l'élément demandé existe dans le mapping
  if (elementName in elementMapping) {
    // Appeler la fonction de construction correspondante et retourner l'élément généré
    return elementMapping[elementName]();
  } else {
    // Gérer le cas où l'élément demandé n'existe pas
    console.error(`L'élément "${elementName}" n'est pas pris en charge.`);
    return null;
  }
}

// Exporter la fonction textsBase
export { textsBase };
