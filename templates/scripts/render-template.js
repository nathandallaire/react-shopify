const Sqrl = require("squirrelly");

const replaceAll = (str, find, replace, ignore) => {
  return str.replace(
    new RegExp(
      find.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"),
      ignore ? "gi" : "g"
    ),
    typeof replace == "string" ? replace.replace(/\$/g, "$$$$") : replace
  );
};

Sqrl.filters.define("replace", function (str, find, replace) {
  const replaced = replaceAll(str, find, replace);
  return replaced;
});

const render = (template, dataObject) => {
  const rendered = Sqrl.render(template, dataObject, {
    tags: ["--", "--"],
  });

  return rendered;
};

module.exports = render;
