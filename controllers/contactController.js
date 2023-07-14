const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// Get all contacts
// GET /api/contacts
const getContacts = asyncHandler(async (req, res) => {
  // correct
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

// Find contact
// GET /api/contacts/:phone
const findContactByPhone = asyncHandler(async (req, res) => {
  const { phone } = req.body;

  const contact = await Contact.find({ phone: phone })
    .then((users) => {
      if (users.length > 0) {
        // Users found
        console.log(users);
      } else {
        // No users found
        console.log("No users found");
      }
    })
    .catch((error) => {
      console.error(error);
    });

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  res.status(200).json(contact);
});

// Get contact
// GET /api/contacts/:id
const getContact = asyncHandler(async (req, res) => {
  // correct

  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  res.status(200).json(contact);
});

// Create new contact
// POST /api/contacts
const createContact = asyncHandler(async (req, res) => {
  // correct
  console.log("request body: ", req.body);
  const { name, phone } = req.body;
  if (!name || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }
  const contact = await Contact.create({
    name,
    phone,
    // user_id: req.user.id // to security
  });

  res.status(201).json(contact);
  console.log(`create user successfull `);
});

// Update new contact
// PUT /api/contacts/:id
const updateContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update contact for ${req.params.id}` });
});

// Delete contact
// DELETE /api/contacts/:id
const deleteContact = asyncHandler(async (req, res) => {
  // correct
  console.log("request body delete: ", req.params.id);

  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  // if (contact.user_id.toString() !== req.user.id) {
  //     res.status(403);
  //     throw new Error("User don't have permission to update other user contacts");
  // }

  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);

  console.log(`delete successfull user: ${req.params.id} `);

  // res.status(200).json({ message: `Delete contacts for ${req.params.id}` });
});

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
  findContactByPhone,
};
