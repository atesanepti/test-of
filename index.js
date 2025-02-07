const myHeaders = new Headers();
myHeaders.append(
  "x-apihub-key",
  "PnvcWq-rZ9m11dS97B--ouXkprg8K2fGidLDwLHJy1V9hiyNgz"
);
myHeaders.append(
  "x-apihub-host",
  "Cricbuzz-Official-Cricket-API.allthingsdev.co"
);
myHeaders.append("x-apihub-endpoint", "e0cb5c72-38e1-435e-8bf0-6b38fbe923b7");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

fetch(
  "https://Cricbuzz-Official-Cricket-API.proxy-production.allthingsdev.co/matches/live",
  requestOptions
)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
