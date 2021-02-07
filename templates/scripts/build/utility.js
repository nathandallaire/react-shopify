const decache = require("decache");

//pages to create data from found in /template_data
const dataTemplates = [
  "global.js",
  "index.js",
  "product.js",
  "collection.js",
  "list-collections.js",
  "search.js",
  "article.js",
  "page.js",
  "blog.js",
];

// Get all pages config array
const getPagesConfig = () => {
  //Template path
  const pageDataPath = "../../page_data/template_data";

  //Array of page configuration
  let configArray = {};
  dataTemplates.forEach(async (fileName) => {
    const pathName = `${pageDataPath}/${fileName}`;
    decache(pathName);
    const data = require(pathName);
    configArray[data.key] = data;
  });

  return configArray;
};

const getFilenameWithoutExt = (filename) => {
  if (!filename) return "";
  if (!filename.includes(".")) return filename;

  const split = filename.split(".");
  return split[0];
};

const getSectionName = (prefix, sectionName) => {
  if (prefix) return `${prefix}-${sectionName}`;

  return sectionName;
};

const getPageSectionsArray = (options) => {
  const { pageConfig, specificSection, ignoreGlobal } = options;
  pageSpecificBuilds = [];

  if (!pageConfig.sections && !pageConfig.sectionPrefix) return;

  pageConfig.sections.forEach((sectionObject) => {
    if (!sectionObject.as && ignoreGlobal) return;
    if (specificSection) {
      if (sectionObject.section !== getFilenameWithoutExt(specificSection))
        return;
    }

    let outputFilename = getSectionName(
      !sectionObject.as ? undefined : pageConfig.sectionPrefix,
      sectionObject.as ? sectionObject.as : sectionObject.section
    );

    pageSpecificBuilds.push(outputFilename);
  });

  return pageSpecificBuilds;
};

const builtConsoleLog = (filename) => {
  console.log("\x1b[32m%s\x1b[0m", `💪 Built ${filename}`);
};

module.exports = {
  getFilenameWithoutExt,
  getSectionName,
  getPageSectionsArray,
  getPagesConfig,
  builtConsoleLog,
};
