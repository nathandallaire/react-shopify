const chokidar = require("chokidar");
const path = require("path");
const debounce = require("lodash/debounce");
const buildTheme = require("./build/theme.liquid.js");
const buildSnippetReferences = require("./build/snippet-references.liquid.js");
const buildPageData = require("./build/page-data.liquid.js");

//To avoid showing the build messages on starting up
let builtCount = 0;

//Theme template changes handler
const watchThemeTemplateChanges = () => {
  const watchPath = path.resolve(__dirname, "../theme");

  const handleUpdate = async (event, filePath) => {
    builtCount++;
    const pathSplit = filePath.split("/").reverse();
    const fileName = pathSplit[0];

    let nothingBuilt = false;
    switch (fileName) {
      case "theme.liquid":
        await buildTheme();
        break;
      case "page-data.liquid":
        buildPageData();
        break;
      case "snippet-references.liquid":
        buildSnippetReferences();
        break;
      default:
        nothingBuilt = true;
        break;
    }

    if (!nothingBuilt && builtCount > 1) {
      console.log(`Built ${fileName}.`);
    }
  };

  chokidar.watch(watchPath).on("all", debounce(handleUpdate, 200));
};

//Theme template changes handler
const watchPageDataChanges = () => {
  const watchPath = path.resolve(__dirname, "../page_data");

  const handleUpdate = async () => {
    buildPageData();
  };

  chokidar.watch(watchPath).on("all", debounce(handleUpdate, 200));
};

//All watchers initialize
const onFilechangeHandler = () => {
  watchThemeTemplateChanges();
  watchPageDataChanges();
};

module.exports = onFilechangeHandler;
