const Exchange = require("../models/exchangeModel");

exports.getAllOffers = async (req, res) => {
    try {
        const offers = await Exchange.getAllOffers();
        res.json(offers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getOfferById = async (req, res) => {
    try {
        const offer = await Exchange.getOfferById(req.params.id);
        if (!offer) return res.status(404).json({ message: "Предложение не найдено" });
        res.json(offer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createOffer = async (req, res) => {
    try {
        const { plant_id, user_id, offer_type } = req.body;
        if (!["exchange", "gift"].includes(offer_type)) {
            return res.status(400).json({ error: "Неверный тип предложения" });
        }
        const newOffer = await Exchange.createOffer(plant_id, user_id, offer_type);
        res.status(201).json(newOffer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateOfferStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const userId = req.user.id;


        if (!["pending", "accepted", "declined"].includes(status)) {
            return res.status(400).json({ error: "Неверный статус" });
        }

        const offer = await Exchange.getOfferById(req.params.id);
        if (!offer) return res.status(404).json({ message: "Предложение не найдено" });

        if (offer.user_id !== userId) {
            return res.status(403).json({ error: "Вы не можете изменить это предложение" });
        }

        const updatedOffer = await Exchange.updateOfferStatus(req.params.id, status);
        res.json(updatedOffer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteOffer = async (req, res) => {
    try {
        const userId = req.user.id; // ID текущего пользователя

        // Проверяем, является ли пользователь владельцем предложения
        const offer = await Exchange.getOfferById(req.params.id);
        if (!offer) return res.status(404).json({ message: "Предложение не найдено" });

        if (offer.user_id !== userId) {
            return res.status(403).json({ error: "Вы не можете удалить это предложение" });
        }


        await Exchange.deleteOffer(req.params.id);
        res.json({ message: "Предложение удалено" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
