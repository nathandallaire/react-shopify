const { envKeys } = require("../build.config.js");
const buildAssets = require("../templates/scripts/build");

const preBuildInit = async () => {
  switch (process.env.NODE_ENV) {
    case envKeys.dev:
      console.log("\x1b[36m%s\x1b[0m", "😎 Development mode");
      break;
    case envKeys.prod:
      console.log("\x1b[33m%s\x1b[0m", "⚠️ Production Mode");
      break;
    default:
      console.log(
        "\x1b[34m%s\x1b[0m",
        "No idea what environment we're working in 😎."
      );
      break;
  }

  await buildAssets();
};

module.exports = preBuildInit;
