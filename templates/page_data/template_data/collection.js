const page_keys = require("../page_keys.js");
const productDataPartial = require("../data_partials/product");
const collectionDataPartial = require("../data_partials/collection");
const { dataForEach } = require("../helper");

const data = `
  ${collectionDataPartial}
  ${dataForEach({
    key: "products",
    obj: "product",
    arr: "collection.products",
    data: productDataPartial,
    eachType: "OBJ",
  })}
`;

const config = {
  key: page_keys.COLLECTION,
  data,
};

module.exports = config;
