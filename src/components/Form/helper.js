//To JSON
const formToJSON = (elements) => {
  return [].reduce.call(
    elements,
    (data, element) => {
      data[element.name] = element.value;
      return data;
    },
    {}
  );
};

//URL Stringify
const getUrlString = (data) => {
  var urlParameters = Object.entries(data)
    .map((e) => {
      return e.join("=");
    })
    .join("&");

  return urlParameters;
};

// Submit data via Fetch
export const submitForm = async (action, inputs) => {
  const body = encodeURIComponent(getUrlString(formToJSON(inputs)));

  console.log(action);
  console.log(body);

  return fetch(action, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body,
  });
};
