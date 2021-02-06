const fs = require("fs");
const renderTemplate = require("../render-template");
const path = require("path");
const {
  themeSnippetsFolder,
  snippetReferencesFilename,
  snippetsToRegister,
} = require("../../../build.config.js");
const { builtConsoleLog } = require("./utility");

const init = async () => {
  const templatePath = path.resolve(
    __dirname,
    `../../theme/snippets/${snippetReferencesFilename}`
  );
  const renderingFilters = " | strip_newlines | rstrip | strip | escape";
  const templateContent = await fs.readFileSync(templatePath, "utf8");
  const injectedTemplate = renderTemplate(templateContent, {
    renderingFilters,
    snippetsToRegister,
  });

  try {
    const filenamePath = `${themeSnippetsFolder}/${snippetReferencesFilename}`;
    await fs.writeFileSync(`./${filenamePath}`, injectedTemplate);
    builtConsoleLog(filenamePath);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = init;
