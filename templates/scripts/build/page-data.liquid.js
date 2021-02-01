const path = require("path");
const fs = require("fs");
const page_keys = require("../../page_data/page_keys");
const renderTemplate = require("../render-template");
const pageDataSchema = require("../../page_data/schema");
const {
  envKeys,
  themeSnippetsFolder,
  pageDataFilename,
  windowPageDataKey,
} = require("../../../build.config.js");

//global config
const globalConfig = require("../../page_data/template_data/global");

//config data to build for each page
const indexConfig = require("../../page_data/template_data/index");
const productConfig = require("../../page_data/template_data/product");
const collectionConfig = require("../../page_data/template_data/collection");
const listCollectionsConfig = require("../../page_data/template_data/list-collections");
const searchConfig = require("../../page_data/template_data/search");

//Initiate snippet build
const initiatePageDataSnippetBuild = async () => {
  //Tie data config modules to array
  let configArray = [
    globalConfig,
    indexConfig,
    productConfig,
    collectionConfig,
    listCollectionsConfig,
    searchConfig,
  ];

  //Test each config
  configArray.forEach((config) => {
    const { error } = pageDataSchema.validate(config);
    if (error) {
      console.error(`Improper schema for config with key ${config?.key}`);
      return process.exit(2);
    }
  });

  //Generate snippet based on data configs added
  const templatePath = path.resolve(
    __dirname,
    `../../theme/snippets/${pageDataFilename}`
  );

  //Get page data and write snippet to theme directory
  try {
    const templateData = await fs.readFileSync(templatePath, "utf8");
    const pageData = renderTemplate(templateData, {
      configArray,
      windowPageDataKey,
      page_keys,
      isMinified: process.env.NODE_ENV !== envKeys.dev,
      timestamp: Date.now(),
    });

    await fs.writeFileSync(
      `./${themeSnippetsFolder}/${pageDataFilename}`,
      pageData
    );
  } catch (err) {
    console.log(err);
    process.exit(2);
  }
};

module.exports = initiatePageDataSnippetBuild;
