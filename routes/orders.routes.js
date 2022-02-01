const express = require("express")

// Controllers
const {
  addProductToCart,
  getUserCart,
  updateProductCart,
  purchaseOrder,
  getUserOrder,
} = require("../controllers/orders.controller")

// Middlewares
const {
  updateProductCartValidations,
  validateResult,
} = require("../middlewares/validators.middleware")
const { protectSession } = require("../middlewares/auth.middleware")

const router = express.Router()

router.use(protectSession)

// Get user's cart
router.get("/get-cart", getUserCart)

// Add product to cart
router.post("/add-product-to-cart", addProductToCart)

// Update cart product quantity
router.patch(
  "/update-cart-product",
  updateProductCartValidations,
  validateResult,
  updateProductCart
)

//purchase

router.get("/purchase", purchaseOrder)

// Remove product from cart

// Create order

// Get user's orders
router.get("/get-orders/", getUserOrder)

module.exports = { ordersRouter: router }
