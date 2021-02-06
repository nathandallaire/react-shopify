const path = require("path");
const fs = require("fs");
const page_keys = require("../../page_data/page_keys");
const renderTemplate = require("../render-template");
const pageDataSchema = require("../../page_data/schema");
const decache = require("decache");
const {
  envKeys,
  themeSnippetsFolder,
  pageDataFilename,
  windowPageDataKey,
} = require("../../../build.config.js");

const {
  builtConsoleLog,
  getPageSectionsArray,
  getPagesConfig,
} = require("./utility");

//Initiate snippet build
const buildPageData = async () => {
  //Get the page config array
  const pagesConfig = getPagesConfig();
  let configArray = [...Object.values(pagesConfig)];

  //Make sure to pass themekit checksum by re-arranging array every time
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  shuffle(configArray);

  //1. Test each config
  //2. Add sections to each array
  configArray.forEach((config) => {
    const { error } = pageDataSchema.validate(config);
    if (error) {
      console.error(`Improper schema for config with key ${config?.key}`);
      return;
    }

    //Add list of sections
    const pageSectionList = getPageSectionsArray({ pageConfig: config });
    config.sectionList = pageSectionList;
  });

  //Generate snippet based on data configs added
  const templatePath = path.resolve(
    __dirname,
    `../../theme/snippets/${pageDataFilename}`
  );

  try {
    //Get page data and write snippet to theme directory
    const templateData = await fs.readFileSync(templatePath, "utf8");
    const pageData = renderTemplate(templateData, {
      configArray,
      windowPageDataKey,
      page_keys,
      isMinified: process.env.NODE_ENV !== envKeys.dev,
      timestamp: Date.now(),
    });

    //Add to theme/snippets
    const filenamePath = `${themeSnippetsFolder}/${pageDataFilename}`;
    await fs.writeFileSync(`./${filenamePath}`, pageData);

    builtConsoleLog(filenamePath);
  } catch (err) {
    console.log(err);
    process.exit(2);
  }
};

module.exports = {
  buildPageData,
};
