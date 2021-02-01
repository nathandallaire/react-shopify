const sqrl = require("squirrelly");

const render = (template, dataObject) => {
  const rendered = sqrl.render(template, dataObject, {
    tags: ["--", "--"],
  });

  return rendered;
};

module.exports = render;
