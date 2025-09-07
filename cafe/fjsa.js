const { positionType } = require("./data.js");
const { validateNumber } = require("./util.js");
const {
  makeReponseGetOK,
  makeReponsePostOK,
  makeReponsePutOk,
  makeReponseError,
  makeReponseDeleteOk,
} = require("./format.js");
const express = require("express");
const { createClient } = require("@supabase/supabase-js");
const URL = "https://kmhyilcpctqpgwqrnyhq.supabase.co";
const supabase = createClient(URL, KEY);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 음료 조회
app.get("/menus", async (req, res) => {
  const { data } = await supabase.from("menus").select("*");
  res.json(makeReponseGetOK(data));
});
// 음료 추가
app.post("/menus", async (req, res) => {
  const { name, price, kcal } = req.body;
  if (!name) {
    return res.json(makeReponseError("name이 빈값 입니다."));
  }
  if (validateNumber(price)) {
    return res.json(makeReponseError("price의 데이터가 유효하지 않습니다."));
  }
  if (validateNumber(kcal)) {
    return res.json(makeReponseError("kcal의 데이터가 유효하지 않습니다."));
  }
  const { statusText } = await supabase
    .from("menus")
    .insert({ name, price: +price, kcal: +kcal });
  res.json(makeReponsePostOK(`${statusText}`));
});
// 음료 삭제
app.delete("/menus/:id", async (req, res) => {
  const { id } = req.params; // id 가져오기
  const { data } = await supabase.from("menus").select("*");
  const target = data.find((v) => v.id == +id);
  !target &&
    res.json(makeReponseError(`${id}번째의 메뉴는 존재하지 않습니다.`));
  const { statusText } = await supabase.from("menus").delete().eq("id", +id);
  res.json(makeReponseDeleteOk(`${statusText}`));
});
// 음료 수정
app.put("/menus/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price, kcal } = req.body;
  const { data } = await supabase.from("menus").select("*");
  const target = data.find((v) => v.id == +id);
  if (!target) {
    return res.json(makeReponseError(`${id}번째의 메뉴는 존재하지 않습니다.`));
  }
  if (!name) {
    return res.json(makeReponseError("name이 빈값 입니다."));
  }
  if (validateNumber(price)) {
    return res.json(makeReponseError("price의 데이터가 유효하지 않습니다."));
  }
  if (validateNumber(kcal)) {
    return res.json(makeReponseError("kcal의 데이터가 유효하지 않습니다."));
  }
  const { statusText } = await supabase
    .from("menus")
    .update({ name, price: +price, kcal: +kcal })
    .eq("id", id);
  res.json(makeReponsePutOk(`${statusText}`));
});

app.get("/staffs", async (req, res) => {
  const { data } = await supabase.from("staffs").select("*");
  res.json(makeReponseGetOK(data));
});

app.post("/staffs", async (req, res) => {
  const { name, age, position } = req.body;
  if (!name) {
    return res.json(makeReponseError("name이 빈값 입니다."));
  }
  if (isNaN(age) || age < 0 || !age) {
    return res.json(makeReponseError("age의 데이터가 유효하지 않습니다."));
  }
  if (!positionType.includes(position)) {
    return res.json(makeReponseError(`그런 ${position}은 없습니다.`));
  }
  const { statusText } = await supabase
    .from("staffs")
    .insert({ name, age: +age, position });
  res.json(makeReponsePostOK(`${statusText}`));
});

app.delete("/staffs/:id", async (req, res) => {
  const { id } = req.params; // id 가져오기
  const { data } = await supabase.from("staffs").select("*");
  const target = data.find((v) => v.id == +id);
  !target &&
    res.json(makeReponseError(`${id}번째의 스태프는 존재하지 않습니다.`));
  const { statusText } = await supabase.from("staffs").delete().eq("id", +id);
  res.json(makeReponseDeleteOk(`${statusText}`));
});

app.put("/staffs/:id", async (req, res) => {
  const { id } = req.params;
  const { name, age, position } = req.body;
  const { data } = await supabase.from("menus").select("*");
  const target = data.find((v) => v.id == +id);
  if (!target) {
    return res.json(
      makeReponseError(`${id}번째의 스태프는 존재하지 않습니다.`)
    );
  }
  if (!name) {
    return res.json(makeReponseError("name이 빈값 입니다."));
  }
  if (isNaN(age) || age < 0 || !age) {
    return res.json(makeReponseError("age의 데이터가 유효하지 않습니다."));
  }
  if (!positionType.includes(position)) {
    return res.json(makeReponseError(`그런 ${position}은 존재하지 않습니다.`));
  }
  const { statusText } = await supabase
    .from("staffs")
    .update({ name, age: +age, position })
    .eq("id", id);
  res.json(makeReponsePutOk(`${statusText}`));
});

app.listen(3000, () => {
  console.log("카페 서버 오픈!");
});
