const page_keys = require("../page_keys.js");
const blogDataPartial = require("../data_partials/blog");

const data = `
  {% if blog %}
    ${blogDataPartial}
  {% endif %}
`;

const config = {
  key: page_keys.BLOG,
  data,
};

module.exports = config;
