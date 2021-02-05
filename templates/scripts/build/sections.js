const path = require("path");
const fs = require("fs");
const renderTemplate = require("../render-template");
const { themeSectionsFolder } = require("../../../build.config.js");
const templatePath = path.resolve(
  __dirname,
  `../../theme/sections/section.liquid`
);

const getFilenameWithoutExt = (filename) => {
  if (!filename.includes(".")) return filename;

  const split = filename.split(".");
  return split[0];
};

const buildSection = async (sectionName) => {
  const dataPath = `../../page_data/sections/${sectionName}`;
  const config = require(dataPath);
  const sectionNameWithoutExt = getFilenameWithoutExt(sectionName);

  //Recursively remove keys
  function recursivelyRemoveKeyFromObj(obj, key) {
    for (prop in obj) {
      if (prop === key) delete obj[prop];
      else if (typeof obj[prop] === "object")
        recursivelyRemoveKeyFromObj(obj[prop]);
    }
  }

  //Cleaning json / removing \n breaks
  const cleanJson = (json) => {
    return json.replace(/\\n/g, "").replace(/\\/g, "");
  };

  //config with 'data' removed
  const copyAsJson = JSON.stringify(config);
  const dataCleaned = { ...JSON.parse(copyAsJson) };

  //Remove data keys..
  recursivelyRemoveKeyFromObj(dataCleaned, "data");

  //Remove page keys
  if (dataCleaned.pages) {
    delete dataCleaned["pages"];
  }

  //Remove data from settings
  if (dataCleaned.settings) {
    dataCleaned.settings.forEach((setting, i) => {
      recursivelyRemoveKeyFromObj(dataCleaned.settings[i], "data");
    });
  }

  //Remove data key from blocks settings
  if (dataCleaned.blocks) {
    dataCleaned.blocks.forEach((block, i) => {
      recursivelyRemoveKeyFromObj(dataCleaned.blocks[i], "data");

      if (block.settings) {
        block.settings.forEach((setting, i) => {
          recursivelyRemoveKeyFromObj(block.settings[i], "data");
        });
      }
    });
  }

  //config as json
  let json = cleanJson(JSON.stringify(dataCleaned, null, "  "));

  //schema for other pages
  //Remove 'presets' key so it doesnt show up as repeat in homepage sections
  const otherPagesSchema = JSON.parse(json);
  delete otherPagesSchema["presets"];
  const otherPagesSchemaJSON = JSON.stringify(otherPagesSchema, null, "  ");

  //Render template
  try {
    const templateContent = await fs.readFileSync(templatePath, "utf8");

    //Write to the file
    const writeToFile = async (filenameWithoutExt, isHomepage) => {
      const injectedTemplate = renderTemplate(templateContent, {
        config,
        json: isHomepage ? json : otherPagesSchemaJSON,
        timestamp: Date.now(),
      });

      await fs.writeFileSync(
        `./${themeSectionsFolder}/${filenameWithoutExt}${sectionNameWithoutExt}.liquid`,
        injectedTemplate
      );
    };

    //Write as global/homepage
    writeToFile("", true);

    //If the section is used on multiple pages
    if (config.pages) {
      config.pages.forEach(async (page) => {
        writeToFile(`${page}-`, false);
      });
    }
  } catch (err) {
    console.log(err);
    process.exit(2);
  }
};

const buildAllSections = async () => {
  const sectionsPath = path.resolve(__dirname, "../../page_data/sections");

  await fs.readdirSync(sectionsPath).forEach(async (fileName) => {
    try {
      await buildSection(fileName);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  });
};

module.exports = {
  buildSection,
  buildAllSections,
};
