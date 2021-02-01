const fs = require("fs");
const path = require("path");
const renderTemplate = require("../../../utility/render_template.js");
const {
  themeLayoutFolder,
  snippetReferencesFilename,
  pageDataFilename,
  port,
  envKeys,
} = require("../../../build.config.js");
const {
  getBundleFilenameWithoutExtension,
} = require("../../../scripts/post-build");

const generateThemeLiquid = async () => {
  const themeFilename = "theme.liquid";
  const templatePath = path.resolve(
    __dirname,
    `../../theme/layout/${themeFilename}`
  );

  try {
    const unixTimestamp = new Date("2012.08.10").getTime() / 1000;
    const templateContent = await fs.readFileSync(templatePath, "utf8");
    const injectedTemplate = renderTemplate(templateContent, {
      snippetReferencesFilename,
      pageDataFilename,
      bundleName: getBundleFilenameWithoutExtension(),
      port,
      serveLocally:
        process.env.SERVE_LOCALLY && process.env.NODE_ENV === envKeys.dev,
      unixTimestamp,
    });

    await fs.writeFileSync(
      `./${themeLayoutFolder}/${themeFilename}`,
      injectedTemplate
    );
  } catch (err) {
    console.log(err);
    process.exit(2);
  }
};

module.exports = generateThemeLiquid;
