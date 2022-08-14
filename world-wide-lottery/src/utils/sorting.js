export const sortByOrientation = (sortOrientation, sortedPlayers) => {
  let condition;
  if (sortOrientation === "descending") {
    condition = (a, b) => (a.time > b.time ? -1 : a.time < b.time ? 1 : 0);
  } else {
    condition = (a, b) => (a.time < b.time ? -1 : a.time > b.time ? 1 : 0);
  }
  return sortedPlayers.slice().sort(condition);
};

export const setOrientation = (sortOrientation) => {
  return sortOrientation === "descending" ? "ascending" : "descending";
};
