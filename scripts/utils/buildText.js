// buildText.js

function buildText(options = {}) {
  const { tag = "p", text = "", className = "", ...otherOptions } = options;
  const element = document.createElement(tag);
  element.textContent = text;

  // Appliquer la classe si elle est fournie
  if (className) {
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
