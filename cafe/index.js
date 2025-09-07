const express = require("express");
const app = express();
const port = 3000;
const { replyOkget, replyError, replyOk } = require("./format.js");
const {
  checkEffectivenessName,
  checkEffectivenessNumber,
  checkEffectivenessKcal,
  isInclude,
} = require("./effectiveness.js");

app.use(express.json()); // JSON 역할 body 파싱
app.use(express.urlencoded({ extended: true })); // form 형식 데이터 파싱
const KEY = "something";
const URL = "https://cupxxfssmpohhkfwbqtu.supabase.co";
const { createClient } = require("@supabase/supabase-js");
const { positions } = require("./data.js");
const supabase = createClient(URL, KEY);

// 음료 전체목록 조회
app.get("/cafe/beverages", async (req, res) => {
  const { data } = await supabase.from("beverages").select("*");
  !data && res.json(replyError("없는 ID(메뉴)입니다."));
  res.json(replyOkget(data));
});
// 직원 전체목록 조회
app.get("/cafe/staffs", async (req, res) => {
  const { data } = await supabase.from("staffs").select("*");

  !data && res.json(replyError("없는 ID(메뉴)입니다."));
  res.json(replyOkget(data));
});

// 1. [조회]
// ID값으로 음료 조회
app.get("/cafe/beverages/:id", async (req, res) => {
  const { id } = req.params;
  const { data } = await supabase.from("beverages").select("*");
  const target = data[+id - 1];
  // console.log(target);
  !target && res.json(replyError("없는 ID(메뉴)입니다."));
  res.json(replyOkget(target));
});

// ID값으로 직원 조회
app.get("/cafe/staffs/:id", async (req, res) => {
  const { id } = req.params;
  const { data } = await supabase.from("staffs").select("*");
  const target = data[+id - 1];
  // console.log(target);
  !target && res.json(replyError("없는 ID(메뉴)입니다."));
  res.json(replyOkget(target));
});

// 2. [생성]
// 음료 생성
app.post("/cafe/beverages", async (req, res) => {
  const { name, price, kcal } = req.body;
  if (checkEffectivenessName(name)) {
    return res.json(replyError("name을 입력해주세요."));
  }
  if (checkEffectivenessNumber(price)) {
    return res.json(replyError(`${price}가 유효하지 않습니다.`));
  }
  if (checkEffectivenessKcal(kcal)) {
    return res.json(replyError(`${kcal}가 유효하지 않습니다.`));
  }
  const { statusText } = await supabase
    .from("beverages")
    .insert({ name, price: +price, kcal: +kcal });

  res.json(replyOk(`${statusText}`));
});
// 직원 생성
app.post("/cafe/staffs", async (req, res) => {
  const { name, age, position } = req.body;
  if (checkEffectivenessName(name)) {
    return res.json(replyError("name을 입력해주세요."));
  }
  if (checkEffectivenessNumber(age)) {
    return res.json(replyError(`${inputNumber}가 유효하지 않습니다.`));
  }
  if (isInclude(position, positions)) {
    return res.json(replyError(`${position}(이)라는 position은 없습니다.`));
  }
  const { statusText } = await supabase
    .from("staffs")
    .insert({ name, age: +age, position });
  res.json(replyOk(`${statusText}`));
});

// 3. [삭제]
// 음료 삭제
app.delete("/cafe/beverages/:id", async (req, res) => {
  const { id } = req.params;
  // 아래 data 선언하는 부분은, "구조 분해 할당"한 것임.
  // supabase.from("beverages").select("*")가 반환하는 것들에는 여러가지가 잇는데,
  // 그 중에서 배열을 반환값으로 가지는 data를 선언하기 위해서는 {}로 감싸줘야함.
  // 따라서 배열이 반환되었으므로, find() 사용가능!
  // 위에서 { data } 이렇게 선언해왔던 것도 배열을 이용하기 위함이었음.
  const { data } = await supabase.from("beverages").select("*");
  const target = data.find((v) => v.id == +id);
  if (!target) {
    return res.json(replyError("없는 ID(음료)입니다."));
  }
  const statusText = await supabase.from("beverages").delete().eq("id", +id);
  res.json(replyOk(statusText));
});
// 직원 삭제
app.delete("/cafe/staffs/:id", async (req, res) => {
  const { id } = req.params;
  const { data } = await supabase.from("staffs").select("*");
  const target = data.find((v) => v.id == +id);
  if (!target) {
    return res.json(replyError("없는 ID(직원)입니다."));
  }
  const statusText = await supabase.from("staffs").delete().eq("id", +id);
  res.json(replyOkget(statusText));
});

// 4. [수정]
// 음료 수정
app.put("/cafe/beverages/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price, kcal } = req.body;
  const { data } = await supabase.from("beverages").select("*");
  const target = data.find((v) => v.id == +id);
  if (!target) {
    return res.json(replyError("없는 ID(음료)입니다."));
  }
  if (checkEffectivenessName(name)) {
    return res.json(replyError("name을 입력해주세요."));
  }
  if (checkEffectivenessNumber(price)) {
    return res.json(replyError(`${price}가 유효하지 않습니다.`));
  }
  if (checkEffectivenessKcal(kcal)) {
    return res.json(replyError(`${kcal}가 유효하지 않습니다.`));
  }
  const { statusText } = await supabase
    .from("beverages")
    .update({ name, price: +price, kcal: +kcal })
    .eq("id", +id);
  res.json(replyOk(`${id}번째 음료가 정상적으로 수정되었습니다.`));
});

// 직원 수정
app.put("/cafe/staffs/:id", async (req, res) => {
  const { id } = req.params;
  const { name, age, position } = req.body;
  const { data } = await supabase.from("staffs").select("*");
  const target = data.find((v) => v.id == +id);
  if (!target) {
    return res.json(replyError(`${id}번째 직원은 존재하지 않습니다.`));
  }
  if (checkEffectivenessName(name)) {
    return res.json(replyError("name을 입력해주세요."));
  }
  if (checkEffectivenessNumber(age)) {
    return res.json(replyError(`${inputNumber}가 유효하지 않습니다.`));
  }
  if (isInclude(position, positions)) {
    return res.json(replyError(`${position}(이)라는 position은 없습니다.`));
  }
  const { statusText } = await supabase
    .from("staffs")
    .update({ name, age: +age, position })
    .eq("id", +id);
  res.json(replyError(`${id}번째 직원이 정상적으로 수정되었습니다.`));
});

app.listen(port, () => {
  console.log(`${port}번 포트로 로드되었습니다!`);
});
