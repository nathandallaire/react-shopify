const fs = require("fs");
const path = require("path");
const {
  themeSnippetsFolder,
  snippetReferencesFilename,
  snippetsToRegister,
} = require("../../../build.config.js");

const init = async () => {
  let snippetsString = "";

  snippetsToRegister.forEach((snippetName) => {
    const renderingFilters = "| strip_newlines | rstrip | strip | escape";

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

  try {
    await fs.writeFileSync(
      `./${themeSnippetsFolder}/${snippetReferencesFilename}`,
      dataToWrite
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = init;
