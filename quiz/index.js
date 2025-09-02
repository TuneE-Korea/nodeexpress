const city = require("./data.js");
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/korea", (req, res) => {
  res.send("Hello Korea!!!!!!!!!!!!!");
});

app.get("/japan/:id", (req, res) => {
  const { id } = req.params;
  const result = !!city.japan[+id]
    ? `${city.japan[+id]} 입니다.`
    : "그런 도시없습니다.";
  res.send(result);
});

app.get("/usa/:id", (req, res) => {
  const { id } = req.params;
  const result = !!city.usa[+id]
    ? `${city.usa[+id]} 입니다.`
    : "그런 도시없습니다.";
  res.send(result);
});

app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`);
});
