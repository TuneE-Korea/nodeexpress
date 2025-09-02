const menu = require("./data.js");
const coffeeMenu = require("./data1.js");
const express = require("express");
const app = express();
const port = 3000;
app.use(express.json); // JSON형식 읽기 추가!
app.use(express.urlencoded({ extended: true })); // HTML form 형식 읽기 허락

app.get("/", (req, res) => {
  res.send("오늘 날씨 굿!");
});

app.get("/icecream/:id", (req, res) => {
  const { id } = req.params;
  res.json(menu[+id - 1] || "그런 아이스크림 없습니다.");
});

// http://localhost:3000/coffee/2?size=l&syrup=50
// 데이터 유효성 검사: 올바르게 데이터줬는지? <- 백엔드 할때 중요한 부분임
// size 있는지? size의 m,l 있는지?
// syrup 있는지? syrup이 0~3 인지?

// size가 m이 디폴트, l이면 1000원 추가
// syrup 하나 당 칼로리 50 추가
app.get("/coffee/:id", (req, res) => {
  const { id } = req.params;
  const { size, syrup } = req.query;
  const coffeeObj = coffeeMenu[+id - 1];
  const addprice = size == "l" ? 1000 : 0;
  coffeeObj.price = +coffeeObj.price + addprice;
  coffeeObj.kcal = +coffeeObj.kcal + 50 * +syrup;
  if (!size) {
    return res.json("사이즈가 입력되지 않았습니다.");
  } else if (!["m", "l"].includes(size)) {
    return res.json("사이즈는 m과 l 사이즈만 입력가능합니다.");
  }
  if (!syrup) {
    return res.json("시럽 개수가 입력되지 않았습니다.");
  } else if (0 > syrup || syrup > 3 || isNaN(syrup)) {
    return res.json("시럽 개수 입력은 0~3까지만 가능합니다.");
  }
  if (!coffeeObj) {
    return res.json("존재하지 않는 커피입니다.");
  }
  res.json(coffeeObj);
});

// app.post (데이터 생성) <- 안되는데...?
app.post("/coffee", (req, res) => {
  const { name, price, kcal } = req.body;
  if (!name || !price || !kcal) {
    return res.json({ error: "name/price/kcal 데이터가 올바르지 않습니다" });
  }
  coffeeMenu.push({ name, price, kcal });
  res.json({ message: "성공" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
