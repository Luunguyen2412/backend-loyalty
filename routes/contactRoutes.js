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

// set condition: must have token when call api
// router.use(validateToken);

router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);
router.route("/find").get(findContactByPhone);

module.exports = router;
