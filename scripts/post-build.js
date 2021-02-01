const fs = require("fs");
const path = require("path");
const {
  distFolder,
  themeAssetsFolder,
  bundleName,
  bundleNamePrefix,
  envKeys,
} = require(path.resolve(__dirname, "../build.config.js"));

const formatFilenameForAssets = (filename) => {
  const withoutExtension = filename.split(".").slice(0, -1).join(".");
  return `${withoutExtension}.js.liquid`;
};

const getBundleFilenameWithoutExtension = () => {
  return `${bundleNamePrefix}.${bundleName}`;
};

const getFileData = async (fileLocation) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await fs.readFileSync(fileLocation, "utf8");
      const newData = `{% raw %}${data}{% endraw %}`;
      resolve(newData);
    } catch (err) {
      reject(err);
    }
  });
};

const writeFileToTheme = async (writeToLocation, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(writeToLocation, data, function (err) {
      if (err) return reject(err);

      resolve(true);
    });
  });
};

const initiateAsync = async () => {
  return new Promise((resolve, reject) => {
    fs.readdirSync(`./${distFolder}`).forEach(async (fileName) => {
      if (!fileName.includes(bundleNamePrefix)) return;
      try {
        const data = await getFileData(`./${distFolder}/${fileName}`);
        const newFilename = formatFilenameForAssets(fileName);
        await writeFileToTheme(`./${themeAssetsFolder}/${newFilename}`, data);
        return resolve(true);
      } catch (err) {
        reject(err);
      }
    });
  });
};

const postBuildInit = async () => {
  //Dont upload if working locally
  if (process.env.NODE_ENV === envKeys.dev && process.env.SERVE_LOCALLY) return;

  try {
    await initiateAsync();
    console.log("\x1b[32m%s\x1b[0m", `🍆 Copied bundle to Theme.`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = {
  postBuildInit,
  getBundleFilenameWithoutExtension,
};
