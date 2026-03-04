const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const { getProducts, getSingleProduct, createProduct } = require("../controllers/product.controller");
const multer = require("multer");
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.get("/all-products", authMiddleware, getProducts);
router.get("/get-product", authMiddleware, getSingleProduct);
router.post("/create", authMiddleware, upload.array("images", 4), createProduct)

module.exports = router
