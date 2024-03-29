const express = require("express");
const { register, login, checkUser } = require("../controller/useController");
const router = express.Router();
// autinitication middleware
const authMiddleware = require("../middleware/authMiddleware");

// register route

router.post("/register", register);
// user login
router.post("/login", login);
// check user
router.get("/check", authMiddleware, checkUser);

module.exports = router;
