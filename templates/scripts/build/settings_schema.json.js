const decache = require("decache");
const fs = require("fs");
const { envKeys, themeConfigFolder } = require("../../../build.config.js");
const { builtConsoleLog } = require("./utility");

const buildSettingsSchema = async () => {
  const settingsPathname = "../../theme/config/settings_schema.js";
  decache(settingsPathname);
  const data = require(settingsPathname);

  let toJson = JSON.stringify(data);
  if (process.env.NODE_ENV === envKeys.dev) {
    toJson = JSON.stringify(data, null, "  ");
  }

  try {
    const filenamePath = `${themeConfigFolder}/settings_schema.json`;
    await fs.writeFileSync(`./${filenamePath}`, toJson);

    builtConsoleLog(filenamePath);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = buildSettingsSchema;
