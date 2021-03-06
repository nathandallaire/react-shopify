//https://shopify.dev/docs/themes/liquid/reference/objects/product
const { dataForEach } = require("../helper");
const variantDataPartial = require("../data_partials/variant");

const data = `
  available: "{{product.available | escape}}",
  compare_at_price: "{{product.compare_at_price | escape}}",
  compare_at_price_max: {{product.compare_at_price_max | escape}},
  compare_at_price_min: {{product.compare_at_price_min | escape}},
  compare_at_price_varies: {{product.compare_at_price_varies | escape}},
  content: "{{product.content | strip_newlines | rstrip | strip | escape}}",
  created_at: "{{product.created_at | escape}}",
  description: "{{product.description | strip_newlines | rstrip | strip | escape}}",
  featured_image: "{{product.featured_image | img_url:'master' }}",
  featured_media: "{{product.featured_media | img_url:'master'}}",
  handle: "{{product.handle}}",
  has_only_default_variant: "{{product.has_only_default_variant}}",
  id: "{{product.id}}",
  images: "{{product.images}}",
  media: "{{product.media}}",
  ${dataForEach({
    key: "options",
    obj: "option",
    arr: "product.options",
    data: `{{option | escape}}`,
    eachType: "STR",
  })}
  options_by_name: {
    {% for option in product.options %}
      ${dataForEach({
        key: "'{{option}}'",
        obj: "_option",
        arr: "product.options_by_name[{{option}}].values",
        data: `{{_option | escape}}`,
        eachType: "STR",
      })}
    {% endfor %}
  },
  ${dataForEach({
    key: "options_with_values",
    obj: "product_option",
    arr: "product.product.options_with_values",
    data: `
      name: "{{product_option.name | escape}}",
      ${dataForEach({
        key: "values",
        obj: "value",
        arr: "product_option.values",
        data: `{{value | escape}}`,
        eachType: "STR",
      })}
    `,
    eachType: "OBJ",
  })}
  price: {{product.price}},
  price_max: {{product.price_max}},
  price_min: {{product.price_min}},
  price_varies: {{product.price_varies}},
  published_at: "{{product.published_at}}",
  requires_selling_plan: "{{product.requires_selling_plan | escape}}",
  selected_variant: "{{product.selected_variant}}",
  selected_of_first_available_selling_plan_allocation: "{{product.selected_of_first_available_selling_plan_allocation}}",
  selected_selling_plan: "{{product.selected_selling_plan | escape}}",
  selected_selling_plan_allocation: "{{product.selected_selling_plan_allocation | escape}}",
  selling_plan_groups: "{{product.selling_plan_groups | escape}}",
  ${dataForEach({
    key: "tags",
    obj: "tag",
    arr: "product.tags",
    data: "{{tag | escape}}",
    eachType: "STR",
  })}
  template_suffix: "{{product.template_suffix | escape}}",
  title: "{{product.title | escape}}",
  type: "{{product.type | escape}}",
  url: "{{product.url | escape}}",
  first_available_variant: {
    {% assign variant = product.first_available_variant %}
    ${variantDataPartial}
  },
  selected_or_first_available_variant: {
    {% assign variant = product.selected_or_first_available_variant %}
    ${variantDataPartial}
  },
  ${dataForEach({
    key: "variants",
    obj: "variant",
    arr: "product.variants",
    data: variantDataPartial,
    eachType: "OBJ",
  })}
`;

module.exports = data;
