const fs = require("fs");
const path = require("path");
const { themeAssetsFolder, bundleNamePrefix } = require(path.resolve(
  __dirname,
  "../build.config.js"
));

const cleanAssets = async () => {
  try {
    //Loop through all assets and if contains bundlename, remove
    await fs.readdirSync(`./${themeAssetsFolder}`).forEach(async (fileName) => {
      if (fileName.includes(bundleNamePrefix)) {
        try {
          await fs.unlinkSync(`./${themeAssetsFolder}/${fileName}`);
        } catch (err) {
          console.error(err);
          process.exit(1);
        }
      }
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(
    "\x1b[32m%s\x1b[0m",
    "🍆 Cleaned old assets from theme directory."
  );
};

module.exports = cleanAssets;
