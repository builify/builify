export function fetch (url) {
  return new Promise(function (resolve, reject) {
    const request = new XMLHttpRequest();

    request.onreadystatechange = function() {
      if (request.readyState === 4) { // done
        if (request.status === 200) { // complete
          resolve(request.responseText);
        }
      }
    };

    request.onerror = function (e) {
      reject(e.target.status);
    };

    request.open('GET', url, true);
    request.send(null);
  });
}
