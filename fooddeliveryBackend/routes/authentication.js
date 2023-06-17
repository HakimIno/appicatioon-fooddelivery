var express = require("express");
var router = express.Router();
const {
  userRegister,
  userLogin,
  checkUserExist,
  tokenRefresh,
} = require("../services/authentication.service");

router.post("/register", async (req, res, next) => {
  let body = req.body;
  let response = await userRegister(body);
  res.json(response);
});

router.post("/login", async (req, res, next) => {
  let body = req.body;
  let response = await userLogin(body);
  res.json(response);
});

router.get("/user-exist", async (req, res, next) => {
  let params = req.query;
  let response = await checkUserExist(params);
  res.json(response);
});

router.post("/admin/login", async (req, res, next) => {
  const { email, password } = req.body;
  
  if (email === "admin@example.com" && password === "1234") {
    res.status(200).json({ success: true, message: "Login successful" });
  } else {
    res
      .status(401)
      .json({ success: false, message: "Invalid email or password" });
  }
});

router.post("/refresh-token", tokenRefresh);

module.exports = router;
