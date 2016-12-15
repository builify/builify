function atou (str) {
  return decodeURIComponent(escape(window.atob(str)));
}

export default function (data) {
  const parsedData = JSON.parse(atou(data));

  console.log(parsedData);

  return parsedData;
}
