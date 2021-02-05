const path = require("path");
const fs = require("fs");
const page_keys = require("../../page_data/page_keys");
const renderTemplate = require("../render-template");
const pageDataSchema = require("../../page_data/schema");
const { requireUncached } = require("../../../scripts/utility");
const {
  envKeys,
  themeSnippetsFolder,
  pageDataFilename,
  windowPageDataKey,
} = require("../../../build.config.js");

//Initiate snippet build
const initiatePageDataSnippetBuild = async () => {
  //Template path
  const pageDataPath = "templates/page_data/template_data";

  //global config
  const globalData = requireUncached(`${pageDataPath}/global.js`);

  //config data to build for each page
  const indexPageData = requireUncached(`${pageDataPath}/index.js`);
  const productPageData = requireUncached(`${pageDataPath}/product.js`);
  const collectionPageData = requireUncached(`${pageDataPath}/collection.js`);
  const listCollectionsPageData = requireUncached(
    `${pageDataPath}/list-collections.js`
  );
  const searchPageData = requireUncached(`${pageDataPath}/search.js`);
  const articlePageData = requireUncached(`${pageDataPath}/article.js`);
  const pagePageData = requireUncached(`${pageDataPath}/page.js`);
  const blogPageData = requireUncached(`${pageDataPath}/blog.js`);

  //Tie data config modules to array
  let configArray = [
    globalData,
    indexPageData,
    productPageData,
    collectionPageData,
    listCollectionsPageData,
    searchPageData,
    articlePageData,
    pagePageData,
    blogPageData,
  ];

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  shuffle(configArray);

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
