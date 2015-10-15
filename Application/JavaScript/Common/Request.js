import axios from 'axios';

const emptyFunction = function () {};

export function GetSource (source, successFunction: emptyFunction, errorFunction: emptyFunction) {
  axios.get(source)
    .then((response) => {
      successFunction(response);
    })
    .catch((response) => {
      errorFunction(response);
    })
}