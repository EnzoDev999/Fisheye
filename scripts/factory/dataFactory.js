import { buildImage } from "../utils/buildImage.js";

// Fonction qui génère un élément de média en fonction des données fournies
function createMediaElement(mediaData, mediaPath) {
  const mediaLink = document.createElement("a");
  mediaLink.href = "#";
  mediaLink.className = "media";

  if (mediaData.image) {
    // Utilisez buildImage pour créer l'élément image
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

    // Ajoutez l'attribut "preload" pour précharger la vidéo
    mediaVideo.preload = "auto";

    mediaLink.appendChild(mediaVideo);
  }

  return mediaLink;
}

// Exportez la fonction pour l'utiliser ailleurs
export { createMediaElement };
