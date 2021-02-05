const page_keys = require("../page_keys.js");
const articleDataPartial = require("../data_partials/article");

const data = `
  ${articleDataPartial}
`;

const config = {
  key: page_keys.ARTICLE,
  data,
};

module.exports = config;
