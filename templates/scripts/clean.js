const {
  themeAssetsFolder,
  themeSectionsFolder,
  themeSnippetsFolder,
  themeLayoutFolder,
  bundleNamePrefix,
  snippetReferencesFilename,
  pageDataFilename,
} = require(path.resolve(__dirname, "../../build.config.js"));

//Clean theme.liquid
const cleanThemeLiquid = async () => {
  const pathname = `./${themeLayoutFolder}/theme.liquid`;

  try {
    //If theme file exists
    if (!(await fs.existsSync(pathname))) return;

    await fs.unlinkSync(pathname);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

//Clean snippets folder
const cleanSnippets = async () => {
  const snippetsToClean = [snippetReferencesFilename, pageDataFilename];

  await fs.readdirSync(`./${themeSnippetsFolder}`).forEach(async (fileName) => {
    if (snippetsToClean.includes(fileName)) {
      try {
        await fs.unlinkSync(`./${themeSnippetsFolder}/${fileName}`);
      } catch (err) {
        console.error(err);
        process.exit(1);
      }
    }
  });
};

//Clean sections folder
const cleanSections = async () => {
  await fs.readdirSync(`./${themeSectionsFolder}`).forEach(async (fileName) => {
    try {
      await fs.unlinkSync(`./${themeSectionsFolder}/${fileName}`);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  });
};

//Clean assets folder
//Loop through all assets and if contains bundlename, remove
const cleanAssets = async () => {
  try {
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
};

//Clean all
const cleanAll = async () => {
  try {
    await cleanThemeLiquid();
    await cleanSnippets();
    await cleanSections();
    await cleanAssets();

    console.log("\x1b[32m%s\x1b[0m", "🍆 Cleaned assets!");
  } catch (err) {
    console.log(err);
    process.exit(2);
  }
};

//Export
module.exports = {
  cleanThemeLiquid,
  cleanSnippets,
  cleanSections,
  cleanAssets,
  cleanAll,
};
