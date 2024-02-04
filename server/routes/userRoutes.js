const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const middlewares = require("../middlewares");
const databaseService = require("../services/databaseService");

// 미들웨어
middlewares(router);

// 사용자 프로필 조회
router.get("/:userId/profile", async (req, res) => {
  const userId = req.params.userId;

  try {
    // 사용자 정보 조회
    const userInfo = await databaseService.getUserInfo(userId);

    // 응답으로 사용자 정보 전송
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
    // 사용자 정보 업데이트
    await databaseService.updateUserProfile(userId, updatedProfile);

    // 업데이트된 사용자 정보 응답
    const updateUserInfo = await databaseService.getUserInfo(userId);
    res.json({ user: updateUserInfo });
  } catch (error) {
    console.error("Update Profile Error", error);
    res.status(500).json({ error: "Internal Server Error " });
  }
});

module.exports = router;
