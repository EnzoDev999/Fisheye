// Fonction pour afficher la modal de contact
function displayModal(photographerName) {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";

  // Affiche le nom du photographe dans la modal
  const photographerNameElement = document.getElementById("photographer-name");
  photographerNameElement.textContent = photographerName;

  // Ajoute la classe "modal-open" au body
  const body = document.querySelector("body");
  body.classList.add("modal-open");
}

// Fonction pour fermer la modal
function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";

  // Supprime la classe "modal-open" du body
  const body = document.querySelector("body");
  body.classList.remove("modal-open");
}

const closeIcon = document.querySelector(".close_icon");
closeIcon.addEventListener("click", () => {
  closeModal();
});

// Obtenir le formulaire
const contactForm = document.querySelector("#contact_modal form");

// Écouter l'événement de soumission du formulaire
contactForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const firstName = document.getElementById("first_name").value;
  const lastName = document.getElementById("last_name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Affiche les valeurs dans la console
  console.log("Prénom:", firstName);
  console.log("Nom:", lastName);
  console.log("Email:", email);
  console.log("Message:", message);

  // Ferme la modal
  closeModal();
});

export { displayModal };
