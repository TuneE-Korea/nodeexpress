const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// localhost:port/icecream/123
app.get("/icecream/:id", (req, res) => {
  const { id } = req.params;
  if (+id == 1) {
    res.send("초코 아이스크림!");
  } else if (+id == 2) {
    res.send("딸기 아이스크림!");
  } else if (+id == 3) {
    res.send("쿠키앤크림 아이스크림!");
  } else {
    res.send("그런 아이스크림 없음");
  }
});

// 조건문 안쓰고
// /cookie/1 -> 초코쿠키
// /cookie/2 -> 바닐라쿠키
// /cookie/3 -> 민트쿠키
// /cookie/그외 -> 잘못된쿠키
app.get("/cookie/:id", (req, res) => {
  const { id } = req.params;
  const menu = {
    1: "초코쿠키",
    2: "바닐라쿠키",
    3: "민트쿠키",
  };
  // false || true : true
  // falsy[0,"",undefined,null] || truthy: thuthy

  // truthy && ()=>{}: 뒤 함수 실행함
  res.send(`${menu[+id] || "없음 쿠키"}`);
});

// /coffee/숫자?size=어쩌구&shots=저쩌구

app.get("/coffee/:id", (req, res) => {
  const { id } = req.params;
  const { size, shots } = req.query;

  const coffeeList = { 1: "아아", 2: "라떼", 3: "아샷추" };
  const sizeList = { small: "스몰", medium: "미디움", large: "라지" };

  res.send(
    `주문하신 사이즈 ${sizeList[size]}의 샷 ${shots}번의 ${
      coffeeList[+id]
    }음료가 나왔습니다.`
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
