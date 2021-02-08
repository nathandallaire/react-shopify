const path = require("path");
const fs = require("fs");
const decache = require("decache");
const renderTemplate = require("../render-template");
const { themeSectionsFolder } = require("../../../build.config.js");
const templateName = `TEMPLATE.liquid`;
const templatePath = path.resolve(
  __dirname,
  `../../theme/sections/${templateName}`
);
const sectionTemplatesDir = "../../theme/sections";
const {
  getFilenameWithoutExt,
  getSectionName,
  getPageSectionsArray,
  getPagesConfig,
  builtConsoleLog,
} = require("./utility");

const buildSection = async (options) => {
  const { sectionName, outputName, buildForTemplate } = options;
  const dataPath = `${sectionTemplatesDir}/${sectionName}`;
  decache(dataPath);
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
    const writeToFile = async (filenameOutput, isHomepage) => {
      const injectedTemplate = renderTemplate(templateContent, {
        config,
        json: isHomepage ? json : otherPagesSchemaJSON,
        timestamp: Date.now(),
      });

      const filePathname = `${themeSectionsFolder}/${filenameOutput}.liquid`;

      try {
        await fs.writeFileSync(`./${filePathname}`, injectedTemplate);
        builtConsoleLog(filePathname);
      } catch (err) {
        console.log(err);
      }
    };

    const filename = `${sectionNameWithoutExt}`;
    const pagesConfig = getPagesConfig();
    const pagesConfigurationArray = [...Object.values(pagesConfig)];

    /* =======================================
    1. Build for specific template
    -  Return after for efficiency/upload sake.
    -  This is used only when page template changes
    ======================================= */
    if (buildForTemplate) {
      let pageSpecificBuilds = [];

      pagesConfigurationArray.forEach((pageConfig) => {
        if (buildForTemplate !== pageConfig.key) return;

        pageSpecificBuilds = getPageSectionsArray({
          pageConfig,
          specificSection: sectionName,
          ignoreGlobal: true,
        });
      });

      //Build out sections
      pageSpecificBuilds.forEach(async (outputName) => {
        if (!outputName) return;
        await writeToFile(outputName, false);
      });

      //WE'RE DONE HERE
      return;
    }

    /* =======================================
    2. Build global template on section change
    ======================================= */
    await writeToFile(filename, true);

    /* =======================================
    3. Build specific templates on section change
    ======================================= */
    pagesConfigurationArray.forEach(async (pageConfig) => {
      if (!pageConfig.sections) return;

      pageConfig.sections.forEach(async (sectionObject) => {
        if (sectionNameWithoutExt !== sectionObject.section) return;
        if (!sectionObject.as) return;
        if (!pageConfig.sectionPrefix)
          return console.log(`No sectionPrefix for template ${pageConfig.key}`);

        const filename = getSectionName(
          pageConfig.sectionPrefix,
          sectionObject.as ? sectionObject.as : sectionObject.section
        );
        await writeToFile(filename, false);
      });
    });
  } catch (err) {
    console.log(err);
    process.exit(2);
  }
};

const buildPageSpecificSections = async (pageTemplate) => {
  const pages = getPagesConfig();
  const pageObject = pages[pageTemplate];

  if (!pageObject) {
    console.log(`No template "${pageTemplate}" returned in getPagesConfig()`);
    return process.exit(2);
  }

  if (!pageObject.sections) return;

  pageObject.sections.forEach(async (sectionObject) => {
    //Section prefix required check if not global
    if (sectionObject.as && !pageObject.sectionPrefix) {
      console.log(
        `No sectionPrefix supplied for ${pageObject.key} when requesting page-specific section`
      );
      return process.exit(2);
    }

    //If page-specific, create
    if (sectionObject.as) {
      await buildSection({
        sectionName: `${sectionObject.section}.js`,
        outputName: getSectionName(
          pageObject.sectionPrefix,
          sectionObject.as ? sectionObject.as : sectionObject.section
        ),
        buildForTemplate: pageTemplate,
      });
    }
  });
};

const buildAllPageSections = async () => {
  const pagesConfig = getPagesConfig();
  const configArray = [...Object.values(pagesConfig)];

  configArray.forEach(async (pageDataObject) => {
    await buildPageSpecificSections(pageDataObject.key);
  });
};

const buildAllSections = async () => {
  const sectionsPath = path.resolve(__dirname, sectionTemplatesDir);
  await buildAllPageSections();

  await fs.readdirSync(sectionsPath).forEach(async (fileName) => {
    if (fileName === templateName) return;

    try {
      await buildSection({
        sectionName: fileName,
      });
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  });
};

module.exports = {
  buildSection,
  buildAllSections,
  buildPageSpecificSections,
};
