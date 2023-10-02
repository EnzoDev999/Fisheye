const handleSort = (value, array) => {
  if (value === "titre") {
    array.sort((a, b) => a.title.localeCompare(b.title));
  } else if (value === "date") {
    array.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (value === "popularité") {
    // Si sortBy n'est ni "titre" ni "date", effectuer le tri par popularité
    array.sort((a, b) => b.likes - a.likes);
  }
};

export default handleSort;
