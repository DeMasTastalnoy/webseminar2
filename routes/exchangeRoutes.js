const express = require("express");
const router = express.Router();
const exchangeController = require("../controllers/exchangeController");

router.get("/", exchangeController.getAllOffers);
router.get("/:id", exchangeController.getOfferById);
router.post("/", exchangeController.createOffer);
router.put("/:id/status", exchangeController.updateOfferStatus);
router.delete("/:id", exchangeController.deleteOffer);

module.exports = router;
