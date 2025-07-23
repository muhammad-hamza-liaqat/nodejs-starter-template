const path = require("path");
const i18n = require("i18n");

i18n.configure({
  locales: ["en", "ar", "ru"],
  defaultLocale: "en",
  directory: path.join(__dirname, "../locales"),
  objectNotation: true,
  updateFiles: false,
  syncFiles: false,
  header: "lang",
});

module.exports = i18n;
