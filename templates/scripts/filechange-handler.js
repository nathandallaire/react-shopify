const chokidar = require("chokidar");
const path = require("path");
const buildTheme = require("./build/theme.liquid.js");
const buildSnippetReferences = require("./build/snippet-references.liquid.js");
const { buildPageData } = require("./build/page-data.liquid.js");
const {
  buildSection,
  buildPageSpecificSections,
} = require("./build/sections.js");
const buildSettingsSchema = require("./build/settings_schema.json.js");

//Get filename from page
const getFilenameFromPath = (filePath) => {
  const pathSplit = filePath.split("/").reverse();
  const fileName = pathSplit[0];
  return fileName;
};

//To avoid showing the build messages on starting up
let builtCount = 0;

//Theme template changes handler
const watchThemeTemplateChanges = () => {
  const watchPath = path.resolve(__dirname, "../theme");

  const handleUpdate = async (filePath) => {
    builtCount++;
    const fileName = getFilenameFromPath(filePath);

    let nothingBuilt = false;
    switch (fileName) {
      case "theme.liquid":
        await buildTheme();
        break;
      case "page-data.liquid":
        buildPageData();
        break;
      case "settings_schema.js":
        buildSettingsSchema();
        break;
      case "snippet-references.liquid":
        buildSnippetReferences();
        break;
      default:
        nothingBuilt = true;
        break;
    }
  };

  chokidar.watch(watchPath).on("change", handleUpdate);
};

//Theme template changes handler
const watchPageDataChanges = () => {
  const watchPath = path.resolve(__dirname, "../page_data");

  const handleUpdate = async () => {
    buildPageData();
  };

  chokidar.watch(watchPath).on("change", handleUpdate);
};

//Build new page-specific sections when page changes
const watchPageTemplateDataChanges = () => {
  const watchPath = path.resolve(__dirname, "../page_data/template_data");

  const handleUpdate = async (filePath) => {
    const fileName = getFilenameFromPath(filePath);
    const nameWithoutExtension = fileName.split(".")[0];
    buildPageSpecificSections(nameWithoutExtension);
  };

  chokidar.watch(watchPath).on("change", handleUpdate);
};

//Sections template changes handler
const watchSectionsChange = () => {
  const watchPath = path.resolve(__dirname, "../theme/sections");

  const handleUpdate = async (filePath) => {
    const sectionName = getFilenameFromPath(filePath);

    if (sectionName === "TEMPLATE.liquid") return;

    buildSection({ sectionName });
  };

  chokidar.watch(watchPath).on("change", handleUpdate);
};

//All watchers initialize
const onFilechangeHandler = () => {
  watchThemeTemplateChanges();
  watchPageDataChanges();
  watchPageTemplateDataChanges();
  watchSectionsChange();
};

module.exports = onFilechangeHandler;
