const express = require("express");
const router = express.Router();
const middlewares = require("../middlewares"); // middlewares 모듈을 가져옴
const {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
} = require("firebase/firestore/lite");
const firebaseApp = require("../firebaseConfig");
const { getAuth } = require("firebase/auth");

// Firebase Firestore 초기화
const db = getFirestore(firebaseApp);
// Firebase 인증 객체
const auth = getAuth(firebaseApp);

// 인증 미들웨어
middlewares(router);

// 사용자 프로필 조회
router.get("/:userId/profile", async (req, res) => {
  const userId = req.params.userId;

  try {
    // 사용자 인증 확인
    const user = auth.currentUser;
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    // Firestore에서 사용자 정보 조회
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return res.status(404).json({ error: "User not found " });
    }

    // 사용자 정보 반환
    const userInfo = userDoc.data();
    res.json({ user: userInfo });
  } catch (error) {
    console.error("Profile Error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:userId/profile", async (req, res) => {
  const userId = req.params.userId;
  const updatedProfile = req.body.updatedProfile;

  try {
    // 사용자 인증 확인
    const user = auth.currentUser;
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    // Firestore에서 사용자 문서 업데이트
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, updatedProfile);

    // 업데이트된 사용자 정보 응답
    const userDoc = await getDoc(userRef);
    const updatedUserInfo = userDoc.data();
    res.json({ user: updatedUserInfo });
  } catch (error) {
    console.error("Update Profile Error", error);
    res.status(500).json({ error: "Internal Server Error " });
  }
});

module.exports = router;
