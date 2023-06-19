const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// Get all contacts
// GET /api/contacts
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});

// Get contact
// GET /api/contacts/:id
const getContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contacts);
})

// Create new contact
// POST /api/contacts
const createContact = asyncHandler(async (req, res) => {
    console.log('request body: ', req.body);
    const { name, phone } = req.body;
    if (!name || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory !");
    }
    const contact = await Contact.create({
        name,
        phone,
        user_id: req.user.id,
    });

    res.status(201).json(contact);
});

// Update new contact
// PUT /api/contacts/:id
const updateContact = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update contact for ${req.params.id}` });
})

// Delete contact
// DELETE /api/contacts/:id
const deleteContact = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete contacts for ${req.params.id}` });
})

module.exports = { getContacts, getContact, createContact, updateContact, deleteContact }