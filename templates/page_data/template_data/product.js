const page_keys = require("../page_keys.js");
const productDataPartial = require("../data_partials/product");
const collectionDataPartial = require("../data_partials/collection");
const { dataForEach } = require("../helper");

const data = `
  {% if product %}

    ${productDataPartial}
    ${dataForEach({
      key: "collections",
      obj: "collection",
      arr: "product.collections",
      data: collectionDataPartial,
      eachType: "OBJ",
    })}  
     
  {% endif %}
`;

const config = {
  key: page_keys.PRODUCT,
  data,
  sectionPrefix: "prd",
  sections: [
    {
      section: "slider",
      as: "payner",
    },
    {
      section: "test",
    },
  ],
};

module.exports = config;
