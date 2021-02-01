const THEME_FOLDER = "theme";

const configuration = {
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
  themeSnippetsFolder: `${THEME_FOLDER}/snippets`,
  themeLayoutFolder: `${THEME_FOLDER}/layout`,
  snippetsToRegister: ["arrow"],
  snippetReferencesFilename: "snippet-references.liquid",
  pageDataFilename: "page-data.liquid",
  /* ====================
  Data settings
  ==================== */
  windowPageDataKey: "store",
};

module.exports = configuration;
