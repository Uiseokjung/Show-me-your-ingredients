const express = require("express");
const router = express.Router();
const middlewares = require("../middlewares");
const {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} = require("firebase/firestore/lite");
const firebaseApp = require("../firebaseConfig");
const {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} = require("firebase/auth");

// Firebase Firestore 초기화
const db = getFirestore(firebaseApp);
// Firebase 인증 객체
const auth = getAuth(firebaseApp);

// 인증 미들웨어
middlewares(router);

// 로그인
router.post("/login", async (req, res) => {
  try {
    // Firbase Authentication을 사용하여 로그인 시도
    const { email, password } = req.body;
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // 사용자 정보를 FireStore에 저장 또는 가져옴
    const userDocRef = doc(db, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      // 사용자 정보가 Firestore에 존재하면 해당 정보를 가져옴
      const userInfo = userDocSnap.data;
      res.json({ user: userInfo });
    } else {
      // 사용자 정보가 Firestore에 존재하지 않으면 에러 응답
      res.status(404).json({ error: "User not found in Firestore" });
    }

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
    await signOut(auth);

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
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Firestore에 사용자 정보 저장
    await setDoc(doc(db, "users", user.uid), { email, username });

    // 회원가입 성공 시
    res.json({ user: { uid: user.uid, email, username } });
  } catch (error) {
    console.error("Signup Error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

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
