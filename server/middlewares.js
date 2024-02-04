const bodyParser = require("body-parser");
const cors = require("cors");

module.exports = (app) => {
  // 미들웨어 설정
  app.use(cors());
  app.use(bodyParser.json());
};
