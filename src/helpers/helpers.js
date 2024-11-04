const capitilize = (str) => {
  str = Array.from(str);
  for (let i = 0; i < str.length; i++) {
    if (str[i] === str[0]) {
      str[i] = str[i].toUpperCase();
    } else if (str[i] === " ") {
      str[i + 1] = str[i + 1].toUpperCase();
    } else if (str[i] === "(") {
      break;
    }
  }
  return str.join("");
};

/**
 *
 * @param {Array} exercises
 * @param {string} searchTerm
 * @param {Array} excludedIds - An array of ids to exclude from the search
 * @returns {Array} - An array of exercises that contain the search term
 *
 */
const findExercises = (exercises, searchTerm, excludedIds = []) => {
  const foundExercises = [];
  for (let i = 0; i < exercises.length; i++) {
    if (
      exercises[i].name.includes(searchTerm.toLowerCase()) &&
      !excludedIds.includes(exercises[i].id)
    ) {
      foundExercises.push(exercises[i]);
    }
  }
  return foundExercises;
};

export { capitilize, findExercises };
