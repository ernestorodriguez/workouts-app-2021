const { default: cucumber } = require("cypress-cucumber-preprocessor");

module.exports = (on) => {
  on("file:preprocessor", cucumber());
};
