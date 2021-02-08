// https://shopify.dev/docs/themes/liquid/reference/objects/page
const articleDataPartial = require("./article");
const { dataForEach } = require("../helper");
const paginationDataPartial = require("./pagination");

const data = `
  {% paginate blog.articles by 10 %}

    ${dataForEach({
      key: "all_tags",
      obj: "tag",
      arr: "blog.all_tags",
      data: "{{tag | escape}}",
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
    articles_count: {{blog.articles_count}},
    comments_enabled: {% if blog.comments_enabled %}true{% else %}false{% endif %},
    handle: "{{blog.handle}}",
    id: "{{blog.id | escape}}",
    moderated: "{{blog.moderated}}",
    next_article: "{{blog.next_article | escape}}",
    previous_article: "{{blog.previous_article | escape}}",
    ${dataForEach({
      key: "tags",
      obj: "tag",
      arr: "blog.tags",
      data: "{{tag | escape}}",
      eachType: "STR",
    })}
    title: "{{blog.title | escape}}",
    url: "{{blog.url | escape}}",
    ${paginationDataPartial}

  {% endpaginate %}
`;

module.exports = data;
