import lockFocus from "./lockFocus.js";

let previouslyFocusedElement = null;

function displayModal(photographerName) {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";

  previouslyFocusedElement = document.activeElement;
  modal.ariaLabel = `contactez moi ${photographerName}`;
  const modalForm = document.getElementById("contactForm");
  const firstFocusableElement = modalForm.querySelector("input:first-of-type");

  // Affiche le nom du photographe dans la modal
  const photographerNameElement = document.getElementById("photographer-name");
  photographerNameElement.textContent = photographerName;

  // Ajoute la classe "modal-open" au body
  const body = document.querySelector("body");
  body.classList.add("modal-open");

  // Verrouille le focus à l'intérieur de la modal
  lockFocus(modalForm);

  // Définit le focus sur le premier élément interactif de la modal
  firstFocusableElement.focus();
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";

  // Rétablit le focus sur l'élément précédemment focusé
  if (previouslyFocusedElement) {
    previouslyFocusedElement.focus();
  }

  // Supprime la classe "modal-open" du body
  const body = document.querySelector("body");
  body.classList.remove("modal-open");
}

const closeButton = document.getElementById("closeButton");
closeButton.addEventListener("click", () => {
  closeModal();
});

const contactForm = document.querySelector("#contact_modal form");

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

  closeModal();
});

export { displayModal };
