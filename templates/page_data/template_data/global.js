const page_keys = require("../page_keys.js");
const external_scripts = require("../external_scripts");
const shopDataPartial = require("../data_partials/shop.js");
const customerDataPartial = require("../data_partials/customer.js");
const cartDataPartial = require("../data_partials/cart.js");

const data = `
  currency: {
    {% assign testPrice =  100 | money %}
    {% assign symbolArr = testPrice | split: '1' %}
    {% assign symbol = symbolArr[0] %}
    currencySymbol: "{{ symbol }}", 
  },
  shop: {
    ${shopDataPartial} 
  },
  customer: {
    ${customerDataPartial}
  },
  cart: {
    ${cartDataPartial}
  },
  template: "{{template.name | escape}}",
`;

const config = {
  key: page_keys.GLOBAL,
  externalScripts: [external_scripts.JQUERY, external_scripts.MOMENT],
  data,
};

module.exports = config;
