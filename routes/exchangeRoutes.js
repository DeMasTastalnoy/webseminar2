const express = require("express");
const router = express.Router();
const exchangeController = require("../controllers/exchangeController");
const authenticateUser = require("../middleware/authMiddleware");

router.get("/", exchangeController.getAllOffers);
router.get("/:id", exchangeController.getOfferById);
router.post("/", exchangeController.createOffer);
router.put("/:id/status", authenticateUser, exchangeController.updateOfferStatus);
router.delete("/:id", authenticateUser,exchangeController.deleteOffer);

module.exports = router;
