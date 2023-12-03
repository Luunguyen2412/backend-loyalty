const express = require("express");
const {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");

const router = express.Router();

router.route("/").get(getProducts).post(createProduct);

router.route("/:id").delete(deleteProduct).put(updateProduct);

module.exports = router;
