// https://shopify.dev/docs/themes/liquid/reference/objects/cart
const { dataForEach } = require("../helper");
const discountApplicationDataPartial = require("./discount-application");
const currencyDataPartial = require("./currency");
const lineItemDataPartial = require("./line_item");

const data = `
  attributes: {{cart.attributes | json}},
  ${dataForEach({
    key: "cart_level_discount_applications",
    obj: "discount_application",
    arr: "cart.cart_level_discount_applications",
    data: discountApplicationDataPartial,
    eachType: "OBJ",
  })}
  currency: {
    {% assign origCurrency = currency %}
    {% assign currency = cart.currency %}
    ${currencyDataPartial}
    {% assign currency = origCurrency %} 
  },
  ${dataForEach({
    key: "discount_applications",
    obj: "discount_application",
    arr: "cart.discount_applications",
    data: discountApplicationDataPartial,
    eachType: "OBJ",
  })}
  item_count: "{{cart.item_count}}",
  ${dataForEach({
    key: "items",
    obj: "line_item",
    arr: "cart.items",
    data: lineItemDataPartial,
    eachType: "OBJ",
  })}
  items_subtotal_price: "{{cart.items_subtotal_price}}",
  note: "{{cart.note | strip_newlines | escape}}",
  original_total_price: "{{cart.original_total_price}}",
  total_discount: "{{cart.total_discount}}",
  total_price: "{{cart.total_price}}",
  total_weight: "{{cart.total_weight}}",
`;

module.exports = data;
