//https://shopify.dev/docs/themes/liquid/reference/objects/collection
const { dataForEach } = require("../helper");

const data = `
  all_products_count: "{{collection.all_products_count}}",
  ${dataForEach({
    key: "all_tags",
    obj: "tag",
    arr: "collection.all_tags",
    data: "{{tag}}",
    eachType: "STR",
  })}
  ${dataForEach({
    key: "all_types",
    obj: "type",
    arr: "collection.all_types",
    data: "{{type}}",
    eachType: "STR",
  })}
  all_vendors: "{{collection.all_vendors}}",
  current_type: "{{collection.current_type}}",
  current_vendor: "{{collection.current_vendor}}",
  default_sort_by: "{{collection.default_sort_by}}",
  description: "{{collection.description | strip_newlines | rstrip | strip | escape}}",
  handle: "{{collection.handle}}",
  id: "{{collection.id}}",
  image: "{{collection.image}}",
  next_product: "{{collection.next_product}}",
  previous_product: "{{collection.previous_product}}",
  products_count: "{{collection.products_count}}",
  published_at: "{{collection.published_at}}",
  sort_by: "{{collection.sort_by}}",
  ${dataForEach({
    key: "sort_options",
    obj: "option",
    arr: "collection.sort_options",
    data: `
      value: "{{option.value}}",
      name: "{{option.name}}",
    `,
    eachType: "OBJ",
  })}
  template_suffix: "{{collection.template_suffix}}",
  title: "{{collection.title}}",
  ${dataForEach({
    key: "tags",
    obj: "tag",
    arr: "collection.tags",
    data: "{{tag}}",
    eachType: "STR",
  })}
`;

module.exports = data;
