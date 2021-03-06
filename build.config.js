const THEME_FOLDER = "theme";

const configuration = {
  /* ====================
  Bundle settings
  ==================== */
  bundleName: "meepmoop.js",
  bundleNamePrefix: "bndl", //When cleaning, refer to this to remove (dont change so much)
  distFolder: "dist",
  port: process.env.WEBPACK_PORT ? process.env.WEBPACK_PORT : 8080,
  envKeys: {
    dev: "development",
    prod: "production",
  },
  /* ====================
  Shopify settings
  ==================== */
  themeFolder: THEME_FOLDER,
  themeAssetsFolder: `${THEME_FOLDER}/assets`,
  themeLocalesFolder: `${THEME_FOLDER}/locales`,
  themeSnippetsFolder: `${THEME_FOLDER}/snippets`,
  themeLayoutFolder: `${THEME_FOLDER}/layout`,
  themeSectionsFolder: `${THEME_FOLDER}/sections`,
  themeConfigFolder: `${THEME_FOLDER}/config`,
  snippetsToRegister: ["test-snippet"],
  snippetReferencesFilename: "snippet-references.liquid",
  pageDataFilename: "head-page-data.liquid",
  /* ====================
  Data settings
  ==================== */
  windowPageDataKey: "store",
};

module.exports = configuration;
