const express = require("express");
const router = express.Router();
const middlewares = require("../middlewares"); // middlewares 모듈을 로드
const admin = require("firebase-admin");

// 인증 미들웨어
middlewares(router);

// Firebase Admin SDK 초기화
const serviceAccount = require("../serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://console.firebase.google.com/project/show-me-your-ingredients/authentication/users?hl=ko",
});

// Firebase 인증 객체
const auth = admin.auth();
// Firestore 객체
const db = admin.firestore();

// 로그인
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userCredential = await auth.signInWithEmailAndPassword(
      email,
      password
    );
    const user = userCredential.user;

    // 사용자 정보를 Firestore에 저장 또는 가져옴
    const userRef = db.collection("users").doc(user.uid);
    const userDoc = await userRef.get();

    if (userDoc.exists) {
      const userInfo = userDoc.data();
      res.json({ user: userInfo }); // JSON 응답 반환
    } else {
      res.status(404).json({ error: "User not found in Firestore" }); // JSON 응답 반환
    }
  } catch (error) {
    console.error("Login Error", error);
    res.status(401).json({ error: "Login failed" }); // JSON 응답 반환
  }
});

// 로그아웃
router.post("/signout", async (req, res) => {
  try {
    await auth.signOut();
    res.json({ message: "Logout successful" }); // JSON 응답 반환
  } catch (error) {
    console.error("Logout Error", error);
    res.status(500).json({ error: "Internal Server Error" }); // JSON 응답 반환
  }
});

// 회원가입
// 회원가입
router.post("/signup", async (req, res) => {
  const { email, password, username } = req.body;

  try {
    // 이미 가입된 이메일인지 확인
    const existingUser = await auth.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "이미 가입된 이메일 주소입니다." });
    }

    // 가입된 이메일이 아닌 경우 신규 가입 처리
    const userRecord = await auth.createUser({
      email: email,
      password: password,
      displayName: username,
    });

    // Firestore에 사용자 정보 저장
    await db.collection("users").doc(userRecord.uid).set({
      email: email,
      username: username,
    });

    res.json({ user: { uid: userRecord.uid, email, username } }); // JSON 응답 반환
  } catch (error) {
    console.error("Signup Error", error);
    res.status(500).json({ error: "Internal Server Error" }); // JSON 응답 반환
  }
});


// 사용자 프로필 조회
router.get("/:userId/profile", async (req, res) => {
  const userId = req.params.userId;

  try {
    const userDoc = await db.collection("users").doc(userId).get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found " }); // JSON 응답 반환
    }

    const userInfo = userDoc.data();
    res.json({ user: userInfo }); // JSON 응답 반환
  } catch (error) {
    console.error("Profile Error", error);
    res.status(500).json({ error: "Internal Server Error" }); // JSON 응답 반환
  }
});

module.exports = router;
