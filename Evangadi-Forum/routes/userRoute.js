const express = require("express");
const { register, login, checkUser } = require("../controller/useController");
const router = express.Router();


// register route

router.post("/register", register);
// user login
router.post("/login", login);
// check user
router.get("/check", checkUser);

module.exports = router;
