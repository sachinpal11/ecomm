const express = require("express");
const { signup,verifyMail,login } = require("../controllers/auth.controller");


const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/verify/:token", verifyMail);


module.exports = router