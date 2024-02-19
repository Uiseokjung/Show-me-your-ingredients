const express = require("express");
const router = express.Router();
const search = require("./recipeRoutes");
const recommend = require("./recommendRoutes");
const community = require("./communityRoutes");
const auth = require("./authRoutes");

router.get("/", (req, res) => {
  res.send("Main Route");
});

router.use("/search", search);
router.use("/recommend", recommend);
router.use("/community", community);
router.use("/auth", auth);

module.exports = router;
