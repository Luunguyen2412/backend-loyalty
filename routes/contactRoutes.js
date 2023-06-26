const express = require("express");
const router = express.Router();

const { getContacts, getContact, createContact, updateContact, deleteContact } = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandle");

// router.use(validateToken);   // set condition: must have token when call api

router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;