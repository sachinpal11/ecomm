const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const { getProducts } = require("../controllers/product.controller");
const router = express.Router();


router.get("/all-products", authMiddleware, getProducts);


module.exports = router
