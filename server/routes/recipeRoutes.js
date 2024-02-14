const express = require("express");
const router = express.Router();
const recipeService = require("../services/recipeService");

// 음식 정보 조회
router.get("/search/:foodName", async (req, res) => {
  const foodName = req.params.foodName;

  try {
    // 음식 정보 검색
    const foodInfo = await recipeService.searchFoodInfo(foodName);

    // 응답으로 음식 정보 전송
    res.json({ foodInfo });
  } catch (error) {
    console.error("Food Info Error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/recommend", async (req, res) => {
  try {
  } catch (error) {}
});

module.exports = router;
