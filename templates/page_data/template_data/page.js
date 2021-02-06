const page_keys = require("../page_keys.js");
const pageDataPartial = require("../data_partials/page");

const data = `
  {% if page %}
    ${pageDataPartial}
  {% endif %}
`;

const config = {
  key: page_keys.PAGE,
  data,
};

module.exports = config;
