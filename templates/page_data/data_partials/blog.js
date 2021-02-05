// https://shopify.dev/docs/themes/liquid/reference/objects/page
const articleDataPartial = require("./article");
const { dataForEach } = require("../helper");

const data = `
  {% paginate blog.articles by 12 %}

  ${dataForEach({
    key: "all_tags",
    obj: "tag",
    arr: "blog.all_tags",
    data: "{{tag}}",
    eachType: "STR",
  })}
  ${dataForEach({
    key: "articles",
    obj: "article",
    arr: "blog.articles",
    data: `
      ${articleDataPartial}
    `,
    eachType: "OBJ",
  })}
  articles_count: "{{blog.articles_count}}",
  comments_enabled: "{{blog.comments_enabled}}",
  handle: "{{blog.handle}}",
  id: "{{blog.id | escape}}",
  moderated: "{{blog.moderated}}",
  next_article: "{{blog.next_article}}",
  previous_article: "{{blog.previous_article}}",
  ${dataForEach({
    key: "tags",
    obj: "tag",
    arr: "blog.tags",
    data: "{{tag}}",
    eachType: "STR",
  })}
  title: "{{blog.title}}",
  url: "{{blog.url}}",

  {% endpaginate %}
`;

module.exports = data;
