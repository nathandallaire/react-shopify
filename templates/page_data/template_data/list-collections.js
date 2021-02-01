const page_keys = require("../page_keys.js");
const { dataForEach } = require("../helper");
const collectionDataPartial = require("../data_partials/collection");
const productDataPartial = require("../data_partials/product");

const data = `
  ${dataForEach({
    key: "collections",
    obj: "link",
    arr: "linklists['all-collections'].links",
    data: `
      {% assign collection_handle = link.url | remove:shop.url | remove:'collections' | remove:'//' %}
      {% assign collection = collections[collection_handle] %}
      ${collectionDataPartial}
      ${dataForEach({
        key: "products",
        obj: "product",
        arr: "collection.products",
        data: productDataPartial,
        eachType: "OBJ",
      })}
    `,
    eachType: "OBJ",
  })}
`;

const config = {
  key: page_keys.LIST_COLLECTIONS,
  data,
};

module.exports = config;
