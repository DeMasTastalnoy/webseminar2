const User = require("../models/userModel");

exports.getProfile = async (req, res) => {
    res.render("profile", { user: req.user });
};

exports.updateProfile = async (req, res) => {
    try {
        const { region, town } = req.body;
        const userId = req.user.id;

        await User.updateRegionAndTown(userId, region, town);
        res.json({ message: "Профиль успешно обновлен" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
