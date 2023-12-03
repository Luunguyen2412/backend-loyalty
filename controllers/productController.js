const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
// Get all Product
// GET /api/products
const getProducts = asyncHandler(async (req, res) => {
  // correct
  const products = await Product.find();
  res.status(200).json(products);
});

// Create new product
// POST /api/products
const createProduct = asyncHandler(async (req, res) => {
  console.log("request body: ", req.body);
  const { name, images, detail, category, price, quantity } = req.body;
  if (!name || !category) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }
  const product = await Product.create({
    name,
    images,
    detail,
    category,
    price,
    quantity,
  });

  res.status(200).json(product);
  console.log(`create product successfull `);
});

// Update new product
// PUT /api/products/:id
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(200).json({ message: "Không tìm thấy product" });
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json("Thay đổi thành công", updatedProduct);
});

// Delete product
// DELETE /api/products/:id
const deleteProduct = asyncHandler(async (req, res) => {
  // correct
  console.log("request body delete: ", req.params.id);

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(200).json("Không tìm thấy Product");
  }

  await Product.deleteOne({ _id: req.params.id });
  res
    .status(200)
    .json(`delete successfull product: ${req.params.id} `, product);
});

module.exports = {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
};
