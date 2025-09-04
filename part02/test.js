const coffeeMenu = require("./data.js");
const express = require("express");
const app = express();
const port = 3000;
app.use(express.json()); // JSON 형식 읽는 로직 추가!
app.use(express.urlencoded({ extended: true })); // HTML form 방식 읽기 허락

app.get("/", (req, res) => {
  // send는 html을 반환
  res.send("오늘 날씨 맑다");
});

// quiz 1
// /icecream/1 -> { name: "쿠앤크", kcal: 300 }
// /icecream/2 -> { name: "우유", kcal: 150 }
// /icecream/3 -> { name: "딸기", kcal: 250 }
// 그 외 -> { error: "그런거 없음"}
// app.get("/icecream/:id", (req, res) => {
//   const { id } = req.params;
//   // json 반환
//   // const result = !!icecream[+id] ? icecream[+id] : "그런 거없음!";
//   res.json(menu.icecream[+id] || { error: "그런 거 없음!" });
// });

// quiz 2
// size= m,l [m은 기본값, l은 price에 1000원 추가]
// syrup=1 [개수에 따라서 kcal 50늘어남]
// /coffee/1 -> {name: "아아", price: 1500, kcal: 0}
// /coffee/2 -> {name: "라떼", price: 2500, kcal: 100}
// /coffee/3 -> {name: "초코", price: 2000, kcal: 200}

// /coffee/3?size=1&syrup=3
// {name: "초코", price: 3000, kcal:350}
// app.get("/coffee/:id", (req, res) => {
//   const { id } = req.params;
//   const { size, syrup } = req.query;
//   const addPrice = size == "l" ? 1000 : 0;
//   const coffeObj = menu.coffee[`${+id}`];
//   if (!["m", "l"].includes(size)) {
//     return res.json({ error: "잘못된 size 입니다." });
//   }
//   if (0 > syrup || 3 < syrup || isNaN(syrup)) {
//     return res.json({ error: "syrup은 0~3까지만 가능합니다." });
//   }
//   if (!coffeObj) {
//     return res.json({ error: "없는 커피리스트입니다." });
//   }
//   coffeObj.price = +coffeObj.price + addPrice;
//   coffeObj.kcal = +coffeObj.kcal + 50 * syrup;
//   res.json(coffeObj);
// });

// ... 데이터 유효성검사는? -> 관련 라이브러리 사용 추천

// 데이터 생성
app.post("/coffee", (req, res) => {
  const { name, price, kcal } = req.body;
  if (!name || !price || !kcal) {
    return res.json({ error: "name/price/kcal 데이터가 올바르지 않습니다." });
  }
  coffeeMenu.push({ name, price, kcal });
  console.log(name);
  console.log(price);
  res.json({ message: "성공" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
