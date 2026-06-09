const express = require("express")

const {
  createProduct,
  getProduct,
  getProducts,
  deleteProduct,
  updateProduct
} = require("../controllers/productController")

const requireAuth = require("../middleware/requireAuth")

const router = express.Router()

// PUBLIC ROUTES
router.get("/", getProducts)
router.get("/:id", getProduct)

// PROTECTED ROUTES
router.post("/", requireAuth, createProduct)
router.patch("/:id", requireAuth, updateProduct)
router.delete("/:id", requireAuth, deleteProduct)

module.exports = router