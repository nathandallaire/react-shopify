//https://shopify.dev/docs/themes/liquid/reference/objects/customer

const data = `
  logged_in: {% if customer %}true{% else %}false{% endif %},
  email: "{{customer.email}}",
  has_account: "{{customer.has_account}}",
  id: "{{customer.id}}",
  first_name: "{{customer.first_name}}",
  last_name: "{{customer.last_name}}",
  orders: [{% for order in customer.orders %}"{{ order.id }}"{{unless forloop.last}},{{forloop.last}}{% endfor %}],
  orders_count: "{{customer.orders_count}}",
`;

module.exports = data;
