convertFloat = (num) => {
  return Math.round(num * 100) / 100;
}

convertBool = (boolStr) => {
  switch (boolStr) {
    case "Yes":
      return true;
    case "No":
      return false;
    default:
      return "";
  }
}

module.exports = Object.assign({
  convertFloat,
  convertBool
});