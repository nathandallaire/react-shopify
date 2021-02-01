const buildTheme = require("./build/theme.liquid.js");
const buildSnippetReferences = require("./build/snippet-references.liquid.js");
const buildPageData = require("./build/page-data.liquid.js");

const buildThemeFiles = async () => {
  //Build snippets register file
  await buildTheme();

  //Generate theme.liquid file
  await buildSnippetReferences();

  //Build the page data snippet
  await buildPageData();

  console.log("\x1b[32m%s\x1b[0m", "✅ Generated theme files.");
};

module.exports = buildThemeFiles;
