//https://shopify.dev/docs/themes/liquid/reference/objects/shop

const data = `
  address: {{shop.address | json}},
  name: "{{shop.name}}",
  currency: {{shop.currency | json}},
  customer_accounts_enabled: "{{shop.customer_accounts_enabled}}",
  customer_accounts_optional: "{{shop.customer_accounts_optional}}",
  description: "{{shop.description}}",
  domain: "{{shop.domain}}",
  email: "{{shop.email}}",
`;

module.exports = data;
