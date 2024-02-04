const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const middlewares = require("../middlewares");

// 미들웨어
middlewares(router);

// 로그인
router.post("/login", async (req, res) => {
  try {
    // Firbase Authentication을 사용하여 로그인 시도
    const { email, password } = req.body;
    const userCredential = await admin
      .auth()
      .signInWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // 사용자 정보를 FireStore에 저장 또는 가져옴
    const userInfo = await databaseService.getUserInfo(user.uid);

    // 로그인 성공 시
    res.json({ user: userInfo });
  } catch (error) {
    console.error("Login Error", error);
    res.status(401).json({ error: "Login failed" });
  }
});

// 로그아웃
router.post("/logout", async (req, res) => {
  try {
    // Firebase Authentication을 사용하여 로그아웃
    await admin.auth().signOut();

    //클라이언트에게 로그아웃 성공 응답
    res.json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout Error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 회원가입
router.post("/signup", async (req, res) => {
  const { email, password, username } = req.body;

  try {
    // Firebase Authentication을 사용하여 새로운 사용자 생성
    const userCredential = await admin.auth().createUser({
      email: email,
      password: password,
      displayName: username,
    });

    const newUser = userCredential.user;

    // Firestore에 사용자 정보 저장
    await databaseService.createUserInfo(newUser.uid, { email, username });

    // 회원가입 성공 시
    res.json({ user: { uid: newUser.uid, email, username } });
  } catch (error) {
    console.error("Signup Error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
