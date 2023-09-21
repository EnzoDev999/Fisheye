function buildText(options = {}) {
  const { tag = "p", text = "", className = [], ...otherOptions } = options;
  const element = document.createElement(tag);
  element.textContent = text;

  // Appliquer les classes si elles sont fournies

  // Vérifie si "className" est un tableau non vide
  if (Array.isArray(className) && className.length > 0) {
    // Si c'est non vide, alors on traite individuellement chaque élément du tableau (grâce à l'opérateur "...")
    // ainsi permettra l'ajout des différents éléments du tableau en tant que classe
    element.classList.add(...className);
    // Si on a pas de tableau non vide, on vérifie si on a une string non vide et par conséquent valide
  } else if (typeof className === "string" && className.trim() !== "") {
    // Si className est bien une string non vide, alors on ajoute cette classe à l'élément HTML
    element.classList.add(className);
  }

  // Appliquer les autres options personnalisées si elles sont fournies
  if (otherOptions.color) {
    element.style.color = otherOptions.color;
  }

  if (otherOptions.fontSize) {
    element.style.fontSize = otherOptions.fontSize;
  }

  if (otherOptions.margin) {
    element.style.margin = otherOptions.margin;
  }

  if (otherOptions.fontWeight) {
    element.style.fontWeight = otherOptions.fontWeight;
  }

  return element;
}

export { buildText };
