const chokidar = require("chokidar");
const { watch } = require("fs");
const path = require("path");
const debounce = require("lodash/debounce");

const onFilechangeHandler = () => {
  const watchPath = path.resolve(__dirname, "../public");

  const handleUpdate = (event, path) => {
    console.log(event, path);
  };

  chokidar.watch(watchPath).on("all", debounce(handleUpdate, 200));
};

module.exports = onFilechangeHandler;
