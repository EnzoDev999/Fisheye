import { buildImage } from "../templates/buildImage.js";

// Fonction qui génère un élément de média en fonction des données fournies
function createMediaElement(mediaData, mediaPath, likes = 0) {
  const mediaLink = document.createElement("a");
  mediaLink.href = "#";
  mediaLink.className = "media";
  mediaLink.ariaLabel = `${mediaData.title} closeup view`;

  if (mediaData.image) {
    // Utilise buildImage pour créer l'élément image
    const mediaImage = buildImage(`${mediaPath}/${mediaData.image}`, {
      alt: mediaData.title,
      loading: "lazy",
      width: "350",
      height: "300",
    });

    mediaLink.appendChild(mediaImage);
  } else if (mediaData.video) {
    const mediaVideo = document.createElement("video");
    mediaVideo.src = `${mediaPath}/${mediaData.video}`;
    mediaVideo.controls = true;

    // Ajoute l'attribut "preload" pour précharger la vidéo
    mediaVideo.preload = "auto";

    mediaLink.appendChild(mediaVideo);
  } else {
    console.error("Type de média non pris en charge :", mediaData);
    return null;
  }

  return mediaLink;
}

// Exporte la fonction pour l'utiliser ailleurs
export { createMediaElement };
