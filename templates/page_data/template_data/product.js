const page_keys = require("../page_keys.js");
const productDataPartial = require("../data_partials/product");
const collectionDataPartial = require("../data_partials/collection");
const { dataForEach } = require("../helper");

const data = `
  ${productDataPartial}
  ${dataForEach({
    key: "collections",
    obj: "collection",
    arr: "product.collections",
    data: collectionDataPartial,
    eachType: "OBJ",
  })}
`;

const config = {
  key: page_keys.PRODUCT,
  data,
};

module.exports = config;
