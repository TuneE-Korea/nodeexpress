const express = require("express");
const app = express();
const port = 3000;
// const { beverages, staffs, positions } = require("./data.js");
const { replyOkget, replyError, replyOk } = require("./format.js");

app.use(express.json()); // JSON 역할 body 파싱
app.use(express.urlencoded({ extended: true })); // form 형식 데이터 파싱
const KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1cHh4ZnNzbXBvaGhrZndicXR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzNjg4MTcsImV4cCI6MjA3MTk0NDgxN30.zOmYg0vFpi8af-6DmNUXaRoKKPRELvESOUAWymzsYHY";
const URL = "https://cupxxfssmpohhkfwbqtu.supabase.co";
const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(URL, KEY);

// 음료 전체 조회
app.get("/cafe/beverages", async (req, res) => {
  const { data } = await supabase.from("beverages").select("*");
  !data && res.json(replyError("없는 ID(메뉴)입니다."));
  res.json(replyOkget(data));
});
// 직원 전체 조회
app.get("/cafe/staffs", async (req, res) => {
  const { data, error } = await supabase.from("staffs").select("*");

  !data && res.json(replyError("없는 ID(메뉴)입니다."));
  res.json(replyOkget(data));
});

// [조회]
// 1. ID값으로 음료 조회
app.get("/cafe/beverages/:id", async (req, res) => {
  const { id } = req.params;
  const { data } = await supabase.from("beverages").select("*");
  const target = data[+id - 1];
  // console.log(target);
  !target && res.json(replyError("없는 ID(메뉴)입니다."));
  res.json(replyOkget(target));
});

// 2. ID값으로 직원 조회
app.get("/cafe/staffs/:id", async (req, res) => {
  const { id } = req.params;
  const { data } = await supabase.from("staffs").select("*");
  const target = data[+id - 1];
  // console.log(target);
  !target && res.json(replyError("없는 ID(메뉴)입니다."));
  res.json(replyOkget(target));
});

// [생성]
// 1. 음료 생성
app.post("/cafe/beverages", (req, res) => {
  const { name, price, kcal } = req.body;
  if (!name) {
    return res.json(replyError("name을 입력해주세요."));
  }
  if (!price || price < 0 || isNaN(price)) {
    return res.json(replyError("price가 유효하지 않습니다."));
  }
  if (!kcal || kcal < 0 || isNaN(kcal)) {
    return res.json(replyError("kcal가 유효하지 않습니다."));
  }
  beverages.push({ name, price: +price, kcal: +kcal });
  res.json(replyOk("성공적으로 추가되었습니다."));
});
// 2. 직원 생성
app.post("/cafe/staffs", (req, res) => {
  const { name, age, position } = req.body;
  if (!name) {
    return res.json(replyError("name을 입력해주세요."));
  }
  if (!age || age < 0 || isNaN(age)) {
    return res.json(replyError("age가 유효하지 않습니다."));
  }
  if (!positions.includes(position)) {
    return res.json(replyError(`${position}(이)라는 position은 없습니다.`));
  }
  staffs.push({ name, age: +age, position });
  res.json(replyOk("성공적으로 추가되었습니다."));
});

// [삭제]
// 1. 음료 삭제
app.delete("/cafe/beverages/:id", (req, res) => {
  const { id } = req.params;
  if (!beverages[+id - 1]) {
    return res.json(replyError("없는 ID(음료)입니다."));
  }
  res.json(
    replyOkget(`${beverages[+id - 1].name}이(가) 정상적으로 삭제되었습니다!`)
  );
  beverages.splice(+id - 1, 1);
});
// 2. 직원 삭제
app.delete("/cafe/staffs/:id", (req, res) => {
  const { id } = req.params;
  if (!staffs[+id - 1]) {
    return res.json(replyError("없는 ID(직원)입니다."));
  }
  res.json(
    replyOkget(`${staffs[+id - 1].name}이(가) 정상적으로 삭제되었습니다!`)
  );
  staffs.splice(+id - 1, 1);
});

// [수정]
// 1. 음료 수정
app.put("/cafe/beverages/:id", (req, res) => {
  const { id } = req.params;
  const { name, price, kcal } = req.body;
  target = beverages[+id - 1];
  if (!target) {
    return res.json(replyError(`${id}번째 음료는 존재하지 않습니다.`));
  }
  if (!name) {
    return res.json(replyError("name을 입력해주세요."));
  }
  if (!price || price < 0 || isNaN(price)) {
    return res.json(replyError("price가 유효하지 않습니다."));
  }
  if (!kcal || kcal < 0 || isNaN(kcal)) {
    return res.json(replyError("kcal가 유효하지 않습니다."));
  }
  target.name = name;
  target.price = +price;
  target.kcal = +kcal;
  res.json(replyOk("정상적으로 변경되었습니다."));
});

// 2. 직원 수정
app.put("/cafe/staffs/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, position } = req.body;
  target = staffs[+id - 1];
  if (!target) {
    return res.json(replyError(`${id}번째 음료는 존재하지 않습니다.`));
  }
  if (!name) {
    return res.json(replyError("name을 입력해주세요."));
  }
  if (!age || age < 0 || isNaN(age)) {
    return res.json(replyError("age가 유효하지 않습니다."));
  }
  if (!positions.includes(position)) {
    return res.json(replyError(`${position}(이)라는 position은 없습니다.`));
  }
  target.name = name;
  target.age = +age;
  target.position = position;
  res.json(replyOk("정상적으로 변경되었습니다."));
});

app.listen(port, () => {
  console.log(`${port}번 포트로 로드되었습니다!`);
});
