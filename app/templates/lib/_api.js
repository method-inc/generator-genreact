/** @flow */
var status: Promise = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  return response.json().then(data => {
    throw new Error(JSON.stringify(data));
  });
};

var json: Promise = response => response.json();

export default function(path: string, options: mixed): Promise {
  return fetch(
    `${process.env.API_URL}/api/${path}`,
    options
  )
  .then(status)
  .then(json);
}


