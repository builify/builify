import axios from 'axios';

export function GetSource (source, successFunction, errorFunction) {
  axios.get(source)
    .then((response) => {
      successFunction(response);
    })
    .catch((response) => {
      errorFunction(response);
    })
}
