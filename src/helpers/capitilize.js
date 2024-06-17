const capitilize = (str) => {
  str = Array.from(str);
  for (let i = 0; i < str.length; i++) {
    if (str[i] === str[0]) {
      str[i] = str[i].toUpperCase();
    } else if (str[i] === " ") {
      str[i + 1] = str[i + 1].toUpperCase();
    }
  }
  return str.join("");
};

export default capitilize;
