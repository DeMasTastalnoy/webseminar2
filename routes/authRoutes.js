const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authenticateUser = require("../middleware/authMiddleware");


router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authenticateUser, authController.getMe);

module.exports = router;
