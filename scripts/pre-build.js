const { envKeys } = require("../build.config.js");
const buildTheme = require("../templates/scripts/build/theme.liquid.js");

const preBuildInit = async () => {
  switch (process.env.NODE_ENV) {
    case envKeys.dev:
      console.log("\x1b[36m%s\x1b[0m", "😎 Development mode");
      break;
    case envKeys.prod:
      console.log("\x1b[33m%s\x1b[0m", "⚠️  Production Mode");
      break;
    default:
      console.log(
        "\x1b[34m%s\x1b[0m",
        "No idea what environment we're working in 😎."
      );
      break;
  }

  try {
    //Build theme.liquid file
    await buildTheme();
  } catch (err) {
    console.log(err);
    process.exit(2);
  }
};

module.exports = preBuildInit;
