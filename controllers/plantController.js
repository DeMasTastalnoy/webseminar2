const Plant = require("../models/plantModel");

exports.getAllPlants = async (req, res) => {
    try {
        const plants = await Plant.getAll();
        res.json(plants);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getPlantById = async (req, res) => {
    try {
        const plant = await Plant.getById(req.params.id);
        if (!plant) return res.status(404).json({ message: "Растение не найдено" });
        res.json(plant);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createPlant = async (req, res) => {
    try {
        const { user_id, name, type, description, region } = req.body;
        const newPlant = await Plant.create(user_id, name, type, description, region);
        res.status(201).json(newPlant);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updatePlant = async (req, res) => {
    try {
        const { name, type, description, region } = req.body;
        const updatedPlant = await Plant.update(req.params.id, name, type, description, region);
        res.json(updatedPlant);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deletePlant = async (req, res) => {
    try {
        await Plant.delete(req.params.id);
        res.json({ message: "Растение удалено" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};