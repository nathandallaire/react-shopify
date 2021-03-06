// https://shopify.dev/docs/themes/liquid/reference/objects/page

const data = `
  author: "{{page.author | escape}}",
  content: "{{page.content | strip_newlines | rstrip | strip | escape}}",
  handle: "{{page.handle}}",
  id: "{{page.id}}",
  published_at: "{{page.published_at}}",
  template_suffix: "{{page.template_suffix | escape}}",
  title: "{{page.title | escape}}",
  url: "{{page.url | escape}}",
`;

module.exports = data;
