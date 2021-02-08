//https://shopify.dev/docs/themes/liquid/reference/objects/shop

const data = `
  address: {{shop.address | json}},
  name: "{{shop.name | escape}}",
  currency: {{shop.currency | json}},
  customer_accounts_enabled: "{{shop.customer_accounts_enabled}}",
  customer_accounts_optional: "{{shop.customer_accounts_optional}}",
  description: "{{shop.description | escape}}",
  domain: "{{shop.domain | escape}}",
  email: "{{shop.email | escape}}",
`;

module.exports = data;
