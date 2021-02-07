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
  new Promise(async (resolve, reject) => {
    fetch(action, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: getUrlString(formToJSON(inputs)),
    })
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};
