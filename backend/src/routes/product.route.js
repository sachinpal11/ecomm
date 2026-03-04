const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const { getProducts, getSingleProduct, createProduct, updateProduct, deleteProduct } = require("../controllers/product.controller");
const multer = require("multer");
const adminMiddleware = require("../middleware/admin.middleware");
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.get("/all-products", authMiddleware, getProducts);
router.get("/get-product", authMiddleware, getSingleProduct);
router.post("/create", adminMiddleware, upload.array("images", 4), createProduct)
router.post("/update", adminMiddleware, upload.array("images", 4), updateProduct)
router.post("/delete", adminMiddleware, deleteProduct)

module.exports = router
