// https://shopify.dev/docs/themes/liquid/reference/objects/article
const { dataForEach } = require("../helper");

const data = `
  author: "{{article.author}}",
  comments: "{{article.comments}}",
  comments_count: "{{article.comments_count}}",
  comments_enabled: "{{article.comments_enabled}}",
  comment_post_url: "{{article.comment_post_url}}",
  content: "{{article.content | strip_newlines | rstrip | strip | escape}}",
  created_at: "{{article.created_at}}",
  excerpt: "{{article.excerpt | strip_newlines | rstrip | strip | escape}}",
  excerpt_or_content: "{{article.excerpt_or_content | strip_newlines | rstrip | strip | escape}}",
  handle: "{{article.handle}}",
  id: "{{article.id}}",
  image: "{{article.image}}",
  moderated: "{{article.moderated}}",
  published_at: "{{article.published_at}}", 
  ${dataForEach({
    key: "tags",
    obj: "tag",
    arr: "article.tags",
    data: "{{tag}}",
    eachType: "STR",
  })}
  title: "{{article.title}}",
  updated_at: "{{article.updated_at}}",
  url: "{{article.url}}",
  user: "{{article.user}}",
`;

module.exports = data;
