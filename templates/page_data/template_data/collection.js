const page_keys = require("../page_keys.js");
const productDataPartial = require("../data_partials/product");
const collectionDataPartial = require("../data_partials/collection");
const { dataForEach } = require("../helper");

const data = `
  {% if collection %}
    ${collectionDataPartial}
    ${dataForEach({
      key: "products",
      obj: "product",
      arr: "collection.products",
      data: productDataPartial,
      eachType: "OBJ",
    })}
  {% endif %}
`;

const config = {
  key: page_keys.COLLECTION,
  data,
};

module.exports = config;
