// https://shopify.dev/docs/themes/liquid/reference/objects/line_item/
const discountApplicationDataPartial = require("./discount-application");
const { dataForEach } = require("../helper");

const data = `
  ${dataForEach({
    key: "discount_allocations",
    obj: "discount_allocation",
    arr: "line_item.discount_allocations",
    data: `
      amount: "{{discount_allocation.amount}}",
      discount_application: {
        {% assign discount_application = discount_allocation.discount_application %}
        ${discountApplicationDataPartial}
      },
    `,
    eachType: "OBJ",
  })}
  final_line_price: "{{line_item.final_line_price}}",
  final_price: "{{line_item.final_price}}",
  fulfillment_service: "{{line_item.fulfillment_service | escape}}",
  gift_card: {{ line_item.gift_card }},
  grams: "{{line_item.grams}}",
  image: "{{ line_item.image | img_url: '100x100' | img_tag }}",
  key: "{{line_item.key}}",
  ${dataForEach({
    key: "line_level_discount_allocations",
    obj: "discount_allocation",
    arr: "line_item.line_level_discount_allocations",
    data: `
      amount: "{{discount_allocation.amount}}",
      discount_application: {
        {% assign discount_application = discount_allocation.discount_application %}
        ${discountApplicationDataPartial}
      },
    `,
    eachType: "OBJ",
  })}
  line_level_total_discount: "{{line_item.line_level_total_discount}}",
  message: "{{line_item.message | strip_newlines | escape}}",
  ${dataForEach({
    key: "options_with_values",
    obj: "product_option",
    arr: "product.product.options_with_values",
    data: `
      name: product_option.name,
      ${dataForEach({
        key: "values",
        obj: "value",
        arr: "product_option.values",
        data: `{{value}}`,
        eachType: "STR",
      })}
    `,
    eachType: "OBJ",
  })}
  original_line_price: "{{line_item.original_line_price}}",
  original_price: "{{line_item.original_price}}",
  product_id: "{{line_item.product_id}}",
  ${dataForEach({
    key: "properties",
    obj: "property",
    arr: "line_item.properties",
    data: "{{property}}",
    eachType: "STR",
  })}
  quantity: "{{line_item.quantity}}",
  requires_shipping: {{line_item.requires_shipping}},
  sku: "{{line_item.sku}}",
  successfully_fulfilled_quantity: "{{line_item.successfully_fulfilled_quantity}}",
  taxable: {{line_item.taxable}},
  title: "{{line_item.title | escape}}",
  unit_price: "{{line_item.unit_price}}",
  unit_price_measurement: "{{line_item.unit_price_measurement}}",
  url: "{{line_item.url}}",
  variant: {{line_item.variant}},
  variant_id: "{{line_item.variant_id}}",
  vendor: "{{line_item.vendor}}",
  id: "{{line_item.id}}",
`;

module.exports = data;
