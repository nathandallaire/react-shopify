//https://shopify.dev/docs/themes/liquid/reference/objects/customer
const { dataForEach } = require("../helper");

const data = `  
  accepts_marketing: "{{customer.accepts_marketing}}",
  addresses: "{{customer.addresses}}",
  addresses_count: "{{customer.addresses_count}}",
  default_address: "{{customer.default_address}}",
  email: "{{customer.email}}",
  first_name: "{{customer.first_name}}",
  has_account: "{{customer.has_account}}",
  id: "{{customer.id}}",
  last_name: "{{customer.last_name}}",
  last_order: "{{customer.last_order}}",
  name: "{{customer.name}}",
  orders: [{% for order in customer.orders %}"{{ order.id }}"{{unless forloop.last}},{{forloop.last}}{% endfor %}],
  orders_count: "{{customer.orders_count}}",
  phone: "{{customer.phone}}",
  ${dataForEach({
    key: "tags",
    obj: "tag",
    arr: "customer.tags",
    data: "{{tag}}",
    eachType: "STR",
  })}
  tax_exempt: "{{customer.tax_exempt}}",
  total_spent: "{{customer.total_spent}}",
`;

module.exports = data;
