const express = require("express");
const mainRoutes = require("./routes/mainRoutes");
const middlewares = require("./middlewares");

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
middlewares(app);

app.use("/", mainRoutes);

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
