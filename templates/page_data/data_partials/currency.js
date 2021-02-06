const data = `
  name: "{{currency.name | escape}}",
  iso_code: "{{currency.iso_code | escape}}",
  symbol: "{{currency.symbol | escape}}",
`;

module.exports = data;
