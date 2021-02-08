const page_keys = require("../page_keys.js");

const data = `
  {% if template == 'index' %}
    title: "Home!",
    titties: "ok!", 
    test: "OK!",
  {% endif %} 
`;

const config = {
  key: page_keys.INDEX,
  data,
  lang: ["welcome.title", "collections.title"],
};

module.exports = config;
