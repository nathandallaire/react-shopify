const buildTheme = require("./build/theme.liquid.js");
const buildSnippetReferences = require("./build/snippet-references.liquid.js");
const { buildPageData } = require("./build/page-data.liquid.js");
const buildSettingsSchema = require("./build/settings_schema.json.js");
const { buildAllSections } = require("./build/sections.js");
const { buildAllLocales } = require("./build/locales.js");

const buildThemeFiles = async () => {
  try {
    //Build theme.liquid file
    await buildTheme();

    //Generate snippet references snippet
    await buildSnippetReferences();

    //Build the page data snippet
    await buildPageData();

    //Build all sections
    await buildAllSections();

    //Build settings schema
    await buildSettingsSchema();

    //Build all locales
    await buildAllLocales();

    //Complete!
    console.log("\x1b[32m%s\x1b[0m", "✅ Generated theme files.");
  } catch (err) {
    console.log(err);
    process.exit(2);
  }
};

module.exports = buildThemeFiles;
