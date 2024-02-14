const express = require("express");
// const userRoutes = require("./routes/userRoutes");
const middlewares = require("./middlewares");
const authRoutes = require("./routes/authRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const admin = require("firebase-admin");

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
middlewares(app);
// app.use(cors());
// app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/recipe", recipeRoutes);
// app.use("/user", userRoutes);

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
