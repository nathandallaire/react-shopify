const page_keys = require("../page_keys.js");
const productDataPartial = require("../data_partials/product");
const articleDataPartial = require("../data_partials/article");
const { dataForEach } = require("../helper");

const data = `
  {% if search %}
    {% assign search_pagination = 12 %}
    {% paginate search.results by search_pagination %}

      performed: {% if search.performed %}true{% else %}false{% endif %},
      results: "{{search.results}}",
      ${dataForEach({
        key: "results",
        obj: "item",
        arr: "search.results",
        data: `
          {% unless item.object_type == 'article' %}
            type: 'PRODUCT',
            {% assign product = item %}
            ${productDataPartial}
          {% else %}
            type: 'ARTICLE',
            {% assign article = item %}
            ${articleDataPartial}
          {% endunless %}
        `,
        eachType: "OBJ",
      })}
      results_count: '{{search.results_count}}',
      terms: "{{search.terms}}",
      types: "{{search.types}}",

    {% endpaginate %}
  {% endif %}
`;

const config = {
  key: page_keys.SEARCH,
  data,
};

module.exports = config;
