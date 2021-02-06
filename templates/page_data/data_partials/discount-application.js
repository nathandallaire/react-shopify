// https://shopify.dev/docs/themes/liquid/reference/objects/discount-application

const data = `
  target_selection: "{{discount_application.target_selection}}",
  target_type: "{{discount_application.target_type}}",
  title: "{{discount_application.title | escape}}",
  total_allocated_amount: "{{discount_application.total_allocated_amount}}",
  type: "{{discount_application.type | escape }}",
  value: "{{discount_application.value}}",
  value_type: "{{discount_application.value_type}}",
`;

module.exports = data;
