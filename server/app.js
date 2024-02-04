const express = require("express");
const middlewares = require("./middlewares");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

// Firebase Admin SDK 초기화
const serviceAccount = require("./show-me-your-ingredients-firebase-adminsdk-m7sk4-114049b5a3.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://show-me-your-ingredients.firebaseio.com",
});

// 미들웨어 설정
middlewares(app);

app.use("/auth", authRoutes);
app.use("/recipe", recipeRoutes);

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
