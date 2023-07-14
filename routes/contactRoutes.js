const express = require("express");
const router = express.Router();

const {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
  findContactByPhone,
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandle");

// router.use(validateToken);
// set condition: must have token when call api

router.route("/").get(getContacts).post(createContact).get(findContactByPhone);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);
// router.route("/:phone").get(findContactByPhone);

module.exports = router;
