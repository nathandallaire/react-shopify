require("dotenv").config();
const path = require("path");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const exec = require("child_process").exec;
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const openBrowser = require("react-dev-utils/openBrowser");
const ESLintPlugin = require("eslint-webpack-plugin");
new webpack.optimize.ModuleConcatenationPlugin();

//Post and Pre Build Scripts
const {
  getBundleFilenameWithoutExtension,
  postBuildInit,
} = require(path.resolve(__dirname, "scripts/post-build.js"));

//On filechange callback
const onFilechangeHandler = require(path.resolve(
  __dirname,
  "templates/scripts/filechange-handler.js"
));

//Post and Pre Build Scripts
const preBuildInit = require(path.resolve(__dirname, "scripts/pre-build.js"));

//General variables
const { distFolder, envKeys } = require(path.resolve(
  __dirname,
  "build.config.js"
));

module.exports = async (env, argv) => {
  //Prod or dev
  const isDev = argv.mode === envKeys.dev;
  const isProd = argv.mode === envKeys.prod;
  const port = process.env.WEBPACK_PORT ? process.env.WEBPACK_PORT : 8069;

  //Initial on-change listener
  onFilechangeHandler();

  //Prebuild
  await preBuildInit();

  //Name of bundle file
  const filename = getBundleFilenameWithoutExtension();

  //Chunk filename
  const unixStamp = new Date().getTime() / 1000;
  const chunkName = `${filename}-[name]-chunk.js?t=${unixStamp}`;

  //Config
  let config = {
    entry: {
      app: "./src/index.js",
    },
    stats: "errors-warnings",
    output: {
      filename: filename,
      path: path.resolve(__dirname, distFolder),
      chunkFilename: chunkName,
    },
    devServer: {
      disableHostCheck: true,
      contentBase: path.resolve(__dirname, distFolder),
      port,
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    optimization: {
      minimizer: [
        //Remove .txt documents on build
        new TerserPlugin({ extractComments: false }),
      ],
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.liquid$/i,
          use: "raw-loader",
        },
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: require.resolve("babel-loader"),
              options: {
                presets: ["@babel/react", "@babel/preset-env"],
                plugins: ["@babel/proposal-class-properties"].filter(Boolean),
              },
            },
          ],
        },
      ],
    },
    plugins: [
      //isProd && new BundleAnalyzerPlugin(),
      new HtmlWebPackPlugin({
        template: path.resolve(__dirname, "scripts/public/index.html"),
        filename: "index.html",
      }),
      new CleanWebpackPlugin(),
      new ESLintPlugin({
        overrideConfigFile: path.resolve(__dirname, ".eslintrc.json"),
      }),
      {
        apply: (compiler) => {
          compiler.hooks.afterEmit.tap("AfterEmitPlugin", async () => {
            openBrowser(process.env.SITE_URL);
            await postBuildInit(argv.mode);

            if (isProd) {
              process.exit();
            }
          });
        },
      },
    ].filter(Boolean),
  };

  //If dev
  if (isDev) {
    config.devtool = "inline-source-map";
  }

  //Return config
  return config;
};
