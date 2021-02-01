const dataForEach = ({ key, type, obj, arr, data, eachType }) => {
  let dataString = "";
  switch (eachType) {
    case "OBJ":
      dataString = `{${data}},`;
      break;
    case "STR":
      dataString = `'${data}',`;
      break;
    case "ARR":
      dataString = `[${data}],`;
      break;
    default:
      dataString = `${data},`;
      break;
  }

  let typeDelimiter;
  switch (type) {
    case "OBJ":
      typeDelimiter = ["{", "}"];
      break;
    case "ARR":
    default:
      typeDelimiter = ["[", "]"];
      break;
  }

  const forLoopStr = `
    {% for ${obj} in ${arr} %}
      ${dataString}
    {% endfor %}
  `;

  return key
    ? `${key}: ${typeDelimiter[0]}${forLoopStr}${typeDelimiter[1]},`
    : forLoopStr;
};

module.exports = { dataForEach };
