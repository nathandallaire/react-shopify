const data = `
  pagination: "{% if paginate.pages > 1 %}{{ paginate | default_pagination | strip_newlines | escape }}{% endif %}",
`;

module.exports = data;
