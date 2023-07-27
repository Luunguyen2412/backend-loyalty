const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
// Get all Product
// GET /api/products
const getProducts = asyncHandler(async (req, res) => {
  // correct
  const products = await Product.find();
  res.status(200).json(products);
});

// // Get contact
// // GET /api/contacts/:id
// const getContact = asyncHandler(async (req, res) => {
//   // correct

//   const contact = await Contact.findById(req.params.id);
//   if (!contact) {
//     res.status(200).json({
//       message: "Không tìm thấy người dùng",
//       data: {},
//     });
//   }

//   res.status(200).json({
//     message: "",
//     data: contact,
//   });
// });

// Create new product
// POST /api/products
const createProduct = asyncHandler(async (req, res) => {
  // correct
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

  res.status(201).json(product);
  console.log(`create product successfull `);
});

// // Update new contact
// // PUT /api/contacts/:id
// const updateContact = asyncHandler(async (req, res) => {
//   const contact = await Contact.findById(req.params.id);
//   if (!contact) {
//     res.status(200).json({ message: "Không tìm thấy Contact" });
//   }

//   const updatedContact = await Contact.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true }
//   );

//   res.status(200).json(updatedContact);
// });

// // Delete contact
// // DELETE /api/contacts/:id
// const deleteContact = asyncHandler(async (req, res) => {
//   // correct
//   console.log("request body delete: ", req.params.id);

//   const contact = await Contact.findById(req.params.id);

//   if (!contact) {
//     res.status(404);
//     throw new Error("Contact not found");
//   }
//   // if (contact.user_id.toString() !== req.user.id) {
//   //     res.status(403);
//   //     throw new Error("User don't have permission to update other user contacts");
//   // }

//   await Contact.deleteOne({ _id: req.params.id });
//   res.status(200).json(contact);

//   console.log(`delete successfull user: ${req.params.id} `);

//   // res.status(200).json({ message: `Delete contacts for ${req.params.id}` });
// });

module.exports = {
  getProducts,
  createProduct,
};
