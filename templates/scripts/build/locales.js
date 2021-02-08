const decache = require("decache");
const fs = require("fs");
const { themeLocalesFolder } = require("../../../build.config.js");
const { builtConsoleLog } = require("./utility");

const buildLocale = async (localeName) => {
  const pathName = `../../theme/locales/${localeName}.js`;
  decache(pathName);
  const data = require(pathName);
  const toJSON = JSON.stringify(data, null, "  ");

  try {
    const filePathname = `${themeLocalesFolder}/${localeName}.json`;

    await fs.writeFileSync(`./${filePathname}`, toJSON);
    builtConsoleLog(filePathname);
  } catch (err) {
    console.log(err);
  }
};

const buildAllLocales = async () => {
  const pathName = `../../theme/locales`;
  const localesPath = path.resolve(__dirname, pathName);

  await fs.readdirSync(localesPath).forEach(async (fileName) => {
    const localeNameWithoutExtension = fileName
      .split(".")
      .slice(0, -1)
      .join(".");
    try {
      await buildLocale(localeNameWithoutExtension);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  });
};

module.exports = { buildAllLocales, buildLocale };
