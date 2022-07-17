const express = require("express");
const {
  accessChat,
  createGroupChat,
  fetchChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
} = require("../controllers/chatController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChat);
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/groupadd").put(protect, addToGroup);
router.route("/groupremove").put(protect, removeFromGroup);
module.exports = router;
