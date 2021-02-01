const fs = require("fs");
const renderTemplate = require("../render-template");
const path = require("path");
const {
  themeSnippetsFolder,
  snippetReferencesFilename,
  snippetsToRegister,
} = require("../../../build.config.js");

const init = async () => {
  let snippetsString = "";

  /*
  snippetsToRegister.forEach((snippetName) => {
    snippetsString += `
      {% capture ${snippetName}_html %}{% include '${snippetName}' ${renderingFilters} %}{% endcapture %}
      ${snippetName}: \`
        {{ ${snippetName}_html ${renderingFilters} }}
      \`,
    `;
  });

  const dataToWrite = `
    {% comment %}
    DO NOT EDIT FILE
    This is auto-generated through webpack.
    {% endcomment %}
    <script>
      window.snippetHtml = {${snippetsString}}
    </script>
  `;
  */
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
    await fs.writeFileSync(
      `./${themeSnippetsFolder}/${snippetReferencesFilename}`,
      injectedTemplate
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = init;
