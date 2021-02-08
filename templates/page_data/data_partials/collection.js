//https://shopify.dev/docs/themes/liquid/reference/objects/collection
const { dataForEach } = require("../helper");

const data = `
  all_products_count: "{{collection.all_products_count}}",
  ${dataForEach({
    key: "all_tags",
    obj: "tag",
    arr: "collection.all_tags",
    data: "{{tag | escape}}",
    eachType: "STR",
  })}
  ${dataForEach({
    key: "all_types",
    obj: "type",
    arr: "collection.all_types",
    data: "{{type | escape}}",
    eachType: "STR",
  })}
  all_vendors: "{{collection.all_vendors}}",
  current_type: "{{collection.current_type | escape}}",
  current_vendor: "{{collection.current_vendor | escape}}",
  default_sort_by: "{{collection.default_sort_by | escape}}",
  description: "{{collection.description | strip_newlines | rstrip | strip | escape}}",
  handle: "{{collection.handle}}",
  id: "{{collection.id}}",
  image: "{{collection.image | img_url:'master' }}",
  next_product: "{{collection.next_product | escape}}",
  previous_product: "{{collection.previous_product | escape}}",
  products_count: "{{collection.products_count}}",
  published_at: "{{collection.published_at}}",
  sort_by: "{{collection.sort_by | escape}}",
  ${dataForEach({
    key: "sort_options",
    obj: "option",
    arr: "collection.sort_options",
    data: `
      value: "{{option.value | escape}}",
      name: "{{option.name | escape}}",
    `,
    eachType: "OBJ",
  })}
  template_suffix: "{{collection.template_suffix | escape}}",
  title: "{{collection.title | escape}}",
  ${dataForEach({
    key: "tags",
    obj: "tag",
    arr: "collection.tags",
    data: "{{tag | escape}}",
    eachType: "STR",
  })}
`;

module.exports = data;
