// Fonction BuildImage qui va prendre en paramètre "src" donc l'image
// ainsi que "options" qui va permettre la définition de plusieurs autres options

const buildImage = (src, options = {}) => {
  try {
    // Vérification si le chargement de l'image a échoué
    if (!src) {
      throw new Error("Image source is missing or invalid.");
    }

    // Classe par défaut pour le conteneur de l'image si aucun n'est définit
    const containerClass = options?.containerClass || "image-container"; // utilisation de "?" afin d'éviter d'eventuelles erreurs (Optional Chaining)

    // Fonction "img" qui va permettre la création du code qui sera réutilisable
    const img = `
      <div class="${containerClass}">
        <img 
          src="${src}"
          width="${options?.width || "100%"}" 
          height="${options?.height || "auto"}"
          alt="${options?.alt || ""}"
          class="${options?.imgClass || ""}"
          loading="${
            options?.loading || "lazy"
          }"/> <!-- L'attribut loading="lazy" retarde le chargement de l'image pour améliorer les performances -->
      </div>
    `;

    // Vérification si on doit ajouter un lien
    if (options.link) {
      return `<a href="${options.link}">${img}</a>`;
    } else {
      // Sinon on retourne juste l'image sans link
      return img;
    }
  } catch (error) {
    //On affiche l'éventuelle erreur dans la console
    console.error("Error building image:", error);
    return ""; // Retourner une chaîne vide en cas d'erreur
  }
};
// J'exporte notre fonction afin qu'elle soit réutilisable
export { buildImage };
