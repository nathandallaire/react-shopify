const page_keys = require("../page_keys.js");
const pageDataPartial = require("../data_partials/page");

const data = `
  ${pageDataPartial}
`;

const config = {
  key: page_keys.PAGE,
  data,
};

module.exports = config;
