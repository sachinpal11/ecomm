const express = require("express");
const { signup, verifyMail, login, me, logout } = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");


const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/verify/:token", verifyMail);
router.get("/logout", logout);
router.get("/me", authMiddleware, me);

module.exports = router